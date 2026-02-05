import { Request, Response, NextFunction } from "express";

export class OrdersController {
  public async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    // TODO: Implement createOrder
  }

  public async getOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    // TODO: Implement getOrders
  }

  public async getOrderById(req: Request, res: Response, next: NextFunction): Promise<void> {
    // TODO: Implement getOrderById
  }

  public async processPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
    // TODO: Implement processPayment
  }
}
