"use client";

import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

export const NavigationArrows = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Container
      className={cn("mb-5 mt-3", pathname === "/" ? "max-w-5xl" : "max-w-3xl")}>
      <div className="flex justify-between items-center w-full">
        <button
          onClick={() => router.back()}
          className="hover:opacity-75 transition bg-transparent">
          <ArrowLeftCircle className="h-8 w-8" />
          <span className="sr-only">Back</span>
        </button>
        <button
          onClick={() => router.forward()}
          className="hover:opacity-75 transition bg-transparent">
          <ArrowRightCircle className="h-8 w-8" />
          <span className="sr-only">Forward</span>
        </button>
      </div>
    </Container>
  );
};
