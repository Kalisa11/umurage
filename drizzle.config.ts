// import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import * as schema from "./src/db/schema";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  config: {
    schema: {
      ...schema,
    },
  },
});
