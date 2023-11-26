import { Song } from "@prisma/client";
import { usePlayer } from "@/hooks/use-player-store";

export const useOnPlay = (songs: Song[]) => {
  const { setIds, setId } = usePlayer();

  const onPlay = (id: string) => {
    setId(id);
    setIds(songs.map((song) => song.id));
  };

  return onPlay;
};
