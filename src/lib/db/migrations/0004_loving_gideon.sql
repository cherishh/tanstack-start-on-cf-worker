ALTER TABLE "dev_likes_table" DROP CONSTRAINT "dev_likes_table_user_id_dev_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "dev_likes_table" DROP COLUMN "user_id";