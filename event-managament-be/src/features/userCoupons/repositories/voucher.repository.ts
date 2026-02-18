import { Prisma } from "@prisma/client";
import { prisma } from "../../../config/prisma.js";

export class UserCouponRepository {
  public createUserCoupon = async (
    data: any,
    tx?: Prisma.TransactionClient,
  ): Promise<any> => {
    const client = tx || prisma;
    return await client.userCoupon.create({
      data: data,
    });
  };
}
