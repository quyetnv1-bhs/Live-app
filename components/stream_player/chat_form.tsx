"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatInfo } from "./chat_info";
import { Donate } from "./donate";

interface ChatFormProps {
  onSubmit: () => void;
  onChange: (value: string) => void;
  value: string;
  isHidden: boolean;
  isFollowersOnly: boolean;
  isFollowing: boolean;
  isDelayed: boolean;
  isHost?: boolean;
  userIdStripe?: string;
  email?: string;
  username?: string;
}

export const ChatForm = ({
  onSubmit,
  onChange,
  value,
  isHidden,
  isFollowersOnly,
  isFollowing,
  isDelayed,
  isHost,
  userIdStripe,
  email,
  username,
}: ChatFormProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);
  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled =
    isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!value || isDisabled) return;
    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };

  if (isHidden) {
    return null;
  }
  return (
    <>
      {!isHost && (
        <Donate email={email} username={username} userIdStripe={userIdStripe} />
      )}
      <form
        onSubmit={handleSubmit}
        className="flex items-end justify-start p-3"
      >
        <div className="w-full">
          <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
          <Input
            onChange={(e) => onChange(e.target.value)}
            value={value}
            disabled={isDisabled}
            placeholder="Send a message"
            className={cn(
              "border-white/10",
              (isFollowersOnly || isDelayed) && "rounded-t-none border-t-0"
            )}
          />
        </div>
        <div className="">
          <Button
            type="submit"
            className="h-full bg-transparent text-center w-fit hover:bg-transparent pl-2 pr-0"
            disabled={isDisabled}
          >
            <Send className="text-white" />
          </Button>
        </div>
      </form>
    </>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
};
