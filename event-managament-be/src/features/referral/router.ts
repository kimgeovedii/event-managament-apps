
import { Router } from "express";
import { ReferralController } from "./controllers/referral.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";

export class ReferralRouter {
  private router: Router;
  private referralController: ReferralController;

  constructor() {
    this.router = Router();
    this.referralController = new ReferralController();
    this.setupRoutes();
  }

  private setupRoutes = (): void => {
    this.router.get("/", verifyToken, this.referralController.getReferralData);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
