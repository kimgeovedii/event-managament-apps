import { Voucher, Prisma } from "@prisma/client";
import { prisma } from "src/config/prisma.js";

export class VoucherRepository {
  public createVoucher = async (
    data: Prisma.VoucherCreateInput,
    tx?: Prisma.TransactionClient,
  ) => {
    const client = tx || prisma;
    return await client.voucher.create({
      data: data,
    });
  };
}
