"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface DisplayContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const DisplayContainer = ({
  children,
  className,
}: DisplayContainerProps) => {
  return (
    <div
      className={cn(
        "gap-2 pb-10 px-12 sm:px-0 md:px-0 grid sm:grid-cols-1 md:grid-cols-3",
        className
      )}>
      {children}
    </div>
  );
};
