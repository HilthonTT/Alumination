"use client";

import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={loading}
      size="sm"
      variant={isPro ? "pro" : "notPro"}>
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Sparkles className="h-4 w-8 ml-2 fill-white" />}
    </Button>
  );
};
