import type { Request, Response } from "express";
import { addLeader, getLeaders } from "../services/leaderService";

export const listLeaders = async (_request: Request, response: Response): Promise<void> => {
  try {
    response.json(await getLeaders());
  } catch {
    response.status(500).json({ success: false, errors: ["Unable to load leaders"] });
  }
};

export const createLeader = async (request: Request, response: Response): Promise<void> => {
  try {
    const result = await addLeader(request.body);

    if (!result.success) {
      response.status(400).json(result);
      return;
    }

    response.status(201).json(result);
  } catch {
    response.status(500).json({ success: false, errors: ["Unable to create leader"] });
  }
};
