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

export const FollowModal = () => {
  const router = useRouter();
  const { isOpen, type, data, onClose } = useModal();
  const { profile, isFollowing } = data;

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "follow";
  const capitalizedUsername = capitalizeFirstLetter(profile?.username);

  const onFollow = async () => {
    try {
      setIsLoading(true);

      await axios.post(`/api/notifications/${profile?.id}`);

      onClose();
      router.refresh();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const title = isFollowing ? (
    <>
      Unfollow <span className="text-rose-500">{capitalizedUsername}</span> ?
    </>
  ) : (
    <>
      Follow <span className="text-rose-500">{capitalizedUsername}</span> ?
    </>
  );

  const description = isFollowing ? (
    <>
      By unfollowing{" "}
      <span className="text-rose-500">{capitalizedUsername}</span>, You
      won&apos;t receive anymore receive anymore notifications from this artist.
    </>
  ) : (
    <>
      By following <span className="text-rose-500">{capitalizedUsername}</span>,
      You make sure to get a notification for the latest uploads of this artist.
    </>
  );

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
            Cancel
          </Button>
          <Button onClick={onFollow} disabled={isLoading} variant="secondary">
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
