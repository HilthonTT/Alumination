import { redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/prismadb";
import { currentProfile } from "@/lib/current-profile";
import { SongFormUpdate } from "@/components/songs/song-form-update";

interface SongIdUpdatePageProps {
  params: {
    songId: string;
  };
}

const SongIdUpdatePage = async ({ params }: SongIdUpdatePageProps) => {
  const profile = await currentProfile();

  if (!profile || !profile?.userId) {
    return redirectToSignIn();
  }

  const categories = await db.category.findMany();

  const song = await db.song.findFirst({
    where: {
      id: params.songId,
      profileId: profile.id,
    },
  });

  return <SongFormUpdate categories={categories} initialData={song!} />;
};

export default SongIdUpdatePage;
