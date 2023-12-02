"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Profile, Song } from "@prisma/client";

interface MobileToggleProps {
  followingArtists: Profile[];
  createdSongs: Song[];
}

export const MobileToggle = ({}: MobileToggleProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0">
        <div className="w-[72px]"></div>
      </SheetContent>
    </Sheet>
  );
};
