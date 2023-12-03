import { Albums } from "@/components/albums/albums";
import { Container } from "@/components/container";

import { db } from "@/lib/prismadb";

interface AlbumsPage {
  searchParams: {
    categoryId: string;
    albumTitle: string;
  };
}

const AlbumsPage = async ({ searchParams }: AlbumsPage) => {
  const albums = await db.album.findMany({
    where: {
      categoryId: searchParams.categoryId,
      title: {
        contains: searchParams.albumTitle,
      },
    },
    include: {
      profile: true,
      songs: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categories = await db.category.findMany();

  return (
    <Container className="max-w-5xl h-full">
      <Albums albums={albums} categories={categories} />
    </Container>
  );
};

export default AlbumsPage;
