import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import dotenv from "dotenv";

dotenv.config();

// Validate DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // Return an error after 10 seconds if connection could not be established
  maxUses: 7500, // Close (and replace) a connection after it has been used 7500 times
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// Add event listeners for better error handling
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  // Don't exit the process immediately, let the application handle it
});

pool.on("connect", () => {
  console.log("New client connected to database");
});

pool.on("remove", () => {
  console.log("Client removed from pool");
});

// Async function to test connection
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to database server");
    client.release();
  } catch (err) {
    console.error("❌ Error connecting to database:", err);
    // Don't throw here, let the application continue
  }
};

// Test connection on startup
testConnection();

const db = drizzle({
  client: pool,
  schema: {
    ...schema,
  },
});

export { db };
