import { Suspense } from "react";
import { Results, ResultsSkeleton } from "./_component/results";
import { getRecommended } from "@/app/api/recommend.service";
import { getFollowedUsers } from "@/app/api/follow.service";
import { Following } from "../_components/sidebar/following";
import { Recommended } from "../_components/sidebar/recommended";

const Page = async () => {
  const recommended = await getRecommended();
  const following = await getFollowedUsers();
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <div className="flex flex-col gap-6">
          <Results />
          <Following data={following} />
          <Recommended data={recommended} />
        </div>
      </Suspense>
    </div>
  );
};
export default Page;
