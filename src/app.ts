import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

export class App {
    private express: express.Application;
    private port = 9000;

    constructor() {
        this.express = express();
        this.listen();
        this.middlewares();
        this.databaseMongoDB();
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
    }

    private databaseMongoDB(): void {
        mongoose.connect(process.env.DATABASE as string);
    }
}
