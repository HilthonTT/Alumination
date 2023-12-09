"use client";

import { Profile } from "@prisma/client";

import { PageHeader } from "@/components/page-header";
import { UserAvatar } from "@/components/user-avatar";
import { SubscriptionButton } from "@/components/subscription-button";
import { capitalizeFirstLetter } from "@/lib/utils";

interface SettingsDetailsProps {
  isPro: boolean;
  profile: Profile;
}

export const SettingsDetails = ({ isPro, profile }: SettingsDetailsProps) => {
  const capitalizedUsername = capitalizeFirstLetter(profile?.username);

  return (
    <>
      <PageHeader title="Settings" />
      <div className="bg-slate-800 rounded-xl space-x-2 h-full w-full p-2">
        <div className="flex items-center gap-x-2">
          <UserAvatar src={profile?.imageUrl} />
          <span>{capitalizedUsername}</span>
        </div>
        <span className="text-muted-foreground text-sm">
          {isPro
            ? "You are currently on the Pro plan."
            : "You are currently on the free plan."}
        </span>
        <SubscriptionButton isPro={isPro} />
      </div>
    </>
  );
};
