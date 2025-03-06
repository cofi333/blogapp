import { TPost } from "@/lib/types";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const PostTeaser: React.FC<{ data: TPost }> = ({ data }) => {
    return (
        <Link
            href={`/home/article/${data.id}`}
            className="border-2 rounded-lg border-neutral-800 px-6 py-4 hover:cursor-pointer group"
        >
            <h2 className="text-neutral-400 text-2xl group-hover:text-white transition-all duration-150 ease-in line-clamp-1">
                {data.title}
            </h2>
            <div className="flex items-center gap-2 mt-4">
                <Image
                    src={data.authorImage ?? "https://placehold.co/40x40.png"}
                    alt="Author image"
                    width={30}
                    height={30}
                    className="rounded-full"
                />
                <div className="flex justify-between w-full">
                    <span className="text-neutral-500 group-hover:text-white transition-all duration-150 ease-in">
                        {data.authorName}
                    </span>
                    <span className="text-neutral-500 group-hover:text-white transition-all duration-150 ease-in">
                        {new Date(data.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>
            <p className="text-neutral-500 mt-6 group-hover:text-white transition-all duration-150 ease-in line-clamp-4">
                {data.content}
            </p>
        </Link>
    );
};

export default PostTeaser;
