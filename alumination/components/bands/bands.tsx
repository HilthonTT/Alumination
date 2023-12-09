"use client";

import { Band, Profile } from "@prisma/client";
import { Headphones } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { NoResults } from "@/components/no-results";
import { BandCard } from "@/components/bands/band-card";
import { SearchInput } from "@/components/search-input";
import { BandWithProfile } from "@/types";

interface BandsProps {
  bands: BandWithProfile[];
  profile?: Profile | null;
}

export const Bands = ({ bands, profile }: BandsProps) => {
  return (
    <>
      <PageHeader title="Bands" icon={Headphones} />
      <SearchInput parameter="bandName" />

      {bands.length === 0 && (
        <NoResults src="/empty-box.png" title="No bands have been found." />
      )}

      <div className="gap-2 pb-10 grid grid-cols-4">
        {bands.map((band) => (
          <BandCard key={band.id} band={band} profile={profile} />
        ))}
      </div>
    </>
  );
};
