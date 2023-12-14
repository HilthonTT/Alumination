"use client";

import Image from "next/image";
import { Song } from "@prisma/client";

import { SongWithViewsWithProfile } from "@/types";
import { useLoadSongUrl } from "@/hooks/use-load-song-url";
import { NoResults } from "@/components/no-results";
import { PlayerContent } from "@/components/player-content";
import { SongHeader } from "@/components/songs/song-header";
import { formatPlural } from "@/lib/utils";
import { Eye } from "lucide-react";

interface SongDetailsProps {
  data: SongWithViewsWithProfile | null;
  isOwner: boolean;
}

export const SongDetails = ({ data, isOwner }: SongDetailsProps) => {
  const songUrl = useLoadSongUrl(data as Song);

  if (!data) {
    return <NoResults src="/not-found.png" title="No songs have been found." />;
  }

  return (
    <div className="bg-zinc-200 dark:bg-slate-800 rounded-xl p-3 flex">
      <div className="flex flex-col w-full">
        <div className="w-full mb-4 flex justify-between">
          <SongHeader data={data} isOwner={isOwner} />
        </div>
        <div className="flex mb-4">
          <div className="relative h-52 w-52 mr-4">
            <Image
              fill
              src={data.imageUrl}
              alt="Song Thumbnail"
              className="object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col w-full break-words">
            <p className="break-words overflow-hidden">{data?.description}</p>
            <PlayerContent songUrl={songUrl} />
          </div>
        </div>
        <div className="text-muted-foreground">
          <div className="flex gap-x-2">
            <Eye />
            {formatPlural(data?.views?.length, "view", "views")}
          </div>
        </div>
      </div>
    </div>
  );
};
