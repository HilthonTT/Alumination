"use client";

import { Song } from "@prisma/client";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

import { UserAvatar } from "@/components/user-avatar";
import { capitalizeFirstLetter } from "@/lib/utils";

interface SongTabProps {
  song: Song;
  onClose?: () => void;
}

export const SongTab = ({ song, onClose = () => {} }: SongTabProps) => {
  const router = useRouter();

  const capitalizedTitle = capitalizeFirstLetter(song?.title);

  const onClick = () => {
    router.push(`/songs/${song?.id}`);
    onClose();
  };

  return (
    <a
      onClick={onClick}
      className="bg-transparent hover:bg-slate-700/50 transition p-2 cursor-pointer rounded-full flex mb-2">
      <UserAvatar src={song?.imageUrl} />
      <div className="ml-2 items-center flex">
        <p className="font-semibold text-sm">
          {capitalizedTitle} &#x2022; {formatDistanceToNow(song?.createdAt)}
        </p>
      </div>
    </a>
  );
};
