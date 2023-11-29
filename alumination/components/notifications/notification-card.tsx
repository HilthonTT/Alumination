"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { NotificationWithProfile } from "@/types";
import { ActionTooltip } from "@/components/action-tooltip";
import { capitalizeFirstLetter } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface NotificationCardProps {
  notification: NotificationWithProfile;
}

export const NotificationCard = ({ notification }: NotificationCardProps) => {
  const router = useRouter();

  const capitalizedUsername = capitalizeFirstLetter(
    notification?.issuer?.username
  );

  return (
    <div className="flex items-center w-full bg-slate-700 p-2 rounded-full">
      <ActionTooltip label={capitalizedUsername}>
        <div
          onClick={() => router.push(`/artists/${notification?.issuerId}`)}
          className="relative h-24 w-24 hover:opacity-75 hover:cursor-pointer transition">
          <Image
            src={notification?.issuer?.imageUrl}
            alt="Issuer Profile Picture"
            fill
            className="object-cover"
          />
        </div>
      </ActionTooltip>
      <div className="ml-3">
        <p className="text-xl font-bold">
          {capitalizedUsername} {notification.body}
        </p>
      </div>
      <div className="ml-auto mr-10">
        <button
          onClick={() => router.push(`/songs/${notification.songId}`)}
          className="flex items-center justify-center hover:opacity-75 transition">
          <ArrowRight className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};
