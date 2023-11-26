import { useEffect, useMemo, useState } from "react";

import { Song } from "@prisma/client";
import { db } from "@/lib/prismadb";

export const useGetSongId = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
      const song = await db?.song.findUnique({
        where: {
          id,
        },
      });

      setSong(song);
      setIsLoading(false);
    };

    fetchSong();
  }, [id, db]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};
