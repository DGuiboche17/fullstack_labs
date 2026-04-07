import { useState } from "react";

// custom hook that manages the value and error message for a single form input
export const useFormInput = (initialValue: string = "") => {
  const [value, setValue] = useState(initialValue);
  const [message, setMessage] = useState("");

  // takes a validation callback that receives the current value
  const validate = (validationFn: (val: string) => string): boolean => {
    const error = validationFn(value);
    setMessage(error);
    return error === "";
  };

  // resets both value and message
  const reset = (resetValue: string = "") => {
    setValue(resetValue);
    setMessage("");
  };

  return { value, setValue, message, setMessage, validate, reset };
};
