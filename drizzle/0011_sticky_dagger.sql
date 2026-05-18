CREATE TABLE "news_inline_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"news_id" uuid,
	"image_url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "news_inline_images_image_url_unique" UNIQUE("image_url")
);
--> statement-breakpoint
ALTER TABLE "news_inline_images" ADD CONSTRAINT "news_inline_images_news_id_news_id_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;