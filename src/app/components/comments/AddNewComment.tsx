"use client";
import { useForm } from "react-hook-form";
import Author from "../Author";
import { TAddNewCommentData, TAddNewCommentProps } from "@/lib/types";
import { Button } from "../ui/button";
import { useState } from "react";
import { addNewComment, revalidateComments } from "@/db/actions/comments";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { ADD_COMMENT_SCHEMA } from "@/lib/constants";

const AddNewComment = ({
    authorImage,
    postId,
    authorId,
}: TAddNewCommentProps) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);

    const {
        handleSubmit,
        register,
        formState: { isSubmitting, errors },
        watch,
        reset,
    } = useForm<TAddNewCommentData>({
        defaultValues: {
            author: authorId,
            post: postId,
            content: "",
        },
        resolver: zodResolver(ADD_COMMENT_SCHEMA),
    });

    const contentValue = watch("content");

    const onSubmit = async (data: TAddNewCommentData) => {
        const response = await addNewComment(data);
        await revalidateComments();
        reset();
        toast.message(response.message);
    };

    const shouldShowSubmitButton = isFocus || contentValue.trim().length > 0;

    return (
        <div className="my-6 px-4 min-h-[106px]">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3 flex items-center gap-2 justify-center">
                    <Author authorImage={authorImage} />
                    <textarea
                        rows={1}
                        {...register("content")}
                        className="text-neutral-200 w-full p-2 h-full bg-neutral-700 grow resize-none"
                        placeholder="Enter a comment..."
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                    />
                </div>
                <p className="text-red-500 text-sm">
                    {errors["content"]?.message}
                </p>
                {shouldShowSubmitButton && (
                    <Button
                        type="submit"
                        variant="outline"
                        className="ml-auto flex"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                )}
            </form>
        </div>
    );
};

export default AddNewComment;
