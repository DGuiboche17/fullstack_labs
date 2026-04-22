import {
  addLeader as addLeaderToRepository,
  getLeaders as getLeadersFromRepository,
  roleOccupied,
} from "../repositories/leaderRepository";
import type { Leadership } from "../types/Leader";

interface AddLeaderRequest {
  firstName?: unknown;
  lastName?: unknown;
  role?: unknown;
}

interface LeaderServiceResult {
  success: boolean;
  errors: string[];
  leaders?: Leadership[];
}

const isText = (value: unknown): value is string => typeof value === "string";

export const getLeaders = (): Leadership[] => {
  return getLeadersFromRepository();
};

export const addLeader = (request: AddLeaderRequest): LeaderServiceResult => {
  const errors: string[] = [];

  if (!isText(request.firstName) || request.firstName.trim().length < 3) {
    errors.push("First name must be at least 3 characters");
  }

  if (request.lastName !== undefined && !isText(request.lastName)) {
    errors.push("Last name must be text");
  }

  if (!isText(request.role) || request.role.trim().length === 0) {
    errors.push("Please enter a role");
  } else if (roleOccupied(request.role)) {
    errors.push("Role is already occupied");
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  const leaders = addLeaderToRepository({
    firstName: (request.firstName as string).trim(),
    lastName: isText(request.lastName) ? request.lastName.trim() : "",
    role: (request.role as string).trim(),
  });

  return { success: true, errors: [], leaders };
};
