"use client";

import Image from "next/image";
import { PauseCircle, PlayCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { AlbumSong } from "@prisma/client";

interface AlbumSongCardProps {
  song: AlbumSong;
}

export const AlbumSongCard = ({ song }: AlbumSongCardProps) => {
  const Icon = false ? PauseCircle : PlayCircle;

  return (
    <div className="bg-slate-700 rounded-full flex items-center p-1 w-full">
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
        <button className="hover:opacity-75 transition">
          <Icon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};
