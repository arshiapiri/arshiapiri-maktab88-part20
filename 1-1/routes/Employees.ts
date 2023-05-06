import express, { Router } from "express";
import { requestHandler } from "../middlewares/request.handler";
import {
    getEmployees,
    createEmployees,
    updateEmployeeById,
    deleteEmployee,
    getEmployeeByNationalCode
} from "../controller/Employees";
const EmoployeeRouter: Router = express.Router();

EmoployeeRouter.get("/", requestHandler(getEmployees));
EmoployeeRouter.get("/:nationalCode", requestHandler(getEmployeeByNationalCode));
EmoployeeRouter.post("/", requestHandler(createEmployees));
EmoployeeRouter.put("/:nationalCode", requestHandler(updateEmployeeById));
EmoployeeRouter.delete("/:nationalCode", requestHandler(deleteEmployee));

export default EmoployeeRouter;
