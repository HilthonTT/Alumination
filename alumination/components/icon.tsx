"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface IconProps {
  icon: LucideIcon;
  className?: string;
}

export const Icon = ({ icon, className }: IconProps) => {
  const Icon = icon;

  return <Icon className={cn(className)} />;
};
