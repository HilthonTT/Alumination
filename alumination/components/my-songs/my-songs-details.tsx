"use client";

import { useRouter } from "next/navigation";
import { Music, Upload } from "lucide-react";

import { SongWithProfile } from "@/types";
import { Button } from "@/components/ui/button";
import { SongCard } from "@/components/songs/song-card";
import { NoResults } from "@/components/no-results";
import { PageHeader } from "@/components/page-header";

interface MySongsProps {
  songs: SongWithProfile[];
}

export const MySongsDetails = ({ songs }: MySongsProps) => {
  const router = useRouter();

  return (
    <>
      <PageHeader title="My Songs" icon={Music} />
      <div className="bg-slate-800 rounded-xl p-3 w-full">
        <div className="flex items-center justify-end  mb-4">
          <Button onClick={() => router.push("/songs/create")}>
            <Upload className="mr-auto" />
            Upload a song
          </Button>
        </div>

        {songs?.length === 0 && (
          <NoResults src="/empty-box.png" title="No songs have been found." />
        )}
        <div className="gap-2 grid md:grid-cols-3 grid-cols-4">
          {songs?.map((song) => (
            <SongCard key={song.id} song={song} showProfile={false} />
          ))}
        </div>
      </div>
    </>
  );
};
