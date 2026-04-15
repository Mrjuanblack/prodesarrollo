#!/bin/sh
set -e

echo "Running database migrations..."
npx drizzle-kit migrate
echo "Migrations complete."

echo "Seeding default user (idempotent)..."
npx tsx seed.ts
echo "Seed complete."

echo "Starting Next.js..."
exec node_modules/.bin/next start
