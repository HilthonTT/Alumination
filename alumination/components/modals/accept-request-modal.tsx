"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { capitalizeFirstLetter } from "@/lib/utils";
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

export const AcceptRequestModal = () => {
  const router = useRouter();
  const { isOpen, type, data, onClose } = useModal();
  const { profile, band } = data;

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "acceptRequest";
  const capitalizedUsername = capitalizeFirstLetter(profile?.username);

  const onAccept = async () => {
    try {
      setIsLoading(true);

      await axios.post(`/api/bands/${band?.id}/requests/${profile?.id}`);

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
          <DialogTitle className="text-center">
            Accept {capitalizedUsername} into your band
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            By accepting {capitalizedUsername} into your band, you allow him/her
            to upload songs on behalf of the band.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex w-full justify-between">
          <Button onClick={onClose} disabled={isLoading} className="mr-2">
            Close
          </Button>
          <Button onClick={onAccept} disabled={isLoading} variant="secondary">
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
