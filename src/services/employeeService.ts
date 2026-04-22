import { createEmployee, type EmployeeResult } from "../repositories/employeeRepo";

// delegates employee creation to the back-end repository request
export const addEmployee = (
  firstName: string,
  lastName: string,
  departmentName: string
): Promise<EmployeeResult> => {
  return createEmployee({ firstName, lastName }, departmentName);
};
