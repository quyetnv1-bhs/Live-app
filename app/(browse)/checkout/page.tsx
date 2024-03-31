import { getCurrentUser } from "@/app/api/auth.service";
import { Wallet2Icon } from "lucide-react";
import React from "react";
import { FormInput } from "./_components/form";
import Image from "next/image";

export const CheckoutPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="bg-[#252731] rounded-xl w-full p-6 flex flex-col gap-y-4">
        <div className="flex items-center justify-between text-[#ffffff] font-bold text-[18px]">
          <div className="flex items-center justify-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentUser.imageUrl}
              alt="avt"
              className="w-14 h-14 object-cover rounded-full"
            />
            <p>{currentUser?.username}</p>
          </div>
          <p className="flex items-center justify-start">
            <Wallet2Icon />: ${currentUser?.availableBalances || 0}
          </p>
        </div>
        <p className="block w-full border border-b-[1px] border-[#2d2e35]" />
        <div className="flex justify-between items-center my-3 gap-4">
          <div className="flex flex-col gap-4">
            <p className="text-[18px] leading-5 font-semibold">
              Add new payment method
            </p>
            <p className="text-[12px] leading-5 font-medium">
              All transactions are secured and encrypted
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Image src="/visa.svg" alt="Live App" height="46" width="46" />
            <Image src="/master.svg" alt="Live App" height="46" width="46" />
            <Image src="/american.svg" alt="Live App" height="46" width="46" />
          </div>
        </div>
        {/* form */}
        <FormInput currentUser={currentUser} />
        <p className="text-[11px] leading-4 mt-4">
          All transaction details are made through Stripe. <br /> Credit card
          numbers that are saved, are encrypted at rest with AES-256. And stored
          with Stripe. Kidztime DO NOT in any situation, see, record, or in any
          way, have access to any credit card or payment details. If you elect
          to allow Stripe to remember you, Stripe will use cookies to link your
          web browser to your Stripe Credentials and recognize when you
          checkout.
        </p>
      </div>
    </div>
  );
};

export default CheckoutPage;
