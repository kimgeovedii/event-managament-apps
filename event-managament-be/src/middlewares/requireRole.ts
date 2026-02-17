import { Request, Response, NextFunction } from "express";

/**
 * Middleware factory that checks if the authenticated user
 * has at least one of the required roles.
 *
 * Usage:
 *   router.get("/", verifyToken, requireRole("CUSTOMER"), controller.handler);
 *   router.get("/", verifyToken, requireRole("ORGANIZER", "ADMIN"), controller.handler);
 */
export const requireRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized: Authentication required",
      });
    }

    const userRoles: string[] = user.roles || [];
    const hasRole = userRoles.some((role) => allowedRoles.includes(role));

    if (!hasRole) {
      return res.status(403).json({
        message: `Forbidden: Requires one of [${allowedRoles.join(", ")}] role`,
      });
    }

    next();
  };
};
