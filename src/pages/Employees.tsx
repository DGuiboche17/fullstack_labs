import { useState } from "react";
import { DepartmentSection } from "../components/department/DepartmentSection";
import { getDepartments } from "../repositories/employeeRepo";
import type { Department } from "../types/Department";
import { Form } from "../components/form/form";


// this is the main component for the Employees page
export const Employees = () => {

  // state is created from a request to the repository
  const [departments, setDepartments] = useState<Department[]>(getDepartments());

  return (
    <main id="employee-directory">
      {departments.map((department) => (
        <DepartmentSection
          key={department.name}
          department={department}
        />
      ))}
      <Form onEmployeeAdded={(depts) => setDepartments(depts)} departments={departments} />
    </main>
  );
};
