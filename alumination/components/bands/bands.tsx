"use client";

import { Band } from "@prisma/client";
import { Headphones } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { NoResults } from "@/components/no-results";
import { BandCard } from "@/components/bands/band-card";

interface BandsProps {
  bands: Band[];
}

export const Bands = ({ bands }: BandsProps) => {
  return (
    <>
      <PageHeader title="Bands" icon={Headphones} />

      {bands.length === 0 && (
        <NoResults src="/empty-box.png" title="No bands have been found." />
      )}

      <div className="gap-2 pb-10 grid grid-cols-4">
        {bands.map((band) => (
          <BandCard key={band.id} band={band} />
        ))}
      </div>
    </>
  );
};
