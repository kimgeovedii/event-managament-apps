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
    // Handle registration request
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
    try {
      const result = await this.authService.login(req.body);

      res.status(200).json({
        message: "Login Successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    // TODO: Implement logout
    try {
      res.status(200).json({
        message: "Logout Successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  public me = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = req.user?.id;
      if (!id) throw new Error("unauthorized");
      const result = await this.authService.getMe(id);

      res.status(200).json({
        message: "successfully get user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    // TODO: Implement token refresh
  };
}
