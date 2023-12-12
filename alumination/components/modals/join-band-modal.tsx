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

export const JoinModal = () => {
  const router = useRouter();
  const { isOpen, type, data, onClose } = useModal();
  const { band, isRequested } = data;

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "joinBand";
  const capitalizedBandName = capitalizeFirstLetter(band?.name);

  const onJoin = async () => {
    try {
      setIsLoading(true);

      await axios.post(`/api/bands/${band?.id}/requests`);

      onClose();
      router.refresh();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const title = isRequested
    ? `Cancel Request for ${capitalizedBandName}`
    : `Join ${capitalizedBandName}?`;

  const description = isRequested
    ? "By cancelling the request, the band owner will no longer see your request."
    : `You will be sending a join request to the ${capitalizedBandName}`;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex w-full justify-between">
          <Button onClick={onClose} disabled={isLoading} className="mr-2">
            Close
          </Button>
          <Button onClick={onJoin} disabled={isLoading} variant="secondary">
            {isRequested ? "Cancel Request" : "Send Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
