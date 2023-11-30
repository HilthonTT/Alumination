import { db } from "@/lib/prismadb";
import { Songs } from "@/components/songs";
import { Categories } from "@/components/categories";
import { Container } from "@/components/container";
import { NavigationArrows } from "@/components/navigation-arrow";

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
      <Container className="max-w-5xl h-full">
        <NavigationArrows />
        <Categories data={categories} />
        <Songs data={songs} />
      </Container>
    </div>
  );
};

export default HomePage;
