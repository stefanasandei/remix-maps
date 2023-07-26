import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./app/lib/schema.server.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    ssl: false,
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
