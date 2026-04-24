import { useEffect, useState, type FormEvent } from "react";
import type { Department } from "../../types/Department";
import { useFormInput } from "../../hooks/useFormInput";
import { addEmployee } from "../../services/employeeService";

interface FormProps {
  onEmployeeAdded: (departments: Department[]) => void;
  departments: Department[];
}   
export const Form = ({ onEmployeeAdded, departments }: FormProps) => {
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const departmentName = useFormInput(departments[0]?.name || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!departmentName.value && departments[0]) {
      departmentName.setValue(departments[0].name);
    }
  }, [departments, departmentName]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // validate each input using the hook's validate method
    const firstNameValid = firstName.validate((val) =>
      val.trim().length < 3 ? "First name must be at least 3 characters" : ""
    );
    const deptValid = departmentName.validate((val) =>
      !val ? "Please select a department" : ""
    );

    if (!firstNameValid || !deptValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      // delegate creation to the service; the back-end validates and calls the repo
      const result = await addEmployee(firstName.value, lastName.value, departmentName.value);

      if (!result.success) {
        firstName.setMessage(result.errors.join(", "));
        return;
      }

      const audio = new Audio('/zelda.mp3'); // I just wanted to see if this would work lol
      audio.play();

      const updatedDepartments = result.departments ?? departments;
      onEmployeeAdded(updatedDepartments);
      firstName.reset("");
      lastName.reset("");
      departmentName.reset(updatedDepartments[0]?.name || "");
    } catch {
      firstName.setMessage("Unable to add employee through the API.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <form id="add-employee-form" onSubmit={handleSubmit}>
      <h2>Add New Employee</h2>
      
      {(firstName.message || departmentName.message) && (
        <div className="error-messages"> 
          <ul>
            {firstName.message && <li>{firstName.message}</li>}
            {departmentName.message && <li>{departmentName.message}</li>}
          </ul>
        </div>
      )}

      <div>
        <label htmlFor="first-name">First Name:</label>
        <input  
          type="text"
          id="first-name"
          value={firstName.value}   
          onChange={(e) => {
            const value = e.target.value;
            const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
            firstName.setValue(capitalizedValue);
          }}
          required
        />  
      </div>

      <div>
        <label htmlFor="last-name">Last Name:</label>
        <input
          type="text"
          id="last-name"
          value={lastName.value}        
          onChange={(e) => {
            const value = e.target.value;
            const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
            lastName.setValue(capitalizedValue);
          }}
        />
      </div>  

      <div>
        <label htmlFor="department">Department:</label> 
        <select
          id="department"
          value={departmentName.value}
          onChange={(e) => departmentName.setValue(e.target.value)} 
          required
        >
          {departments.length === 0 ? (
            <option value="">No departments available</option>
          ) : (
            departments.map((dept) => (
              <option key={dept.name} value={dept.name}>
                {dept.name}
              </option>   
            ))
          )}
        </select>
      </div>

      <button type="submit" disabled={isSubmitting || departments.length === 0}>
        {isSubmitting ? "Adding..." : "Add Employee"}
      </button>
      
    </form>
  );
}
