import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/prismadb";
import { verifyIntegrity } from "@/lib/verify-integrity";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return verifyIntegrity(profile, user);
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      username: user.username || "",
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
