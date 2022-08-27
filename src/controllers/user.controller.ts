import { Request, Response } from "express";
import userModel from "../models/user.model";

class UserController {
    public async signup(req: Request, res: Response): Promise<Response> {
        const user = await userModel.create(req.body);
        const response = {
            message: "Usuario cadastrado com sucesso!!!",
            _id: user._id,
            name: user.name,
        };
        return res.json(response);
    }

    public async signin(req: Request, res: Response): Promise<Response> {
        const { name, password } = req.body;

        const user = await userModel.findOne({ name });

        if (!user) {
            return res.status(400).send({ message: "Usuário não encontrado" });
        }

        const passwordValid = await user.comparePassword(password);

        if (!passwordValid) {
            return res.status(400).send({ message: "Senha Incorreta!" });
        }

        return res.json({
            user,
            token: user.gerateToken(),
        });
    }
}

export default new UserController();
