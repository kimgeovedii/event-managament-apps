import { Router } from "express";
import { TicketsController } from "./controllers/tickets.controller.js";
import { CategoriesController } from "./controllers/categories.controllers.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { requireOrgRole } from "../../middlewares/requireOrgRole.js";
import { requireRole } from "../../middlewares/requireRole.js";

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
    
    // Create event/ticket (Requires OWNER, ADMIN)
    this.router.post(
      "/", 
      verifyToken, 
      requireRole("ORGANIZER"), 
      requireOrgRole(["ADMIN"], "organizer"), // Check body.organizerId
      this.ticketsController.create
    );

    this.router.get("/", this.ticketsController.findAll);
    this.router.get("/:id", this.ticketsController.findOne);

    // Update event/ticket (Requires OWNER, ADMIN)
    this.router.patch(
      "/:id", 
      verifyToken, 
      requireRole("ORGANIZER"), 
      requireOrgRole(["ADMIN"], "event"), 
      this.ticketsController.update
    );

    // Delete event/ticket (Requires OWNER, ADMIN)
    this.router.delete(
      "/:id", 
      verifyToken, 
      requireRole("ORGANIZER"), 
      requireOrgRole(["ADMIN"], "event"), 
      this.ticketsController.delete
    );
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
