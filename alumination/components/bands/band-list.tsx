"use client";

import { NoResults } from "@/components/no-results";
import { BandCard } from "@/components/bands/band-card";
import { BandWithProfile } from "@/types";

interface BandListProps {
  data: BandWithProfile[];
  title: string;
}

export const BandList = ({ data, title }: BandListProps) => {
  return (
    <div className="space-y-4 mt-5">
      <div className="font-bold text-3xl">{title}</div>
      {data.length === 0 && (
        <NoResults title="No related songs found." src="/empty-box.png" />
      )}
      <div className="grid grid-cols-1 px-40 sm:px-12 md:p-0 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((item) => (
          <BandCard key={item.id} band={item} />
        ))}
      </div>
    </div>
  );
};
