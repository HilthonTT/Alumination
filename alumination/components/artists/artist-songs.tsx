"use client";

import { ProfileWithSongsWithProfile } from "@/types";
import { SongCard } from "@/components/song-card";
import { ArtistSearchInput } from "@/components/artists/artist-songs-search-input";
import { NoResults } from "@/components/no-results";

interface ArtistSongsProps {
  profile: ProfileWithSongsWithProfile;
}

export const ArtistSongs = ({ profile }: ArtistSongsProps) => {
  return (
    <div className="w-full">
      <ArtistSearchInput profile={profile} />
      {profile?.songs?.length === 0 && (
        <NoResults src="/empty-box.png" title="No songs have been found." />
      )}
      <div className="gap-2 grid md:grid-cols-3 grid-cols-4">
        {profile?.songs?.map((song) => (
          <SongCard key={song.id} song={song} showProfile={false} />
        ))}
      </div>
    </div>
  );
};
