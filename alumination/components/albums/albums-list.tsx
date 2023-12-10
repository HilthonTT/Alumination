"use client";

import { NoResults } from "@/components/no-results";
import { SongCard } from "@/components/songs/song-card";
import { SongWithProfile } from "@/types";

interface AlbumListProps {
  title: string;
  data: SongWithProfile[];
}

export const AlbumList = ({ title, data }: AlbumListProps) => {
  return (
    <div className="space-y-4 mt-5">
      <div className="font-bold text-3xl">{title}</div>
      {data.length === 0 && (
        <NoResults title="No related songs found." src="/empty-box.png" />
      )}
      <div className="grid grid-cols-1 px-40 sm:px-12 md:p-0 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((item) => (
          <SongCard key={item.id} song={item} />
        ))}
      </div>
    </div>
  );
};
