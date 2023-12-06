import {
  Profile,
  Song,
  Notification,
  Album,
  AlbumSong,
  Band,
  Member,
} from "@prisma/client";

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

export type AlbumWithProfile = Album & {
  profile: Profile;
};

export type AlbumWithProfileWithSongs = Album & {
  profile: Profile;
  songs: AlbumSong[];
};

export type MemberWithProfile = Member & {
  profile: Profile;
};

export type BandWithMembersWithProfiles = Band & {
  members: MemberWithProfile[];
};

export type BandWithMembers = Band & {
  members: Member[];
};
