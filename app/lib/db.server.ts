import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import { env } from "~/env";

const client = postgres(env.DATABASE_URL);
const needsMigrations = false && env.NODE_ENV == "development";
let db: null | PostgresJsDatabase = null;

export const getDB = async (): Promise<PostgresJsDatabase> => {
  if (db == null) {
    db = drizzle(client);
    if (needsMigrations) {
      console.log("Running migrations.");
      await migrate(db, { migrationsFolder: "./migrations" });
    }
  }
  return db;
};
