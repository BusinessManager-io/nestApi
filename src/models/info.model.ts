import mongoose, { model, Schema } from "mongoose";
import { InfoInterface } from "../interfaces/info.interface";

interface InfoModel extends InfoInterface, mongoose.Document {}

const InfoSchema = new Schema({
    Plano: {
        type: String,
        required: true,
    },
    Valor: {
        type: String,
        required: true,
    },
    Vantagens: [
        {
            type: String,
            required: true,
        },
    ],
});

export default model<InfoModel>("Infos", InfoSchema);
