"use client";

import { ProfileWithSongsWithProfile } from "@/types";
import { ArtistHeader } from "@/components/artists/artist-header";
import { Separator } from "@/components/ui/separator";
import { ArtistSongs } from "@/components/artists/artist-songs";

interface ArtistDetailsProps {
  profile: ProfileWithSongsWithProfile;
}

export const ArtistDetails = ({ profile }: ArtistDetailsProps) => {
  return (
    <div className="bg-slate-800 rounded-xl p-3">
      <ArtistHeader profile={profile} />
      <Separator className="border border-slate-200 rounded-full my-4" />
      <ArtistSongs profile={profile} />
    </div>
  );
};
