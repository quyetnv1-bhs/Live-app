"use client";

import { LiveKitRoom } from "@livekit/components-react";
import { cn } from "@/lib/utils";
import { InfoCard } from "./info_card";
import { AboutCard } from "./about_card";
import { ChatToggle } from "./chat_toggle";
import { Chat, ChatSkeleton } from "./chat";
import { Video, VideoSkeleton } from "./video";
import { Header, HeaderSkeleton } from "./header";
import { useViewerToken } from "@/hooks/use_viewer_token";
import { useChatSidebar } from "@/store/use_chat_sidebar";

type CustomStream = {
  id: string;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  isLive: boolean;
  thumbnailUrl: string | null;
  name: string;
  discordUrl?: string | null;
  category?: string | null;
};

type CustomUser = {
  id: string;
  username: string;
  bio: string | null;
  stream: CustomStream | null;
  imageUrl: string;
  _count: { followedBy: number };
};

interface StreamPlayerProps {
  user: CustomUser;
  stream: CustomStream;
  isFollowing: boolean;
  ViewerInfo?: any;
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
  ViewerInfo,
}: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);
  const { collapsed } = useChatSidebar((state) => state);

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }

  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed || !stream?.isChatEnabled
            ? "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
            : ""
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar p-4">
          <Video hostName={user.username} hostIdentity={user.id} />
          <Header
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
            category={stream.category}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
            discordUrl={stream.discordUrl}
          />
          <AboutCard
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={user.bio}
            followedByCount={user._count.followedBy}
            discordUrl={stream.discordUrl}
          />
        </div>
        <div
          className={cn(
            "col-span-1",
            collapsed || !stream?.isChatEnabled ? "hidden" : ""
          )}
        >
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
            userIdStripe={ViewerInfo?.userIdStripe}
            email={ViewerInfo?.email}
            username={ViewerInfo?.username}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
};
