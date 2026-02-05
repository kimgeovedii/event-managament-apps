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

  private setupRoutes = (): void => {
    this.router.post("/", this.usersController.create);
    this.router.get("/", this.usersController.findAll);
    this.router.get("/:id", this.usersController.findOne);
    this.router.patch("/:id", this.usersController.update);
    this.router.delete("/:id", this.usersController.delete);

    this.router.get("/:id/points", this.usersController.getPointHistory);
    this.router.get("/:id/vouchers", this.usersController.getVouchers);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
