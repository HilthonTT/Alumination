import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { Container } from "@/components/container";
import { AlbumSongFormCreate } from "@/components/albums/album-song-form";

interface AlbumsSongsCreatePageProps {
  params: {
    albumId: string;
  };
}

const AlbumsSongsCreatePage = async ({
  params,
}: AlbumsSongsCreatePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const album = await db.album.findUnique({
    where: {
      id: params?.albumId,
      profileId: profile?.id,
    },
  });

  if (!album) {
    return redirect(`/albums`);
  }

  return (
    <Container>
      <AlbumSongFormCreate album={album} />
    </Container>
  );
};

export default AlbumsSongsCreatePage;
