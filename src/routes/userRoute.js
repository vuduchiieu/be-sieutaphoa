import { Router } from "express";
import userController from "../controller/userController.js";
import { uploader } from "../utils/uploader.js";

const userRoute = Router();

userRoute.get("/", userController.getUsers);
userRoute.get("/:id", userController.getUser);
userRoute.put("/:id", uploader.single("avatar"), userController.updateUser);
userRoute.delete("/:id", userController.deleteUser);

export default userRoute;
