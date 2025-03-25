"use client";
import { LikeButton } from "@/app/assets/icons";
import { Button } from "../ui/button";
import Image from "next/image";
import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";
import { TGetReactions, TReactionButtonProps } from "@/lib/types";

const ReactionButton = ({
    type,
    userId,
    reactions,
    commentId,
}: TReactionButtonProps) => {
    const [likes, setLikes] = useState<number>(reactions.data?.likes || 0);
    const [dislikes, setDislikes] = useState<number>(
        reactions.data?.dislikes || 0
    );
    const [isReacted, setIsReacted] = useState<number | null>(
        reactions.data?.isReacted ?? null
    );

    const isLiked = isReacted === 1 && type === "like";
    const isDisliked = isReacted === 0 && type === "dislike";

    const onSubmit = async () => {
        socket.emit("reaction", {
            type: type,
            userId: userId,
            commentId: commentId,
        });
    };

    useEffect(() => {
        socket.on("reaction-server", (response: TGetReactions) => {
            if (response?.data?.commentId === commentId) {
                setLikes(response.data.likes);
                setDislikes(response.data.dislikes);
                setIsReacted(response.data.isReacted);
            }
        });
    }, []);

    return (
        <Button
            variant="default"
            onClick={onSubmit}
            className={`${
                isLiked ? "bg-blue-800" : isDisliked ? "bg-red-800" : ""
            } p-2`}
        >
            <span className="text-md">
                {type === "like" ? likes : dislikes}
            </span>
            <Image
                src={LikeButton}
                alt="Reaction button"
                width={20}
                height={20}
                className={type === "dislike" ? `rotate-180` : ""}
            />
        </Button>
    );
};

export default ReactionButton;
