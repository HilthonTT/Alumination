import { create } from "zustand";

import {
  Album,
  AlbumSong,
  Band,
  BandSong,
  Member,
  Profile,
  Song,
} from "@prisma/client";

import { MemberWithProfile } from "@/types";

export type ModalType =
  | "deleteSong"
  | "follow"
  | "deleteAlbum"
  | "deleteBand"
  | "deleteAlbumSong"
  | "deleteBandSong"
  | "joinBand"
  | "acceptRequest"
  | "declineRequest"
  | "kickMember";

interface ModalData {
  song?: Song;
  profile?: Profile;
  isFollowing?: boolean;
  album?: Album;
  band?: Band;
  albumSong?: AlbumSong;
  bandSong?: BandSong;
  isRequested?: boolean;
  member?: MemberWithProfile;
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null, data: {} }),
}));
