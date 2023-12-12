import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/prismadb";
import { currentProfile } from "@/lib/current-profile";
import { Container } from "@/components/container";
import { BandRequests } from "@/components/bands/band-requests";

interface BandIdRequestPageProps {
  params: {
    bandId: string;
  };
  searchParams: {
    username: string;
  };
}

const BandIdRequestPage = async ({
  params,
  searchParams,
}: BandIdRequestPageProps) => {
  const profile = await currentProfile();

  if (!profile || !profile?.userId) {
    return redirectToSignIn();
  }

  const band = await db.band.findUnique({
    where: {
      id: params.bandId,
      profileId: profile?.id,
    },
  });

  if (!band) {
    return redirect("/bands");
  }

  const requests = await db.bandRequest.findMany({
    where: {
      bandId: params.bandId,
      profile: {
        username: {
          contains: searchParams.username,
        },
      },
    },
    include: {
      profile: true,
    },
  });

  return (
    <Container>
      <BandRequests requests={requests} band={band} />
    </Container>
  );
};

export default BandIdRequestPage;
