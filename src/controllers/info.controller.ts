import { Request, Response } from "express";

class InfoController {
    public async Pacotes(req: Request, res: Response): Promise<Response> {
        return res.json({
            "Plano": "Plano Simples",
            "Valor": "12x12,90",
            "Vantagens": ["Vendas"]
        })
    }
}

export default new InfoController();