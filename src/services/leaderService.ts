import { roleOccupied, createLeader } from "../repositories/leaderRepo";
import type { Leadership } from "../types/Leader";

interface ServiceResult {
  success: boolean;
  errors: string[];
  leaders?: Leadership[];
}

// validates and attempts to create a leader
// returns a result indicating success/failure and any validation errors
export const addLeader = (
  firstName: string,
  lastName: string,
  role: string
): ServiceResult => {
  const errors: string[] = [];

  // validate that first name has at least 3 characters
  if (firstName.trim().length < 3) {
    errors.push("First name must be at least 3 characters");
  }

  // validate that the role is not already occupied
  if (roleOccupied(role)) {
    errors.push("Role is already occupied");
  }

  // if validation failed, return the errors
  if (errors.length > 0) {
    return { success: false, errors };
  }

  // validation passed / create the leader through the repo
  const updatedLeaders = createLeader({ firstName, lastName, role });
  return { success: true, errors: [], leaders: updatedLeaders };
};
