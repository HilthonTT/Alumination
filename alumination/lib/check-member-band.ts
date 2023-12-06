import { BandWithMembers } from "@/types";
import { Profile } from "@prisma/client";

export function CheckIfMemberBand(band: BandWithMembers, profile: Profile) {
  const isOwner = band?.profileId === profile?.id;
  const isAllowed =
    isOwner || !!band?.members.find((member) => member?.id === profile?.id);

  return isAllowed;
}
