"use client";

import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { Edit, MoreVertical, Trash } from "lucide-react";

import { SongWithProfile } from "@/types";
import { useModal } from "@/hooks/use-modal-store";
import { ActionTooltip } from "@/components/action-tooltip";
import { UserAvatar } from "@/components/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SongHeaderProps {
  data: SongWithProfile;
  isOwner: boolean;
}

export const SongHeader = ({ data, isOwner }: SongHeaderProps) => {
  const router = useRouter();
  const { onOpen } = useModal();

  return (
    <>
      <span className="text-2xl font-semibold">
        {data.title} &#x2022;{" "}
        {formatDistanceToNow(new Date(data.createdAt), {
          addSuffix: true,
        })}
      </span>
      <div className="flex items-center space-x-1">
        <button onClick={() => router.push(`/artists/${data?.profile?.id}`)}>
          <ActionTooltip label={data?.profile.username} side="bottom">
            <div className="relative">
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
                onClick={() => router.push(`/songs/${data.id}/update`)}
                className="cursor-pointer text-sm px-3">
                Edit
                <Edit className="h-4 w-4 ml-auto" />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onOpen("deleteSong", { song: data })}
                className="cursor-pointer text-sm px-3">
                Delete
                <Trash className="h-4 w-4 ml-auto" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </>
  );
};
