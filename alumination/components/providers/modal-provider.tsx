"use client";

import { useEffect, useState } from "react";

import { DeleteSongModal } from "@/components/modals/delete-song-modal";
import { FollowModal } from "@/components/modals/follow-modal";
import { DeleteAlbumModal } from "@/components/modals/delete-album-modal";
import { DeleteBandModal } from "@/components/modals/delete-band-modal";
import { DeleteAlbumSongModal } from "@/components/modals/delete-album-song-modal";
import { DeleteBandSongModal } from "@/components/modals/delete-band-song-modal";
import { JoinModal } from "@/components/modals/join-band-modal";
import { AcceptRequestModal } from "@/components/modals/accept-request-modal";
import { DeclineRequestModal } from "@/components/modals/decline-request-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DeleteSongModal />
      <FollowModal />
      <DeleteAlbumModal />
      <DeleteBandModal />
      <DeleteAlbumSongModal />
      <DeleteBandSongModal />
      <JoinModal />
      <AcceptRequestModal />
      <DeclineRequestModal />
    </>
  );
};
