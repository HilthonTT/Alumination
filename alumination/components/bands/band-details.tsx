"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

import { BandWithMembers } from "@/types";
import { capitalizeFirstLetter } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { BandMember } from "@/components/bands/band-member";

interface BandDetailsProps {
  band: BandWithMembers;
}

export const BandDetails = ({ band }: BandDetailsProps) => {
  const capitalizedName = capitalizeFirstLetter(band?.name);

  return (
    <>
      <PageHeader title={band.name} />
      <div className="bg-slate-800 rounded-xl w-full">
        <div className="relative w-full h-40">
          <Image
            fill
            src={band.bannerImageUrl}
            alt="Band Banner"
            className="object-cover rounded-xl"
          />
        </div>
        <div className="flex w-full p-1">
          <div className="relative h-48 w-48 border-4 border-dashed border-primary/10 rounded-full">
            <Image
              src={band.iconImageUrl}
              alt="Band Picture"
              fill
              className="object-cover rounded-xl p-5"
            />
          </div>
          <div className="flex flex-col mx-2 mt-5">
            <div className="relative">
              <p className="font-semibold text-xl">
                {capitalizedName} &#8226; Joined{" "}
                {formatDistanceToNow(band.createdAt)}
              </p>
              <p className="text-sm text-muted-foreground break-words">
                {band?.description}
              </p>
            </div>
            <div className="mt-3">
              {band?.members?.map((member) => (
                <BandMember key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
