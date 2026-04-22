import type { Leadership } from "../types/Leader";
import { apiJson } from "./apiClient";

export interface LeaderResult {
  success: boolean;
  errors: string[];
  leaders?: Leadership[];
}

export const getLeaders = (): Promise<Leadership[]> => {
  return apiJson<Leadership[]>("/leaders");
};

export const createLeader = (leader: Leadership): Promise<LeaderResult> => {
  return apiJson<LeaderResult>("/leaders", {
    method: "POST",
    body: JSON.stringify(leader),
    acceptErrorResponse: true,
  });
};
