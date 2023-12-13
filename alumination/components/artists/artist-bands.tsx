"use client";

import { Band } from "@prisma/client";

import { NoResults } from "@/components/no-results";
import { SearchInput } from "@/components/search-input";
import { BandCard } from "@/components/bands/band-card";
import { DisplayContainer } from "@/components/display-container";

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
      <DisplayContainer>
        {bands?.map((band) => (
          <BandCard
            key={band.id}
            band={band}
            showProfile={false}
            className="bg-zinc-100 dark:bg-slate-700 dark:hover:bg-slate-600"
          />
        ))}
      </DisplayContainer>
    </div>
  );
};
