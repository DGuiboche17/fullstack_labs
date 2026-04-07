import { departmentExists, createEmployee } from "../repositories/employeeRepo";
import type { Department } from "../types/Department";

interface ServiceResult {
  success: boolean;
  errors: string[];
  departments?: Department[];
}

// validates and attempts to create an employee
// returns a result indicating success/failure and any validation errors
export const addEmployee = (
  firstName: string,
  lastName: string,
  departmentName: string
): ServiceResult => {
  const errors: string[] = [];

  // validate that first name has at least 3 characters
  if (firstName.trim().length < 3) {
    errors.push("First name must be at least 3 characters");
  }

  // validate that the department exists
  if (!departmentExists(departmentName)) {
    errors.push("Selected department does not exist");
  }

  // if validation failed, return the errors
  if (errors.length > 0) {
    return { success: false, errors };
  }

  // validation passed / create the employee through the repo
  const updatedDepartments = createEmployee({ firstName, lastName }, departmentName);
  return { success: true, errors: [], departments: updatedDepartments };
};
