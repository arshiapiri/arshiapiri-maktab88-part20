import express, { Router } from "express";
import EmoployeeRouter from "./Employees";
const router: Router = express.Router();

router.use("/Employees", EmoployeeRouter);

export default router;
