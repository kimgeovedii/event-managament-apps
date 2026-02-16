import { Prisma } from "@prisma/client";
import { prisma } from "src/config/prisma.js";

export class PromotionsRepository {
  public create = async (
    data: any,
    tx?: Prisma.TransactionClient,
  ): Promise<any> => {
    const client = tx || prisma;
    return await client.promotion.create({ data });
  };

  public findMany = async (
    filters: any,
    skip?: number,
    take?: number,
  ): Promise<any> => {
    const [data, total] = await prisma.$transaction([
      prisma.promotion.findMany({
        where: filters,
        include: {
          ticket: true,
          voucher: true,
        },
        skip,
        take,
        orderBy: { startDate: "desc" },
      }),
      prisma.promotion.count({
        where: filters,
      }),
    ]);

    return { data, total };
  };

  public findById = async (id: string): Promise<any> => {
    return await prisma.promotion.findUnique({
      where: { id },
      include: {
        ticket: true,
        voucher: true,
      },
    });
  };

  public update = async (id: string, data: any): Promise<any> => {
    return await prisma.promotion.update({
      where: { id },
      data,
    });
  };

  public delete = async (id: string): Promise<any> => {
    return await prisma.promotion.delete({
      where: { id },
    });
  };

  public findByCode = async (code: string): Promise<any> => {
    throw new Error("Method not implemented.");
  };
}
