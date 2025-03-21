import { getCommentsData } from "@/db/actions/comments";
import { TComment } from "@/lib/types";
import { AddNewComment, Comment } from "@/app/components";
import { pluralize } from "@/lib/utils";
import { auth } from "@/auth/auth";

const Comments = async ({ postId }: { postId: string }) => {
    const comments = await getCommentsData(postId);
    const totalComments = comments.data.length;
    const session = await auth();

    return (
        <div className="border-t-2 my-12 rounded-2xl">
            <h2 className="text-neutral-300 text-3xl p-6">
                {`${totalComments} ${pluralize(
                    totalComments,
                    "comment",
                    "comments"
                )}`}
            </h2>
            <AddNewComment
                authorImage={session?.user?.image}
                authorId={session?.user?.id}
                postId={postId}
            />
            {comments.success &&
                comments.data!.map((comment: TComment) => (
                    <Comment
                        data={comment}
                        key={comment.id}
                        sessionId={session?.user?.id}
                    />
                ))}
        </div>
    );
};

export default Comments;
