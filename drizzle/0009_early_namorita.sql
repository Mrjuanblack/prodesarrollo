CREATE TABLE "home_carousel_slides" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image_url" text NOT NULL,
	"left_card_title" text,
	"left_card_description" text,
	"right_card_title" text,
	"right_card_description" text,
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "at_least_one_card" CHECK (("home_carousel_slides"."left_card_title" IS NOT NULL AND "home_carousel_slides"."left_card_description" IS NOT NULL)
        OR ("home_carousel_slides"."right_card_title" IS NOT NULL AND "home_carousel_slides"."right_card_description" IS NOT NULL))
);
