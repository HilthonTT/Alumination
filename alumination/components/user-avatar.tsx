import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  src?: string;
  className?: string;
  size?: "small" | "normal" | "big";
}

export const UserAvatar = ({ src, className, size }: UserAvatarProps) => {
  let avatarSizeClasses = "h-8 w-8 md:h-10 md:w-10"; // Default size classes

  switch (size) {
    case "normal":
      avatarSizeClasses = "h-14 w-14 md:h-16 md:w-16";
      break;
    case "big":
      avatarSizeClasses = "h-28 w-28 md:h-30 md:w-30";
      break;
    default:
      break;
  }

  return (
    <Avatar className={cn(avatarSizeClasses, className)}>
      <AvatarImage src={src} alt="Profile Picture" />
      <AvatarFallback>
        <Loader2 className="h-8 w-8 animate-spin" />
      </AvatarFallback>
    </Avatar>
  );
};
