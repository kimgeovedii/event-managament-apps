import { prisma } from "src/config/prisma.js";
import { PromotionsRepository } from "../repositories/promotions.repository.js";
import { Prisma } from "@prisma/client";
import { TicketsRepository } from "src/features/tickets/repositories/tickets.repository.js";

export class PromotionsService {
  private promotionsRepository: PromotionsRepository;
  private ticketsRepository: TicketsRepository;

  constructor() {
    this.promotionsRepository = new PromotionsRepository();
    this.ticketsRepository = new TicketsRepository();
  }

  public create = async (data: any): Promise<any> => {
    return await prisma.$transaction(async (tx) => {
      const ticket = this.ticketsRepository.findById(data.ticketId);

      if (!ticket) {
        throw new Error(`Ticket with id ${data.ticketId} not found`);
      }

      return await this.promotionsRepository.create(data, tx);
    });
  };

  public findAll = async (
    filters: any,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: any[]; meta: any }> => {
    const skip = (page - 1) * limit;
    const take = limit;

    const { data, total } = await this.promotionsRepository.findMany(
      filters,
      skip,
      take,
    );

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  };

  public findOne = async (id: string): Promise<any> => {
    const promotion = await this.promotionsRepository.findById(id);

    if (!promotion) {
      throw new Error("Promotion not found");
    }

    return promotion;
  };

  public update = async (id: string, data: any): Promise<any> => {
    return this.promotionsRepository.update(id, data);
  };

  public delete = async (id: string): Promise<any> => {
    return this.promotionsRepository.delete(id);
  };

  public validate = async (code: string, userId: number): Promise<any> => {
    throw new Error("Method not implemented.");
  };
}
