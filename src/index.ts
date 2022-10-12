import "reflect-metadata";
import "./database/data-source";

import express, { Response, Request } from "express";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

app.get("/", (req: Request, res: Response) => {
    return res.json({ message: "teste" });
});

app.listen(3000, () => {
    console.log("🚀 Server is Running");
});
