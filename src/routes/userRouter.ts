import { Router } from "express";
import auth from "../middleware/auth";
import { getUsers, login, register } from "../controller/user";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/users", auth, getUsers);

export default userRouter;