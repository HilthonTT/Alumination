"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";

import { useDebounce } from "@/hooks/use-debouce";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  parameter: string;
}

export const SearchInput = ({ parameter }: SearchInputProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchedParameter = searchParams.get(parameter);

  const [value, setValue] = useState(searchedParameter || "");
  const debounceValue = useDebounce<string>(value, 500);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = {
      [parameter]: debounceValue,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debounceValue, router]);

  return (
    <div className="relative mb-5">
      <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={onChange}
        placeholder="Search..."
        className="pl-10"
      />
    </div>
  );
};
