import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
  private authService = new AuthService();
  constructor() {
    this.authService = new AuthService();
  }
  public register = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
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
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    // TODO: Implement login
  };

  public logout = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    // TODO: Implement logout
  };

  public refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    // TODO: Implement token refresh
  };
}
