import { Router } from "express";
import { AuthController } from "./controllers/auth.controller.js";
export class AuthRouter {
    router;
    authController;
    constructor() {
        this.router = Router();
        this.authController = new AuthController();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.post("/register", this.authController.register);
        this.router.post("/login", this.authController.login);
        this.router.post("/logout", this.authController.logout);
        this.router.post("/refresh-token", this.authController.refreshToken);
    }
    getRouter() {
        return this.router;
    }
}
