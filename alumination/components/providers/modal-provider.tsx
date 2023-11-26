"use client";

import { useEffect, useState } from "react";

import { DeleteSongModal } from "@/components/modals/delete-song-modal";

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
    </>
  );
};
