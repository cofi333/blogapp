import { TPost } from "@/lib/types";
import React from "react";
import Link from "next/link";
import Author from "../Author";

const PostTeaser: React.FC<{ data: TPost }> = ({ data }) => {
    return (
        <Link
            href={`/home/article/${data.id}`}
            className="border-2 rounded-lg border-neutral-800 px-6 py-4 hover:cursor-pointer group"
        >
            <h2 className="text-neutral-400 text-2xl group-hover:text-white transition-all duration-150 ease-in line-clamp-1">
                {data.title}
            </h2>
            <div className="flex items-center gap-2 justify-between w-full mt-4">
                <Author
                    authorImage={data.authorImage}
                    authorName={data.authorName}
                />
                <span className="text-neutral-500 group-hover:text-white transition-all duration-150 ease-in">
                    {new Date(data.createdAt).toLocaleDateString()}
                </span>
            </div>
            <p className="text-neutral-500 mt-6 group-hover:text-white transition-all duration-150 ease-in line-clamp-4 break-words">
                {data.content}
            </p>
        </Link>
    );
};

export default PostTeaser;
