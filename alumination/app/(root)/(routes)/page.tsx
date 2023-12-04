import { db } from "@/lib/prismadb";
import { Songs } from "@/components/songs/songs";
import { Container } from "@/components/container";

interface HomePageProps {
  searchParams: {
    categoryId: string;
    songTitle: string;
  };
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const songs = await db.song.findMany({
    where: {
      categoryId: searchParams.categoryId,
      title: {
        contains: searchParams.songTitle,
      },
    },
    include: {
      profile: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categories = await db.category.findMany();

  return (
    <Container className="max-w-5xl h-full">
      <Songs data={songs} categories={categories} />
    </Container>
  );
};

export default HomePage;
