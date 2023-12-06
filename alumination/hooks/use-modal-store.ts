import { create } from "zustand";

import { Album, Band, Profile, Song } from "@prisma/client";

export type ModalType = "deleteSong" | "follow" | "deleteAlbum" | "deleteBand";

interface ModalData {
  song?: Song;
  profile?: Profile;
  isFollowing?: boolean;
  album?: Album;
  band?: Band;
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
  onClose: () => set({ isOpen: false, type: null }),
}));
