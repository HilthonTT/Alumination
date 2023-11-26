import { Song } from "@prisma/client";

import { supabase } from "@/lib/supabase";

export const useLoadSongUrl = (song: Song) => {
  if (!song) {
    return "";
  }

  const { data: songData } = supabase.storage
    .from("songs")
    .getPublicUrl(song.songPath);

  return songData.publicUrl;
};
