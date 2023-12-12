"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Profile } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  Edit,
  Eye,
  MinusCircle,
  MoreVertical,
  Music,
  PlusCircle,
  Trash,
  Upload,
} from "lucide-react";

import { BandWithMembersWithProfilesWithSongs } from "@/types";
import { capitalizeFirstLetter } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { BandMember } from "@/components/bands/band-member";
import { useModal } from "@/hooks/use-modal-store";
import { useOnPlay } from "@/hooks/use-on-play";
import { usePlayer } from "@/hooks/use-player-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BandSongCard } from "@/components/bands/band-song-card";
import { BandPlayer } from "@/components/bands/band-player";
import { Separator } from "@/components/ui/separator";
import { CheckIfMemberBand } from "@/lib/check-member-band";

interface BandDetailsProps {
  band: BandWithMembersWithProfilesWithSongs;
  profile: Profile | null;
  isRequested: boolean;
}

export const BandDetails = ({
  band,
  profile,
  isRequested,
}: BandDetailsProps) => {
  const capitalizedName = capitalizeFirstLetter(band?.name);

  const { onOpen } = useModal();
  const router = useRouter();
  const { activateId } = usePlayer();
  const onPlay = useOnPlay(band.songs);

  const isMember = CheckIfMemberBand(band, profile as Profile);
  const isOwner = band?.profileId === profile?.id;

  const onUpdate = () => {
    router.push(`/bands/${band?.id}/update`);
  };

  const onUpload = () => {
    router.push(`/bands/${band?.id}/upload`);
  };

  const onDelete = () => {
    onOpen("deleteBand", { band });
  };

  const onViewSongs = () => {
    router.push(`/bands/${band.id}/songs`);
  };

  const onJoin = () => {
    onOpen("joinBand", { band, isRequested });
  };

  const onViewRequests = () => {
    router.push(`/bands/${band?.id}/requests`);
  };

  return (
    <>
      <PageHeader title={band.name} />
      <div className="bg-zinc-200 dark:bg-slate-800 rounded-xl w-full">
        <div className="relative w-full h-40">
          <Image
            fill
            src={band.bannerImageUrl}
            alt="Band Banner"
            className="object-cover rounded-xl rounded-b-none"
          />
        </div>
        <div className="flex w-full p-1">
          <div className="relative w-44 h-44 border-4 border-dashed border-primary/10 rounded-full">
            <Image
              src={band.iconImageUrl}
              alt="Band Picture"
              fill
              className="object-cover rounded-xl p-3"
            />
          </div>

          <div className="flex flex-col mx-2 mt-5 mr-auto">
            <div className="relative">
              <p className="font-semibold text-xl">
                {capitalizedName} &#8226; Joined{" "}
                {formatDistanceToNow(band.createdAt)} ago
              </p>
              <p className="text-sm text-muted-foreground break-words">
                {band?.description}
              </p>
            </div>
            <div className="mt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-1">
                {band?.members?.map((member) => (
                  <BandMember key={member.id} member={member} />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bg-transparent hover:opacity-75 transition">
                  <MoreVertical />
                  <span className="sr-only">More options</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-52">
                {!isMember && (
                  <DropdownMenuItem
                    className="p-2 cursor-pointer group"
                    onClick={onJoin}>
                    {isRequested ? "Cancel Join Request" : "Join Band"}
                    {isRequested ? (
                      <MinusCircle className="h-4 w-4 ml-auto group-hover:text-purple-900 transition" />
                    ) : (
                      <PlusCircle className="h-4 w-4 ml-auto group-hover:text-purple-900 transition" />
                    )}
                  </DropdownMenuItem>
                )}
                {isMember && (
                  <>
                    <DropdownMenuItem
                      className="p-2 cursor-pointer group"
                      onClick={onUpdate}>
                      Edit
                      <Edit className="h-4 w-4 ml-auto group-hover:text-cyan-400 transition" />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={onViewSongs}
                      className="cursor-pointer text-sm group">
                      View songs
                      <Music className="h-4 w-4 ml-auto group-hover:text-emerald-500 transition" />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="p-2 cursor-pointer group"
                      onClick={onUpload}>
                      Upload
                      <Upload className="h-4 w-4 ml-auto group-hover:text-orange-500 transition" />
                    </DropdownMenuItem>
                  </>
                )}
                {isOwner && (
                  <>
                    <DropdownMenuItem
                      className="p-2 cursor-pointer group"
                      onClick={onViewRequests}>
                      View Requests
                      <Eye className="h-4 w-4 ml-auto group-hover:text-rose-400 transition" />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="p-2 cursor-pointer group"
                      onClick={onDelete}>
                      Delete
                      <Trash className="h-4 w-4 ml-auto group-hover:text-rose-500 transition" />
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mt-3 p-2">
          {band.songs.map((song) => (
            <BandSongCard
              key={song.id}
              song={song}
              onClick={() => onPlay(song.id)}
            />
          ))}
        </div>
        <div className="mt-4 flex flex-col items-center justify-center">
          {activateId && (
            <Separator className="border-2 border-white w-[85%] mb-4" />
          )}
          <BandPlayer />
        </div>
      </div>
    </>
  );
};
