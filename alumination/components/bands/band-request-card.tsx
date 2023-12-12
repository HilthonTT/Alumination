"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Settings, ThumbsDown, ThumbsUp } from "lucide-react";
import { Band } from "@prisma/client";

import { BandRequestWithProfile } from "@/types";
import { useModal } from "@/hooks/use-modal-store";
import { capitalizeFirstLetter } from "@/lib/utils";

import { ActionTooltip } from "@/components/action-tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BandRequestCardProps {
  request: BandRequestWithProfile;
  band: Band;
}

export const BandRequestCard = ({ request, band }: BandRequestCardProps) => {
  const router = useRouter();
  const { onOpen } = useModal();

  const onLoadProfile = () => {
    router.push(`/artists/${request?.profileId}`);
  };

  const onAccept = () => {
    onOpen("acceptRequest", { band, profile: request?.profile });
  };

  const onDecline = () => {
    onOpen("declineRequest", { band, profile: request?.profile });
  };

  const capitalizedUsername = capitalizeFirstLetter(request?.profile?.username);

  return (
    <div className="flex items-center w-full bg-zinc-200 dark:bg-slate-700 p-2 rounded-full mb-5">
      <ActionTooltip label={request?.profile?.username}>
        <div
          onClick={onLoadProfile}
          className="relative h-20 w-20 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-32 lg:w-32
                hover:opacity-75 cursor-pointer transition">
          <div className="rounded-full overflow-hidden">
            <Image
              src={request?.profile?.imageUrl}
              alt="Profile Picture"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </ActionTooltip>
      <div className="ml-3">
        <p className="text-base sm:text-xl font-bold break-words overflow-hidden">
          {capitalizedUsername} requested to join.
        </p>
      </div>
      <div className="ml-auto mr-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center hover:opacity-75 transition">
              <span className="sr-only">Accept or decline</span>
              <Settings className="h-6 w-6" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52">
            <DropdownMenuItem
              className="cursor-pointer group"
              onClick={onAccept}>
              Accept
              <ThumbsUp className="ml-auto group-hover:text-emerald-500 transition" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer group"
              onClick={onDecline}>
              Decline
              <ThumbsDown className="ml-auto group-hover:text-rose-500 transition" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
