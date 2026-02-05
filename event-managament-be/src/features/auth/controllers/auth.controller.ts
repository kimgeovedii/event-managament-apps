import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
  private authService = new AuthService();
  constructor() {
    this.authService = new AuthService();
  }
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    // TODO: Implement registration
    try {
      const result = await this.authService.register(req.body);

      res.status(200).json({
        message: "Register Successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    // TODO: Implement login
  }

  public async logout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    // TODO: Implement logout
  }

  public async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    // TODO: Implement token refresh
  }
}
