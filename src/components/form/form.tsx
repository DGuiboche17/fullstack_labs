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

  const handleSubmit = (e: React.FormEvent) => {
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

    // delegate creation to the service; it validates and calls the repo
    const result = addEmployee(firstName.value, lastName.value, departmentName.value);

    if (!result.success) {
      // service returned errors; show them on the first name field as a safety net
      firstName.setMessage(result.errors.join(", "));
      return;
    }

    const audio = new Audio('/zelda.mp3'); // I just wanted to see if this would work lol
    audio.play();

    // update the parent with the new departments from the repo
    onEmployeeAdded(result.departments!);
    firstName.reset("");
    lastName.reset("");
    departmentName.reset(departments[0]?.name || "");
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