"use client";

import { SongWithProfile } from "@/types";
import { NoResults } from "@/components/no-results";
import { SongCard } from "@/components/songs/song-card";
import { DisplayContainer } from "@/components/display-container";

interface SongListProps {
  title: string;
  data: SongWithProfile[];
}

export const SongList = ({ title, data }: SongListProps) => {
  return (
    <div className="space-y-4 mt-5">
      <div className="font-bold text-3xl">{title}</div>
      {data.length === 0 && (
        <NoResults title="No related songs found." src="/empty-box.png" />
      )}
      <DisplayContainer>
        {data.map((item) => (
          <SongCard key={item.id} song={item} />
        ))}
      </DisplayContainer>
    </div>
  );
};
