import { id } from "zod/locales";
import { prisma } from "../../../config/prisma.js";
import { RegisterRequest } from "../types/auth.types.js";
import { User } from "@prisma/client";

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

  public create = async (data: RegisterRequest): Promise<User> => {
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

  public updatePoint = async (userId: string, points: number): Promise<any> => {
    // TODO: Update user points
  };
}
