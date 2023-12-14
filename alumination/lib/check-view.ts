import { Profile } from "@prisma/client";

import { db } from "@/lib/prismadb";
import { SongWithViewsWithProfile } from "@/types";

export const checkView = async (
  song: SongWithViewsWithProfile,
  profile: Profile | null
) => {
  const isViewed = !!song?.views.find((view) => view.profileId == profile?.id);

  if (isViewed || !profile) {
    return song;
  }

  const updatedSong = await db.song.update({
    where: {
      id: song?.id,
    },
    data: {
      views: {
        create: {
          profileId: profile?.id,
        },
      },
    },
    include: {
      profile: true,
      views: true,
    },
  });

  return updatedSong;
};
