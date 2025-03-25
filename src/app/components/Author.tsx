import Image from 'next/image';
import { TAuthorProps } from '@/lib/types';

const Author = ({ authorImage, authorName }: TAuthorProps) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={authorImage ?? 'https://placehold.co/40x40.png'}
        alt="Author image"
        width={30}
        height={30}
        className="rounded-full"
      />
      <span className="text-neutral-400 transition-all duration-150 group-hover:text-white">
        {authorName ?? ''}
      </span>
    </div>
  );
};

export default Author;
