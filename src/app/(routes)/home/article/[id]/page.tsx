import { Navbar, DeleteModal } from "@/app/components";
import { auth } from "@/auth/auth";
import { getPostById } from "@/db/actions/posts";
import { TPostsResponse } from "@/lib/types";
import Image from "next/image";

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const post: TPostsResponse = await getPostById(id);
    const session = await auth();

    if (!post.success)
        return <p className="text-white mt-12">{post.message}</p>;

    return (
        <>
            <Navbar isShowedSearch={false} />
            {session?.user?.id === post.data![0].authorId && (
                <DeleteModal postId={id} />
            )}
            <h1 className="text-neutral-300 text-4xl mt-6">
                {post.data![0].title}
            </h1>
            <div className="flex gap-2 items-center mt-4">
                <Image
                    src={
                        post.data![0].authorImage ??
                        "https://placehold.co/40x40.png"
                    }
                    alt="Author image"
                    width={30}
                    height={30}
                    className="rounded-full"
                />
                <span className="text-neutral-300">
                    {post.data![0].authorName}
                </span>
            </div>
            <p className="text-neutral-400 my-6 text-lg">
                {post.data![0].content}
            </p>
            <p className="text-neutral-300 text-lg text-right">{`Published: ${new Date(
                post.data![0].createdAt
            ).toLocaleDateString()}`}</p>
        </>
    );
};

export default PostPage;
