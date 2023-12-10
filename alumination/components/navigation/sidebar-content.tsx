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
  Upload,
  UploadCloud,
  Settings,
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
  isPro: boolean;
}

export const SidebarContent = ({
  profile,
  followingArtists,
  createdSongs,
  onClose,
  isPro,
}: SidebarContentProps) => {
  const mainRoutes = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      isPro: false,
    },
    {
      label: "My channel",
      href: `/artists/${profile?.id}`,
      icon: SquareUserRound,
      isPro: false,
    },
    {
      label: "Upload a song",
      href: "/songs/create",
      icon: Upload,
      isPro: false,
    },
    {
      label: "Make an album",
      href: "/albums/create",
      icon: UploadCloud,
      isPro: false,
    },
    {
      label: "Make a band",
      href: "/bands/create",
      icon: Headphones,
      isPro: true,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
      isPro: false,
    },
  ];

  const exploreRoutes = [
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
          {mainRoutes?.map((route) => (
            <SidebarLink
              key={route.href}
              {...route}
              onClose={onClose}
              userPro={isPro}
            />
          ))}
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

          {exploreRoutes.map((route) => (
            <SidebarLink
              key={route.href}
              {...route}
              onClose={onClose}
              userPro={isPro}
              isPro={false}
            />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};
