"use client";

import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Edit, MoreVertical, Trash } from "lucide-react";

import { UserAvatar } from "@/components/user-avatar";
import { ActionTooltip } from "@/components/action-tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AlbumWithProfile } from "@/types";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal-store";

interface AlbumHeaderProps {
  data: AlbumWithProfile;
  isOwner: boolean;
}

export const AlbumHeader = ({ data, isOwner }: AlbumHeaderProps) => {
  const router = useRouter();
  const { onOpen } = useModal();

  const capitalizedUsername = capitalizeFirstLetter(data?.profile?.username);

  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-2xl font-semibold">
        {data.title} &#x2022;{" "}
        {formatDistanceToNow(new Date(data.createdAt), {
          addSuffix: true,
        })}
      </span>
      <div className="flex items-center space-x-1">
        <button onClick={() => router.push(`/artists/${data?.profile?.id}`)}>
          <ActionTooltip label={capitalizedUsername} side="bottom">
            <div className="relative hover:opacity-75 transition">
              <UserAvatar src={data?.profile.imageUrl} />
            </div>
          </ActionTooltip>
        </button>
        {isOwner && (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
              <button className="flex items-center hover:opacity-75 transition">
                <MoreVertical className="h-8 w-8" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-white space-y-[2px]">
              <DropdownMenuItem
                onClick={() => router.push(`/albums/${data.id}/update`)}
                className="cursor-pointer text-sm px-3">
                Edit
                <Edit className="h-4 w-4 ml-auto" />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onOpen("deleteAlbum", { album: data })}
                className="cursor-pointer text-sm px-3">
                Delete
                <Trash className="h-4 w-4 ml-auto" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};
