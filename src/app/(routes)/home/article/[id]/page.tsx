import { Navbar, DeleteModal, Comments, Author } from "@/app/components";
import { auth } from "@/auth/auth";
import { getPostById } from "@/db/actions/posts";
import { TPostPage } from "@/lib/types";

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const post: TPostPage = await getPostById(id);
    const session = await auth();

    if (!post.success)
        return <p className="text-white mt-12">{post.message}</p>;

    return (
        <>
            <Navbar isShowedSearch={false} />
            {session?.user?.id === post.data!.authorId && (
                <DeleteModal postId={id} />
            )}
            <h1 className="text-neutral-300 text-4xl mt-6 mb-4">
                {post.data!.title}
            </h1>
            <Author
                authorImage={post.data!.authorImage}
                authorName={post.data!.authorName}
            />
            <p className="text-neutral-400 my-6 text-lg">
                {post.data!.content}
            </p>
            <p className="text-neutral-300 text-lg text-right">{`Published: ${new Date(
                post.data!.createdAt
            ).toLocaleDateString()}`}</p>
            <Comments postId={id} />
        </>
    );
};

export default PostPage;
