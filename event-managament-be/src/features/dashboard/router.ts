import { Router } from "express";
import { DashboardController } from "./controllers/dashboard.controller.js";

export class DashboardRouter {
  private router: Router;
  private dashboardController: DashboardController;

  constructor() {
    this.router = Router();
    this.dashboardController = new DashboardController();
    this.setupRoutes();
  }

  private setupRoutes = (): void => {
    this.router.get("/stats", this.dashboardController.getStats);
    this.router.get("/reports", this.dashboardController.getReports);
    this.router.get("/attendees", this.dashboardController.getAttendeeStats);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
