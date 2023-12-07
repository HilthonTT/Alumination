"use client";

import { useLoadSongUrl } from "@/hooks/use-load-song-url";
import { usePlayer } from "@/hooks/use-player-store";

import { PlayerContentGlobal } from "@/components/player-content-global";
import { useGetBandSongId } from "@/hooks/use-get-song-band-id";

export const BandPlayer = () => {
  const { activateId } = usePlayer();
  const { song } = useGetBandSongId(activateId);

  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !activateId) {
    return null;
  }

  return <PlayerContentGlobal key={songUrl} song={song} songUrl={songUrl} />;
};
