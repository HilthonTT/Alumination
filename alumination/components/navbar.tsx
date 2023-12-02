"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Album as AlbumIcon, Bell, BoomBox, Focus, Music } from "lucide-react";
import { Profile, Song, Notification, Album } from "@prisma/client";

import { ModeToggle } from "@/components/mode-toggle";
import { NavbarSearch } from "@/components/navbar-search";
import { ActionTooltip } from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { PingNotification } from "@/components/ping-notification";
import { LinkElement } from "@/components/link-element";

interface NavbarProps {
  profiles: Profile[];
  songs: Song[];
  notifications: Notification[];
  albums: Album[];
}

export const Navbar = ({
  profiles,
  songs,
  notifications,
  albums,
}: NavbarProps) => {
  const router = useRouter();

  const routes = [
    {
      label: "Albums",
      href: "/albums",
      icon: AlbumIcon,
      children: null,
      loggedInOnly: false,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: Bell,
      children: (
        <>
          {notifications?.length !== 0 && (
            <div className="absolute top-0 -right-1 translate-x-1/2 -translate-y-1/ flex items-center justify-center">
              <PingNotification />
            </div>
          )}
        </>
      ),
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

        {routes?.map((route) => (
          <LinkElement key={route.href} {...route}>
            {route.children && route.children}
          </LinkElement>
        ))}
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
