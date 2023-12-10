"use client";

import Image from "next/image";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@clerk/nextjs";
import { Settings } from "lucide-react";

import { AlbumWithProfileWithSongs } from "@/types";

import { UserAvatar } from "@/components/user-avatar";
import { ActionTooltip } from "@/components/action-tooltip";

import { cn } from "@/lib/utils";
import { Album } from "@prisma/client";

interface AlbumCardProps {
  album: AlbumWithProfileWithSongs | Album;
  showProfile?: boolean;
}

export const AlbumCard = ({ album, showProfile = true }: AlbumCardProps) => {
  const router = useRouter();
  const { user } = useUser();

  const [isIconHovered, setIsIconHovered] = useState(false);

  const onClick = () => {
    router.push(`/albums/${album?.id}`);
  };

  const isAlbumWithProfileWithSongs = "profile" && "songs" in album;
  const isProfileVisual = isAlbumWithProfileWithSongs && showProfile;
  const isOwner =
    isAlbumWithProfileWithSongs && album?.profile.userId === user?.id;

  const onProfileClick = (e: MouseEvent) => {
    e.stopPropagation();

    if (isAlbumWithProfileWithSongs) {
      router.push(`/artists/${album?.profile?.id}`);
    }
  };

  const onSettingsClick = (e: MouseEvent) => {
    e.stopPropagation();

    router.push(`/albums/${album?.id}/update`);
  };

  return (
    <div
      onClick={onClick}
      className="relative flex flex-col items-center p-4 
                dark:bg-slate-800 dark:hover:bg-slate-700 
                bg-zinc-200 hover:bg-zinc-300
                transition rounded-xl cursor-pointer group">
      <div className="relative h-52 w-52">
        <Image
          fill
          src={album.imageUrl}
          alt="Album Thumbnail"
          className="object-cover rounded-lg"
        />
        {showProfile && (
          <>
            {isOwner && (
              <ActionTooltip label="Settings">
                <div
                  className={cn(
                    "absolute top-2 right-2 transition",
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
          </>
        )}
      </div>
      <div className="flex w-full items-center justify-center gap-x-2 mt-2">
        {isProfileVisual && (
          <ActionTooltip label={album?.profile?.username} side="bottom">
            <div
              onClick={(e) => onProfileClick(e)}
              className="hover:opacity-75">
              <UserAvatar src={album?.profile?.imageUrl} />
            </div>
          </ActionTooltip>
        )}

        <div className="dark:text-white text-black truncate w-full">
          <span className="font-semibold">{album.title}</span>
          <p className="text-sm text-muted-foreground truncate">
            Uploaded{" "}
            {formatDistanceToNow(new Date(album.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
