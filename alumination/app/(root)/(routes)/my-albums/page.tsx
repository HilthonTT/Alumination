import { redirectToSignIn } from "@clerk/nextjs";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { Container } from "@/components/container";
import { MyAlbumsDetails } from "@/components/my-albums/my-albums-details";

interface MyAlbumsPageProps {
  searchParams: {
    myAlbumName: string;
  };
}

const MyAlbumsPage = async ({ searchParams }: MyAlbumsPageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }

  const albums = await db.album.findMany({
    where: {
      profileId: profile?.id,
      title: {
        contains: searchParams.myAlbumName,
      },
    },
    include: {
      profile: true,
      songs: true,
    },
  });

  return (
    <Container>
      <MyAlbumsDetails albums={albums} />
    </Container>
  );
};

export default MyAlbumsPage;
