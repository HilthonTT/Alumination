import { redirectToSignIn } from "@clerk/nextjs";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";

import { Container } from "@/components/container";
import { MySongsDetails } from "@/components/my-songs/my-songs-details";

const MySongsPage = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const songs = await db.song.findMany({
    where: {
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  return (
    <Container>
      <MySongsDetails songs={songs} />
    </Container>
  );
};

export default MySongsPage;
