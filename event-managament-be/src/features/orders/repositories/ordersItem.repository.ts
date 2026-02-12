import { prisma } from "src/config/prisma.js";

export class OrdersItemRepository {
  public findById = async (id: string): Promise<any> => {
    return await prisma.transactionItem.findUnique({
      where: { id },
      include: {
        ticket: true,
        review: true,
      },
    });
  };
}
