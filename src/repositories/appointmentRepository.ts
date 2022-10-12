import { AppDataSource } from "../database/data-source";
import { Appointment } from "../models/Appointment";

export const appointmentRepository = AppDataSource.getRepository(Appointment);
