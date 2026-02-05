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
        this.router.post("/", this.ticketsController.createTicket);
        this.router.get("/", this.ticketsController.getTickets);
        this.router.get("/:id", this.ticketsController.getTicketById);
        this.router.patch("/:id", this.ticketsController.updateTicket);
        this.router.delete("/:id", this.ticketsController.deleteTicket);
    }
    getRouter() {
        return this.router;
    }
}
