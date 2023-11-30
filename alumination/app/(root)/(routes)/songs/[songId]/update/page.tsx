import { redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/prismadb";
import { currentProfile } from "@/lib/current-profile";
import { SongFormUpdate } from "@/components/songs/song-form-update";
import { Container } from "@/components/container";

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

  return (
    <Container>
      <SongFormUpdate categories={categories} initialData={song!} />
    </Container>
  );
};

export default SongIdUpdatePage;
