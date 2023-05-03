import Joi from "joi";
import { EmployeeRequest } from "../utils/EmployeeReq";

const employeeRequestSchema = Joi.object({
  fristName: Joi.string().min(3).max(30).required().messages({
    "string.base": `Firstname should be a string`,
    "string.empty": `Firstname cannot be an empty `,
    "string.min": `Firstname should have a minimum length of {#limit}`,
    "string.max": `Firstname should have a maximum length of {#limit}`,
    "any.required": `Firstname is a required field`
  }),
  lastName: Joi.string().min(3).max(30).required().messages({
    "string.base": `Lastname should be a string`,
    "string.empty": `Lastname cannot be an empty `,
    "string.min": `Lastname should have a minimum length of {#limit}`,
    "string.max": `Lastname should have a maximum length of {#limit}`,
    "any.required": `Lastname is a required field`
  }),
  gender: Joi.string()
    .valid("not set", "women", "man")
    .optional()
    .default("not set")
    .messages({
      "string.empty": "Field cannot be empty",
      "any.required": "Field is required",
      "any.only": "Gender must be one of not set, women, or man"
    }),
    DateOfBirth: Joi.date()
    .max('now')
    .min("1900-01-01")
    .iso()
    .required()
    .messages({
      "string.empty": "Field cannot be empty",
      "any.required": "Field is required",
      "date.base": "Invalid date format",
      "date.format": 'Date must be in the format "YYYY-MM-DD"',
      "date.max": "Date of birth cannot be in the future",
      "date.min": "Your date of birth cannot be less than 1900-01-01"
    }),
    nationalCode: Joi.string().length(10)
    .required()
    .messages({
      'string.base': `National code should be a type of 'text'`,
      'string.empty': `National code cannot be an empty field`,
      'string.length': `National code length must be 10 characters`,
      'any.required': `National code is a required field`
    }),
    companyName: Joi.string().min(2).max(40).required().messages({
      "string.base": `Company name should be a type of 'text'`,
      "string.empty": `Company name cannot be an empty field`,
      "string.min": `Company name should have a minimum length of {#limit}`,
      "string.max": `Company name should have a maximum length of {#limit}`,
      "any.required": `Company name is a required field`,
    }),
    roleInCompany: Joi.string()
    .valid("employee", "manager")
    .default("employee")
    .messages({
      "string.base": `Role in company should be a type of 'text'`,
      "any.only": `Role in company should be either 'employee' or 'manager'`,
      "any.default": `Role in company must be either 'employee' or 'manager' and defaults to 'employee'.`,
    }),
});

export const validateEmployee = (
  requestBody: EmployeeRequest): Joi.ValidationResult => {
  return employeeRequestSchema.validate(requestBody);
}

