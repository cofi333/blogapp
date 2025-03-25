import { auth } from '@/auth/auth';
import Image from 'next/image';
import { NavigationLink, SearchPosts } from '@/app/components';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/ui/popover';
import { NAVIGATION_LINKS } from '@/lib/constants';
import { TNavigationLink } from '@/lib/types';
import BackButton from './BackButton';

const Navbar = async ({
  query,
  isShowedSearch,
}: {
  query?: string;
  isShowedSearch: boolean;
}) => {
  const session = await auth();

  return (
    <div className="flex items-center justify-between rounded-2xl bg-neutral-800 p-6">
      <div>
        {isShowedSearch ? <SearchPosts query={query || ''} /> : <BackButton />}
      </div>
      <div className="flex items-center justify-center gap-4">
        <Popover>
          <PopoverTrigger className="flex items-center gap-4 hover:cursor-pointer">
            <span className="text-xl text-white">{session?.user?.name}</span>
            <Image
              src={session?.user?.image || 'https://placehold.co/40x40.png'}
              alt="User image"
              width={40}
              height={40}
              className="rounded-full"
            />
          </PopoverTrigger>
          <PopoverContent sideOffset={25}>
            {NAVIGATION_LINKS.map((item: TNavigationLink) => (
              <NavigationLink data={item} key={item.id} />
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
