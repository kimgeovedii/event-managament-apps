import { Router } from "express";
import { ReviewsController } from "./controllers/reviews.controller.js";
export class ReviewsRouter {
    router;
    reviewsController;
    constructor() {
        this.router = Router();
        this.reviewsController = new ReviewsController();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.post("/", this.reviewsController.createReview);
        this.router.get("/ticket/:ticketId", this.reviewsController.getReviewsByTicket);
    }
    getRouter() {
        return this.router;
    }
}
