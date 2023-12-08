"use client";

import Image from "next/image";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { Album, AlbumSong, BandSong, Song } from "@prisma/client";

import { capitalizeFirstLetter } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SongCardProps {
  song: Song | AlbumSong | BandSong;
  onClick: () => void;
  onDetails: () => void;
  onDelete: () => void;
}

export const SongCardGlobal = ({
  song,
  onClick,
  onDetails,
  onDelete,
}: SongCardProps) => {
  const capitalizedTitle = capitalizeFirstLetter(song.title);

  return (
    <div className="flex items-center w-full bg-slate-700 rounded-full mb-5">
      <ActionTooltip label={capitalizedTitle}>
        <div
          onClick={onDetails}
          className="relative h-24 w-24 hover:opacity-75 hover:cursor-pointer transition">
          <Image
            src={song.imageUrl}
            alt="Song Thumbnail"
            fill
            className="object-cover rounded-full rounded-r-none"
          />
        </div>
      </ActionTooltip>
      <div className="ml-3">
        <p className="text-xl font-bold">{song.title}</p>
      </div>
      <div className="ml-auto mr-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:opacity-75 transition cursor-pointer">
              <MoreVertical />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52">
            <DropdownMenuItem
              onClick={onClick}
              className="cursor-pointer group">
              <span>Edit</span>
              <Pencil className="ml-auto h-4 w-4 group-hover:text-cyan-500 transition" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onDelete}
              className="cursor-pointer group">
              <span>Delete</span>
              <Trash className="ml-auto h-4 w-4 group-hover:text-rose-500 transition" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
