"use client";

import { Band } from "@prisma/client";

import { NoResults } from "@/components/no-results";
import { SearchInput } from "@/components/search-input";
import { BandCard } from "@/components/bands/band-card";

interface ArtistBandsProps {
  bands: Band[];
}

export const ArtistBands = ({ bands }: ArtistBandsProps) => {
  return (
    <div className="w-full">
      <SearchInput parameter="artistBandName" />
      {bands?.length === 0 && (
        <NoResults src="/empty-box.png" title="No bands have been found." />
      )}
      <div className="gap-2 grid md:grid-cols-3 grid-cols-4">
        {bands?.map((band) => (
          <BandCard key={band.id} band={band} showProfile={false} />
        ))}
      </div>
    </div>
  );
};
