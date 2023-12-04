"use client";

import { Music, Upload } from "lucide-react";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { SongWithProfile } from "@/types";
import { SongCard } from "@/components/songs/song-card";
import { NoResults } from "@/components/no-results";
import { Categories } from "@/components/categories";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search-input";

interface SongsProps {
  data: SongWithProfile[];
  categories: Category[];
}

export const Songs = ({ data, categories }: SongsProps) => {
  const router = useRouter();
  const { isSignedIn } = useUser();

  return (
    <>
      <PageHeader title="Songs" icon={Music} />
      <Categories data={categories} />
      <SearchInput parameter="songTitle" />
      {isSignedIn && (
        <div className="w-full flex items-center justify-end mb-1">
          <Button onClick={() => router.push("/songs/create")} variant="ghost">
            Upload a song
            <Upload className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
      {data.length === 0 && (
        <NoResults src="/empty-box.png" title="No songs have been found." />
      )}
      <div className="gap-2 pb-10 grid grid-cols-4">
        {data.map((item) => (
          <SongCard key={item.id} song={item} />
        ))}
      </div>
    </>
  );
};
