import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { Container } from "@/components/container";
import { AlbumForm } from "@/components/albums/album-form";
import { AlbumDetails } from "@/components/albums/album-details";

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

  const album = await db.album.findUnique({
    where: {
      id: params?.albumId,
    },
    include: {
      profile: true,
      songs: true,
    },
  });

  if (!album) {
    return redirect("/albums");
  }

  const isOwner = album?.profileId === profile?.id;

  return (
    <Container>
      <AlbumDetails album={album} isOwner={isOwner} />
    </Container>
  );
};

export default AlbumIdPage;
