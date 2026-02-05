import { Router } from "express";
import { ReviewsController } from "./controllers/reviews.controller.js";

export class ReviewsRouter {
  private router: Router;
  private reviewsController: ReviewsController;

  constructor() {
    this.router = Router();
    this.reviewsController = new ReviewsController();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post("/", this.reviewsController.create);
    this.router.get("/", this.reviewsController.findAll);
    this.router.get("/:id", this.reviewsController.findOne);
    this.router.patch("/:id", this.reviewsController.update);
    this.router.delete("/:id", this.reviewsController.delete);
    
    this.router.get("/ticket/:ticketId", this.reviewsController.getReviewsByTicket);
  }

  public getRouter(): Router {
    return this.router;
  }
}
