CREATE TABLE "dev_likes_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"count" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "dev_likes_table" ADD CONSTRAINT "dev_likes_table_user_id_dev_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."dev_users_table"("id") ON DELETE cascade ON UPDATE no action;