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

export const getDepartments = (): Promise<Department[]> => {
  return getDepartmentsFromRepository();
};

export const addEmployee = async (request: AddEmployeeRequest): Promise<EmployeeServiceResult> => {
  const errors: string[] = [];
  const departmentName = isText(request.departmentName) ? request.departmentName.trim() : "";

  if (!isText(request.firstName) || request.firstName.trim().length < 3) {
    errors.push("First name must be at least 3 characters");
  }

  if (request.lastName !== undefined && !isText(request.lastName)) {
    errors.push("Last name must be text");
  }

  if (departmentName.length === 0) {
    errors.push("Please select a department");
  } else if (!(await departmentExists(departmentName))) {
    errors.push("Selected department does not exist");
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  const departments = await addEmployeeToDepartment(departmentName, {
    firstName: (request.firstName as string).trim(),
    lastName: isText(request.lastName) ? request.lastName.trim() : undefined,
  });

  return { success: true, errors: [], departments };
};
