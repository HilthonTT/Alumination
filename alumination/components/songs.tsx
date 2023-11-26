"use client";

import { SongWithProfile } from "@/types";
import { SongCard } from "@/components/song-card";
import { NoResults } from "@/components/no-results";

interface SongsProps {
  data: SongWithProfile[];
}

export const Songs = ({ data }: SongsProps) => {
  if (data.length === 0) {
    return <NoResults src="/empty-box.png" title="No songs have been found." />;
  }

  return (
    <div className="gap-2 pb-10 grid grid-cols-4">
      {data.map((item) => (
        <SongCard key={item.id} song={item} />
      ))}
    </div>
  );
};
