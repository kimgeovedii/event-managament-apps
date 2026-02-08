import { UserPoint, Prisma } from "@prisma/client";
import { prisma } from "../../../config/prisma.js";

export class UserPointRepository {
  public addPoint = async (
    userId: string,
    points: number,
    expiredDate: Date,
    tx?: Prisma.TransactionClient,
  ): Promise<UserPoint> => {
    const client = tx || prisma;
    return await client.userPoint.create({
      data: {
        userId: userId,
        remainingPoint: points,
        expiredAt: expiredDate,
      },
    });
  };

  public getUserBalance = async (userId: string): Promise<number> => {
    const result = await prisma.userPoint.aggregate({
      where: {
        userId: userId,
        expiredAt: {
          gt: new Date(),
        },
      },
      _sum: {
        remainingPoint: true,
      },
    });
    return result._sum.remainingPoint || 0;
  };

  public usePoints = async (
    userId: string,
    amountToUse: number,
  ): Promise<void> => {
    return await prisma.$transaction(async (tx) => {
      const availablePoints = await tx.userPoint.findMany({
        where: {
          userId: userId,
          expiredAt: { gt: new Date() },
          remainingPoint: { gt: 0 },
        },
        orderBy: { expiredAt: "asc" },
      });

      let needed = amountToUse;
      for (const point of availablePoints) {
        if (needed <= 0) break;
        const take = Math.min(needed, point.remainingPoint);

        await tx.userPoint.update({
          where: { id: point.id },
          data: {
            remainingPoint: point.remainingPoint - take,
          },
        });
        needed -= take;
      }
      if (needed > 0) throw new Error("points are not enough");
    });
  };
}
