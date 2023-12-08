"use client";

import { useRouter } from "next/navigation";
import { Album, Upload } from "lucide-react";

import { AlbumWithProfileWithSongs } from "@/types";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { NoResults } from "@/components/no-results";
import { AlbumCard } from "@/components/albums/album-card";
import { SearchInput } from "@/components/search-input";

interface MyAlbumsDetailsProps {
  albums: AlbumWithProfileWithSongs[];
}

export const MyAlbumsDetails = ({ albums }: MyAlbumsDetailsProps) => {
  const router = useRouter();

  return (
    <>
      <PageHeader title="My Albums" icon={Album} />
      <div className="bg-slate-800 rounded-xl p-3 w-full">
        <div className="flex items-center justify-end  mb-4">
          <Button onClick={() => router.push("/albums/create")}>
            <Upload className="mr-auto" />
            Upload an album
          </Button>
        </div>
        <SearchInput parameter="myAlbumName" />

        {albums?.length === 0 && (
          <NoResults src="/empty-box.png" title="No albums have been found." />
        )}
        <div className="gap-2 grid md:grid-cols-3 grid-cols-4">
          {albums?.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </div>
    </>
  );
};
