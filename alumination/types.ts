import {
  Profile,
  Song,
  Notification,
  Album,
  AlbumSong,
  Band,
  Member,
  BandSong,
  BandRequest,
  View,
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

export type BandWithMembersWithProfilesWithSongs = Band & {
  members: MemberWithProfile[];
  songs: BandSong[];
};

export type BandWithMembers = Band & {
  members: Member[];
};

export type BandWithProfile = Band & {
  profile: Profile;
};

export type BandWithSongs = Band & {
  songs: BandSong[];
};

export type BandRequestWithProfile = BandRequest & {
  profile: Profile;
};

export type SongWithViewsWithProfile = Song & {
  views: View[];
  profile: Profile;
};
