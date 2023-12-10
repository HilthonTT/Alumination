import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { Container } from "@/components/container";
import { BandSongsDetails } from "@/components/bands/band-songs-details";
import { CheckIfMemberBand } from "@/lib/check-member-band";

interface BandIdSongsPageProps {
  params: {
    bandId: string;
  };
}

const BandIdSongsPage = async ({ params }: BandIdSongsPageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }

  const band = await db.band.findUnique({
    where: {
      id: params.bandId,
    },
    include: {
      songs: true,
      members: true,
    },
  });

  if (!band) {
    return redirect("/bands");
  }

  const isAllowed = CheckIfMemberBand(band, profile);
  if (!isAllowed) {
    return redirect(`/bands/${band?.id}`);
  }

  return (
    <Container>
      <BandSongsDetails band={band} />
    </Container>
  );
};

export default BandIdSongsPage;
