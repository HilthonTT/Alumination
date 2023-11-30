"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface LinkElementProps {
  label: string;
  href: string;
  loggedInOnly: boolean;
  children?: ReactNode;
  icon?: LucideIcon;
}

export const LinkElement = ({
  label,
  href,
  children,
  loggedInOnly,
  icon: Icon,
}: LinkElementProps) => {
  const { isSignedIn } = useUser();

  const visible = loggedInOnly ? isSignedIn : true;

  return (
    <>
      {visible && (
        <div className="ml-5 mr-0">
          <Link href={href} className="relative">
            <div className="flex items-center space-x-2 hover:opacity-75 transition">
              {Icon && <Icon className="h-4 w-4" />}
              <span className="text-white relative">{label}</span>
              {children}
            </div>
          </Link>
        </div>
      )}
    </>
  );
};