"use client";

import { ReceivedChatMessage } from "@livekit/components-react";
import { CheckIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { PropsUpdateChat } from "./chat";

interface ChatMessageProps {
  data: ReceivedChatMessage;
  onSubmitUpdate: () => void;
  onchangeUpdate: (message: string, messageId: string) => void;
  valueUpdate: PropsUpdateChat;
}

export const ChatMessage = ({
  data,
  onSubmitUpdate,
  onchangeUpdate,
  valueUpdate,
}: ChatMessageProps) => {
  const [isUpdate, setIsUpdate] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!valueUpdate) return;
    onSubmitUpdate();
  };
  useEffect(() => {
    if (!isUpdate) {
      inputRef?.current?.focus();
    } else {
      inputRef?.current?.blur();
    }
  }, [isUpdate]);
  return (
    <div className="flex items-center justify-between rounded-md hover:bg-white/5 w-full px-3 py-2 gap-x-2">
      <Image
        src="/web.svg"
        alt={data.from?.name || "Maris"}
        width={30}
        height={30}
        className="object-cover rounded-full border border-[#94a3b379] w-[30px] h-[30px]"
      />
      <div className="flex flex-col items-baseline grow gap-1">
        <div className="flex items-center justify-between w-full">
          <p className="text-sm font-semibold whitespace-nowrap truncate text-[#94a3b3]">
            {data.from?.name}
          </p>
          {isUpdate && (
            <div
              className="w-6 h-6 rounded-full cursor-pointer hover:bg-[#444850] hover:opacity-85"
              onClick={() => setIsUpdate(false)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z"
                    fill="#94a3b3"
                  ></path>{" "}
                  <path
                    d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
                    fill="#94a3b3"
                  ></path>{" "}
                  <path
                    d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
                    fill="#94a3b3"
                  ></path>{" "}
                </g>
              </svg>
            </div>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between w-full"
        >
          <input
            ref={inputRef}
            type="text"
            defaultValue={data?.message}
            className="w-full text-sm break-all bg-transparent outline-none border-none "
            disabled={isUpdate}
            onChange={(e) =>
              onchangeUpdate(e.target.value, data?.from?.sid || "")
            }
          />
          {!isUpdate && (
            <div className="flex items-center justify-center gap-x-1 max-h-5">
              <Button
                type="submit"
                className="h-full bg-transparent text-center w-fit hover:bg-transparent px-1"
                onClick={() => setIsUpdate(true)}
              >
                <CheckIcon className="text-green-500 cursor-pointer w-[18px]" />
              </Button>
              <Button
                type="button"
                className="h-full bg-transparent text-center w-fit hover:bg-transparent px-1"
                onClick={() => setIsUpdate(true)}
              >
                <XIcon className="text-red-500 cursor-pointer w-[18px]" />
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
