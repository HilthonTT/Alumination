"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Band } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";

interface BandCardProps {
  band: Band;
}

export const BandCard = ({ band }: BandCardProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/bands/${band?.id}`);
  };

  return (
    <div
      onClick={onClick}
      className="relative flex flex-col items-center p-4 
               dark:bg-slate-800 dark:hover:bg-slate-700  
               bg-slate-500 hover:bg-slate-600
               shadow-sm  shadow-slate-800
               transition rounded-xl cursor-pointer group">
      <div className="relative h-52 w-52">
        <Image
          fill
          src={band.iconImageUrl}
          alt="Song Thumbnail"
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex w-full items-center justify-center gap-x-2 mt-2">
        <div className="text-white truncate w-full">
          <span className="font-semibold">{band.name}</span>
          <p className="text-sm font-thin truncate">
            Joined{" "}
            {formatDistanceToNow(new Date(band.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
