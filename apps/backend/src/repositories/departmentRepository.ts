import { initialDepartments } from "../data/departments";
import type { Department, Employee } from "../types/Department";

let departments: Department[] = initialDepartments.map((department) => ({
  ...department,
  employees: [...department.employees],
}));

export const getDepartments = (): Department[] => {
  return departments.map((department) => ({
    ...department,
    employees: [...department.employees],
  }));
};

export const departmentExists = (departmentName: string): boolean => {
  return departments.some((department) => department.name === departmentName);
};

export const addEmployeeToDepartment = (departmentName: string, employee: Employee): Department[] => {
  departments = departments.map((department) =>
    department.name === departmentName
      ? { ...department, employees: [...department.employees, employee] }
      : department
  );

  return getDepartments();
};
