export interface EmployeeRequest {
    fristName: String;
    lastName: String;
    gender?: "women" | "man" | "not set";
    DateOfBirth: Date;
    nationalCode: String;
    companyName: String;
    roleInCompany?: "employee" | "manager"
}