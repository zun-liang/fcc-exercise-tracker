import { Router } from "express";
import { createExercise } from "../controllers/exerciseController.js";
const exerciseRouter = Router();

exerciseRouter.route("/exercises").post(createExercise);
exerciseRouter.route("/logs").get();

export default exerciseRouter;
