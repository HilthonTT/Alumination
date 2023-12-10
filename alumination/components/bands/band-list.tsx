"use client";

import { BandWithProfile } from "@/types";
import { NoResults } from "@/components/no-results";
import { BandCard } from "@/components/bands/band-card";
import { DisplayContainer } from "@/components/display-container";

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
      <DisplayContainer>
        {data.map((item) => (
          <BandCard key={item.id} band={item} />
        ))}
      </DisplayContainer>
    </div>
  );
};
