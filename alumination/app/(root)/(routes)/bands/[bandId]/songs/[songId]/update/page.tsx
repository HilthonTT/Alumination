import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { CheckIfMemberBand } from "@/lib/check-member-band";
import { Container } from "@/components/container";
import { BandSongFormUpdate } from "@/components/bands/band-song-form-update";

interface BandsIdSongsIdUpdatePageProps {
  params: {
    bandId: string;
    songId: string;
  };
}

const BandsIdSongsIdUpdatePage = async ({
  params,
}: BandsIdSongsIdUpdatePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const band = await db.band.findUnique({
    where: {
      id: params.bandId,
    },
    include: {
      members: true,
    },
  });

  if (!band) {
    return redirect("/bands");
  }

  const isAllowed = CheckIfMemberBand(band, profile);
  if (!isAllowed) {
    return redirect(`/bands/${params?.bandId}`);
  }

  const song = await db.bandSong.findUnique({
    where: {
      id: params.songId,
    },
  });

  if (!song) {
    return redirect(`/bands/${params?.bandId}`);
  }

  return (
    <Container>
      <BandSongFormUpdate band={band} initialData={song} />
    </Container>
  );
};

export default BandsIdSongsIdUpdatePage;
