import { useState } from "react";
import { DepartmentSection } from "../components/department/DepartmentSection";
import { departments as initialDepartments } from "../data/department";
import type { Department, Employee } from "../types/Department";
import { Form } from "../components/form/form";


// this is the main component for the Employees page
export const Employees = () => {

  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

    // this will hold the state of the departments and their employees
  const addEmployee = (employee: Employee, departmentName: string) => {
    setDepartments((prev) => 
      prev.map((dept) =>
        dept.name === departmentName
          ? { ...dept, employees: [...dept.employees, employee] } // ... means spread operator; it takes all existing employees and adds new one
          : dept
      )
    );
  };

  return (
    <main id="employee-directory">
      {departments.map((department) => (
        <DepartmentSection
          key={department.name}
          department={department}
        />
      ))}
      <Form addEmployee={addEmployee} departments={departments} />
    </main>
  );
};
