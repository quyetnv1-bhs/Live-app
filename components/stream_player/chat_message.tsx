"use client";

import { ReceivedChatMessage } from "@livekit/components-react";

import Image from "next/image";

interface ChatMessageProps {
  data: ReceivedChatMessage;
}

export const ChatMessage = ({ data }: ChatMessageProps) => {
  return (
    <div className="flex gap-2 py-2 items-center justify-start rounded-md hover:bg-white/5 w-full">
      <Image
        src="/web.svg"
        alt={data.from?.name || "Maris"}
        width={30}
        height={30}
        className="object-cover rounded-full border border-[#94a3b379] w-[30px] h-[30px]"
      />
      <div className="flex flex-col items-baseline grow gap-1">
        <p className="text-sm font-semibold whitespace-nowrap truncate text-[#94a3b3]">
          {data.from?.name}
        </p>
        <p className="text-sm break-all">{data.message}</p>
      </div>
    </div>
  );
};
