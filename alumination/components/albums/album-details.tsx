"use client";

import Image from "next/image";
import { Album } from "lucide-react";

import { AlbumWithProfileWithSongs } from "@/types";
import { cn, formatPlural } from "@/lib/utils";
import { useOnPlay } from "@/hooks/use-on-play";

import { PageHeader } from "@/components/page-header";
import { AlbumHeader } from "@/components/albums/album-header";
import { Separator } from "@/components/ui/separator";
import { AlbumSongCard } from "@/components/albums/album-song-card";
import { AlbumPlayer } from "@/components/albums/album-player";
import { usePlayer } from "@/hooks/use-player-store";

interface AlbumDetailsProps {
  album: AlbumWithProfileWithSongs;
  isOwner: boolean;
}

export const AlbumDetails = ({ album, isOwner }: AlbumDetailsProps) => {
  const { activateId } = usePlayer();
  const onPlay = useOnPlay(album.songs);

  const isSongActive =
    activateId && album.songs.some((song) => song.id === activateId);

  return (
    <>
      <PageHeader title={album?.title} icon={Album} />
      <div
        className={cn(
          "bg-slate-800 rounded-xl p-3",
          isSongActive && "rounded-b-none"
        )}>
        <AlbumHeader isOwner={isOwner} data={album} />
        <div className="flex">
          <div className="relative h-52 w-52">
            <Image
              fill
              src={album.imageUrl}
              alt="Album Thumbnail"
              className="object-cover"
            />
          </div>
          <div className="ml-4 mt-2 w-[80%]">
            <p className="text-gray-400 break-words overflow-hidden">
              {album.description}
            </p>
            <Separator className="border border-b-1 border-white mt-1 mb-1" />
            <div className="relative">
              <p className="font-semibold mb-2 text-lg">
                {formatPlural(album?.songs?.length, "song", "songs")}
              </p>
              {album?.songs?.map((song) => (
                <AlbumSongCard
                  key={song.id}
                  song={song}
                  onClick={(id) => onPlay(id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {isSongActive && (
        <div className="w-full bg-slate-700 rounded-b-lg p-2">
          <AlbumPlayer />
        </div>
      )}
    </>
  );
};
