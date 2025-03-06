import { Navbar } from "@/app/components";
import DeleteButton from "@/app/components/DeleteButton";
import { deletePost, getPostById } from "@/db/actions/posts";
import { TPost } from "@/lib/types";
import Image from "next/image";

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const data: TPost[] = await getPostById(id);

    const handleDelete = async () => {
        "use server";
        await deletePost(id);
    };

    return (
        <>
            <Navbar isShowedSearch={false} />
            <form action={handleDelete}>
                <DeleteButton />
            </form>
            <h1 className="text-neutral-300 text-4xl mt-6">{data[0].title}</h1>
            <div className="flex gap-2 items-center mt-4">
                <Image
                    src={
                        data[0].authorImage ?? "https://placehold.co/40x40.png"
                    }
                    alt="Author image"
                    width={30}
                    height={30}
                    className="rounded-full"
                />
                <span className="text-neutral-300">{data[0].authorName}</span>
            </div>
            <p className="text-neutral-400 my-12 text-lg">{data[0].content}</p>
            <p className="text-neutral-300 text-lg text-right">{`Published: ${new Date(
                data[0].createdAt
            ).toLocaleDateString()}`}</p>
        </>
    );
};

export default PostPage;
