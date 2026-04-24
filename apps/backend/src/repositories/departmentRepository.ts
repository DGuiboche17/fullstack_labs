import type { Department, Employee } from "../types/Department";
import { prisma } from "../lib/prisma";

interface DepartmentWithEmployees {
  name: string;
  employees: Array<{
    firstName: string;
    lastName: string | null;
  }>;
}

const mapDepartment = (department: DepartmentWithEmployees): Department => {
  return {
    name: department.name,
    employees: department.employees.map((employee) => ({
      firstName: employee.firstName,
      lastName: employee.lastName ?? undefined,
    })),
  };
};

export const getDepartments = async (): Promise<Department[]> => {
  const departments = await prisma.department.findMany({
    orderBy: { id: "asc" },
    include: {
      employees: {
        orderBy: { id: "asc" },
      },
    },
  });

  return departments.map(mapDepartment);
};

export const departmentExists = async (departmentName: string): Promise<boolean> => {
  const department = await prisma.department.findFirst({
    where: {
      name: {
        equals: departmentName,
        mode: "insensitive",
      },
    },
  });

  return department !== null;
};

export const addEmployeeToDepartment = async (
  departmentName: string,
  employee: Employee
): Promise<Department[]> => {
  const department = await prisma.department.findFirstOrThrow({
    where: {
      name: {
        equals: departmentName,
        mode: "insensitive",
      },
    },
  });

  await prisma.employee.create({
    data: {
      firstName: employee.firstName,
      lastName: employee.lastName || null,
      departmentId: department.id,
    },
  });

  return getDepartments();
};
