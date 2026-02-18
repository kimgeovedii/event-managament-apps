import { Router } from "express";
import { DashboardController } from "./controllers/dashboard.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { requireRole } from "../../middlewares/requireRole.js";

export class DashboardRouter {
  private router: Router;
  private dashboardController: DashboardController;

  constructor() {
    this.router = Router();
    this.dashboardController = new DashboardController();
    this.setupRoutes();
  }

  private setupRoutes = (): void => {
    // All dashboard routes require authentication + ORGANIZER role
    this.router.use(verifyToken, requireRole("ORGANIZER"));

    this.router.get("/stats", this.dashboardController.getStats);
    this.router.get("/reports", this.dashboardController.getReports);
    this.router.get("/attendees", this.dashboardController.getAttendeeStats);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
