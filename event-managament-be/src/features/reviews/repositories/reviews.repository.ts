import { Prisma } from "@prisma/client";
import { prisma } from "src/config/prisma.js";

export class ReviewsRepository {
  public create = async (
    data: any,
    tx?: Prisma.TransactionClient,
  ): Promise<any> => {
    const client = tx || prisma;
    return await client.review.create({
      data,
    });
  };

  public findMany = async (
    filters: any,
    skip?: number,
    take?: number,
  ): Promise<any> => {
    const [data, total] = await prisma.$transaction([
      prisma.review.findMany({
        where: filters,
        include: {
          transactionItem: {
            include: {
              ticket: true,
            },
          },
        },
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.review.count({
        where: filters,
      }),
    ]);

    return { data, total };
  };

  public findById = async (id: string): Promise<any> => {
    return await prisma.review.findUnique({
      where: { id },
      include: {
        transactionItem: {
          include: {
            ticket: true,
          },
        },
      },
    });
  };

  public update = async (
    id: string,
    data: any,
    tx?: Prisma.TransactionClient,
  ): Promise<any> => {
    const client = tx || prisma;
    return await client.review.update({
      where: { id },
      data,
    });
  };

  public delete = async (id: string): Promise<any> => {
    return await prisma.review.delete({
      where: { id },
    });
  };

  public findManyByTicket = async (
    ticketId: string,
    skip?: number,
    take?: number,
  ): Promise<any> => {
    const filters = {
      transactionItem: {
        ticketId: ticketId,
      },
    };
    const [data, total] = await prisma.$transaction([
      prisma.review.findMany({
        where: filters,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),

      prisma.review.count({
        where: filters,
      }),
    ]);

    return { data, total };
  };
}
