import { getPostsData } from "@/db/actions/posts";
import { TPost, TGetPosts, TPostsResponse } from "@/lib/types";
import PostTeaser from "./PostTeaser";

const Feed = async ({ query }: TGetPosts) => {
    const posts: TPostsResponse = await getPostsData(query);

    if (!posts.success)
        return <p className="text-white mt-12">{posts.message}</p>;

    return (
        <div className="grid grid-cols-2 gap-4 my-6">
            {posts.success &&
                posts.data!.map((post: TPost) => (
                    <PostTeaser data={post} key={post.id} />
                ))}
        </div>
    );
};

export default Feed;
