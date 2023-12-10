import { create } from "zustand";

import {
  Album,
  AlbumSong,
  Band,
  BandSong,
  Profile,
  Song,
} from "@prisma/client";

export type ModalType =
  | "deleteSong"
  | "follow"
  | "deleteAlbum"
  | "deleteBand"
  | "deleteAlbumSong"
  | "deleteBandSong";

interface ModalData {
  song?: Song;
  profile?: Profile;
  isFollowing?: boolean;
  album?: Album;
  band?: Band;
  albumSong?: AlbumSong;
  bandSong?: BandSong;
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
