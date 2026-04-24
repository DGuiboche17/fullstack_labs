import { useEffect, useState } from "react";
import { DepartmentSection } from "../components/department/DepartmentSection";
import { getDepartments } from "../repositories/employeeRepo";
import type { Department } from "../types/Department";
import { Form } from "../components/form/form";


// this is the main component for the Employees page
export const Employees = () => {

  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getDepartments()
      .then((loadedDepartments) => {
        if (isMounted) {
          setDepartments(loadedDepartments);
          setLoadError("");
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoadError("Unable to load employees from the API.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main id="employee-directory">
      {loadError && <div className="error-messages">{loadError}</div>}
      {isLoading ? (
        <p>Loading employees...</p>
      ) : (
        departments.map((department) => (
          <DepartmentSection
            key={department.name}
            department={department}
          />
        ))
      )}
      <Form onEmployeeAdded={(depts) => setDepartments(depts)} departments={departments} />
    </main>
  );
};
