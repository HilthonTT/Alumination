"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { UserAvatar } from "@/components/user-avatar";

type DataType = "artist" | "band" | "album" | "song";

interface NavbarSearchProps {
  data: {
    label: string;
    type: DataType;
    data: {
      src?: string;
      name: string;
      id: string;
    }[];
  }[];
}

export const NavbarSearch = ({ data }: NavbarSearchProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onClick = ({ id, type }: { id: string; type: DataType }) => {
    setOpen(false);

    switch (type) {
      case "artist":
        return router.push(`/artists/${id}`);
      case "album":
        return router.push(`/albums/${id}`);
      case "band":
        return router.push(`/bands/${id}`);
      case "song":
        return router.push(`/songs/${id}`);
    }
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  });

  return (
    <>
      <div className="w-full hidden sm:block lg:block">
        <button
          onClick={() => setOpen(true)}
          className="group px-2 py-2 rounded-full flex items-center gap-x-2 lg:w-full md:w-[50%]
         border-zinc-400 dark:border-zinc-600 border">
          <Search className="text-black dark:text-white" />
          <p className="font-semibold text-sm text-zinc-500 group-hover:text-zinc-300 transition">
            Search
          </p>
          <kbd
            className="pointer-events-none inline-flex h-5 select-none items-center 
          gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] 
          font-medium text-muted-foreground ml-auto">
            <span className="text-xs">CTRL</span>K
          </kbd>
        </button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search your favorite artist, band, album and music!" />
          <CommandList>
            <CommandEmpty>No Results</CommandEmpty>
            {data.map(({ label, type, data }) => {
              if (!data.length) {
                return null;
              }

              return (
                <CommandGroup key={label} heading={label}>
                  {data?.map(({ id, src, name }) => {
                    return (
                      <CommandItem
                        key={id}
                        onSelect={() => onClick({ id, type })}
                        className="cursor-pointer transition">
                        <UserAvatar src={src} />
                        <span className="ml-2 truncate">{name}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              );
            })}
          </CommandList>
        </CommandDialog>
      </div>
    </>
  );
};
