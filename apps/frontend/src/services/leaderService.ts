import { createLeader, type LeaderResult } from "../repositories/leaderRepo";

// delegates leader creation to the back-end repository request
export const addLeader = (
  firstName: string,
  lastName: string,
  role: string
): Promise<LeaderResult> => {
  return createLeader({ firstName, lastName, role });
};
