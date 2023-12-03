"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Profile } from "@prisma/client";

import { capitalizeFirstLetter } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface ArtistCardProps {
  artist: Profile;
}

export const ArtistCard = ({ artist }: ArtistCardProps) => {
  const router = useRouter();

  const capitalizeUsername = capitalizeFirstLetter(artist?.username);

  const onClick = () => {
    router.push(`/artists/${artist?.id}`);
  };

  return (
    <div
      onClick={onClick}
      className="relative flex flex-col items-center bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-xl transition">
      <div className="relative w-40 h-40">
        <Image
          fill
          src={artist.imageUrl}
          alt="Artist Profile Picture"
          className="object-cover"
        />
      </div>
      <div className="mt-2 relative text-start w-full px-2">
        <p className="font-semibold break-words">{capitalizeUsername}</p>
        <p className="text-muted-foreground">
          Joined {formatDistanceToNow(artist?.createdAt)}
        </p>
      </div>
    </div>
  );
};
