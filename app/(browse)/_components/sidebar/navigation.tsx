"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import {
  Fullscreen,
  KeyRound,
  MessageSquare,
  Users,
  Wallet2Icon,
} from "lucide-react";
import { NavItem, NavItemSkeleton } from "./nav_item";

export const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const routes = [
    {
      label: "User",
      href: `/`,
      icon: Fullscreen,
    },
    {
      label: "Wallet",
      href: `/checkout`,
      icon: Wallet2Icon,
    },
  ];

  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 px-2">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};
