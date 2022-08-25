import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import userRoute from "./routes/user.route";

export class App {
    private express: express.Application;
    private port = process.env.PORT;

    constructor() {
        this.express = express();
        this.middlewares();
        this.databaseMongoDB();
        this.routes();
        this.listen();
    }
        
    public getApp(): express.Application {
        return this.express;
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
        // this.express.use(express.urlencoded({ extended: true }));
    }

    private listen(): void {
        this.express.listen(this.port, () => {
            console.log(` Servidor Iniciado na porta ${this.port}`);
        });
        mongoose.connection.on('connection', () => {
            console.log("DataBase MongoDB Conectado")
        })
    }

    private databaseMongoDB(): void {
        mongoose.connect(process.env.DATABASE as string);
        
    }

    private routes(): void {
        this.express.use("/user", userRoute);
    }
}
