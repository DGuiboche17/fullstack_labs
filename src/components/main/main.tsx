// main is where states are managed and passed down to child components
// this follows the react principle of "lifting state up"

import { useState } from "react";
import { DepartmentSection } from "../department/DepartmentSection";
import { departments as initialDepartments } from "../../data/department";
import type { Department, Employee } from "../../types/Department";
import { Form } from "../form/form"

export const Main = () => {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

  const addEmployee = (employee: Employee, departmentName: string) => { // this will be passed to Form component as a prop
    setDepartments((prev) =>
      prev.map((dept) => // This iterates through each department
        dept.name === departmentName
          ? { ...dept, employees: [...dept.employees, employee] } // this is an if condition; if the department name matches, we create a new department object with the new employee added to the employees array
          : dept // else we just return the department as is
      )
    );
  };

  return ( // this is the main section that shows all departments and the form to add employees
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
