import { Router } from "express";
import { OrdersController } from "./controllers/orders.controller.js";

export class OrdersRouter {
  private router: Router;
  private ordersController: OrdersController;

  constructor() {
    this.router = Router();
    this.ordersController = new OrdersController();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post("/", this.ordersController.createOrder);
    this.router.get("/", this.ordersController.getOrders);
    this.router.get("/:id", this.ordersController.getOrderById);
    this.router.post("/:id/payment", this.ordersController.processPayment);
  }

  public getRouter(): Router {
    return this.router;
  }
}
