import { Router, Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import AppError from "../errors/AppError";
import { Appointment } from "../models/Appointment";
import { CreateAppointmentService } from "../services/CreateAppointmentService";

const appointmentRouter = Router();

appointmentRouter.post("/", async (req: Request, res: Response) => {
    try {
        const { provider_id, date } = req.body;
        const CreateAppointment = new CreateAppointmentService();
        const appointment = await CreateAppointment.execute({
            provider_id,
            date,
        });

        return res.status(201).json(appointment);
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json(error.message);
        }
    }
});

appointmentRouter.get("/", async (req: Request, res: Response) => {
    const appointmentRepository = AppDataSource.getRepository(Appointment);
    const appointment = await appointmentRepository.find();
    return res.json(appointment);
});

appointmentRouter.get("/", async (req: Request, res: Response) => {
    const appointmentRepository = AppDataSource.getRepository(Appointment);
    const appointment = await appointmentRepository.find();
    return res.json(appointment);
});

export default appointmentRouter;
