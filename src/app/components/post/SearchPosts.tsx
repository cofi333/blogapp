import Form from 'next/form';
import Image from 'next/image';
import { SearchIcon } from '../../assets/icons';

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
        className="min-h-[41px] rounded-tl-3xl rounded-bl-3xl bg-white px-4 py-2 focus-visible:outline-none"
        defaultValue={query}
        placeholder="Search a post..."
      />
      <button
        type="submit"
        className="rounded-tr-3xl rounded-br-3xl bg-white p-2 pr-3 transition-all duration-150 ease-in hover:cursor-pointer hover:opacity-90"
      >
        <Image src={SearchIcon} alt="Search icon" width={25} height={25} />
      </button>
    </Form>
  );
};

export default SearchPosts;
