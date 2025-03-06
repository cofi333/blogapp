import { getPosts } from "@/db/actions/posts";
import { TPost, TGetPosts } from "@/lib/types";
import PostTeaser from "./PostTeaser";

const Feed = async ({ query }: TGetPosts) => {
    const posts: TPost[] = await getPosts(query);
    return (
        <div className="grid grid-cols-2 gap-4 my-6">
            {posts.map((post: TPost) => (
                <PostTeaser data={post} key={post.id} />
            ))}
        </div>
    );
};

export default Feed;
