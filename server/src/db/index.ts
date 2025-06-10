import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
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
