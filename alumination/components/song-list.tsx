"use client";

import { NoResults } from "@/components/no-results";
import { SongCard } from "@/components/song-card";
import { SongWithProfile } from "@/types";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((item) => (
          <SongCard key={item.id} song={item} />
        ))}
      </div>
    </div>
  );
};
