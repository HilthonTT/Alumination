"use client";

import { Menu } from "lucide-react";
import { Profile, Song } from "@prisma/client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarContent } from "@/components/navigation/sidebar-content";

interface MobileToggleProps {
  followingArtists: Profile[];
  createdSongs: Song[];
  profile: Profile;
}

export const SidebarToggle = ({
  followingArtists,
  createdSongs,
  profile,
}: MobileToggleProps) => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} defaultOpen={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0">
        <div className="w-full">
          <SidebarContent
            profile={profile}
            followingArtists={followingArtists}
            createdSongs={createdSongs}
            onClose={onClose}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
