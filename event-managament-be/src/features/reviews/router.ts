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
    this.router.post("/", this.reviewsController.createReview);
    this.router.get("/ticket/:ticketId", this.reviewsController.getReviewsByTicket);
  }

  public getRouter(): Router {
    return this.router;
  }
}
