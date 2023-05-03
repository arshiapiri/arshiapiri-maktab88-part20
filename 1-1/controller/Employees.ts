import { employee } from "../models/employee";
import { Request, Response, NextFunction } from "express";
import { badRequest, notFoundErrorHandler } from "../middlewares/error.handler";
import { EmployeeRequest } from "../utils/EmployeeReq";
import { validateEmployee } from "../validator/checkEmployee";

export const getEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getEmployees = await employee.find({})
    res.status(200).send(getEmployees)
  } catch (error) {
    next(notFoundErrorHandler);
  }
};

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
    const newEmployee = new employee(requestBody); 
    await newEmployee.save();
    res.status(201).send(newEmployee);   
  } catch (error) {
    console.log(error);
    
    
  }
}

// export function updateEmployeeById(id: number, username: string): void {
//   const user = users.findIndex(user => user.id === id);
//   if (user) {
//     users[user].username = username;
//   }
// }
// export const UpdateEmployee: RequestHandler = (
//   req: Request,
//   res: Response
// ): void => {
//   updateEmployeeById(+req.params.id, req.body.username)
//   res.send(users)
// }

