import { CreatePostForm, Navbar } from '@/app/components';
import { auth } from '@/auth/auth';

const CreatePost = async () => {
  const session = await auth();
  return (
    <div>
      <Navbar isShowedSearch={false} />
      <div className="my-12">
        <h2 className="text-4xl text-neutral-300">Create a post</h2>
      </div>
      <CreatePostForm userId={session?.user?.id} />
    </div>
  );
};

export default CreatePost;
