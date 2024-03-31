import { Toggle, ToggleSkeleton } from "./toggle";
import { Wrapper } from "./wrapper";
import { Navigation } from "./navigation";

export const Sidebar = async () => {
  // The main nav bar shows users following and recommened lists
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  );
};

// Rendering sidebar skeleton
export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
    </aside>
  );
};
