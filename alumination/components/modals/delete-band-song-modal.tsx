"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const DeleteBandSongModal = () => {
  const router = useRouter();
  const { isOpen, type, data, onClose } = useModal();
  const { bandSong } = data;

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "deleteBandSong";

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(
        `/api/bands/${bandSong?.bandId}/songs/${bandSong?.id}`
      );

      onClose();
      router.refresh();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>
            Delete <span className="text-rose-500">{bandSong?.title}</span> ?
          </DialogTitle>
          <DialogDescription className="">
            Are you sure you want to delete this? This action is irreversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between items-center">
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onDelete} disabled={isLoading} variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
