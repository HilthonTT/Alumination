import { Albums } from "@/components/albums/albums";
import { Container } from "@/components/container";
import { db } from "@/lib/prismadb";

const AlbumsPage = async () => {
  const albums = await db.album.findMany({
    include: {
      profile: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Container className="max-w-5xl h-full">
      <Albums albums={albums} />
    </Container>
  );
};

export default AlbumsPage;
