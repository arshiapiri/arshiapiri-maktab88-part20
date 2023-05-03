import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
  RequestHandler,
} from "express";
import  AppError  from "../utils/AppError";

export const notFoundErrorHandler: RequestHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(new AppError(
    "We're sorry, the requested employee could not be found.", "Not Found", 404));
};

export const badRequest = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(new AppError(
    "Bad request. Please ensure that all required fields are filled in correctly and try again.", "fail", 400));
};

export const errorHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(new AppError(
    "Sorry, we encountered an unexpected error while processing your request. Our team has been notified and we are working to resolve the issue as soon as possible. Please try again later.", "error", 500));
};
