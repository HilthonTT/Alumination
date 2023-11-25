import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/prismadb";
import { verifyIntegrity } from "@/lib/verify-integrity";

export const currentProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!profile) {
    return null;
  }

  const verifiedProfile = await verifyIntegrity(profile, user);

  return verifiedProfile;
};
