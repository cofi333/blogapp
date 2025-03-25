import { TPost } from '@/lib/types';
import React from 'react';
import Link from 'next/link';
import Author from '../Author';

const PostTeaser: React.FC<{ data: TPost }> = ({ data }) => {
  return (
    <Link
      href={`/home/article/${data.id}`}
      className="group rounded-lg border-2 border-neutral-800 px-6 py-4 hover:cursor-pointer"
    >
      <h2 className="line-clamp-1 text-2xl text-neutral-400 transition-all duration-150 ease-in group-hover:text-white">
        {data.title}
      </h2>
      <div className="mt-4 flex w-full items-center justify-between gap-2">
        <Author authorImage={data.authorImage} authorName={data.authorName} />
        <span className="text-neutral-500 transition-all duration-150 ease-in group-hover:text-white">
          {new Date(data.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="mt-6 line-clamp-4 break-words text-neutral-500 transition-all duration-150 ease-in group-hover:text-white">
        {data.content}
      </p>
    </Link>
  );
};

export default PostTeaser;
