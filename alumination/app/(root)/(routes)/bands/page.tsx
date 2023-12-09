import { Bands } from "@/components/bands/bands";
import { Container } from "@/components/container";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";

interface BandPageProps {
  searchParams: {
    bandName: string;
  };
}

const BandPage = async ({ searchParams }: BandPageProps) => {
  const profile = await currentProfile();

  const bands = await db.band.findMany({
    where: {
      name: {
        contains: searchParams?.bandName,
      },
    },
    include: {
      profile: true,
    },
  });

  return (
    <Container className="max-w-5xl h-full">
      <Bands bands={bands} profile={profile} />
    </Container>
  );
};

export default BandPage;
