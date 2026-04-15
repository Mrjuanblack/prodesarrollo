import { Pool } from "pg";
import dotenv from "dotenv";
import { eq } from "drizzle-orm";
import { users } from "./backend/db/schema";
import * as schema from "./backend/db/schema";
import { drizzle } from "drizzle-orm/node-postgres";

dotenv.config();

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
    .where(eq(users.email, "informacion.prodesarrollo@gmail.com"));

  if (existingUser.length > 0) {
    console.log("Default user already exists");
    return;
  }

  await db.insert(users).values({
    username: "admin",
    email: "informacion.prodesarrollo@gmail.com",
    password:
      "$argon2id$v=19$m=19456,t=2,p=1$XiwPR9t2WRyP9WrbAjfAdg$9XLZLrMo5B21VcfIizEYcz+SZztetxGGXeNVvguSnbY",
  });

  console.log("Default user created");
}

seed()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
