'use client';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { TInsertPost } from '@/lib/types';
import { insertPost, revalidatePosts } from '@/db/actions/posts';
import { zodResolver } from '@hookform/resolvers/zod';
import { CREATE_POST_SCHEMA } from '@/lib/constants';
import { toast } from 'sonner';

const CreatePostForm = ({ userId }: { userId?: string }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TInsertPost>({
    resolver: zodResolver(CREATE_POST_SCHEMA),
    defaultValues: {
      authorId: userId,
    },
  });

  const onSubmit = async (data: TInsertPost) => {
    const response = await insertPost(data);
    await revalidatePosts();
    toast(response.message);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-4">
        <input
          className="block w-full bg-neutral-800 p-4 text-xl text-neutral-300 focus-within:outline-none"
          type="text"
          {...register('title')}
          placeholder="Enter a title..."
        />
        <p className="mt-1 text-red-500">{errors['title']?.message}</p>
      </div>
      <div className="my-4">
        <textarea
          {...register('content')}
          className="w-full bg-neutral-800 p-4 text-xl text-neutral-300 focus-within:outline-none"
          placeholder="Enter a content..."
        />
        <p className="mt-1 text-red-500">{errors['content']?.message}</p>
      </div>
      <Button
        type="submit"
        className="ml-auto block w-1/4"
        variant="green"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating...' : 'Create'}
      </Button>
    </form>
  );
};

export default CreatePostForm;
