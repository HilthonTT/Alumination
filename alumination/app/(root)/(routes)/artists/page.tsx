import { Artists } from "@/components/artists/artists";
import { Container } from "@/components/container";
import { db } from "@/lib/prismadb";

interface ArtistsPageProps {
  searchParams: {
    artistName: string;
  };
}

const ArtistsPage = async ({ searchParams }: ArtistsPageProps) => {
  const profiles = await db.profile.findMany({
    where: {
      username: {
        contains: searchParams.artistName,
      },
    },
  });

  return (
    <Container className="max-w-5xl h-full">
      <Artists artists={profiles} />
    </Container>
  );
};

export default ArtistsPage;
