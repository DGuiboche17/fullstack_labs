import { useState } from "react";
import type { Department, Employee } from "../../types/Department";

interface FormProps {
  addEmployee: (employee: Employee, departmentName: string) => void;
  departments: Department[];
}   
export const Form = ({ addEmployee, departments }: FormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [departmentName, setDepartmentName] = useState(departments[0]?.name || "");
  const [errors, setErrors] = useState<string[]>( []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    // validates first name
    if (firstName.trim().length < 3) { // trim removes whitespace from both ends of a string; this is helpful if user accidentally adds spaces before or after their input
      newErrors.push("First name must be at least 3 characters");
    }

    // now we will see if a department is selected
    if (!departmentName) {
      newErrors.push("Please select a department");
    }

    // this is to check if there are any errors like first name less than 3 characters or no department selected
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }


    const audio = new Audio('/zelda.mp3'); // I just wanted to see if this would work lol
    audio.play();

    // Clear errors and add employee
    setErrors([]);
    addEmployee({ firstName, lastName }, departmentName);
    setFirstName("");
    setLastName("");
    setDepartmentName(departments[0]?.name || "");
  };


  return (
    <form id="add-employee-form" onSubmit={handleSubmit}>
      <h2>Add New Employee</h2>
      
      {errors.length > 0 && ( // if there are errors, we show this block
        <div className="error-messages"> 
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label htmlFor="first-name">First Name:</label>
        <input  
          type="text"
          id="first-name"
          value={firstName}   
          onChange={(e) => { // e is the event object
            const value = e.target.value; // is the current value of the input field
            const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1); // this capitalizes the first letter of the value and then adds the rest of the string; slice starting at 1 because the first index is the uppercase we are changing
            setFirstName(capitalizedValue); // now we take what we changed and set it to first name
          }}
          required
        />  
      </div>

      <div>
        <label htmlFor="last-name">Last Name:</label>
        <input
          type="text"
          id="last-name"
          value={lastName}        
          onChange={(e) => { // e is the event object
            const value = e.target.value; // is the current value of the input field
            const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1); // this capitalizes the first letter of the value and then adds the rest of the string; slice starting at 1 because the first index is the uppercase we are changing
            setLastName(capitalizedValue); // now we take what we changed and set it to last name
          }}
        />
      </div>  

      <div>
        <label htmlFor="department">Department:</label> 
        <select
          id="department"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)} 
          required
        >
          {departments.map((dept) => (
            <option key={dept.name} value={dept.name}>
              {dept.name}
            </option>   
          ))}
        </select>
      </div>

      <button type="submit">Add Employee</button>
      
    </form>
  );
}