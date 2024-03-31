"use client";

import { Follow, User } from "@prisma/client";
import { UserItem } from "./user_item";

interface FollowingProps {
  data: (Follow & { following: User })[];
}

export const Following = ({ data }: FollowingProps) => {
  const showLable = data.length > 0;

  return (
    <div>
      {showLable && (
        <div className="mb-4">
          <p className="text-lg font-semibold">Following</p>
        </div>
      )}
      <ul className="space-y-2">
        {data.map((follow) => (
          <UserItem
            key={follow.following.id}
            userName={follow.following.username}
            imageUrl={follow.following.imageUrl}
            category="test"
            // isLive={true}
          />
        ))}
      </ul>
    </div>
  );
};
