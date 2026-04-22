import { initialLeaders } from "../data/leaders";
import type { Leadership } from "../types/Leader";

let leaders: Leadership[] = initialLeaders.map((leader) => ({ ...leader }));

export const getLeaders = (): Leadership[] => {
  return leaders.map((leader) => ({ ...leader }));
};

export const roleOccupied = (role: string): boolean => {
  return leaders.some((leader) => leader.role.toLowerCase() === role.toLowerCase());
};

export const addLeader = (leader: Leadership): Leadership[] => {
  leaders = [...leaders, leader];
  return getLeaders();
};
