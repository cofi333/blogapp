ALTER TABLE "reactions" RENAME COLUMN "postId" TO "commentId";--> statement-breakpoint
ALTER TABLE "reactions" DROP CONSTRAINT "reactions_postId_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_commentId_comments_id_fk" FOREIGN KEY ("commentId") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;