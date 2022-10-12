import { AppDataSource } from "../database/data-source";
import { Appointment } from "../models/Appointment";
import AppError from "../errors/AppError";
import { v4 as uuid } from "uuid";
interface Request {
    provider_id: string;
    date: string;
}
export class CreateAppointmentService {
    public async execute({ provider_id, date }: Request): Promise<Appointment> {
        const appointmetRepostory = AppDataSource.getRepository(Appointment);

        const findAppointment = await appointmetRepostory.findOne({
            where: { provider_id: provider_id },
        });

        if (findAppointment) {
            throw new AppError("This appointment is already booked!", 500);
        }

        const appointment = appointmetRepostory.create({
            id: uuid(),
            provider_id,
            date,
        });
        await appointmetRepostory.save(appointment);
        return appointment;
    }
}
