import { prisma } from "../../../config/prisma.js";
import { RegisterRequest } from "../types/auth.types.js";
import { ReferralTransaction, User } from "@prisma/client";

export class AuthRepository {
  public findByEmail = async (email: string): Promise<any> => {
    // TODO: Find user by email
    const checkUserByEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return checkUserByEmail;
  };

  public createUser = async (data: RegisterRequest): Promise<User> => {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        referralCode: data.referralCode || "",
        role: "CUSTOMER",
      },
    });
  };

  public findById = async (id: string): Promise<User | null> => {
    return await prisma.user.findUnique({
      where: { id: id },
    });
  };

  public referalTransaction = async (
    formUserId: string,
    toUserId: string,
  ): Promise<ReferralTransaction> => {
    return await prisma.referralTransaction.create({
      data: {
        fromUserId: formUserId,
        toUserId: toUserId,
        date: new Date(),
        amount: 10000,
        expiredAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      },
    });
  };

  public createVoucherRegister = async (
    userId: string,
    expiryDate: string,
  ): Promise<any> => {
    return await prisma.voucher.create({
      data: {
        name: "Referral Reward 10%",
        code: `REF-${userId.substring(0, 5).toLocaleLowerCase}`,
        type: "REFERRAL",
        amount: 10,
        maxClaim: 1,
        startDate: new Date(),
        endDate: expiryDate,
      },
    });
  };

  public findUserByReferralCode = async (
    referralCode: string,
  ): Promise<User | null> => {
    return await prisma.user.findUnique({
      where: { referralCode: referralCode },
    });
  };
}
