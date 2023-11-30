"use client";

import { ArrowLeftCircle, ArrowRightCircle, LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageHeader {
  title: string;
  icon?: LucideIcon;
}

export const PageHeader = ({ title, icon: Icon }: PageHeader) => {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center w-full mt-3 mb-3">
      <button
        onClick={() => router.back()}
        className="hover:opacity-75 transition bg-transparent">
        <ArrowLeftCircle className="h-8 w-8" />
        <span className="sr-only">Back</span>
      </button>
      <h1 className="text-2xl font-semibold mb-5 flex items-center">
        <div className="flex items-center justify-center space-x-3">
          {Icon && <Icon className="h-8 w-8" />}
          <span>{title}</span>
        </div>
      </h1>
      <button
        onClick={() => router.forward()}
        className="hover:opacity-75 transition bg-transparent">
        <ArrowRightCircle className="h-8 w-8" />
        <span className="sr-only">Forward</span>
      </button>
    </div>
  );
};
