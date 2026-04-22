import { Router } from "express";
import { createEmployee, listDepartments } from "../controllers/departmentController";

export const departmentRouter = Router();

departmentRouter.get("/", listDepartments);
departmentRouter.post("/", createEmployee);
