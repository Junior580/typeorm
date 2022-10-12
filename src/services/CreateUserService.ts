import { AppDataSource } from "../database/data-source";
import { User } from "../models/User";
import AppError from "../errors/AppError";
import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";

interface Request {
    name: string;
    email: string;
    password: string;
}
export class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const usersRepostory = AppDataSource.getRepository(User);
        const checkUserExists = await usersRepostory.findOne({
            where: { email: email.toUpperCase() },
        });

        if (checkUserExists) {
            throw new AppError("Email adress already used!", 500);
        }
        const hashedPassword = await hash(password, 8);

        const user = usersRepostory.create({
            id: uuid().toUpperCase(),
            name: name.toUpperCase(),
            email: email.toUpperCase(),
            password: hashedPassword,
        });

        await usersRepostory.save(user);

        return user;
    }
}
