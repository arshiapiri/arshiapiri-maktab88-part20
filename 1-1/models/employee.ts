import  { Date, Document, Schema, model } from "mongoose";
import { isDate } from "util/types";

export interface EmployeeDocument extends Document {
    fristName: String;
    lastName: String;
    gender?: "women" | "man" | "not set";
    DateOfBirth: Date;
    nationalCode: String;
    companyName: String;
    roleInCompany?: "employee" | "manager"
}

const EmployeeSchema = new Schema<EmployeeDocument>({
    fristName: {
        type: String,
        required: [true, "fristName is required"],
        minlength: [3, "fristName must be equal or more than 3 characters"],
        maxlength: [30, "fristName must be equal or less than 30 characters"],
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: [true, "lastName is required"],
        minlength: [3, "lastName must be equal or more than 3 characters"],
        maxlength: [30, "lastName must be equal or less than 30 characters"],
        trim: true,
        lowercase: true
    },
    gender: {
        type: String,
        enum: {
            values: ["not set", "man", "women"],
            message: "Invalid gender ({VALUE}): gender is eather man or women"
        },
        default: "not set",
        trim: true,
        lowercase: true
    },
    DateOfBirth: {
        type: Date,
        required: [true, "DateOfBirth is required"],
        validate: {
            validator: (value: Date) => isDate(value),
            message: "provide valid dateOfBirth"
        }
    },
    nationalCode: {
        type: String,
        required: [true, "nationalCode is required"],
        unique: true,
        minlength: [10, "nationalCode length must be 10 characters"],
        maxlength: [10, "nationalCode length must be 10 characters"],
        trim: true
    },
    companyName: {
        type: String,
        required: [true, "companyName is required"],
        minlength: [2, "companyName must be equal or more than 2 characters"],
        maxlength: [40, "companyName must be equal or less than 40 characters"]
    },
    roleInCompany: {
        type: String,
        enum: {
            values: ["employee", "manager"],
            message: "invalid role ({VALUE}) : role is eather employee or manager"
        },
        default: "employee",
        trim: true
    }
},
    {
        timestamps: {
            createdAt: "registrationDate",
            updatedAt: "updateAt"
        }
    }
);


export const employee =  model<EmployeeDocument>("employee", EmployeeSchema)

