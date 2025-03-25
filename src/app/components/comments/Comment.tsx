"use client";
import {
    TComment,
    TCommentProps,
    TCommentUpdateData,
    TUpdateCommentPromise,
} from "@/lib/types";
import { DeleteIcon, EditIcon } from "../../assets/icons";
import Image from "next/image";
import { useState } from "react";
import {
    updateCommentById,
    deleteCommentById,
    revalidateComments,
} from "@/db/actions/comments";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { UPDATE_COMMENT_SCHEMA } from "@/lib/constants";
import ReactionButton from "./ReactionButton";

const Comment: React.FC<TCommentProps> = ({ data, sessionId, reactions }) => {
    const { content, authorName, authorImage, id, authorId } = data;

    const isShowedButtons = sessionId === authorId;

    const [update, setUpdate] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            newComment: content,
            id: id,
        },
        resolver: zodResolver(UPDATE_COMMENT_SCHEMA),
    });

    const onUpdate = async (data: TCommentUpdateData) => {
        const response: TUpdateCommentPromise = await updateCommentById(data);
        await revalidateComments();
        if (response.success) setUpdate(false);
        toast.message(response.message);
    };

    const onDelete = async () => {
        const response = await deleteCommentById(id);
        await revalidateComments();

        toast.message(response.message);
    };

    return (
        <div className="px-6 py-4">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <Image
                        src={authorImage ?? "https://placehold.co/40x40.png"}
                        alt="Author image"
                        width={30}
                        height={30}
                        className="rounded-full"
                    />
                    <span className="text-neutral-400 group-hover:text-white transition-all duration-150">
                        {authorName}
                    </span>
                </div>
                {isShowedButtons && (
                    <div className="flex gap-4">
                        <Image
                            src={EditIcon}
                            alt="Edit icon"
                            width={25}
                            height={25}
                            className="max-h-[25px] hover:cursor-pointer hover:opacity-80"
                            onClick={() => {
                                setUpdate((prev) => !prev);
                            }}
                        />
                        <Image
                            src={DeleteIcon}
                            alt="Edit icon"
                            width={25}
                            height={25}
                            className="max-h-[25px] hover:cursor-pointer hover:opacity-80"
                            onClick={onDelete}
                        />
                    </div>
                )}
            </div>
            <div>
                {update ? (
                    <form onSubmit={handleSubmit(onUpdate)}>
                        <textarea
                            {...register("newComment")}
                            className="text-neutral-200 w-full mt-4 p-4 bg-neutral-700"
                            rows={3}
                        />
                        <p className="text-red-500 mt-1 text-sm">
                            {errors["newComment"]?.message}
                        </p>
                        <Button
                            className="text-white mt-4"
                            type="submit"
                            disabled={isSubmitting}
                            variant="green"
                        >
                            {isSubmitting ? "Updating..." : "Update"}
                        </Button>
                    </form>
                ) : (
                    <p className="text-neutral-400 mt-4 break-words">
                        {getValues("newComment")}
                    </p>
                )}
                <div className="mt-6 flex gap-4">
                    <ReactionButton
                        type="like"
                        userId={sessionId!}
                        commentId={id}
                        reactions={reactions}
                    />
                    <ReactionButton
                        type="dislike"
                        userId={sessionId!}
                        commentId={id}
                        reactions={reactions}
                    />
                </div>
            </div>
        </div>
    );
};

export default Comment;
