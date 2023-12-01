import { ArtistDetails } from "@/components/artists/artist-details";
import { Container } from "@/components/container";
import { NoResults } from "@/components/no-results";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";

interface ArtistIdPageProps {
  params: {
    artistId: string;
  };
  searchParams: {
    artistSongName: string;
  };
}

const ArtistIdPage = async ({ params, searchParams }: ArtistIdPageProps) => {
  const profile = await currentProfile();

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
        orderBy: {
          createdAt: "desc",
        },
        include: {
          profile: true,
        },
      },
    },
  });

  const allFollowers = await db.following.findMany({
    where: {
      OR: [{ followeeId: artist?.id }, { followerId: artist?.id }],
    },
  });

  const artistFollowers = allFollowers.filter(
    (follower) => follower.followeeId === artist?.id
  );

  const artistFollowing = allFollowers.filter(
    (follower) => follower.followerId === artist?.id
  );

  if (!artist) {
    return (
      <NoResults src="/not-found.png" title="No artist have been found." />
    );
  }

  const isOwner = artist?.id === profile?.id;
  const isFollowing = allFollowers.some(
    (follower) =>
      follower.followerId === profile?.id && follower.followeeId === artist?.id
  );

  return (
    <Container>
      <ArtistDetails
        profile={artist}
        isOwner={isOwner}
        isFollowing={isFollowing}
        followers={artistFollowers}
        following={artistFollowing}
      />
    </Container>
  );
};

export default ArtistIdPage;
