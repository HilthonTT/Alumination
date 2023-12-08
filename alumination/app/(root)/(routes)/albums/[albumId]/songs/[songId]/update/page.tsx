import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";

import { Container } from "@/components/container";
import { AlbumSongFormUpdate } from "@/components/albums/album-song-form.update";

interface AlbumIdSongIdUpdatePageProps {
  params: {
    albumId: string;
    songId: string;
  };
}

const AlbumIdSongIdUpdatePage = async ({
  params,
}: AlbumIdSongIdUpdatePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const album = await db.album.findUnique({
    where: {
      id: params.albumId,
    },
  });

  const song = await db.albumSong.findUnique({
    where: {
      id: params.songId,
    },
  });

  if (!album || !song) {
    return redirect("/albums");
  }

  const isAllowed = album?.profileId === profile?.id;
  if (!isAllowed) {
    return redirect(`/albums/${album?.id}`);
  }

  return (
    <Container>
      <AlbumSongFormUpdate album={album} initialData={song} />
    </Container>
  );
};

export default AlbumIdSongIdUpdatePage;
