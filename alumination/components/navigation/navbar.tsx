"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Album as AlbumIcon,
  Bell,
  BoomBox,
  Focus,
  Music,
  Music2,
  Music4,
  UserSquare,
} from "lucide-react";
import { Profile, Song, Notification, Album } from "@prisma/client";

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

interface NavbarProps {
  profile: Profile;
  profiles: Profile[];
  songs: Song[];
  notifications: Notification[];
  albums: Album[];
}

export const Navbar = ({
  profiles,
  profile,
  songs,
  notifications,
  albums,
}: NavbarProps) => {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const routes = [
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
      label: "My songs",
      href: "/my-songs",
      icon: Music,
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
      label: "My profile",
      href: `/artists/${profile?.id}`,
      icon: UserSquare,
    },
  ];

  const notificationChildren = (
    <>
      {notifications?.length !== 0 && (
        <div className="absolute top-0 -right-1 translate-x-1/2 -translate-y-1/ flex items-center justify-center">
          <PingNotification />
        </div>
      )}
    </>
  );

  return (
    <div className="fixed bg-slate-800 justify-between items-center h-14 w-full mb-16 z-50 flex py-2 px-4 border-b-slate-700">
      <div className="flex items-center">
        <Link href="/">
          <h1
            className="font-semibold text-2xl hidden md:flex items-center gap-x-2
             text-white hover:opacity-75 transition">
            <BoomBox className="h-8 w-8" />
            Alumination
          </h1>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="text-white hover:opacity-75 cursor-pointer ml-5 transition flex gap-x-2">
              <Music4 />
              Browse Music
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
              <div className="text-white hover:opacity-75 cursor-pointer ml-5 transition flex gap-x-2">
                <Music2 />
                My Music
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
          children={notificationChildren}
          icon={Bell}
          loggedInOnly
        />
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
              label: "Albms",
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
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
