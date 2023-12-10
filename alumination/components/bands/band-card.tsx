"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Settings } from "lucide-react";
import { Band, Profile } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { MouseEvent, useState } from "react";

import { ActionTooltip } from "@/components/action-tooltip";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { BandWithProfile } from "@/types";

interface BandCardProps {
  band: BandWithProfile | Band;
  profile?: Profile | null;
  showProfile?: boolean;
}

export const BandCard = ({
  band,
  profile,
  showProfile = true,
}: BandCardProps) => {
  const router = useRouter();

  const [isIconHovered, setIsIconHovered] = useState(false);

  const onClick = () => {
    router.push(`/bands/${band?.id}`);
  };

  const onProfileClick = (e: MouseEvent) => {
    e.preventDefault();
    router.push(`/artists/${band?.profileId}`);
  };

  const onSettingsClick = (e: MouseEvent) => {
    e.preventDefault();
    router.push(`/bands/${band?.id}/update`);
  };

  const isProfileVisual = showProfile && "profile" in band;

  return (
    <div
      onClick={onClick}
      className="relative flex flex-col items-center p-4 
                dark:bg-slate-800 dark:hover:bg-slate-700 
                bg-zinc-200 hover:bg-zinc-300 mb-4
                 transition rounded-xl cursor-pointer group">
      <div className="relative h-52 w-52">
        <Image
          fill
          src={band.iconImageUrl}
          alt="Band Thumbnail"
          className="object-cover rounded-lg"
        />
        {profile?.id === band?.profileId && (
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
              onClick={(e) => onSettingsClick(e)}>
              <Settings className="text-white w-6 h-6" />
              <span className="sr-only">Open Settings</span>
            </div>
          </ActionTooltip>
        )}
      </div>
      <div className="flex w-full items-center justify-center gap-x-2 mt-2">
        {isProfileVisual && (
          <ActionTooltip label={band.profile.username} side="bottom">
            <div
              onClick={(e) => onProfileClick(e)}
              className="hover:opacity-75">
              <UserAvatar src={band.profile.imageUrl} />
            </div>
          </ActionTooltip>
        )}
        <div className="dark:text-white text-black truncate w-full">
          <span className="font-semibold">{band.name}</span>
          <p className="text-sm  text-muted-foreground truncate">
            Uploaded{" "}
            {formatDistanceToNow(new Date(band.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
