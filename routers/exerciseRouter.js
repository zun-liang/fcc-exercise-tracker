import { Router } from "express";
import { createExercise, getLogs } from "../controllers/exerciseController.js";
const exerciseRouter = Router();

exerciseRouter.route("/exercises").post(createExercise);
exerciseRouter.route("/logs").get(getLogs);

export default exerciseRouter;
