"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { NotificationType } from "@prisma/client";

import { NotificationWithProfile } from "@/types";
import { ActionTooltip } from "@/components/action-tooltip";
import { capitalizeFirstLetter } from "@/lib/utils";

interface NotificationCardProps {
  notification: NotificationWithProfile;
}

export const NotificationCard = ({ notification }: NotificationCardProps) => {
  const router = useRouter();

  const capitalizedUsername = capitalizeFirstLetter(
    notification?.issuer?.username
  );

  const onClick = () => {
    switch (notification.type) {
      case NotificationType.SONG:
        return router.push(`/songs/${notification.itemId}`);
      case NotificationType.ALBUM:
        return router.push(`/albums/${notification.itemId}`);
    }
  };

  const label =
    notification.type === NotificationType.ALBUM ? "Visit album" : "Visit song";

  return (
    <div className="flex items-center w-full bg-zinc-200 dark:bg-slate-700 p-2 rounded-full mb-5">
      <ActionTooltip label={capitalizedUsername}>
        <div
          onClick={() => router.push(`/artists/${notification?.issuerId}`)}
          className="relative h-20 w-20 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-32 lg:w-32
                hover:opacity-75 cursor-pointer transition">
          <div className="rounded-full overflow-hidden">
            <Image
              src={notification?.issuer?.imageUrl}
              alt="Issuer Profile Picture"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </ActionTooltip>
      <div className="ml-3">
        <p className="text-base sm:text-xl font-bold break-words overflow-hidden">
          {capitalizedUsername} {notification.body}
        </p>
      </div>
      <div className="ml-auto mr-10">
        <ActionTooltip label={label}>
          <button
            onClick={onClick}
            className="flex items-center justify-center hover:opacity-75 transition">
            <span className="sr-only">Visit {label}</span>
            <ArrowRight className="h-8 w-8" />
          </button>
        </ActionTooltip>
      </div>
    </div>
  );
};
