import { prisma } from "../../../config/prisma.js";
import { RegisterRequest } from "../types/auth.types.js";
import { User } from "@prisma/client";

export class AuthRepository {
  public async findByEmail(email: string): Promise<any> {
    // TODO: Find user by email
    const checkUserByEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return checkUserByEmail;
  }

  public async create(data: RegisterRequest): Promise<User> {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        referralCode: data.referralCode || "",
        role: "CUSTOMER",
      },
    });
  }

  public async updatePoint(userId: string, points: number): Promise<any> {
    // TODO: Update user points
  }
}
