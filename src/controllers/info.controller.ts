import { Request, Response } from "express";
import infoModel from "../models/info.model";

class InfoController {
    public async getInfo(req: Request, res: Response): Promise<Response> {
        const infos = await infoModel.find();
        return res.json(infos);
    }

    public async insetInfo(req: Request, res: Response): Promise<Response> {
        const { Plano, Valor, Vantagens } = req.body;
        
        const newInfo = await infoModel.create({
            Plano,
            Valor,
            Vantagens
        })

        try{
            await newInfo.save();
            return res.json(newInfo);
        } catch(err) {
            return res.status(400).json({ error: "invalid info" });
        }
    }
}

export default new InfoController();
