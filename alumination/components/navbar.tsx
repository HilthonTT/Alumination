"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { BoomBox } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import { NavbarSearch } from "@/components/navbar-search";

export const Navbar = () => {
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
        <NavbarSearch data={[]} />
      </div>
      <div className="flex items-center gap-x-3">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
