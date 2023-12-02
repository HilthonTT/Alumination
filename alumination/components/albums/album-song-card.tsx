"use client";

import Image from "next/image";
import { PauseCircle, PlayCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { AlbumSong } from "@prisma/client";
import { usePlayer } from "@/hooks/use-player-store";

interface AlbumSongCardProps {
  song: AlbumSong;
  onClick: (id: string) => void;
}

export const AlbumSongCard = ({ song, onClick }: AlbumSongCardProps) => {
  const { activateId } = usePlayer();
  const isPlaying = activateId === song?.id;

  const Icon = isPlaying ? PauseCircle : PlayCircle;

  return (
    <div className="bg-slate-700 rounded-full flex items-center p-1 w-full mb-2">
      <div className="relative w-12 h-12">
        <Image
          fill
          src={song.imageUrl}
          alt="Album Song Thumbnail"
          className="object-cover"
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
        <button
          onClick={() => onClick(song.id)}
          className="hover:opacity-75 transition">
          <Icon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};
