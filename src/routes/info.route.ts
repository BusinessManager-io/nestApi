import { Router } from "express";
import infoController from "../controllers/info.controller";

const infoRoute = Router();

infoRoute.get("/data", infoController.getInfo);
infoRoute.post("/insertData", infoController.insetInfo);

export default infoRoute;
