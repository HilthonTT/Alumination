"use client";

import { Music } from "lucide-react";
import { Category } from "@prisma/client";

import { SongWithProfile } from "@/types";
import { SongCard } from "@/components/song-card";
import { NoResults } from "@/components/no-results";
import { Categories } from "@/components/categories";
import { PageHeader } from "@/components/page-header";

interface SongsProps {
  data: SongWithProfile[];
  categories: Category[];
}

export const Songs = ({ data, categories }: SongsProps) => {
  if (data.length === 0) {
    return <NoResults src="/empty-box.png" title="No songs have been found." />;
  }

  return (
    <>
      <PageHeader title="Songs" icon={Music} />
      <Categories data={categories} />
      <div className="gap-2 pb-10 grid grid-cols-4">
        {data.map((item) => (
          <SongCard key={item.id} song={item} />
        ))}
      </div>
    </>
  );
};
