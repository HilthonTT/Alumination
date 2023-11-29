"use client";

import { formatDistanceToNow } from "date-fns";
import { MoreVertical, Music, UserPlus, UserMinus } from "lucide-react";
import { Following } from "@prisma/client";

import { useModal } from "@/hooks/use-modal-store";
import { capitalizeFirstLetter, formatPlural } from "@/lib/utils";
import { ProfileWithSongsWithProfile } from "@/types";

import { UserAvatar } from "@/components/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ArtistHeaderProps {
  profile: ProfileWithSongsWithProfile;
  isOwner: boolean;
  isFollowing: boolean;
  followers: Following[];
  following: Following[];
}

export const ArtistHeader = ({
  profile,
  isOwner,
  isFollowing,
  followers,
  following,
}: ArtistHeaderProps) => {
  const { onOpen } = useModal();

  const capitalizedUsername = capitalizeFirstLetter(profile?.username);

  const Icon = isFollowing ? UserMinus : UserPlus;

  return (
    <div className="w-full flex">
      <div className="flex w-full">
        <div className="relative mr-2">
          <UserAvatar src={profile.imageUrl} size="big" />
        </div>
        <div className="mt-2 ml-2 h-full w-full">
          <p className="text-2xl font-semibold">{capitalizedUsername}</p>
          <p className="text-sm text-muted-foreground">
            Joined {formatDistanceToNow(profile?.createdAt)} ago
          </p>
          <div className="flex justify-between mt-7">
            <div className="flex space-x-3">
              <p>{formatPlural(followers.length, "follower", "followers")}</p>
              <p>{formatPlural(following.length, "following", "followings")}</p>
            </div>
            <div className="flex items-center justify-center">
              <Music className="h-5 w-5 mr-2" />
              {formatPlural(profile?.songs?.length, "song", "songs")}
            </div>
          </div>
        </div>
      </div>
      {!isOwner && (
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
              <button className="flex items-center hover:opacity-75 transition">
                <MoreVertical className="h-8 w-8" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-white space-y-[2px]">
              <DropdownMenuItem
                onClick={() => onOpen("follow", { profile, isFollowing })}
                className="cursor-pointer text-sm px-3">
                {isFollowing ? "Unfollow" : "Follow"}
                <Icon className="h-4 w-4 ml-auto" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};
