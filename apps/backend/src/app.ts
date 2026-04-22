import cors from "cors";
import express from "express";
import { departmentRouter } from "./routes/departmentRoutes";
import { leaderRouter } from "./routes/leaderRoutes";

const allowedOrigins = (process.env.FRONTEND_ORIGINS ?? "http://localhost:5173,http://127.0.0.1:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin is not allowed by CORS"));
    },
  })
);

app.use(express.json());

app.use("/api/departments", departmentRouter);
app.use("/api/leaders", leaderRouter);
