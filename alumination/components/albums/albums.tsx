"use client";

import { Category } from "@prisma/client";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { AlbumWithProfileWithSongs } from "@/types";
import { PageHeader } from "@/components/page-header";
import { NoResults } from "@/components/no-results";
import { AlbumCard } from "@/components/albums/album-card";
import { Categories } from "@/components/categories";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search-input";
import { DisplayContainer } from "@/components/display-container";

interface AlbumsProps {
  albums: AlbumWithProfileWithSongs[];
  categories: Category[];
}

export const Albums = ({ albums, categories }: AlbumsProps) => {
  const router = useRouter();
  const { isSignedIn } = useUser();

  return (
    <>
      <PageHeader title="Albums" />
      <Categories data={categories} />
      <SearchInput parameter="albumTitle" />
      {isSignedIn && (
        <div className="w-full flex items-center justify-end mb-1">
          <Button onClick={() => router.push("/albums/create")} variant="ghost">
            Upload an album
            <Upload className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}

      {albums.length === 0 && (
        <NoResults src="/empty-box.png" title="No albums have been found." />
      )}

      <DisplayContainer>
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </DisplayContainer>
    </>
  );
};
