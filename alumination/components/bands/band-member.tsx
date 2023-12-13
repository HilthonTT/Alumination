"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { MouseEvent } from "react";
import { Band, Profile } from "@prisma/client";

import { MemberWithProfile } from "@/types";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal-store";

import { ActionTooltip } from "@/components/action-tooltip";

interface BandMemberProps {
  member: MemberWithProfile;
  isOwner: boolean;
  band: Band;
  profile: Profile;
}

export const BandMember = ({
  member,
  isOwner,
  band,
  profile,
}: BandMemberProps) => {
  const router = useRouter();
  const { onOpen } = useModal();

  const onClick = () => {
    router.push(`/artists/${member?.profileId}`);
  };

  const onKick = (e: MouseEvent) => {
    e.stopPropagation();
    onOpen("kickMember", { member, band });
  };

  const capitalizedName = capitalizeFirstLetter(member?.profile?.username);

  const isVisible = isOwner && profile?.id !== member.profileId;

  return (
    <div
      onClick={onClick}
      className="bg-zinc-100 dark:bg-slate-700 border-[1px]
       border-black dark:border-none rounded-full w-full p-2 flex items-center 
        hover:opacity-75 cursor-pointer transition mb-2 group">
      <div className="relative h-12 w-12">
        <Image
          fill
          src={member?.profile?.imageUrl}
          alt="Member Profile Picture"
        />
      </div>
      <ActionTooltip label={capitalizedName}>
        <div className="flex items-center mx-2">{capitalizedName}</div>
      </ActionTooltip>
      {isVisible && (
        <div className="ml-auto">
          <ActionTooltip label="Kick">
            <button
              onClick={(e) => onKick(e)}
              className="hover:opacity-75 transition hidden group-hover:block">
              <span className="sr-only">Kick member</span>
              <Trash className="ml-auto h-4 w-4" />
            </button>
          </ActionTooltip>
        </div>
      )}
    </div>
  );
};
