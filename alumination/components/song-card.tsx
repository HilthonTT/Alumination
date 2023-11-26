"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { formatDistanceToNow } from "date-fns";

import { SongWithProfile } from "@/types";
import { ActionTooltip } from "@/components/action-tooltip";
import { UserAvatar } from "@/components/user-avatar";

interface SongCardProps {
  song: SongWithProfile;
}

export const SongCard = ({ song }: SongCardProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/songs/${song.id}`);
  };

  const onProfileClick = (e: MouseEvent) => {
    e.stopPropagation();

    router.push(`/artists/${song?.profile?.id}`);
  };

  return (
    <div
      onClick={onClick}
      className="relative flex flex-col items-center p-4 
                 dark:bg-slate-800 dark:hover:bg-slate-700  
                 bg-slate-500 hover:bg-slate-600
                 shadow-sm  shadow-slate-800
                 transition rounded-xl cursor-pointer">
      <div className="relative h-52 w-52">
        <Image
          fill
          src={song.imageUrl}
          alt="Song Thumbnail"
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex w-full items-center justify-center gap-x-2 mt-2">
        <ActionTooltip label={song?.profile?.username} side="bottom">
          <div onClick={(e) => onProfileClick(e)}>
            <UserAvatar src={song?.profile?.imageUrl} />
          </div>
        </ActionTooltip>
        <div className="text-white truncate w-full">
          <span className="font-semibold">{song.title}</span>
          <p className="text-sm font-thin truncate">
            Uploaded{" "}
            {formatDistanceToNow(new Date(song.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
