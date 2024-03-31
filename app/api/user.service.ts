import { db } from "@/lib/db";

export const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      externalUserId: true,
      username: true,
      bio: true,
      imageUrl: true,
      email: true,
      userIdStripe: true,
      availableBalances: true,
      stream: {
        select: {
          id: true,
          name: true,
          isLive: true,
          isChatDelayed: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
          thumbnailUrl: true,
          discordUrl: true,
          category: true,
        },
      },
      _count: {
        select: {
          followedBy: true,
        },
      },
    },
  });

  return user;
};

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
    include: {
      stream: true,
    },
  });

  return user;
};
