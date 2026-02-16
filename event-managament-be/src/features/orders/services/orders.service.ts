import { prisma } from "src/config/prisma.js";
import { OrdersRepository } from "../repositories/orders.repository.js";
import { TicketsRepository } from "src/features/tickets/repositories/tickets.repository.js";

export interface IOrdersServiceProps {
  customerId: string;
  pointUsed?: number;
  voucherId?: string;
  items: {
    ticketId: string;
    qty: number;
  }[];
}

export class OrdersService {
  private ordersRepository: OrdersRepository;
  private ticketsRepository: TicketsRepository;

  constructor() {
    this.ordersRepository = new OrdersRepository();
    this.ticketsRepository = new TicketsRepository();
  }

  public create = async (data: IOrdersServiceProps): Promise<any> => {
    return await prisma.$transaction(async (tx) => {
      let totalPrice = 0;
      const orderItems: any[] = [];

      for (let item of data.items) {
        const ticket = await this.ticketsRepository.findById(item.ticketId);
        if (!ticket) {
          throw new Error(`Ticket with id ${item.ticketId} not found`);
        }

        const allotment = await tx.allotment.findUnique({
          where: { ticketId: item.ticketId },
        });

        if (!allotment || allotment.remainingQuota < item.qty) {
          throw new Error(`Insufficient quota for ticket id ${item.ticketId}`);
        }

        const subTotal = ticket.price * item.qty;
        totalPrice += subTotal;

        orderItems.push({
          ticketId: item.ticketId,
          qty: item.qty,
          subTotal,
        });

        await tx.allotment.update({
          where: { ticketId: item.ticketId },
          data: {
            remainingQuota: {
              decrement: item.qty,
            },
          },
        });
      }

      const finalPrice = totalPrice - (data.pointUsed || 0);

      if (finalPrice < 0) {
        throw new Error("Price cannot be negative");
      }

      const invoice = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      console.log(Date.now());
      console.log(invoice);

      const orderData = {
        invoice,
        totalPrice: finalPrice,
        pointUsed: data.pointUsed || 0,
        customerId: data.customerId,
        voucherId: data.voucherId,
        items: orderItems,
      };

      return await this.ordersRepository.create(orderData, tx);
    });
  };

  public findAll = async (
    filters: any,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: any[]; meta: any }> => {
    const skip = (page - 1) * limit;
    const take = limit;

    const { data, total } = await this.ordersRepository.findMany(
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
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  };

  public update = async (id: string, data: any): Promise<any> => {
    return this.ordersRepository.update(id, data);
  };

  public delete = async (id: string): Promise<any> => {
    return this.ordersRepository.delete(id);
  };

  public pay = async (orderId: number, paymentData: any): Promise<any> => {
    throw new Error("Method not implemented.");
  };
}
