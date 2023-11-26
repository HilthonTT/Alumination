"use client";

import Image from "next/image";

import { SongWithProfile } from "@/types";
import { SongCard } from "@/components/song-card";

interface SongsProps {
  data: SongWithProfile[];
}

export const Songs = ({ data }: SongsProps) => {
  if (data.length === 0) {
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <div className="relative h-52 w-52">
          <Image src="/empty-box.png" alt="Empty" fill className="grayscale" />
        </div>
        <p className="text-sm text-muted-foreground">
          No songs have been found
        </p>
      </div>
    );
  }

  return (
    <div className="gap-2 pb-10 grid grid-cols-4">
      {data.map((item) => (
        <SongCard key={item.id} song={item} />
      ))}
    </div>
  );
};
