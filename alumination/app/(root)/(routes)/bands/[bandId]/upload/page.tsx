import { redirect } from "next/navigation";
import { redirectToSignIn } from "@clerk/nextjs";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { CheckIfMemberBand } from "@/lib/check-member-band";
import { Container } from "@/components/container";
import { BandSongFormCreate } from "@/components/bands/band-song-form";

interface BandIdUploadPageProps {
  params: {
    bandId: string;
  };
}

const BandIdUploadPage = async ({ params }: BandIdUploadPageProps) => {
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
    return redirect(`/bands/${params.bandId}`);
  }

  return (
    <Container>
      <BandSongFormCreate band={band} />
    </Container>
  );
};

export default BandIdUploadPage;
