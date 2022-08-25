import { Router } from "express";
import userController from "../controllers/user.controller";

const userRoute = Router();

userRoute.post("/cadastro", userController.signup);
userRoute.post("/login", userController.signin);

export default userRoute;
