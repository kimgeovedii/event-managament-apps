
import { Router } from "express";
import { NotificationController } from "./controllers/notification.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";

export class NotificationRouter {
  private router: Router;
  private notificationController: NotificationController;

  constructor() {
    this.router = Router();
    this.notificationController = new NotificationController();
    this.setupRoutes();
  }

  private setupRoutes = (): void => {
    this.router.get("/", verifyToken, this.notificationController.getMyNotifications);
    this.router.get("/unread-count", verifyToken, this.notificationController.getUnreadCount);
    this.router.patch("/:id/read", verifyToken, this.notificationController.markAsRead);
    this.router.patch("/read-all", verifyToken, this.notificationController.markAllAsRead);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
