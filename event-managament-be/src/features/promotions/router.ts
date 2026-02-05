import { Router } from "express";
import { PromotionsController } from "./controllers/promotions.controller.js";

export class PromotionsRouter {
  private router: Router;
  private promotionsController: PromotionsController;

  constructor() {
    this.router = Router();
    this.promotionsController = new PromotionsController();
    this.setupRoutes();
  }

  private setupRoutes = (): void => {
    this.router.post("/", this.promotionsController.create);
    this.router.get("/", this.promotionsController.findAll);
    this.router.get("/:id", this.promotionsController.findOne);
    this.router.patch("/:id", this.promotionsController.update);
    this.router.delete("/:id", this.promotionsController.delete);

    this.router.post("/validate", this.promotionsController.validateVoucher);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
