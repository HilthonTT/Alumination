"use client";

import Image from "next/image";
import { BandSong } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { PauseCircle, PlayCircle } from "lucide-react";

import { usePlayer } from "@/hooks/use-player-store";

interface BandSongCardProps {
  song: BandSong;
  onClick: (id: string) => void;
}

export const BandSongCard = ({ song, onClick }: BandSongCardProps) => {
  const { activateId, setId } = usePlayer();
  const isPlaying = activateId === song?.id;

  const Icon = isPlaying ? PauseCircle : PlayCircle;

  const onToggle = () => {
    if (isPlaying) {
      setId("");
    } else {
      onClick(song.id);
    }
  };

  return (
    <div className="bg-zinc-300 dark:bg-slate-700 rounded-full flex items-center w-full mb-2">
      <div className="relative w-12 h-12">
        <Image
          fill
          src={song.imageUrl}
          alt="Album Song Thumbnail"
          className="object-cover rounded-full rounded-r-none"
        />
      </div>
      <div className="ml-2 flex items-center">
        <p className="text-md font-semibold break-words">{song?.title}</p>
        <div className="mx-1">&#x2022;</div>
        <p className="text-sm text-muted-foreground">
          Uploaded {formatDistanceToNow(song?.createdAt)} ago
        </p>
      </div>
      <div className="ml-auto mr-4 flex items-center">
        <button onClick={onToggle} className="hover:opacity-75 transition">
          <Icon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};
