import { Navbar, DeleteModal, Comments, Author } from '@/app/components';
import { auth } from '@/auth/auth';
import { getPostById } from '@/db/actions/posts';
import { TPostPage } from '@/lib/types';

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const post: TPostPage = await getPostById(id);
  const session = await auth();

  if (!post.success) return <p className="mt-12 text-white">{post.message}</p>;

  return (
    <>
      <Navbar isShowedSearch={false} />
      {session?.user?.id === post.data?.authorId && <DeleteModal postId={id} />}
      <h1 className="mt-6 mb-4 text-4xl text-neutral-300">
        {post.data!.title}
      </h1>
      <Author
        authorImage={post.data!.authorImage}
        authorName={post.data!.authorName}
      />
      <p className="my-6 text-lg break-words text-neutral-400">
        {post.data!.content}
      </p>
      <p className="text-right text-lg text-neutral-300">{`Published: ${new Date(
        post.data!.createdAt,
      ).toLocaleDateString()}`}</p>
      <Comments postId={id} />
    </>
  );
};

export default PostPage;
