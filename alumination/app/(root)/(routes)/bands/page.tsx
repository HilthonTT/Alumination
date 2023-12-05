import { Bands } from "@/components/bands/bands";
import { Container } from "@/components/container";
import { db } from "@/lib/prismadb";

interface BandPageProps {
  searchParams: {
    bandName: string;
  };
}

const BandPage = async ({ searchParams }: BandPageProps) => {
  const bands = await db.band.findMany({
    where: {
      name: {
        contains: searchParams?.bandName,
      },
    },
  });

  return (
    <Container className="max-w-5xl h-full">
      <Bands bands={bands} />
    </Container>
  );
};

export default BandPage;
