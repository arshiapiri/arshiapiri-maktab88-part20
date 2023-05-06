import express, { Express } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import router from "./routes/index";
import { badRequest, errorHandler, notFoundErrorHandler } from "./middlewares/error.handler";
import   mongoose  from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/HW20")
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch(() => {
     console.log("mongoDB Not Connect!");
  });

const app: Express = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use("/", router);
app.use(notFoundErrorHandler);
app.use(errorHandler)
app.use(badRequest)

export default app;
