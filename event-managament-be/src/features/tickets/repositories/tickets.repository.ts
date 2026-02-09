import { prisma } from "src/config/prisma.js";
import { Voucher, Prisma } from "@prisma/client";

export class TicketsRepository {
  public create = async (
    data: any,
    tx?: Prisma.TransactionClient,
  ): Promise<any> => {
    const client = tx || prisma;
    return await client.ticket.create({
      data,
    });
  };

  public findMany = async (
    filters: any,
    skip?: number,
    take?: number,
  ): Promise<{ data: any[]; total: number }> => {
    const [data, total] = await prisma.$transaction([
      prisma.ticket.findMany({
        where: filters,
        include: {
          category: true,
          organization: true,
        },
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.ticket.count({ where: filters }),
    ]);

    return { data, total };
  };

  public findById = async (id: any): Promise<any> => {
    return await prisma.ticket.findUnique({
      where: { id },
      include: {
        category: true,
        organization: true,
        allotments: true,
      },
    });
  };

  public update = async (
    id: string,
    data: any,
    tx?: Prisma.TransactionClient,
  ): Promise<any> => {
    const client = tx || prisma;
    return await client.ticket.update({
      where: { id },
      data,
    });
  };

  public delete = async (id: any): Promise<any> => {
    return await prisma.ticket.delete({
      where: { id },
    });
  };
}
