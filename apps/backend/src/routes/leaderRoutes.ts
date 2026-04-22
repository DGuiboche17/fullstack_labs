import { Router } from "express";
import { createLeader, listLeaders } from "../controllers/leaderController";

export const leaderRouter = Router();

leaderRouter.get("/", listLeaders);
leaderRouter.post("/", createLeader);
