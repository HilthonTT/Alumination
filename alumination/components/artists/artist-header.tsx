"use client";

import { formatDistanceToNow } from "date-fns";
import { MoreVertical, Music, UserPlus } from "lucide-react";

import { capitalizeFirstLetter } from "@/lib/utils";
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
}

export const ArtistHeader = ({ profile }: ArtistHeaderProps) => {
  const capitalizedUsername = capitalizeFirstLetter(profile?.username);

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
              <p>123 followers</p>
              <p>456 following</p>
            </div>
            <div className="flex items-center justify-center">
              <Music className="h-5 w-5 mr-2" />
              123 songs
            </div>
          </div>
        </div>
      </div>
      <div className="ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none" asChild>
            <button className="flex items-center hover:opacity-75 transition">
              <MoreVertical className="h-8 w-8" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-white space-y-[2px]">
            <DropdownMenuItem
              onClick={() => {}}
              className="cursor-pointer text-sm px-3">
              Follow
              <UserPlus className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
