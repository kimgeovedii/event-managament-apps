import { prisma } from "src/config/prisma.js";
import { Prisma } from "@prisma/client";

export interface IOrdersRepositoryProps {
  invoice: string;
  totalPrice: number;
  pointUsed: number;
  customerId: string;
  voucherId?: string;
  items: {
    ticketId: string;
    qty: number;
    subTotal: number;
  }[];
}

export class OrdersRepository {
  public create = async (
    data: IOrdersRepositoryProps,
    tx?: Prisma.TransactionClient,
  ): Promise<any> => {
    const client = tx || prisma;
    return await client.transaction.create({
      data: {
        invoice: data.invoice,
        totalPrice: data.totalPrice,
        pointsUsed: data.pointUsed,
        customerId: data.customerId,
        voucherId: data.voucherId,
        items: {
          create: data.items.map((item) => ({
            ticketId: item.ticketId,
            qty: item.qty,
            subTotal: item.subTotal,
          })),
        },
      },
      include: {
        items: true,
      },
    });
  };

  public findMany = async (
    filters: any,
    skip?: number,
    take?: number,
  ): Promise<any> => {
    const [data, total] = await prisma.$transaction([
      prisma.transaction.findMany({
        where: filters,
        include: {
          items: true,
          customer: true,
        },
        skip,
        take,
        orderBy: { date: "desc" },
      }),
      prisma.transaction.count({
        where: filters,
      }),
    ]);
    return { data, total };
  };

  public findById = async (id: string): Promise<any> => {
    return await prisma.transaction.findUnique({
      where: { id },
      include: {
        items: true,
        customer: true,
      },
    });
  };

  public update = async (
    id: string,
    data: any,
    tx?: Prisma.TransactionClient,
  ): Promise<any> => {
    const client = tx || prisma;
    return await client.transaction.update({
      where: { id },
      data,
    });
  };

  public delete = async (id: string): Promise<any> => {
    return await prisma.$transaction(async (tx) => {
      await tx.transactionItem.deleteMany({
        where: { transactionId: id },
      });

      return await tx.transaction.delete({
        where: { id },
      });
    });
  };
}
