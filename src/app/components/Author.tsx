import Image from "next/image";
import { TAuthorProps } from "@/lib/types";

const Author = ({ authorImage, authorName }: TAuthorProps) => {
    return (
        <div className="flex gap-2 items-center">
            <Image
                src={authorImage ?? "https://placehold.co/40x40.png"}
                alt="Author image"
                width={30}
                height={30}
                className="rounded-full"
            />
            <span className="text-neutral-400 group-hover:text-white transition-all duration-150">
                {authorName ?? ""}
            </span>
        </div>
    );
};

export default Author;
