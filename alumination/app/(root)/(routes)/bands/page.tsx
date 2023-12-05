import { Bands } from "@/components/bands/bands";
import { Container } from "@/components/container";
import { db } from "@/lib/prismadb";

const BandPage = async () => {
  const bands = await db.band.findMany();

  return (
    <Container className="max-w-5xl h-full">
      <Bands bands={bands} />
    </Container>
  );
};

export default BandPage;
