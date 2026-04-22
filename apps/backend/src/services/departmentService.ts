import {
  addEmployeeToDepartment,
  departmentExists,
  getDepartments as getDepartmentsFromRepository,
} from "../repositories/departmentRepository";
import type { Department } from "../types/Department";

interface AddEmployeeRequest {
  firstName?: unknown;
  lastName?: unknown;
  departmentName?: unknown;
}

interface EmployeeServiceResult {
  success: boolean;
  errors: string[];
  departments?: Department[];
}

const isText = (value: unknown): value is string => typeof value === "string";

export const getDepartments = (): Department[] => {
  return getDepartmentsFromRepository();
};

export const addEmployee = (request: AddEmployeeRequest): EmployeeServiceResult => {
  const errors: string[] = [];

  if (!isText(request.firstName) || request.firstName.trim().length < 3) {
    errors.push("First name must be at least 3 characters");
  }

  if (request.lastName !== undefined && !isText(request.lastName)) {
    errors.push("Last name must be text");
  }

  if (!isText(request.departmentName) || request.departmentName.trim().length === 0) {
    errors.push("Please select a department");
  } else if (!departmentExists(request.departmentName)) {
    errors.push("Selected department does not exist");
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  const departments = addEmployeeToDepartment(request.departmentName as string, {
    firstName: (request.firstName as string).trim(),
    lastName: isText(request.lastName) ? request.lastName.trim() : undefined,
  });

  return { success: true, errors: [], departments };
};
