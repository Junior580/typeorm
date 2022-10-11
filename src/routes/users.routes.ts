import { Router, Request, Response } from "express";
import { userRepository } from "../repositories/UserRepository";
import { CreateUserService } from "../services/CreateUserService";
import AppError from "../errors/AppError";

const userRouter = Router();

userRouter.post("/", async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const createUser = new CreateUserService();
        const user = await createUser.execute({ name, email, password });
        return res.status(201).json(user);
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
    }
});

userRouter.get("/", async (req: Request, res: Response) => {
    try {
        const users = await userRepository.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const users = await userRepository.find({
            where: { id: id.toUpperCase() },
        });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
});

export default userRouter;
