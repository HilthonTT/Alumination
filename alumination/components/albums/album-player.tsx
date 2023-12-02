"use client";

import { useLoadSongUrl } from "@/hooks/use-load-song-url";
import { usePlayer } from "@/hooks/use-player-store";

import { AlbumPlayerContent } from "@/components/albums/album-player-content";
import { useGetAlbumSongId } from "@/hooks/use-get-song-album-id";

export const AlbumPlayer = () => {
  const { activateId } = usePlayer();
  const { song } = useGetAlbumSongId(activateId);

  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !activateId) {
    return null;
  }

  return <AlbumPlayerContent key={songUrl} song={song} songUrl={songUrl} />;
};
