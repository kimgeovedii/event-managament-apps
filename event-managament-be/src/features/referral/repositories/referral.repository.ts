import { Prisma } from "@prisma/client";
import { prisma } from "src/config/prisma.js";

class ReferralRepository {
  public referralTransaction = async (
    data: Prisma.ReferralTransactionCreateInput,
    tx?: Prisma.TransactionClient,
  ) => {
    const client = tx || prisma;
    return await client.referralTransaction.create({
      data: data,
    });
  };
}
