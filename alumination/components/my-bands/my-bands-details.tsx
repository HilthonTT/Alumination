"use client";

import { useRouter } from "next/navigation";
import { Album, Upload } from "lucide-react";
import { Band } from "@prisma/client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search-input";
import { NoResults } from "@/components/no-results";
import { BandCard } from "@/components/bands/band-card";
import { DisplayContainer } from "@/components/display-container";

interface MyBandsDetailsProps {
  bands: Band[];
  isPro: boolean;
}

export const MyBandsDetails = ({ bands, isPro }: MyBandsDetailsProps) => {
  const router = useRouter();

  return (
    <>
      <PageHeader title="My Bands" icon={Album} />
      <div className="bg-zinc-200 dark:bg-slate-800 rounded-xl p-3 w-full">
        {isPro && (
          <div className="flex items-center justify-end  mb-4">
            <Button onClick={() => router.push("/bands/create")}>
              <Upload className="mr-auto" />
              Create a band
            </Button>
          </div>
        )}
        <SearchInput parameter="myBandName" />

        {bands?.length === 0 && (
          <NoResults src="/empty-box.png" title="No albums have been found." />
        )}
        <DisplayContainer>
          {bands?.map((band) => (
            <BandCard key={band.id} band={band} />
          ))}
        </DisplayContainer>
      </div>
    </>
  );
};
