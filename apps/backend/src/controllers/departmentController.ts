import type { Request, Response } from "express";
import { addEmployee, getDepartments } from "../services/departmentService";

export const listDepartments = async (_request: Request, response: Response): Promise<void> => {
  try {
    response.json(await getDepartments());
  } catch {
    response.status(500).json({ success: false, errors: ["Unable to load departments"] });
  }
};

export const createEmployee = async (request: Request, response: Response): Promise<void> => {
  try {
    const result = await addEmployee(request.body);

    if (!result.success) {
      response.status(400).json(result);
      return;
    }

    response.status(201).json(result);
  } catch {
    response.status(500).json({ success: false, errors: ["Unable to create employee"] });
  }
};
