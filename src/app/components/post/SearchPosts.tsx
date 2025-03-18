import Form from "next/form";
import Image from "next/image";
import { SearchIcon } from "../../assets/icons";

const SearchPosts = ({ query }: { query: string }) => {
    return (
        <Form
            action="/home"
            scroll={false}
            className="flex items-center justify-center"
        >
            <input
                name="query"
                type="text"
                className="bg-white rounded-tl-3xl rounded-bl-3xl px-4 py-2 min-h-[41px] focus-visible:outline-none"
                defaultValue={query}
                placeholder="Search a post..."
            />
            <button
                type="submit"
                className="hover:cursor-pointer p-2 pr-3  bg-white rounded-tr-3xl rounded-br-3xl hover:opacity-90 transition-all ease-in duration-150"
            >
                <Image
                    src={SearchIcon}
                    alt="Search icon"
                    width={25}
                    height={25}
                />
            </button>
        </Form>
    );
};

export default SearchPosts;
