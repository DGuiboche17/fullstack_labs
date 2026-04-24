import type { Department } from "../../types/Department"; 

interface Props {
  department: Department;
}
export const DepartmentSection = ({ department }: Props) => {
  return (
    <section>
      <h2>{department.name}</h2>
      <ul>
        {department.employees.map((employee, index) => (
          <li key={index}>
            {employee.lastName
              ? `${employee.firstName} ${employee.lastName}` // if no last name, just show first name basically.
              : employee.firstName}
          </li>
        ))}
      </ul>
    </section>
  );
};
