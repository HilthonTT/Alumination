"use client";

import { Category } from "@prisma/client";

import { AlbumWithProfileWithSongs } from "@/types";
import { PageHeader } from "@/components/page-header";
import { NoResults } from "@/components/no-results";
import { AlbumCard } from "@/components/album-card";
import { Categories } from "@/components/categories";

interface AlbumsProps {
  albums: AlbumWithProfileWithSongs[];
  categories: Category[];
}

export const Albums = ({ albums, categories }: AlbumsProps) => {
  return (
    <>
      <PageHeader title="Albums" />
      <Categories data={categories} />
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
