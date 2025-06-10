import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import apiRoutes from "./routes/api";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://your-production-domain.com"
        : "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);

// Routes
app.use("/api", apiRoutes);

// Basic health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

