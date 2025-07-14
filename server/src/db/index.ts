import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
  maxUses: 7500, // Close (and replace) a connection after it has been used 7500 times
});

// Add event listeners for better error handling
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

pool.on("connect", () => {
  console.log("New client connected to database");
});

pool.on("remove", () => {
  console.log("Client removed from pool");
});

// test connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err);
  }
  release();
  console.log("Connected to database server");
});

const db = drizzle({
  client: pool,
  schema: {
    ...schema,
  },
});

export { db };
