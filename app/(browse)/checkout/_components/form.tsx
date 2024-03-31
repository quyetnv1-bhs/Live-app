"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCheckoutSession } from "@/app/api/stripe.service";
import { useRouter } from "next/navigation";

interface Props {
  currentUser: any;
}
export const FormInput: React.FC<Props> = ({ currentUser }) => {
  const [amount, setAmount] = useState<string | number>();

  const router = useRouter();
  // handling deposit
  const handleDeposit = async () => {
    if (amount && +amount <= 0) return;
    try {
      // create checkout session
      const res = await createCheckoutSession({
        amount,
        email: currentUser?.email,
        username: currentUser?.username,
      });
      if (res) {
        // redirect to checkout page
        router.push(res.url);
      }
    } catch (error: any) {}
  };
  const handleWithdrawal = () => {
    if (!amount || +amount <= 0) return;
    if (amount > currentUser?.availableBalances) return;
  };

  return (
    <div className="flex flex-col gap-4">
      <label
        htmlFor="amount-input"
        className="text-[16px] font-medium leading-6 cursor-pointer hover:opacity-85"
      >
        Enter the amount you want to pay
      </label>
      <Input
        id="amount-input"
        type="number"
        placeholder="Enter the amount ..."
        className="font-medium"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="flex items-center flex-wrap justify-start gap-2">
        <div
          className="cursor-pointer border border-[#919fb4] w-full max-w-[78px] text-center px-4 py-2 bg-transparent text-white font-medium text-sm rounded-md hover:opacity-80"
          onClick={() => setAmount(10)}
        >
          10$
        </div>
        <div
          className="cursor-pointer border border-[#919fb4] w-full max-w-[78px] text-center px-4 py-2 bg-transparent text-white font-medium text-sm rounded-md hover:opacity-80"
          onClick={() => setAmount(100)}
        >
          100$
        </div>
        <div
          className="cursor-pointer border border-[#919fb4] w-full max-w-[78px] text-center px-4 py-2 bg-transparent text-white font-medium text-sm rounded-md hover:opacity-80"
          onClick={() => setAmount(200)}
        >
          200$
        </div>
        <div
          className="cursor-pointer border border-[#919fb4] w-full max-w-[78px] text-center px-4 py-2 bg-transparent text-white font-medium text-sm rounded-md hover:opacity-80"
          onClick={() => setAmount(500)}
        >
          500$
        </div>
        <div
          className="cursor-pointer border border-[#919fb4] w-full max-w-[78px] text-center px-4 py-2 bg-transparent text-white font-medium text-sm rounded-md hover:opacity-80"
          onClick={() => setAmount(1000)}
        >
          1000$
        </div>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button
          onClick={handleDeposit}
          disabled={!amount || +amount <= 0}
          className="bg-blue-500 text-white font-bold hover:bg-blue-400"
        >
          Loaded
        </Button>
        <Button
          onClick={handleWithdrawal}
          disabled={
            !amount ||
            +amount <= 0 ||
            +currentUser?.availableBalances === 0 ||
            +amount > +currentUser?.availableBalances
          }
          className="bg-blue-500 text-white font-bold hover:bg-blue-400"
        >
          Withdraw
        </Button>
      </div>
    </div>
  );
};
