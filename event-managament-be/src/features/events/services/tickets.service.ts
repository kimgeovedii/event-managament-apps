import { TicketsRepository } from "../repositories/tickets.repository.js";

export class TicketsService {
  private ticketsRepository: TicketsRepository;

  constructor() {
    this.ticketsRepository = new TicketsRepository();
  }

  public create = async (data: any): Promise<any> => {
    if (new Date(data.endDate) <= new Date(data.startDate)) {
      throw new Error("End date must be after start date");
    }
    return this.ticketsRepository.create(data);
  };

  public findAll = async (
    filters: any,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: any[]; meta: any }> => {
    const skip = (page - 1) * limit;
    const take = limit;

    const { data, total } = await this.ticketsRepository.findMany(
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

  public findOne = async (id: any): Promise<any> => {
    const ticket = await this.ticketsRepository.findById(id);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    return ticket;
  };

  public update = async (id: any, data: any): Promise<any> => {
    if (data.startDate && data.endDate) {
      if (
        new Date(data.endDate as string) <= new Date(data.startDate as string)
      ) {
        throw new Error("End date must be after start date");
      }
    }

    return this.ticketsRepository.update(id, data);
  };

  public delete = async (id: any): Promise<any> => {
    return this.ticketsRepository.delete(id);
  };
}
