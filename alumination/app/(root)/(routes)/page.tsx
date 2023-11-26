import { db } from "@/lib/prismadb";
import { Songs } from "@/components/songs";
import { Categories } from "@/components/categories";

interface HomePageProps {
  searchParams: {
    categoryId: string;
  };
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const songs = await db.song.findMany({
    where: {
      categoryId: searchParams.categoryId,
    },
    include: {
      profile: true,
    },
  });

  const categories = await db.category.findMany();

  return (
    <div className="h-full w-full flex">
      <div className="max-w-5xl mx-auto h-full">
        <Categories data={categories} />
        <Songs data={songs} />
      </div>
    </div>
  );
};

export default HomePage;
