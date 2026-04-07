import { departments as initialDepartments } from "../data/department";
import type { Department, Employee } from "../types/Department";

// this is the sole source of truth for department and employee data
// all reads and writes go through here
let departments: Department[] = initialDepartments.map((dept) => ({
  ...dept,
  employees: [...dept.employees],
}));

// returns all departments with their employees
export const getDepartments = (): Department[] => {
  return departments.map((dept) => ({
    ...dept,
    employees: [...dept.employees],
  }));
};

// checks if a department exists by name
export const departmentExists = (departmentName: string): boolean => {
  return departments.some((dept) => dept.name === departmentName);
};

// creates an employee in the specified department and returns the updated departments
export const createEmployee = (employee: Employee, departmentName: string): Department[] => {
  departments = departments.map((dept) =>
    dept.name === departmentName
      ? { ...dept, employees: [...dept.employees, employee] }
      : dept
  );
  return getDepartments();
};
