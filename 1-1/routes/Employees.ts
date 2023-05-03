import express, { Router } from "express";
import { requestHandler } from "../middlewares/request.handler";
import {  getEmployees , createEmployees } from "../controller/Employees";
const EmoployeeRouter: Router = express.Router();

EmoployeeRouter.get("/", requestHandler(getEmployees));
EmoployeeRouter.post("/", requestHandler(createEmployees));
// EmoployeeRouter.put("/:id", requestHandler(UpdateEmployee));
EmoployeeRouter.delete("/", requestHandler(getEmployees));

export default EmoployeeRouter;
