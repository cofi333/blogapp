import { getPostsData } from '@/db/actions/posts';
import { TPost, TGetPosts, TPostsResponse } from '@/lib/types';
import PostTeaser from './post/PostTeaser';

const Feed = async ({ query }: TGetPosts) => {
  const posts: TPostsResponse = await getPostsData(query);

  if (!posts.success)
    return <p className="mt-12 text-white">{posts.message}</p>;

  return (
    <div className="my-6 grid grid-cols-2 gap-4">
      {posts.success &&
        posts.data!.map((post: TPost) => (
          <PostTeaser data={post} key={post.id} />
        ))}
    </div>
  );
};

export default Feed;
