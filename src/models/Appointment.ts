import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity("appointments")
export class Appointment {
    @PrimaryColumn()
    id: string;

    @Column()
    provider_id: string;

    @Column()
    date: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, user => user.appointments)
    user: User[];
}
