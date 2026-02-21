import { Router } from "express";
import { TicketsController } from "./controllers/tickets.controller.js";
import { CategoriesController } from "./controllers/categories.controllers.js";

export class TicketsRouter {
  private router: Router;
  private ticketsController: TicketsController;
  private categoriesController: CategoriesController;

  constructor() {
    this.router = Router();
    this.ticketsController = new TicketsController();
    this.categoriesController = new CategoriesController();
    this.setupRoutes();
  }

  private setupRoutes = (): void => {
    this.router.get("/categories", this.categoriesController.findAll);
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
