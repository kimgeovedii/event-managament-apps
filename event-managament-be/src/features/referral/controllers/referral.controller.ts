
import { Request, Response, NextFunction } from "express";
import { ReferralService } from "../services/referral.service.js";

export class ReferralController {
  private referralService: ReferralService;

  constructor() {
    this.referralService = new ReferralService();
  }

  public getReferralData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Assuming userId is extracted from middleware and put in req.user or similar
      // For now taking from params or hardcoding/query for testing if auth not fully integrated in my context
      // But typically it comes from auth middleware.
      // Let's assume req.user.id exists if auth middleware is used.
      // If not, I might need to take it from query for this specifc request context or check how auth is handled.
      // Looking at users.controller, it doesn't seem to use req.user yet.
      // I'll assume we can pass userId in params or query for now, or req.body.
      // But for a "my referral" page, it should be the logged in user.
      
      // Using authenticated user from middleware
      // Using authenticated user from middleware
      const userId = req.user?.id;

      if (!userId) {
          res.status(400).json({ message: "UserId is required" });
          return;
      }

      const data = await this.referralService.getReferralData(userId);

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
