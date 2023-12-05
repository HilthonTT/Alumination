"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { MemberWithProfile } from "@/types";
import { capitalizeFirstLetter } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

interface BandMemberProps {
  member: MemberWithProfile;
}

export const BandMember = ({ member }: BandMemberProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/artists/${member?.profileId}`);
  };

  const capitalizedName = capitalizeFirstLetter(member?.profile?.username);

  return (
    <div
      onClick={onClick}
      className="bg-slate-700 rounded-full w-full p-2 flex items-center hover:opacity-75 cursor-pointer transition mb-2">
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
    </div>
  );
};
