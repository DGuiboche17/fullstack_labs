import type { Leadership } from "../../types/Leader";
import { useFormInput } from "../../hooks/useFormInput";
import { addLeader } from "../../services/leaderService";

interface LeaderFormProps {
  onLeaderAdded: (leaders: Leadership[]) => void;
}

export const LeaderForm = ({ onLeaderAdded }: LeaderFormProps) => {
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const role = useFormInput("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validate each input using the hook's validate method; same as employee form
    const firstNameValid = firstName.validate((val) =>
      val.trim().length < 3 ? "First name must be at least 3 characters" : ""
    );
    const roleValid = role.validate((val) =>
      !val ? "Please enter a role" : ""
    );

    if (!firstNameValid || !roleValid) {
      return;
    }

    // delegate creation to the service; it validates and calls the repo
    const result = addLeader(firstName.value, lastName.value, role.value);

    if (!result.success) {
      // service returned errors; show them on the first name field as a safety net
      firstName.setMessage(result.errors.join(", "));
      return;
    }

    const audio = new Audio('/zelda.mp3'); // after validation, zelda shall play
    audio.play();

    // update the parent with the new leaders from the repo
    onLeaderAdded(result.leaders!);
    firstName.reset("");
    lastName.reset("");
    role.reset("");
  };

  return (
    <form id="add-employee-form" onSubmit={handleSubmit}>
      <h2>Add New Leader/Role</h2>
      {(firstName.message || role.message) && (
        <div className="error-messages">
          <ul>
            {firstName.message && <li>{firstName.message}</li>}
            {role.message && <li>{role.message}</li>}
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
        <label htmlFor="role">Role:</label>
        <input
          type="text"
          id="role"
          value={role.value}
          onChange={(e) => role.setValue(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Leader/Role</button>
    </form>
  );
};
