import { db } from "@/lib/prismadb";
import { ArtistDetails } from "@/components/artists/artist-details";
import { Container } from "@/components/container";
import { NoResults } from "@/components/no-results";

interface ArtistIdPageProps {
  params: {
    artistId: string;
  };
  searchParams: {
    artistSongName: string;
  };
}

const ArtistIdPage = async ({ params, searchParams }: ArtistIdPageProps) => {
  const artist = await db.profile.findUnique({
    where: {
      id: params.artistId,
    },
    include: {
      songs: {
        where: {
          title: {
            search: searchParams.artistSongName,
          },
        },
        include: {
          profile: true,
        },
      },
    },
  });

  if (!artist) {
    return (
      <NoResults src="/not-found.png" title="No artist have been found." />
    );
  }

  return (
    <Container>
      <ArtistDetails profile={artist} />
    </Container>
  );
};

export default ArtistIdPage;
