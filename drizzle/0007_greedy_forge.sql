ALTER TABLE "news_photos" DROP CONSTRAINT "news_photos_news_id_news_id_fk";
--> statement-breakpoint
ALTER TABLE "project_documents" DROP CONSTRAINT "project_documents_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "project_photos" DROP CONSTRAINT "project_photos_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_to_projects" DROP CONSTRAINT "projects_to_projects_project_one_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_to_projects" DROP CONSTRAINT "projects_to_projects_project_two_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "news_photos" ADD CONSTRAINT "news_photos_news_id_news_id_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_documents" ADD CONSTRAINT "project_documents_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_photos" ADD CONSTRAINT "project_photos_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_to_projects" ADD CONSTRAINT "projects_to_projects_project_one_id_projects_id_fk" FOREIGN KEY ("project_one_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_to_projects" ADD CONSTRAINT "projects_to_projects_project_two_id_projects_id_fk" FOREIGN KEY ("project_two_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;