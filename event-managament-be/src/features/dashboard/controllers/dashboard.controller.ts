import { Request, Response, NextFunction } from "express";

export class DashboardController {
  public getStats = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    throw new Error("Method not implemented.");
  };

  public getReports = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    throw new Error("Method not implemented.");
  };

  public getAttendeeStats = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    throw new Error("Method not implemented.");
  };
}
