"use client";

// @ts-ignore
import useSound from "use-sound";

import { useEffect, useState } from "react";
import { Play, Pause, VolumeX, Volume2 } from "lucide-react";

import { VolumeSlider } from "@/components/volume-slider";

interface PlayerContentProps {
  songUrl: string;
}

export const PlayerContent = ({ songUrl }: PlayerContentProps) => {
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? Pause : Play;
  const VolumeIcon = volume === 0 ? VolumeX : Volume2;

  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    onplay: () => setIsPlaying(true),
    onend: () => setIsPlaying(false),
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  const togglePlay = () => {
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

  useEffect(() => {
    return () => {
      if (sound) {
        sound.stop();
      }
    };
  }, [sound]);

  return (
    <div className="flex w-full items-center mt-auto space-x-2">
      <button
        onClick={togglePlay}
        className="h-10 w-10 flex items-center justify-center rounded-full bg-zinc-100 p-2">
        <Icon className="text-black" />
      </button>
      <div className="hidden md:flex w-full justify-end p-2 pr-2">
        <div className="flex items-center gap-x-2 w-full">
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
