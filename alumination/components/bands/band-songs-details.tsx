"use client";

import { Music } from "lucide-react";
import { useRouter } from "next/navigation";
import { BandSong } from "@prisma/client";

import { BandWithSongs } from "@/types";
import { useModal } from "@/hooks/use-modal-store";

import { NoResults } from "@/components/no-results";
import { SongCardGlobal } from "@/components/song-card-global";
import { PageHeader } from "@/components/page-header";

interface BandSongsProps {
  band: BandWithSongs;
}

export const BandSongsDetails = ({ band }: BandSongsProps) => {
  const router = useRouter();
  const { onOpen } = useModal();

  const onDelete = (song: BandSong) => {
    onOpen("deleteBandSong", { bandSong: song });
  };

  const onEdit = (song: BandSong) => {
    router.push(`/bands/${band.id}/songs/${song?.id}/update`);
  };

  return (
    <>
      <PageHeader title={`${band.name}'s songs`} icon={Music} />
      <div className="flex flex-col">
        {band.songs.length === 0 && (
          <NoResults
            src="/empty-box.png"
            title="No songs could have been found."
          />
        )}
        {band.songs.map((item) => (
          <SongCardGlobal
            key={item.id}
            song={item}
            onDelete={() => onDelete(item)}
            onClick={() => onEdit(item)}
          />
        ))}
      </div>
    </>
  );
};
