import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";

import AppError from "../errors/AppError";

export default function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("JWT token is missing.", 203);
    }

    const [, token] = authHeader.split("");

    const decoded = verify(token, "78562cd23a2155fd43a476107fec7ed6");
}
