import { Profile, Song } from "@prisma/client";

export type SongWithProfile = Song & {
  profile: Profile;
};
