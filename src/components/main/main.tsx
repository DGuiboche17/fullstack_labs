import { DepartmentSection } from "../department/DepartmentSection";
import { departments } from "../../data/department";

export const Main = () => {
  return (
    <main id="employee-directory">
      {departments.map((department) => (
        <DepartmentSection
          key={department.name}   // unique key for each component
          department={department} // pass the data as a prop
        />
      ))}
    </main>
  );
};
