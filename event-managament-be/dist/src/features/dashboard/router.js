import { Router } from "express";
import { DashboardController } from "./controllers/dashboard.controller.js";
export class DashboardRouter {
    router;
    dashboardController;
    constructor() {
        this.router = Router();
        this.dashboardController = new DashboardController();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get("/stats", this.dashboardController.getStats);
        this.router.get("/reports", this.dashboardController.getReports);
    }
    getRouter() {
        return this.router;
    }
}
