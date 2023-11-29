import { Profile, Song, Notification } from "@prisma/client";

export type SongWithProfile = Song & {
  profile: Profile;
};

export type ProfileWithSongsWithProfile = Profile & {
  songs: SongWithProfile[];
};

export type NotificationWithProfile = Notification & {
  issuer: Profile;
  receiver: Profile;
};
