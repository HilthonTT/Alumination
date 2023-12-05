"use client";

import { Band } from "@prisma/client";

interface BandCardProps {
  band: Band;
}

export const BandCard = ({ band }: BandCardProps) => {
  return <div>{band.name}</div>;
};
