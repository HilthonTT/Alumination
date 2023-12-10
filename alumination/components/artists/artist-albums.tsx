"use client";

import { NoResults } from "@/components/no-results";
import { SearchInput } from "@/components/search-input";
import { AlbumCard } from "@/components/albums/album-card";
import { Album } from "@prisma/client";
import { DisplayContainer } from "../display-container";

interface ArtistAlbumsProps {
  albums: Album[];
}

export const ArtistAlbums = ({ albums }: ArtistAlbumsProps) => {
  return (
    <div className="w-full">
      <SearchInput parameter="artistAlbumName" />
      {albums?.length === 0 && (
        <NoResults src="/empty-box.png" title="No albums have been found." />
      )}
      <DisplayContainer>
        {albums?.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            showProfile={false}
            className="bg-zinc-100 dark:bg-slate-700"
          />
        ))}
      </DisplayContainer>
    </div>
  );
};
