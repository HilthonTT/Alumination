import { redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/prismadb";
import { currentProfile } from "@/lib/current-profile";

import { SongDetails } from "@/components/songs/song-details";
import { SongFormCreate } from "@/components/songs/song-form-create";
import { SongList } from "@/components/songs/song-list";
import { Container } from "@/components/container";
import { NoResults } from "@/components/no-results";
import { PageHeader } from "@/components/page-header";

interface SongIdPageProps {
  params: {
    songId: string;
  };
}

const SongIdPage = async ({ params }: SongIdPageProps) => {
  const profile = await currentProfile();

  if (params.songId === "create") {
    if (!profile) {
      return redirectToSignIn();
    }

    const categories = await db.category.findMany();

    return (
      <Container>
        <SongFormCreate categories={categories} />
      </Container>
    );
  }

  const song = await db.song.findUnique({
    where: {
      id: params.songId,
    },
    include: {
      profile: true,
    },
  });

  const relatedSongs = await db.song.findMany({
    where: {
      profileId: song?.profile?.id,
    },
    include: {
      profile: true,
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!song) {
    return <NoResults src="/not-found.png" title="No song have been found." />;
  }

  const isOwner = profile?.id === song?.profile.id;

  return (
    <Container>
      <PageHeader title={song?.title} />
      <SongDetails data={song} isOwner={isOwner} />
      <SongList data={relatedSongs} title="Related songs" />
    </Container>
  );
};

export default SongIdPage;
