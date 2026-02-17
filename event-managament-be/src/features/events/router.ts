import { Router } from "express";
import { TicketsController } from "./controllers/tickets.controller.js";

export class TicketsRouter {
  private router: Router;
  private ticketsController: TicketsController;

  constructor() {
    this.router = Router();
    this.ticketsController = new TicketsController();
    this.setupRoutes();
  }

  private setupRoutes = (): void => {
    this.router.post("/", this.ticketsController.create);
    this.router.get("/", this.ticketsController.findAll);
    this.router.get("/:id", this.ticketsController.findOne);
    this.router.patch("/:id", this.ticketsController.update);
    this.router.delete("/:id", this.ticketsController.delete);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
