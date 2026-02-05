import { Router } from "express";
import { OrganizationsController } from "./controllers/organizations.controller.js";
export class OrganizationsRouter {
    router;
    organizationsController;
    constructor() {
        this.router = Router();
        this.organizationsController = new OrganizationsController();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.post("/", this.organizationsController.createOrganization);
        this.router.get("/", this.organizationsController.getOrganizations);
        this.router.patch("/:id", this.organizationsController.updateOrganization);
        this.router.post("/:id/members", this.organizationsController.addTeamMember);
    }
    getRouter() {
        return this.router;
    }
}
