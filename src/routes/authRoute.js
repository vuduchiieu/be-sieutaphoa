import { Router } from "express";
import authController from "../controller/authController.js";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/", authController.getUsers);

export default authRouter;
