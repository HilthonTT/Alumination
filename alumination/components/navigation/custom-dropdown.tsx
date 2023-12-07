"use client";

import { useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface CustomDropdownProps {
  loggedInOnly: boolean;
  href: string;
  label: string;
  icon: LucideIcon;
}

export const CustomDropdown = ({
  href,
  label,
  icon,
  loggedInOnly,
}: CustomDropdownProps) => {
  const router = useRouter();

  const Icon = icon;

  const onClick = () => {
    router.push(href);
  };

  return (
    <>
      {loggedInOnly && (
        <DropdownMenuItem onClick={onClick} className="cursor-pointer">
          <span>{label}</span>
          <Icon className="ml-auto" />
        </DropdownMenuItem>
      )}
    </>
  );
};
