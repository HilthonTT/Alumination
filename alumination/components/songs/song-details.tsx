"use client";

import Image from "next/image";
import { Song } from "@prisma/client";

import { SongWithProfile } from "@/types";
import { useLoadSongUrl } from "@/hooks/use-load-song-url";
import { NoResults } from "@/components/no-results";
import { PlayerContent } from "@/components/player-content";
import { SongHeader } from "./song-header";

interface SongDetailsProps {
  data: SongWithProfile | null;
  isOwner: boolean;
}

export const SongDetails = ({ data, isOwner }: SongDetailsProps) => {
  const songUrl = useLoadSongUrl(data as Song);

  if (!data) {
    return <NoResults src="/not-found.png" title="No songs have been found." />;
  }

  return (
    <div className="bg-slate-800 rounded-xl p-3 flex">
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
      </div>
    </div>
  );
};
