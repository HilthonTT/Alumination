"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Album as AlbumIcon,
  Bell,
  BoomBox,
  Focus,
  Headphones,
  Music,
  Music2,
  Music3,
  Music4,
  Settings,
  UserSquare,
} from "lucide-react";
import { Profile, Song, Notification, Album, Band } from "@prisma/client";

import { ModeToggle } from "@/components/mode-toggle";
import { NavbarSearch } from "@/components/navigation/navbar-search";
import { ActionTooltip } from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { PingNotification } from "@/components/navigation/ping-notification";
import { LinkElement } from "@/components/navigation/link-element";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/icon";
import { SidebarToggle } from "@/components/navigation/sidebar-toggle";

interface NavbarProps {
  profile: Profile;
  profiles: Profile[];
  songs: Song[];
  notifications: Notification[];
  albums: Album[];
  bands: Band[];
  followingArtists: Profile[];
  createdSongs: Song[];
  isPro: boolean;
}

export const Navbar = ({
  profiles,
  profile,
  songs,
  notifications,
  albums,
  bands,
  followingArtists,
  createdSongs,
  isPro,
}: NavbarProps) => {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const routes = [
    {
      label: "Songs",
      href: "/",
      icon: Music,
      children: null,
      loggedInOnly: false,
    },
    {
      label: "Albums",
      href: "/albums",
      icon: AlbumIcon,
      children: null,
      loggedInOnly: false,
    },
    {
      label: "Artists",
      href: "/artists",
      icon: UserSquare,
      children: null,
      loggedInOnly: false,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: Bell,
      loggedInOnly: true,
    },
    {
      label: "Bands",
      href: "/bands",
      icon: Headphones,
      children: null,
      loggedInOnly: true,
    },
  ];

  const personalRoutes = [
    {
      label: "My songs",
      href: "/my-songs",
      icon: Music,
    },
    {
      label: "My albums",
      href: `/my-albums`,
      icon: AlbumIcon,
    },
    {
      label: "My bands",
      href: `/my-bands`,
      icon: Music3,
    },
    {
      label: "My profile",
      href: `/artists/${profile?.id}`,
      icon: UserSquare,
    },
  ];

  return (
    <div className="fixed bg-slate-200 dark:bg-slate-800 justify-between items-center h-14 w-full mb-16 z-50 flex py-2 px-4 border-b-slate-700">
      <div className="flex items-center">
        <SidebarToggle
          followingArtists={followingArtists}
          createdSongs={createdSongs}
          profile={profile}
          isPro={isPro}
        />
        <Link href="/" className="ml-2">
          <h1
            className="font-semibold text-2xl hidden md:flex items-center gap-x-2
             text-black dark:text-white hover:opacity-75 transition">
            <BoomBox className="h-8 w-8" />
            Alumination
          </h1>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="text-black dark:text-white font-semibold hover:opacity-75 cursor-pointer ml-5 transition flex gap-x-2">
              <Music4 />
              <span className="hidden sm:block lg:block">Browse Music</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52">
            {routes.map((route) => (
              <DropdownMenuItem
                key={route.href}
                onClick={() => {
                  router.push(route.href);
                }}
                className="cursor-pointer">
                <span>{route.label}</span>
                <Icon icon={route.icon} className="ml-auto" />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {isSignedIn && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="text-black dark:text-white font-semibold hover:opacity-75 cursor-pointer ml-5 transition flex gap-x-2">
                <Music2 />
                <span className="hidden sm:block lg:block">My Music</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              {personalRoutes.map((route) => (
                <DropdownMenuItem
                  key={route.href}
                  onClick={() => {
                    router.push(route.href);
                  }}
                  className="cursor-pointer">
                  <span>{route.label}</span>
                  <Icon icon={route.icon} className="ml-auto" />
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <LinkElement
          label="Notifications"
          href="/notifications"
          icon={Bell}
          loggedInOnly>
          {notifications?.length !== 0 && (
            <div className="absolute top-0 -right-1 translate-x-1/2 -translate-y-1/ flex items-center justify-center">
              <PingNotification />
            </div>
          )}
        </LinkElement>
      </div>
      <div className="flex items-center w-[320px] justify-center">
        <NavbarSearch
          data={[
            {
              label: "Songs",
              type: "song",
              data: songs?.map((song) => ({
                id: song.id,
                name: song.title,
                src: song.imageUrl,
              })),
            },
            {
              label: "Albums",
              type: "album",
              data: albums?.map((album) => ({
                id: album.id,
                name: album.title,
                src: album.imageUrl,
              })),
            },
            {
              label: "Artists",
              type: "artist",
              data: profiles?.map((profile) => ({
                id: profile.id,
                name: profile.username,
                src: profile.imageUrl,
              })),
            },
            {
              label: "Bands",
              type: "band",
              data: bands?.map((band) => ({
                id: band.id,
                name: band.name,
                src: band.iconImageUrl,
              })),
            },
          ]}
        />
      </div>

      <div className="flex items-center gap-x-1">
        <ModeToggle />
        <ActionTooltip label="Create">
          <Button
            variant="secondary"
            className="p-2"
            onClick={() => router.push("/songs/create")}>
            <Focus />
          </Button>
        </ActionTooltip>
        <ActionTooltip label="Settings">
          <Button
            variant="secondary"
            className="p-2"
            onClick={() => router.push("/settings")}>
            <Settings />
          </Button>
        </ActionTooltip>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
