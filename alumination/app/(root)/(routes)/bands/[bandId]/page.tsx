import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { checkSubscription } from "@/lib/check-subscription";
import { BandForm } from "@/components/bands/band-form";
import { Container } from "@/components/container";
import { BandDetails } from "@/components/bands/band-details";
import { BandList } from "@/components/bands/band-list";

interface BandIdPageProps {
  params: {
    bandId: string;
  };
}

const BandIdPage = async ({ params }: BandIdPageProps) => {
  const profile = await currentProfile();
  const isPro = await checkSubscription();

  if (params.bandId === "create") {
    if (!profile) {
      return redirectToSignIn();
    }

    if (!isPro) {
      return redirect("/bands");
    }

    return (
      <Container>
        <BandForm />
      </Container>
    );
  }

  const band = await db.band.findUnique({
    where: {
      id: params.bandId,
    },
    include: {
      members: {
        include: {
          profile: true,
        },
      },
      songs: true,
    },
  });

  if (!band) {
    return redirect("/bands");
  }

  const bands = await db.band.findMany({
    take: 3,
    include: {
      profile: true,
    },
  });

  return (
    <Container>
      <BandDetails band={band} profile={profile} />
      <BandList data={bands} title="Other bands" />
    </Container>
  );
};

export default BandIdPage;
