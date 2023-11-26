"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Song } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";

import { SongWithProfile } from "@/types";
import { useLoadSongUrl } from "@/hooks/use-load-song-url";
import { UserAvatar } from "@/components/user-avatar";
import { NoResults } from "@/components/no-results";
import { PlayerContent } from "@/components/player-content";
import { ActionTooltip } from "@/components/action-tooltip";

interface SongDetailsProps {
  data: SongWithProfile | null;
}

export const SongDetails = ({ data }: SongDetailsProps) => {
  const router = useRouter();
  const songUrl = useLoadSongUrl(data as Song);

  if (!data) {
    return <NoResults src="/not-found.png" title="No songs have been found." />;
  }

  return (
    <div className="bg-slate-800 rounded-xl p-3 flex">
      <div className="flex flex-col w-full">
        <div className="w-full mb-4 flex justify-between">
          <span className="text-2xl font-semibold">
            {data.title} &#x2022;{" "}
            {formatDistanceToNow(new Date(data.createdAt), {
              addSuffix: true,
            })}
          </span>
          <button onClick={() => router.push(`/artists/${data?.profile?.id}`)}>
            <ActionTooltip label={data?.profile.username} side="bottom">
              <div className="relative">
                <UserAvatar src={data?.profile.imageUrl} />
              </div>
            </ActionTooltip>
          </button>
        </div>
        <div className="flex mb-4">
          <div className="relative h-52 w-52 mr-4">
            <Image
              fill
              src={data.imageUrl}
              alt="Song Thumbnail"
              className="object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col w-full break-words">
            <p className="break-words overflow-hidden">{data?.description}</p>
            <PlayerContent songUrl={songUrl} />
          </div>
        </div>
      </div>
    </div>
  );
};
