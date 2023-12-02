import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { Container } from "@/components/container";
import { AlbumForm } from "@/components/albums/album-form";
import { AlbumDetails } from "@/components/albums/album-details";
import { AlbumList } from "@/components/album-list";

interface AlbumIdPageProps {
  params: {
    albumId: string;
  };
}

const AlbumIdPage = async ({ params }: AlbumIdPageProps) => {
  const profile = await currentProfile();

  if (params.albumId === "create") {
    if (!profile) {
      return redirectToSignIn();
    }

    const categories = await db.category.findMany();

    return (
      <Container>
        <AlbumForm categories={categories} />
      </Container>
    );
  }

  const albums = await db.album.findMany({
    where: {
      profileId: profile?.id,
    },
    include: {
      profile: true,
      songs: true,
    },
  });

  const album = albums.find((a) => a.id === params.albumId);

  if (!album) {
    return redirect("/albums");
  }

  const isOwner = album?.profileId === profile?.id;

  return (
    <Container>
      <AlbumDetails album={album} isOwner={isOwner} />
      <AlbumList title="Related albums" data={albums} />
    </Container>
  );
};

export default AlbumIdPage;
