"use client";

import {
  ChevronRight,
  Home,
  SquareUserRound,
  Music,
  Search,
  Album,
  Headphones,
  UserSquare,
} from "lucide-react";
import { Profile, Song } from "@prisma/client";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarLink } from "@/components/navigation/sidebar-link";
import { ArtistTab } from "@/components/navigation/artist-tab";
import { SongTab } from "@/components/navigation/song-tab";

interface SidebarContentProps {
  profile: Profile;
  followingArtists: Profile[];
  createdSongs: Song[];
  onClose?: () => void;
}

export const SidebarContent = ({
  profile,
  followingArtists,
  createdSongs,
  onClose,
}: SidebarContentProps) => {
  const routes = [
    {
      label: "Songs",
      href: "/",
      icon: Music,
    },
    {
      label: "Albums",
      href: "/albums",
      icon: Album,
    },
    {
      label: "Bands",
      href: "/bands",
      icon: Headphones,
    },
    {
      label: "Artists",
      href: "/artists",
      icon: UserSquare,
    },
  ];

  return (
    <ScrollArea className="w-full h-full rounded-md">
      <div className="mt-10 p-4">
        <div className="relative">
          <SidebarLink label="Home" icon={Home} href="/" onClose={onClose} />
          <SidebarLink
            label="Your channel"
            icon={SquareUserRound}
            href={`/artists/${profile?.id}`}
            onClose={onClose}
          />
        </div>
        <Separator className="border border-b-0 border-zinc-500 items-center my-3" />
        <div className="relative">
          {followingArtists?.length !== 0 && (
            <>
              <h2 className="flex items-center gap-2 font-semibold mb-2">
                Subscription <ChevronRight />
              </h2>
              {followingArtists?.map((artist) => (
                <ArtistTab key={artist.id} artist={artist} onClose={onClose} />
              ))}
            </>
          )}
          {createdSongs?.length !== 0 && (
            <>
              <h2 className="flex items-center gap-2 font-semibold mb-2">
                Uploaded songs <Music className="h-5 w-5" />
              </h2>
              {createdSongs?.map((song) => (
                <SongTab key={song.id} song={song} onClose={onClose} />
              ))}
            </>
          )}
          <h2 className="flex items-center gap-2 font-semibold mb-2">
            Explore <Search className="h-5 w-5" />
          </h2>

          {routes.map((route) => (
            <SidebarLink key={route.href} {...route} onClose={onClose} />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};
