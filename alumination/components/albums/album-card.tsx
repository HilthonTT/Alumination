"use client";

import Image from "next/image";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@clerk/nextjs";
import { Settings } from "lucide-react";

import { AlbumWithProfileWithSongs } from "@/types";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/user-avatar";
import { ActionTooltip } from "@/components/action-tooltip";

import { cn } from "@/lib/utils";

interface AlbumCardProps {
  album: AlbumWithProfileWithSongs;
}

export const AlbumCard = ({ album }: AlbumCardProps) => {
  const router = useRouter();
  const { user } = useUser();

  const [isIconHovered, setIsIconHovered] = useState(false);

  const onClick = () => {
    router.push(`/albums/${album?.id}`);
  };

  const onProfileClick = (e: MouseEvent) => {
    e.stopPropagation();

    router.push(`/artists/${album?.profile?.id}`);
  };

  const onSettingsClick = (e: MouseEvent) => {
    e.stopPropagation();

    router.push(`/albums/${album?.id}/update`);
  };

  return (
    <div
      onClick={onClick}
      className="dark:bg-slate-800 dark:hover:bg-slate-700 bg-slate-500 hover:bg-slate-600 
        cursor-pointer rounded-lg flex flex-col items-center justify-center transition group">
      <div className="relative w-full">
        {user?.id === album?.profile?.userId && (
          <ActionTooltip label="Settings">
            <div
              className={cn(
                "absolute top-2 right-2 transition0",
                isIconHovered
                  ? "opacity-75"
                  : "opacity-0 group-hover:opacity-100"
              )}
              onMouseEnter={() => setIsIconHovered(true)}
              onMouseLeave={() => setIsIconHovered(false)}
              onClick={onSettingsClick}>
              <Settings className="text-white w-6 h-6" />
              <span className="sr-only">Open Settings</span>
            </div>
          </ActionTooltip>
        )}
      </div>
      <div className="relative h-52 w-52">
        <Image
          fill
          src={album?.imageUrl}
          alt="Album Image"
          className="object-cover"
        />
      </div>
      <div className="mt-3 flex items-center justify-center w-[85%]">
        <div className="w-full flex items-center space-x-3">
          <ActionTooltip label={album?.profile?.username} side="bottom">
            <div
              onClick={(e) => onProfileClick(e)}
              className="hover:opacity-75">
              <UserAvatar src={album?.profile?.imageUrl} />
            </div>
          </ActionTooltip>
          <p className="font-bold text-2xl">{album?.title}</p>
        </div>
      </div>
      <Separator className="border border-slate-200 rounded-full my-4 w-[85%]" />
      <div className="text-start w-[85%]">
        <p className="font-semibold">
          {album?.songs?.length} songs in this album
        </p>
      </div>
      <div
        className="dark:bg-slate-700 dark:group-hover:bg-slate-600
         bg-slate-400 group-hover:bg-slate-700 w-full rounded-b-lg mt-2 transition">
        <div className="p-3">
          Uploaded {formatDistanceToNow(album?.createdAt)}
        </div>
      </div>
    </div>
  );
};
