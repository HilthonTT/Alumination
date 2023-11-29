"use client";

import { Following } from "@prisma/client";

import { ProfileWithSongsWithProfile } from "@/types";
import { ArtistHeader } from "@/components/artists/artist-header";
import { Separator } from "@/components/ui/separator";
import { ArtistSongs } from "@/components/artists/artist-songs";

interface ArtistDetailsProps {
  profile: ProfileWithSongsWithProfile;
  isOwner: boolean;
  isFollowing: boolean;
  followers: Following[];
  following: Following[];
}

export const ArtistDetails = ({
  profile,
  isOwner,
  isFollowing,
  following,
  followers,
}: ArtistDetailsProps) => {
  return (
    <div className="bg-slate-800 rounded-xl p-3">
      <ArtistHeader
        profile={profile}
        isOwner={isOwner}
        isFollowing={isFollowing}
        followers={followers}
        following={following}
      />
      <Separator className="border border-slate-200 rounded-full my-4" />
      <ArtistSongs profile={profile} />
    </div>
  );
};
