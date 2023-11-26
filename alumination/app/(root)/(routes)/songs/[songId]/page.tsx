import { redirectToSignIn } from "@clerk/nextjs";

import { SongDetails } from "@/components/songs/song-details";
import { SongFormCreate } from "@/components/songs/song-form-create";
import { db } from "@/lib/prismadb";
import { currentProfile } from "@/lib/current-profile";
import { SongList } from "@/components/song-list";

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

    return <SongFormCreate categories={categories} />;
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
  });

  const isOwner = profile?.id === song?.profile.id;

  return (
    <div className="max-w-3xl mx-auto">
      <SongDetails data={song} isOwner={isOwner} />
      <SongList data={relatedSongs} title="Related songs" />
    </div>
  );
};

export default SongIdPage;
