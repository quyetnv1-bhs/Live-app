"use client";
import { updateUserIDofStripe } from "@/actions/user";
import { createCustomerStripe } from "@/app/api/stripe.service";
import { Button } from "@/components/ui/button";
import { Wallet2Icon } from "lucide-react";
import React, { startTransition } from "react";
import { toast } from "sonner";

interface Props {
  currentUser: any;
}
export const StripeBalance: React.FC<Props> = ({ currentUser }) => {
  const handleCreateUserStripe = async () => {
    const res = await createCustomerStripe({
      email: currentUser.email || "",
      name: currentUser.username,
    });
    if (res.id) {
      startTransition(() => {
        updateUserIDofStripe({ userIdStripe: res.id })
          .then(() => {
            toast.success("Stripe user has been successfully created!");
          })
          .catch(() => toast.error("Something went wrong"));
      });
    }
  };
  return (
    <Button
      size="sm"
      variant="ghost"
      className="text-muted-foreground hover:text-primary"
      asChild
    >
      {currentUser?.userIdStripe ? (
        <p>
          <Wallet2Icon />: ${currentUser?.availableBalances || 0}
        </p>
      ) : (
        <button
          onClick={handleCreateUserStripe}
          className="bg-transparent py-2 font-medium text-[16px] flex items-center justify-center gap-1 hover:bg-transparent"
        >
          Sign up for a Stripe account{" "}
          <p className="underline text-white font-semibold"> now </p> to see
          your balance.
        </button>
      )}
    </Button>
  );
};
