"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Profile } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Edit, MoreVertical, Trash, Upload } from "lucide-react";

import { BandWithMembersWithProfiles } from "@/types";
import { capitalizeFirstLetter } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { BandMember } from "@/components/bands/band-member";
import { useModal } from "@/hooks/use-modal-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BandDetailsProps {
  band: BandWithMembersWithProfiles;
  profile: Profile | null;
}

export const BandDetails = ({ band, profile }: BandDetailsProps) => {
  const capitalizedName = capitalizeFirstLetter(band?.name);

  const { onOpen } = useModal();
  const router = useRouter();

  const isOwner = band.profileId === profile?.id;
  const isMember =
    isOwner ||
    !!band.members.find((member) => member.profileId === profile?.id);

  const onUpdate = () => {
    router.push(`/bands/${band?.id}/update`);
  };

  const onUpload = () => {
    router.push(`/bands/${band?.id}/upload`);
  };

  const onDelete = () => {
    onOpen("deleteBand", { band });
  };

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
          <div className="flex flex-col mx-2 mt-5 mr-auto">
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
          <div className="mt-5">
            {isMember && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className=" bg-transparent hover:opacity-75 transition">
                    <MoreVertical />
                    <span className="sr-only">More options</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                  <DropdownMenuItem
                    className="p-2 cursor-pointer group"
                    onClick={onUpdate}>
                    Edit
                    <Edit className="h-4 w-4 ml-auto group-hover:text-cyan-400 transition" />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="p-2 cursor-pointer group"
                    onClick={onUpload}>
                    Upload
                    <Upload className="h-4 w-4 ml-auto group-hover:text-orange-500 transition" />
                  </DropdownMenuItem>
                  {isOwner && (
                    <DropdownMenuItem
                      className="p-2 cursor-pointer group"
                      onClick={onDelete}>
                      Delete
                      <Trash className="h-4 w-4 ml-auto group-hover:text-rose-500 transition" />
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
