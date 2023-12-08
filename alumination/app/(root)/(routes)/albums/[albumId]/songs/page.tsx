import { redirectToSignIn } from "@clerk/nextjs";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import { AlbumSongDetails } from "@/components/albums/album-song-details";

interface AlbumIdSongsPageProps {
  params: {
    albumId: string;
  };
  searchParams: {
    albumSongName: string;
  };
}

const AlbumIdSongsPage = async ({
  params,
  searchParams,
}: AlbumIdSongsPageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }

  const album = await db.album.findUnique({
    where: {
      id: params.albumId,
    },
    include: {
      songs: {
        where: {
          title: searchParams.albumSongName,
        },
      },
    },
  });

  const isAllowed = profile?.id === album?.profileId;

  if (!isAllowed || !album) {
    return redirect("/albums");
  }

  return (
    <Container>
      <AlbumSongDetails album={album} songs={album.songs} />
    </Container>
  );
};

export default AlbumIdSongsPage;
