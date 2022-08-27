import { Router } from "express";
import infoController from "../controllers/info.controller";

const infoRoute = Router();

infoRoute.get("/data", infoController.Pacotes);

export default infoRoute;
