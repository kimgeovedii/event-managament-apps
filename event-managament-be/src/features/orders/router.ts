import { Router } from "express";
import { OrdersController } from "./controllers/orders.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { requireRole } from "../../middlewares/requireRole.js";

export class OrdersRouter {
  private router: Router;
  private ordersController: OrdersController;

  constructor() {
    this.router = Router();
    this.ordersController = new OrdersController();
    this.setupRoutes();
  }

  private setupRoutes = (): void => {
    // All orders routes require authentication + CUSTOMER role
    this.router.use(verifyToken, requireRole("CUSTOMER"));

    this.router.post("/", this.ordersController.create);
    this.router.get("/", this.ordersController.findAll);
    this.router.get("/:id", this.ordersController.findOne);
    this.router.patch("/:id", this.ordersController.update);
    this.router.delete("/:id", this.ordersController.delete);

    this.router.post("/:id/payment", this.ordersController.processPayment);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
