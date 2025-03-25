import { getCommentsData } from '@/db/actions/comments';
import { TComment } from '@/lib/types';
import { AddNewComment, Comment } from '@/app/components';
import { pluralize } from '@/lib/utils';
import { auth } from '@/auth/auth';
import { getReactions } from '@/db/actions/reactions';

const Comments = async ({ postId }: { postId: string }) => {
  const comments = await getCommentsData(postId);
  const totalComments = comments.data.length;
  const session = await auth();

  return (
    <div className="my-12 rounded-2xl border-t-2">
      <h2 className="p-6 text-3xl text-neutral-300">
        {`${totalComments} ${pluralize(totalComments, 'comment', 'comments')}`}
      </h2>
      <AddNewComment
        authorImage={session?.user?.image}
        authorId={session?.user?.id}
        postId={postId}
      />
      {comments.success &&
        comments.data!.map(async (comment: TComment) => {
          const reactions = await getReactions(
            comment.id,
            session?.user?.id as string,
          );
          return (
            <Comment
              data={comment}
              key={comment.id}
              sessionId={session?.user?.id}
              reactions={reactions}
            />
          );
        })}
    </div>
  );
};

export default Comments;
