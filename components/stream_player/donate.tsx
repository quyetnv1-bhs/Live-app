"use client";

import { Wallet2Icon } from "lucide-react";
import React, { ElementRef, useRef, useState, useTransition } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  createCustomerStripe,
  getCustomerStripe,
} from "@/app/api/stripe.service";
import { updateUserIDofStripe } from "@/actions/user";
import { toast } from "sonner";

interface Props {
  userIdStripe?: string;
  email?: string;
  username?: string;
  userHost?: any;
}
export const Donate: React.FC<Props> = ({
  userIdStripe,
  email,
  username,
  userHost,
}) => {
  const [amount, setAmount] = useState<string | number>();
  const [message, setMessage] = useState<string | number>();
  const [isDonate, setIsDonate] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<"button">>(null);
  // handle event click btn donate
  const handleDonate = async () => {
    try {
      setIsDonate(false);
      // create checkout session
      // id get from db
      const userStripe = await getCustomerStripe(userIdStripe || "");
      if (!userStripe) {
        const res = await createCustomerStripe({
          email: email || "",
          name: username,
        });
        if (res.id) {
          startTransition(() => {
            updateUserIDofStripe({ userIdStripe: res.id })
              .then(() => {
                toast.success("User id of stripe updated");
                closeRef.current?.click();
              })
              .catch(() => toast.error("Something went wrong"));
          });
        }
      } else {
        console.log("continue checkout");
      }
    } catch (error) {
      toast.error("Request failed, please try again!!!!!!");
    }
  };
  return (
    <div className="relative flex items-center justify-end">
      {isDonate && (
        <div className="w-[312px] absolute bg-slate-600 p-3 flex flex-col gap-4 bottom-[130%] right-0 rounded-md">
          <div className="flex items-center justify-between">
            <p className="block w-fit text-[18px] font-bold leading-5">
              Donate
            </p>
            <p className="flex w-fit items-center justify-end">
              <Wallet2Icon />: $10
            </p>
          </div>
          <Input
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            disabled={false}
            type="number"
            placeholder="Enter the amount ..."
            className="outline-none border-none focus:border-none focus:outline-none"
          />
          <Input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            type="text"
            disabled={false}
            placeholder="Enter a message ..."
            className="outline-none"
          />
          <Button
            disabled={isPending}
            type="button"
            className="w-full py-0 px-3 font-semibold rounded-md bg-[#2563EB] text-[#ffffff] hover:bg-blue-500"
            onClick={handleDonate}
          >
            Donate
          </Button>
        </div>
      )}
      <Button
        disabled={isPending}
        type="button"
        className="mr-[46px] py-0 px-3 font-semibold rounded-md bg-[#2563EB] text-[#ffffff] hover:bg-blue-500"
        onClick={() => setIsDonate((prev) => !prev)}
      >
        Donate
      </Button>
    </div>
  );
};
