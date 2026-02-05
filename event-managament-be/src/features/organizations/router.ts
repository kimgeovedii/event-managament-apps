import { Router } from "express";
import { OrganizationsController } from "./controllers/organizations.controller.js";

export class OrganizationsRouter {
  private router: Router;
  private organizationsController: OrganizationsController;

  constructor() {
    this.router = Router();
    this.organizationsController = new OrganizationsController();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post("/", this.organizationsController.createOrganization);
    this.router.get("/", this.organizationsController.getOrganizations);
    this.router.patch("/:id", this.organizationsController.updateOrganization);
    this.router.post("/:id/members", this.organizationsController.addTeamMember);
  }

  public getRouter(): Router {
    return this.router;
  }
}
