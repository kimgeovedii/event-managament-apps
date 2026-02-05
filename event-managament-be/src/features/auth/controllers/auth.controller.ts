import { Request, Response, NextFunction } from "express";

export class AuthController {
  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    // TODO: Implement registration
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    // TODO: Implement login
  }

  public async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    // TODO: Implement logout
  }

  public async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    // TODO: Implement token refresh
  }
}
