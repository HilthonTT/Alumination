import { User } from "@clerk/nextjs/server";

import { Profile } from "@prisma/client";
import { db } from "@/lib/prismadb";

export const verifyIntegrity = async (fetchedProfile: Profile, user: User) => {
  let isDirty = false;

  if (fetchedProfile?.username !== user.username) {
    isDirty = true;
  }

  if (fetchedProfile?.email !== user.emailAddresses[0].emailAddress) {
    isDirty = true;
  }

  if (fetchedProfile?.userId !== user.id) {
    isDirty = true;
  }

  if (fetchedProfile?.imageUrl !== user.imageUrl) {
    isDirty = true;
  }

  if (isDirty) {
    const updatedProfile = await db.profile.update({
      where: {
        userId: fetchedProfile?.userId,
      },
      data: {
        userId: user.id,
        username: user.username || "",
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
      },
    });

    return updatedProfile;
  }

  return fetchedProfile;
};
