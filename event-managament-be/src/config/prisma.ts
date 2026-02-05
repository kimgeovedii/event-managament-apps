import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

class PrismaService {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaService.instance) {
      console.log('Initializing Prisma with DATABASE_URL:', process.env.DATABASE_URL ? 'PRESENT' : 'MISSING');
      PrismaService.instance = new PrismaClient();
    }
    return PrismaService.instance;
  }
}

export const prisma = PrismaService.getInstance();
