import { Pool } from "pg";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/neon-http";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

const isDev = process.env.NODE_ENV === "development";
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

let db:
  | NeonHttpDatabase<typeof schema>
  | (NodePgDatabase<typeof schema> & { $client: Pool });

if (isDev) {
  // Use pg driver for local PostgreSQL
  const pool = new Pool({
    connectionString: connectionString,
  });
  db = drizzlePg(pool, { schema });
} else {
  db = drizzle(connectionString, { schema });
}

export { db };
