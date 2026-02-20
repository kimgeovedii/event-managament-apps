import { Request, Response, NextFunction } from "express";
import { OrganizationsService } from "../services/organizations.service.js";
import { AuthService } from "../../auth/services/auth.service.js";

export class OrganizationsController {
  private service: OrganizationsService;
  private authService: AuthService;

  constructor() {
    this.service = new OrganizationsService();
    this.authService = new AuthService();
  }

  /**
   * POST /api/organizations
   * Creates a new organizer profile for the authenticated user.
   * Body: { name: string, description?: string }
   */
  public create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user!.id;
      const { name, description } = req.body;

      const organizer = await this.service.create(userId, {
        name,
        description,
      });

      const updatedUser = await this.authService.getMe(userId);
      const tokens = await this.authService.generateTokens(updatedUser);

      res.status(201).json({
        message: "Organizer profile created successfully",
        data: organizer,
        tokens,
      });
    } catch (error: any) {
      if (error.status) {
        res.status(error.status).json({ message: error.message });
      } else {
        next(error);
      }
    }
  };

  /**
   * GET /api/organizations
   */
  public findAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const organizers = await this.service.findAll();
      res.status(200).json({ data: organizers });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * GET /api/organizations/:id
   */
  public findOne = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const organizer = await this.service.findOne(req.params.id as string);
      res.status(200).json({ data: organizer });
    } catch (error: any) {
      if (error.status) {
        res.status(error.status).json({ message: error.message });
      } else {
        next(error);
      }
    }
  };

  /**
   * PATCH /api/organizations/:id
   */
  public update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const organizer = await this.service.update(req.params.id as string, req.body);
      res.status(200).json({
        message: "Organizer updated successfully",
        data: organizer,
      });
    } catch (error: any) {
      if (error.status) {
        res.status(error.status).json({ message: error.message });
      } else {
        next(error);
      }
    }
  };

  /**
   * DELETE /api/organizations/:id
   */
  public delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const requestingUserId = req.user!.id;
      await this.service.delete(req.params.id as string, requestingUserId);
      res.status(200).json({ message: "Organizer deleted successfully" });
    } catch (error: any) {
      if (error.status) {
        res.status(error.status).json({ message: error.message });
      } else {
        next(error);
      }
    }
  };

  /**
   * POST /api/organizations/:id/members
   * Invite a user to the organizer team by email.
   * Body: { email: string, role?: "ADMIN" | "MEMBER" }
   */
  public addTeamMember = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const organizerId = req.params.id as string;
      const requestingUserId = req.user!.id;
      const { email, role } = req.body;

      const member = await this.service.addMember(
        organizerId,
        requestingUserId,
        { email, role },
      );

      res.status(201).json({
        message: "Team member added successfully",
        data: member,
      });
    } catch (error: any) {
      if (error.status) {
        res.status(error.status).json({ message: error.message });
      } else {
        next(error);
      }
    }
  };

  /**
   * DELETE /api/organizations/:id/members/:userId
   */
  public removeTeamMember = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const organizerId = req.params.id as string;
      const requestingUserId = req.user!.id;
      const targetUserId = req.params.userId as string;

      await this.service.removeMember(
        organizerId,
        requestingUserId,
        targetUserId,
      );

      res
        .status(200)
        .json({ message: "Team member removed successfully" });
    } catch (error: any) {
      if (error.status) {
        res.status(error.status).json({ message: error.message });
      } else {
        next(error);
      }
    }
  };

  /**
   * PATCH /api/organizations/:id/members/:userId
   */
  public updateTeamMemberRole = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const organizerId = req.params.id as string;
      const requestingUserId = req.user!.id;
      const targetUserId = req.params.userId as string;
      const { role } = req.body;

      await this.service.updateMemberRole(
        organizerId,
        requestingUserId,
        targetUserId,
        role,
      );

      res
        .status(200)
        .json({ message: "Team member role updated successfully" });
    } catch (error: any) {
      if (error.status) {
        res.status(error.status).json({ message: error.message });
      } else {
        next(error);
      }
    }
  };
}
