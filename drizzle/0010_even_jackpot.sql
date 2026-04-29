CREATE TYPE "public"."user_role" AS ENUM('admin', 'admin_projects', 'admin_news');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_role" DEFAULT 'admin' NOT NULL;