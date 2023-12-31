"use client";

import { useLoadSongUrl } from "@/hooks/use-load-song-url";
import { usePlayer } from "@/hooks/use-player-store";

import { useGetAlbumSongId } from "@/hooks/use-get-song-album-id";
import { PlayerContentGlobal } from "@/components/player-content-global";

export const AlbumPlayer = () => {
  const { activateId } = usePlayer();
  const { song } = useGetAlbumSongId(activateId);

  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !activateId) {
    return null;
  }

  return <PlayerContentGlobal key={songUrl} song={song} songUrl={songUrl} />;
};
