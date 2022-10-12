import { Router, Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";
import AppError from "../errors/AppError";

const sessionsRouter = Router();

sessionsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const AuthenticateUser = new AuthenticateUserService();

        const { user, token } = await AuthenticateUser.execute({
            email,
            password,
        });

        const sessionUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        return res.status(201).json({ sessionUser, token });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
    }
});

export default sessionsRouter;
