"use client";

import { AlbumWithProfile } from "@/types";
import { PageHeader } from "@/components/page-header";
import { NoResults } from "@/components/no-results";

interface AlbumsProps {
  albums: AlbumWithProfile[];
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
              <div key={album.id}>{album.title}</div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
