import { AppDataSource } from "../database/data-source";
import AppError from "../errors/AppError";
import { User } from "../models/User";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}
export class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepostory = AppDataSource.getRepository(User);

        const user = await usersRepostory.findOne({
            where: { email: email.toUpperCase() },
        });

        if (!user) {
            throw new AppError("Incorrect email/password combination.", 500);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError("Incorrect email/password combination.", 400);
        }

        const token = sign({}, authConfig.jwt, {
            subject: user.id,
            expiresIn: authConfig.expiresIn,
        });

        return {
            user,
            token,
        };
    }
}
