import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import categoriesRoutes from "./routes/categoriesRoute";
import authRoutes from "./routes/authRoutes";
import eventsRoutes from "./routes/eventsRoutes";
import session from "express-session";
import submissionRoutes from "./routes/submissionRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://umurage-delta.vercel.app"
        : [
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:3003",
          ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);
app.use(express.json());

// Routes
app.use("/api/categories", categoriesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/submissions", submissionRoutes);

// Basic health check route
app.get("/health", (req, res) => {
  res.send({ status: "Server is running" });
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
    res.status(500).json({ error: "Something went wrong! " + err.message });
  }
);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
