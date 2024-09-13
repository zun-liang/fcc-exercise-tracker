import { Router } from "express";
import { createUser, getUsers } from "../controllers/userController.js";
const userRouter = Router();

userRouter.route("/").post(createUser).get(getUsers);

export default userRouter;
