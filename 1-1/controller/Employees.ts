import { employee } from "../models/employee";
import { Request, Response, NextFunction } from "express";
import { EmployeeRequest } from "../utils/EmployeeReq";
import { badRequest, notFoundErrorHandler } from "../middlewares/error.handler";
import { validateEmployee } from "../validator/checkEmployee";
import AppError from "../utils/AppError";

export const getEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getEmployees = await employee.find({}).select("-__v");
    res.status(200).send(getEmployees)
  } catch (error) {
    next(badRequest);
  }
};

export const getEmployeeByNationalCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
try {
  const getId = req.params.nationalCode
  const getEmployees = await employee.findOne({nationalCode:getId})
  res.send(getEmployees);
} catch (error) {
  next(notFoundErrorHandler);
}
}
export const createEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestBody : EmployeeRequest= req.body;
    const { error } = validateEmployee(requestBody);
    if (!!error) {
      return res.status(400).send(error.details[0].message);
    }
    const existingEmployee = await employee.exists({
      nationalCode: requestBody.nationalCode,
    });
    if (!!existingEmployee) {
      return res.status(400).send("National ID number is already registered. Please use a different ID number or contact our support team for assistance.");
    }
    const newEmployee = new employee(requestBody); 
    await newEmployee.save();
    res.status(201).send(newEmployee);   
  } catch (error) {
   next(badRequest)
  }
}

export const updateEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
try {
  const requestBody : EmployeeRequest = req.body;
  const { error } = validateEmployee(requestBody);
  if (!!error) {
    return res.status(400).send(error.details[0].message);
  }
  if(req.params.nationalCode != requestBody.nationalCode) {
    return res.status(400).send("National ID number cannot be updated. Please contact our support team if you need to correct your ID number.")
  }
  const updating = await employee.findOneAndUpdate(
    { nationalCode: req.params.nationalCode },
    requestBody,
    {
      new: true,
    }
  );
  res.send(updating);
  res.status(200).send(updating);
} catch (error) {
  next(badRequest)
}
}


export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
try {
 const deleteEmployee =  await employee.findOneAndDelete({
    nationalCode: req.params.nationalCode
  })
  return res.send(deleteEmployee)
} catch (error) { 
  next(badRequest)
}
}




