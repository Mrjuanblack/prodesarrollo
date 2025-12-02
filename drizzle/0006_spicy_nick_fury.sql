CREATE TYPE "public"."donations_type" AS ENUM('economica', 'en especie', 'servicios o mano de obra', 'otra');--> statement-breakpoint
CREATE TYPE "public"."ids_type" AS ENUM('cc', 'ti', 'ce', 'pa');--> statement-breakpoint
CREATE TYPE "public"."persons_type" AS ENUM('natural', 'juridica');--> statement-breakpoint
CREATE TABLE "donations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"fullName" text NOT NULL,
	"idNumber" text NOT NULL,
	"idType" "ids_type" NOT NULL,
	"anonymousDonation" text NOT NULL,
	"personType" "persons_type" NOT NULL,
	"donatioType" "donations_type" NOT NULL,
	"description" text,
	"donateValue" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
