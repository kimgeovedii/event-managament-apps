import { Router } from "express";
import { UsersController } from "./controllers/users.controller.js";

export class UsersRouter {
  private router: Router;
  private usersController: UsersController;

  constructor() {
    this.router = Router();
    this.usersController = new UsersController();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.get("/profile", this.usersController.getProfile);
    this.router.patch("/profile", this.usersController.updateProfile);
    this.router.get("/points", this.usersController.getPointHistory);
    this.router.get("/vouchers", this.usersController.getVouchers);
  }

  public getRouter(): Router {
    return this.router;
  }
}
