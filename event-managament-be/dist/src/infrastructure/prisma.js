import { PrismaClient } from "@prisma/client";
class PrismaService {
    static instance;
    constructor() { }
    static getInstance() {
        if (!PrismaService.instance) {
            PrismaService.instance = new PrismaClient();
        }
        return PrismaService.instance;
    }
}
export const prisma = PrismaService.getInstance();
