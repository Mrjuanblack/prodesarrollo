import { Pool } from "pg";
import dotenv from "dotenv";
import { eq } from "drizzle-orm";
import argon2 from "argon2";
import { users } from "./backend/db/schema";
import * as schema from "./backend/db/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { UserRole } from "./domain/user";

dotenv.config();

const ADMIN_EMAIL = "admin@prodesarrollo.org.co";
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Prdsrrll_2025!";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({ connectionString });
const db = drizzle(pool, { schema });

async function seed() {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, ADMIN_EMAIL));

  if (existingUser.length > 0) {
    console.log(`Admin user ${ADMIN_EMAIL} already exists — skipping.`);
    return;
  }

  const passwordHash = await argon2.hash(ADMIN_PASSWORD);

  await db.insert(users).values({
    username: ADMIN_USERNAME,
    email: ADMIN_EMAIL,
    password: passwordHash,
    role: UserRole.ADMIN,
  });

  console.log(`Admin user ${ADMIN_EMAIL} created.`);
}

seed()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
