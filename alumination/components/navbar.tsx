"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { BoomBox, Focus } from "lucide-react";
import { useRouter } from "next/navigation";

import { ModeToggle } from "@/components/mode-toggle";
import { NavbarSearch } from "@/components/navbar-search";
import { ActionTooltip } from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";

import { Profile, Song } from "@prisma/client";

interface NavbarProps {
  profiles: Profile[];
  songs: Song[];
}

export const Navbar = ({ profiles, songs }: NavbarProps) => {
  const router = useRouter();

  return (
    <div className="fixed bg-slate-800 justify-between items-center h-14 w-full mb-16 z-50 flex py-2 px-4 border-b-slate-700">
      <div className="flex items-center">
        <Link href="/">
          <h1
            className="font-semibold text-2xl hidden md:flex items-center gap-x-2
             text-white hover:text-zinc-200 transition">
            <BoomBox className="h-8 w-8" />
            Alumination
          </h1>
        </Link>
      </div>
      <div className="flex items-center w-[300px] justify-center">
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
