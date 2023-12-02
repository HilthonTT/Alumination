"use client";

import { AlbumWithProfileWithSongs } from "@/types";
import { PageHeader } from "@/components/page-header";
import { NoResults } from "@/components/no-results";
import { AlbumCard } from "@/components/album-card";

interface AlbumsProps {
  albums: AlbumWithProfileWithSongs[];
}

export const Albums = ({ albums }: AlbumsProps) => {
  return (
    <>
      <PageHeader title="Albums" />
      {albums.length === 0 ? (
        <NoResults src="/empty-box.png" title="No songs have been found." />
      ) : (
        <>
          <div className="gap-2 pb-10 grid grid-cols-4">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </>
      )}
    </>
  );
};
