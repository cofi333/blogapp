"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { TInsertPost } from "@/lib/types";
import { insertPost, revalidatePosts } from "@/db/actions/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { CREATE_POST_SCHEMA } from "@/lib/constants";
import { toast } from "sonner";

const CreatePostForm = ({ userId }: { userId: string }) => {
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
                    className="bg-neutral-800 text-neutral-300 block w-full p-4 text-xl focus-within:outline-none"
                    type="text"
                    {...register("title")}
                    placeholder="Enter a title..."
                />
                <p className="text-red-500 mt-1">{errors["title"]?.message}</p>
            </div>
            <div className="my-4">
                <textarea
                    {...register("content")}
                    className="bg-neutral-800 w-full text-neutral-300 text-xl focus-within:outline-none p-4"
                    placeholder="Enter a content..."
                />
                <p className="text-red-500 mt-1">
                    {errors["content"]?.message}
                </p>
            </div>
            <Button
                type="submit"
                className="block w-1/4 ml-auto"
                variant="green"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Creating..." : "Create"}
            </Button>
        </form>
    );
};

export default CreatePostForm;
