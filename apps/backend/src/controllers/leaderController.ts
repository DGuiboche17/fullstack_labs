import type { Request, Response } from "express";
import { addLeader, getLeaders } from "../services/leaderService";

export const listLeaders = (_request: Request, response: Response): void => {
  response.json(getLeaders());
};

export const createLeader = (request: Request, response: Response): void => {
  const result = addLeader(request.body);

  if (!result.success) {
    response.status(400).json(result);
    return;
  }

  response.status(201).json(result);
};
