"use client";

import { useRouter } from "next/navigation";
import { Album, Upload } from "lucide-react";
import { Band } from "@prisma/client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search-input";
import { NoResults } from "@/components/no-results";
import { BandCard } from "@/components/bands/band-card";

interface MyBandsDetailsProps {
  bands: Band[];
}

export const MyBandsDetails = ({ bands }: MyBandsDetailsProps) => {
  const router = useRouter();

  return (
    <>
      <PageHeader title="My Albums" icon={Album} />
      <div className="bg-slate-800 rounded-xl p-3 w-full">
        <div className="flex items-center justify-end  mb-4">
          <Button onClick={() => router.push("/bands/create")}>
            <Upload className="mr-auto" />
            Upload an album
          </Button>
        </div>
        <SearchInput parameter="myBandName" />

        {bands?.length === 0 && (
          <NoResults src="/empty-box.png" title="No albums have been found." />
        )}
        <div className="gap-2 grid md:grid-cols-3 grid-cols-4">
          {bands?.map((band) => (
            <BandCard key={band.id} band={band} />
          ))}
        </div>
      </div>
    </>
  );
};
