import { Router, Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import AppError from "../errors/AppError";
import { userRepository } from "../repositories/userRepository";

const userRouter = Router();

userRouter.post("/", async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const CreateUser = new CreateUserService();
        const user = await CreateUser.execute({ name, email, password });
        const createdUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
        return res.status(201).json({ message: "User created!", createdUser });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
    }
});

userRouter.get("/", async (req: Request, res: Response) => {
    try {
        const user = await userRepository.find();
        if (!user) {
            return res.status(500).json({ message: "No registered user." });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const user = await userRepository.findOne({ where: { id: id } });
        if (!user) {
            return res.status(500).json({ message: "No registered user." });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default userRouter;
