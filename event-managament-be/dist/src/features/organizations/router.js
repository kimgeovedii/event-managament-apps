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
        this.router.post("/", this.organizationsController.create);
        this.router.get("/", this.organizationsController.findAll);
        this.router.get("/:id", this.organizationsController.findOne);
        this.router.patch("/:id", this.organizationsController.update);
        this.router.delete("/:id", this.organizationsController.delete);
        this.router.post("/:id/members", this.organizationsController.addTeamMember);
        this.router.delete("/:id/members/:userId", this.organizationsController.removeTeamMember);
    }
    getRouter() {
        return this.router;
    }
}
