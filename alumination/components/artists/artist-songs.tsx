"use client";

import { ProfileWithSongsWithProfile } from "@/types";
import { SongCard } from "@/components/songs/song-card";
import { NoResults } from "@/components/no-results";
import { SearchInput } from "@/components/search-input";
import { DisplayContainer } from "@/components/display-container";

interface ArtistSongsProps {
  profile: ProfileWithSongsWithProfile;
}

export const ArtistSongs = ({ profile }: ArtistSongsProps) => {
  return (
    <div className="w-full">
      <SearchInput parameter="artistSongName" />
      {profile?.songs?.length === 0 && (
        <NoResults src="/empty-box.png" title="No songs have been found." />
      )}
      <DisplayContainer>
        {profile?.songs?.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            showProfile={false}
            className="bg-zinc-100 dark:bg-slate-700 dark:hover:bg-slate-600"
          />
        ))}
      </DisplayContainer>
    </div>
  );
};
