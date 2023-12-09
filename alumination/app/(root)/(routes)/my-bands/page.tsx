import { redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/prismadb";
import { currentProfile } from "@/lib/current-profile";
import { Container } from "@/components/container";
import { MyBandsDetails } from "@/components/my-bands/my-bands-details";
import { checkSubscription } from "@/lib/check-subscription";

interface MyBandsPageProps {
  searchParams: {
    myBandName: string;
  };
}

const MyBandsPage = async ({ searchParams }: MyBandsPageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }

  const isPro = await checkSubscription();

  const bands = await db.band.findMany({
    where: {
      name: {
        contains: searchParams.myBandName,
      },
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <Container>
      <MyBandsDetails bands={bands} isPro={isPro} />
    </Container>
  );
};

export default MyBandsPage;
