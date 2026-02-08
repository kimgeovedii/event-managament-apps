import { prisma } from "src/config/prisma.js";

export class TicketsRepository {
  public create = async (data: any): Promise<any> => {
    return prisma.ticket.create({
      data,
    });
  };

  public findMany = async (
    filters: any,
    skip?: number,
    take?: number,
  ): Promise<{ data: any[]; total: number }> => {
    const [data, total] = await prisma.$transaction([
      prisma.ticket.findMany({
        where: filters,
        include: {
          category: true,
          organization: true,
        },
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.ticket.count({ where: filters }),
    ]);

    return { data, total };
  };

  public findById = async (id: any): Promise<any> => {
    return prisma.ticket.findUnique({
      where: { id },
      include: {
        category: true,
        organization: true,
        allotments: true,
      },
    });
  };

  public update = async (id: any, data: any): Promise<any> => {
    return prisma.ticket.update({
      where: { id },
      data,
    });
  };

  public delete = async (id: any): Promise<any> => {
    return prisma.ticket.delete({
      where: { id },
    });
  };
}
