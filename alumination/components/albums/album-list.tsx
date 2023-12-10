"use client";

import { AlbumWithProfileWithSongs } from "@/types";
import { NoResults } from "@/components/no-results";
import { AlbumCard } from "@/components/albums/album-card";
import { DisplayContainer } from "@/components/display-container";

interface AlbumListProps {
  title: string;
  data: AlbumWithProfileWithSongs[];
}

export const AlbumList = ({ title, data }: AlbumListProps) => {
  return (
    <div className="space-y-4 mt-5">
      <div className="font-bold text-3xl">{title}</div>
      {data.length === 0 && (
        <NoResults title="No related songs found." src="/empty-box.png" />
      )}
      <DisplayContainer>
        {data.map((item) => (
          <AlbumCard key={item.id} album={item} />
        ))}
      </DisplayContainer>
    </div>
  );
};
