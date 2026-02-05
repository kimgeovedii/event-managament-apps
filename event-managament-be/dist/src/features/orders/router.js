import { Router } from "express";
import { OrdersController } from "./controllers/orders.controller.js";
export class OrdersRouter {
    router;
    ordersController;
    constructor() {
        this.router = Router();
        this.ordersController = new OrdersController();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.post("/", this.ordersController.create);
        this.router.get("/", this.ordersController.findAll);
        this.router.get("/:id", this.ordersController.findOne);
        this.router.patch("/:id", this.ordersController.update);
        this.router.delete("/:id", this.ordersController.delete);
        this.router.post("/:id/payment", this.ordersController.processPayment);
    }
    getRouter() {
        return this.router;
    }
}
