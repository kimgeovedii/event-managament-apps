import { prisma } from "../../../config/prisma.js";
import { RegisterRequest } from "../types/auth.types.js";

export class AuthRepository {
  public findByEmail = async (email: string): Promise<any> => {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        roles: true,
      },
    });
  };

  public createUser = async (data: RegisterRequest): Promise<any> => {
    const role = data.role || "CUSTOMER";
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        referralCode: data.referralCode || "",
        roles: {
          create: {
            role: role as any,
          },
        },
      },
      include: {
        roles: true,
      },
    });
  };

  public findById = async (id: string): Promise<any> => {
    return await prisma.user.findUnique({
      where: { id: id },
      include: {
        roles: true,
      },
    });
  };

  public findUserByReferralCode = async (
    referralCode: string,
  ): Promise<any> => {
    return await prisma.user.findUnique({
      where: { referralCode: referralCode },
    });
  };

  public createReferral = async (
    referrerId: string,
    referredUserId: string,
    tx?: any
  ): Promise<any> => {
    const prismaClient = tx || prisma;
    return await prismaClient.referral.create({
      data: {
        referrerId: referrerId,
        referredUserId: referredUserId,
      },
    });
  };
}
