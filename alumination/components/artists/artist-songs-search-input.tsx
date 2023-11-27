"use client";

import qs from "query-string";
import { Profile } from "@prisma/client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";

import { capitalizeFirstLetter } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debouce";
import { Input } from "@/components/ui/input";

interface ArtistSearchInputProps {
  profile: Profile;
}

export const ArtistSearchInput = ({ profile }: ArtistSearchInputProps) => {
  const capitalizedUsername = capitalizeFirstLetter(profile?.username);

  const router = useRouter();
  const searchParams = useSearchParams();

  const artistSongName = searchParams.get("artistSongName");

  const [value, setValue] = useState(artistSongName || "");
  const debounceValue = useDebounce<string>(value, 500);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = {
      artistSongName: debounceValue,
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
        placeholder={`Search songs published by ${capitalizedUsername}...`}
        className="pl-10"
      />
    </div>
  );
};
