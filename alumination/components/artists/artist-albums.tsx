"use client";

import { NoResults } from "@/components/no-results";
import { SearchInput } from "@/components/search-input";
import { AlbumCard } from "@/components/albums/album-card";
import { Album } from "@prisma/client";

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
      <div className="gap-2 px-40 md:p-0 grid sm:grid-cols-1 md:grid-cols-4">
        {albums?.map((album) => (
          <AlbumCard key={album.id} album={album} showProfile={false} />
        ))}
      </div>
    </div>
  );
};
