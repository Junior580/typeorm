import { DataSource } from "typeorm";
import "dotenv/config";

const port = process.env.PORT as number | undefined;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE,
    entities: [__dirname + "../../models/*.{ts,js}"],
    migrations: [__dirname + "/migrations/*.{ts,js}"],
});

AppDataSource.initialize()
    .then(() => {
        console.log("📦 Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("❌ Error during Data Source initialization", err);
    });
