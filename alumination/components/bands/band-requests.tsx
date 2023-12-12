"use client";

import { Headphones } from "lucide-react";
import { Band } from "@prisma/client";

import { BandRequestWithProfile } from "@/types";
import { SearchInput } from "@/components/search-input";
import { NoResults } from "@/components/no-results";
import { PageHeader } from "@/components/page-header";
import { BandRequestCard } from "@/components/bands/band-request-card";

interface BandRequestsProps {
  requests: BandRequestWithProfile[];
  band: Band;
}

export const BandRequests = ({ requests, band }: BandRequestsProps) => (
  <>
    <PageHeader title="Your band's requests" icon={Headphones} />
    <div className="w-full">
      <SearchInput parameter="username" />
      {requests?.length === 0 && (
        <NoResults src="/empty-box.png" title="No requests have been found." />
      )}

      {requests?.map((request) => (
        <BandRequestCard key={request.id} request={request} band={band} />
      ))}
    </div>
  </>
);
