import { db } from "@/lib/prismadb";

export const checkRequest = async (
  bandId: string | undefined,
  profileId: string | undefined
) => {
  if (!bandId || !profileId) {
    return null;
  }

  const request = await db.bandRequest.findFirst({
    where: {
      bandId: bandId,
      profileId: profileId,
    },
  });

  return request;
};
