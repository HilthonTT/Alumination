"use client";

import { Album, Band, Following } from "@prisma/client";
import { User } from "lucide-react";

import { ProfileWithSongsWithProfile } from "@/types";
import { ArtistHeader } from "@/components/artists/artist-header";
import { Separator } from "@/components/ui/separator";
import { ArtistSongs } from "@/components/artists/artist-songs";
import { PageHeader } from "@/components/page-header";
import { ArtistAlbums } from "@/components/artists/artist-albums";
import { ArtistBands } from "@/components/artists/artist-bands";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ArtistDetailsProps {
  profile: ProfileWithSongsWithProfile;
  isOwner: boolean;
  isFollowing: boolean;
  followers: Following[];
  following: Following[];
  albums: Album[];
  bands: Band[];
}

export const ArtistDetails = ({
  profile,
  isOwner,
  isFollowing,
  following,
  followers,
  albums,
  bands,
}: ArtistDetailsProps) => {
  const pageTitle = isOwner ? "My Profile" : "Hilthon's Profile";

  return (
    <>
      <PageHeader title={pageTitle} icon={User} />
      <div className="bg-zinc-200 dark:bg-slate-800 rounded-xl p-3 mb-4">
        <ArtistHeader
          profile={profile}
          isOwner={isOwner}
          isFollowing={isFollowing}
          followers={followers}
          following={following}
        />
        <Separator className="border border-zinc-600 dark:border-slate-200 rounded-full my-4" />
        <Tabs defaultValue="songs">
          <TabsList className="grid grid-cols-3 w-full bg-zinc-200 dark:bg-slate-800">
            <TabsTrigger value="songs" className="hover:opacity-75 transition">
              Songs
            </TabsTrigger>
            <TabsTrigger value="albums" className="hover:opacity-75 transition">
              Albums
            </TabsTrigger>
            <TabsTrigger value="bands" className="hover:opacity-75 transition">
              Bands
            </TabsTrigger>
          </TabsList>
          <TabsContent value="songs">
            <ArtistSongs profile={profile} />
          </TabsContent>
          <TabsContent value="albums">
            <ArtistAlbums albums={albums} />
          </TabsContent>
          <TabsContent value="bands">
            <ArtistBands bands={bands} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
