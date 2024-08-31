ALTER TABLE "users_table" RENAME COLUMN "name" TO "user_name";--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "users_table" ADD CONSTRAINT "users_table_user_id_unique" UNIQUE("user_id");