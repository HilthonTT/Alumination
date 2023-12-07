"use client";

// @ts-ignore
import useSound from "use-sound";

import Image from "next/image";
import { AlbumSong } from "@prisma/client";
import { useEffect, useState } from "react";

import {
  PauseCircle,
  PlayCircle,
  StepBack,
  StepForward,
  VolumeX,
  Volume2,
} from "lucide-react";
import { VolumeSlider } from "@/components/volume-slider";
import { usePlayer } from "@/hooks/use-player-store";

interface PlayerContentProps {
  key: string;
  song: AlbumSong;
  songUrl: string;
}

export const PlayerContentGlobal = ({
  key,
  songUrl,
  song,
}: PlayerContentProps) => {
  const { ids, activateId, setId } = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? PauseCircle : PlayCircle;
  const VolumeIcon = volume === 0 ? VolumeX : Volume2;

  const onPlayNext = () => {
    if (ids?.length === 0) {
      return;
    }

    const currentIndex = ids?.findIndex((id) => id === activateId);
    const nextSong = ids[currentIndex + 1];

    if (!nextSong) {
      return setId(ids[0]);
    }

    setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (ids?.length === 0) {
      return;
    }

    const currentIndex = ids?.findIndex((id) => id === activateId);
    const previousSong = ids[currentIndex - 1];

    if (!previousSong) {
      return setId(ids[ids.length - 1]);
    }

    setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full p-2">
      <div className="flex items-center">
        <div className="relative h-10 w-10">
          <Image
            fill
            alt="Album Song Thumbnail"
            src={song?.imageUrl}
            className="object-cover"
          />
        </div>
        <p className="text-sm ml-2">{song?.title}</p>
      </div>
      <div className="flex md:hidden col-auto w-full  justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer">
          <Icon size={30} className="text-black" />
        </div>
      </div>
      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <StepBack
          onClick={onPlayPrevious}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer">
          <Icon size={30} className="text-black" />
        </div>
        <StepForward
          onClick={onPlayNext}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <VolumeSlider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};
