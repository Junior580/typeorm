import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    OneToMany,
} from "typeorm";
import { Appointment } from "./Appointment";

@Entity("users")
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @OneToMany(() => Appointment, appointment => appointment.user)
    appointments: Appointment[];
}
