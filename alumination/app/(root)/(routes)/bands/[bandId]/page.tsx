import { redirectToSignIn } from "@clerk/nextjs";

import { BandForm } from "@/components/bands/band-form";
import { Container } from "@/components/container";
import { currentProfile } from "@/lib/current-profile";

interface BandIdPageProps {
  params: {
    bandId: string;
  };
}

const BandIdPage = async ({ params }: BandIdPageProps) => {
  const profile = currentProfile();

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

  return <div></div>;
};

export default BandIdPage;
