import express, { Router } from "express";
import { requestHandler } from "../middlewares/request.handler";
import { UpdateUser, createUser, getUsers } from "../controller/users";
const userRouter: Router = express.Router();

userRouter.get("/", requestHandler(getUsers));
userRouter.post("/", requestHandler(createUser));
userRouter.put("/:id", requestHandler(UpdateUser));
userRouter.delete("/", requestHandler(getUsers));

export default userRouter;
