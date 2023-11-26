"use client";

import Image from "next/image";

interface NoResultsProps {
  src: string;
  title: string;
}

export const NoResults = ({ src, title }: NoResultsProps) => {
  return (
    <div className="pt-10 flex flex-col items-center justify-center space-y-3">
      <div className="relative h-52 w-52">
        <Image src={src} alt="Empty" fill className="grayscale" />
      </div>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
};
