ALTER TABLE "projects" ADD COLUMN "cost" bigint NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "final_date" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "client_entity" text NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "signature_date" timestamp with time zone NOT NULL;