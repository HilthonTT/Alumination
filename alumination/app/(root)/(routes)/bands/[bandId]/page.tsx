import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { BandForm } from "@/components/bands/band-form";
import { Container } from "@/components/container";
import { BandDetails } from "@/components/bands/band-details";

interface BandIdPageProps {
  params: {
    bandId: string;
  };
}

const BandIdPage = async ({ params }: BandIdPageProps) => {
  const profile = await currentProfile();

  if (params.bandId === "create") {
    if (!profile) {
      return redirectToSignIn();
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
    },
  });

  if (!band) {
    return redirect("/bands");
  }

  return (
    <Container>
      <BandDetails band={band} profile={profile} />
    </Container>
  );
};

export default BandIdPage;
