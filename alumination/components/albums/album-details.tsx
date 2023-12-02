"use client";

import Image from "next/image";
import { Album } from "lucide-react";

import { AlbumWithProfileWithSongs } from "@/types";
import { formatPlural } from "@/lib/utils";

import { PageHeader } from "@/components/page-header";
import { AlbumHeader } from "@/components/albums/album-header";
import { Separator } from "@/components/ui/separator";
import { AlbumSongCard } from "@/components/albums/album-song-card";
import { AlbumPlayerContent } from "@/components/albums/album-player-content";

interface AlbumDetailsProps {
  album: AlbumWithProfileWithSongs;
  isOwner: boolean;
}

export const AlbumDetails = ({ album, isOwner }: AlbumDetailsProps) => {
  return (
    <>
      <PageHeader title={album?.title} icon={Album} />

      <div className="bg-slate-800 rounded-xl rounded-b-none p-3">
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
                <AlbumSongCard key={song.id} song={song} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-slate-700 rounded-b-lg p-2">
        <AlbumPlayerContent songUrl="" key="" />
      </div>
    </>
  );
};
