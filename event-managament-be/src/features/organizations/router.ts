import { Router } from "express";
import { OrganizationsController } from "./controllers/organizations.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { uploadcloudinaryImage } from "../../utils/cloudinary.js";

export class OrganizationsRouter {
  private router: Router;
  private organizationsController: OrganizationsController;

  constructor() {
    this.router = Router();
    this.organizationsController = new OrganizationsController();
    this.setupRoutes();
  }

  private setupRoutes = (): void => {
    // Create organizer (requires auth)
    this.router.post("/", verifyToken, this.organizationsController.create);

    // List all organizers
    this.router.get("/", this.organizationsController.findAll);

    // Get single organizer
    this.router.get("/:id", this.organizationsController.findOne);

    // Update organizer (requires auth)
    this.router.patch("/:id", verifyToken, this.organizationsController.update);

    // Update organizer logo
    this.router.patch(
      "/:id/logo",
      verifyToken,
      uploadcloudinaryImage("organizer-profile").single("image"),
      this.organizationsController.updateLogo
    );

    // Delete organizer (requires auth)
    this.router.delete(
      "/:id",
      verifyToken,
      this.organizationsController.delete,
    );

    // Add team member — invite by email (requires auth, OWNER/ADMIN check in service)
    this.router.post(
      "/:id/members",
      verifyToken,
      this.organizationsController.addTeamMember,
    );

    // Remove team member (requires auth)
    this.router.delete(
      "/:id/members/:userId",
      verifyToken,
      this.organizationsController.removeTeamMember,
    );

    // Update team member role (requires auth)
    this.router.patch(
      "/:id/members/:userId",
      verifyToken,
      this.organizationsController.updateTeamMemberRole,
    );
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
