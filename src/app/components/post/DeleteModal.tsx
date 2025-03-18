"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/components/ui/dialog";
import DeleteButton from "../DeleteButton";
import { Button } from "../ui/button";
import { deletePost, revalidatePosts } from "@/db/actions/posts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DeleteModal = ({ postId }: { postId: string }) => {
    const router = useRouter();

    const handleDelete = async () => {
        const response = await deletePost(postId);
        await revalidatePosts();
        if (response.success) {
            router.push("/home");
            toast(response.message);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild className="mt-6">
                <Button variant="destructive">Delete</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete the article</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to delete the article?
                </DialogDescription>
                <DialogFooter>
                    <form action={handleDelete}>
                        <DeleteButton />
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteModal;
