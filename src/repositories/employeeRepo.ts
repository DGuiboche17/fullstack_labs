import type { Department, Employee } from "../types/Department";
import { apiJson } from "./apiClient";

export interface EmployeeResult {
  success: boolean;
  errors: string[];
  departments?: Department[];
}

export const getDepartments = (): Promise<Department[]> => {
  return apiJson<Department[]>("/departments");
};

export const createEmployee = (
  employee: Employee,
  departmentName: string
): Promise<EmployeeResult> => {
  return apiJson<EmployeeResult>("/departments", {
    method: "POST",
    body: JSON.stringify({ ...employee, departmentName }),
    acceptErrorResponse: true,
  });
};
