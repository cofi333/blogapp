ALTER TABLE "reactions" DROP CONSTRAINT "reactions_postId_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_postId_posts_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;