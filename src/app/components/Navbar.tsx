import { auth } from "@/auth/auth";
import Image from "next/image";
import { SearchPosts } from "@/app/components";

const Navbar = async ({
    query,
    isShowedSearch,
}: {
    query?: string;
    isShowedSearch: boolean;
}) => {
    const session = await auth();

    return (
        <div className="bg-neutral-800 rounded-2xl p-6 flex justify-between">
            <div>{isShowedSearch && <SearchPosts query={query || ""} />}</div>
            <div className="flex justify-center items-center gap-4">
                <span className="text-white text-xl">
                    {session?.user?.name}
                </span>
                <Image
                    src={
                        session?.user?.image || "https://placehold.co/40x40.png"
                    }
                    alt="User image"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
            </div>
        </div>
    );
};

export default Navbar;
