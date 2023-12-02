import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Container } from "@/components/container";
import { currentProfile } from "@/lib/current-profile";
import { AlbumForm } from "@/components/albums/album-form";
import { db } from "@/lib/prismadb";

interface AlbumIdUpdatePageProps {
  params: {
    albumId: string;
  };
}

const AlbumIdUpdatePage = async ({ params }: AlbumIdUpdatePageProps) => {
  const profile = await currentProfile();

  if (!profile || !profile?.userId) {
    return redirectToSignIn();
  }

  const categories = await db.category.findMany();

  const album = await db.album.findUnique({
    where: {
      id: params.albumId,
      profileId: profile.id,
    },
  });

  if (!album) {
    return redirect("/albums");
  }

  return (
    <Container>
      <AlbumForm categories={categories} initialData={album} />
    </Container>
  );
};

export default AlbumIdUpdatePage;
