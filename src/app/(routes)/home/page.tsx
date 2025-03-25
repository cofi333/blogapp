import { Feed, Navbar } from '@/app/components';

const HomePage = async ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) => {
  const query = (await searchParams!).query ?? '';

  return (
    <div>
      <Navbar query={query} isShowedSearch={true} />
      <Feed query={query} />
    </div>
  );
};

export default HomePage;
