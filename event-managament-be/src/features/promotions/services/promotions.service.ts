import { prisma } from "src/config/prisma.js";
import { PromotionsRepository } from "../repositories/promotions.repository.js";
import { Prisma } from "@prisma/client";
import { TicketsRepository } from "src/features/events/repositories/tickets.repository.js";

export class PromotionsService {
  private promotionsRepository: PromotionsRepository;
  private ticketsRepository: TicketsRepository;

  constructor() {
    this.promotionsRepository = new PromotionsRepository();
    this.ticketsRepository = new TicketsRepository();
  }

  public create = async (data: any): Promise<any> => {
    return await prisma.$transaction(async (tx) => {
      // Assuming data.eventId is provided instead of ticketId, logic allows linking to Event.
      // If data has ticketId, we should probably check if it was meant to be eventId.
      // For now, I'll check for eventId.
      const eventId = data.eventId || data.ticketId; 
      const event = await this.ticketsRepository.findById(eventId);

      if (!event) {
        throw new Error(`Event with id ${eventId} not found`);
      }

      // promotionsRepository.create expects data. 
      // We might need to adjust data to match PromotionCreateInput which might require organizerId, etc.
      // But for now, we pass data hoping it matches or repo handles it.
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
