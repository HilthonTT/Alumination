import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { db } from "@/lib/prismadb";
import { AlbumSong } from "@prisma/client";

export const useGetBandSongId = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<AlbumSong | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    try {
      const fetchSong = async () => {
        const response = await fetch(`/api/bands/songs/${id}`);
        const songData = await response.json();

        setSong(songData as AlbumSong);
        setIsLoading(false);
      };

      fetchSong();
    } catch (error) {
      setIsLoading(false);
      console.log("[USE_GET_SONGS_ALBUM_ID_HOOK]", error);
      toast.error("Something went wrong.");
    }
  }, [db, id]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};
