import { Router } from "express";
import { TicketsController } from "./controllers/tickets.controller.js";
export class TicketsRouter {
    router;
    ticketsController;
    constructor() {
        this.router = Router();
        this.ticketsController = new TicketsController();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.post("/", this.ticketsController.create);
        this.router.get("/", this.ticketsController.findAll);
        this.router.get("/:id", this.ticketsController.findOne);
        this.router.patch("/:id", this.ticketsController.update);
        this.router.delete("/:id", this.ticketsController.delete);
    }
    getRouter() {
        return this.router;
    }
}
