import { redirectToSignIn } from "@clerk/nextjs";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { Container } from "@/components/container";
import { AlbumFormCreate } from "@/components/albums/album-form-create";

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
        <AlbumFormCreate categories={categories} />
      </Container>
    );
  }

  const album = await db.album.findUnique({
    where: {
      id: params?.albumId,
    },
  });

  return <div></div>;
};

export default AlbumIdPage;
