"use client";

import { Profile } from "@prisma/client";
import { Headphones } from "lucide-react";

import { BandWithProfile } from "@/types";
import { PageHeader } from "@/components/page-header";
import { NoResults } from "@/components/no-results";
import { BandCard } from "@/components/bands/band-card";
import { SearchInput } from "@/components/search-input";
import { DisplayContainer } from "@/components/display-container";

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
      <DisplayContainer>
        {bands.map((band) => (
          <BandCard key={band.id} band={band} profile={profile} />
        ))}
      </DisplayContainer>
    </>
  );
};
