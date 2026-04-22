import type { Request, Response } from "express";
import { addEmployee, getDepartments } from "../services/departmentService";

export const listDepartments = (_request: Request, response: Response): void => {
  response.json(getDepartments());
};

export const createEmployee = (request: Request, response: Response): void => {
  const result = addEmployee(request.body);

  if (!result.success) {
    response.status(400).json(result);
    return;
  }

  response.status(201).json(result);
};
