"use client";

import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface SidebarLinkProps {
  label: string;
  href: string;
  icon: LucideIcon;
  onClose?: () => void;
}

export const SidebarLink = ({
  label,
  href,
  icon: Icon,
  onClose = () => {},
}: SidebarLinkProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(href);
    onClose();
  };

  return (
    <a
      onClick={onClick}
      className="flex items-center hover:bg-slate-700/50 transition rounded-full cursor-pointer p-2 mb-2"
      title="Home">
      <Icon />
      <span className="ml-4">{label}</span>
    </a>
  );
};
