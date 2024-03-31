import { notFound } from "next/navigation";

import { StreamPlayer } from "@/components/stream_player";
import { getUserByUsername } from "@/app/api/user.service";
import { checkFollowUser } from "@/app/api/follow.service";
import { checkBlockUser } from "@/app/api/block.service";
import { getCurrentUser } from "@/app/api/auth.service";

interface UserPageProps {
  params: {
    username: string;
    discordUrl?: string | null;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username);
  const self = await getCurrentUser();

  const ViewerInfo = {
    userIdStripe: self.userIdStripe,
    email: self.email,
    username: self?.username,
  };
  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await checkFollowUser(user.id);
  const isBlocked = await checkBlockUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return (
    <StreamPlayer
      user={user}
      ViewerInfo={ViewerInfo}
      stream={user.stream}
      isFollowing={isFollowing}
    />
  );
};

export default UserPage;
