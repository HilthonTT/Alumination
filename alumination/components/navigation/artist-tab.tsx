"use client";

import { Profile } from "@prisma/client";
import { useRouter } from "next/navigation";

import { UserAvatar } from "@/components/user-avatar";
import { capitalizeFirstLetter } from "@/lib/utils";

interface ArtistTabProps {
  artist: Profile;
  onClose?: () => void;
}

export const ArtistTab = ({ artist, onClose = () => {} }: ArtistTabProps) => {
  const router = useRouter();

  const capitalizeUsername = capitalizeFirstLetter(artist?.username);

  const onClick = () => {
    router.push(`/artists/${artist?.id}`);
    onClose();
  };

  return (
    <a
      onClick={onClick}
      className="bg-transparent hover:bg-slate-700/50 transition p-2 cursor-pointer rounded-full flex mb-2">
      <UserAvatar src={artist.imageUrl} />
      <div className="ml-2 items-center flex">
        <p className="font-semibold">{capitalizeUsername}</p>
      </div>
    </a>
  );
};
