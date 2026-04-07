import type { Leadership } from "../types/Leader";
import { leadership } from "../data/leadership";

// this is the sole source of truth for leadership data
// all reads and writes go through here
let leaders: Leadership[] = leadership.map((l) => ({ ...l }));

// returns all leaders
export const getLeaders = (): Leadership[] => {
  return leaders.map((l) => ({ ...l }));
};

// checks if a role is already occupied
export const roleOccupied = (role: string): boolean => {
  return leaders.some((l) => l.role.toLowerCase() === role.toLowerCase());
};

// creates a leader and returns the updated list
export const createLeader = (leader: Leadership): Leadership[] => {
  leaders = [...leaders, leader];
  return getLeaders();
};
