"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

import { Category } from "@prisma/client";
import { cn } from "@/lib/utils";

interface CategoriesProps {
  data: Category[];
}

export const Categories = ({ data }: CategoriesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const onClick = (id: string | undefined) => {
    const query = { categoryId: id };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="mt-5 mb-3">
      <div className="flex items-center justify-center gap-2">
        <div
          onClick={() => onClick(undefined)}
          className={cn(
            ` p-2 rounded-lg hover:bg-slate-500 transition cursor-pointer px-4`,
            !categoryId ? "bg-slate-500" : "bg-slate-700"
          )}>
          <span className="truncate text-sm text-white">All</span>
        </div>
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => onClick(item.id)}
            className={cn(
              ` p-2 rounded-lg hover:bg-slate-500 transition cursor-pointer px-4`,
              categoryId === item.id ? "bg-slate-500" : "bg-slate-700"
            )}>
            <span className="truncate text-sm text-white">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
