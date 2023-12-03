"use client";

import { Profile } from "@prisma/client";
import { UserSquare } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { NoResults } from "@/components/no-results";
import { ArtistCard } from "@/components/artists/artist-card";
import { SearchInput } from "@/components/search-input";

interface ArtistsProps {
  artists: Profile[];
}

export const Artists = ({ artists }: ArtistsProps) => {
  return (
    <>
      <PageHeader title="Artists" icon={UserSquare} />
      <SearchInput parameter="artistName" />

      {artists.length === 0 && (
        <NoResults src="/empty-box.png" title="No artists have been found." />
      )}

      <div className="gap-2 pb-10 grid grid-cols-4">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </>
  );
};
