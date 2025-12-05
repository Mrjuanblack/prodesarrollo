import dotenv from "dotenv";
dotenv.config();

import { users } from "./backend/db/schema";
import { eq } from "drizzle-orm";
import { Pool } from "pg";
import * as schema from "./backend/db/schema";
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

async function seed() {
    // Check if default user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, "informacion.prodesarrollo@gmail.com"));

    if (existingUser.length > 0) {
        console.log("Default user already exists");
        return;
    }

    // Create default user
    await db.insert(users).values({
        username: "admin",
        email: "informacion.prodesarrollo@gmail.com",
        password: "$argon2id$v=19$m=19456,t=2,p=1$XiwPR9t2WRyP9WrbAjfAdg$9XLZLrMo5B21VcfIizEYcz+SZztetxGGXeNVvguSnbY",
    });

    console.log("Default user created");
}

seed().catch(console.error);