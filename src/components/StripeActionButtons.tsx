"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function UpgradeToProButton({
  handleUpgradeToPro,
}: {
  handleUpgradeToPro: () => void;
}) {
  return (
    <Button onClick={() => handleUpgradeToPro()}>Upgrade To Pro 🔥</Button>
  );
}

export function UpgradeToProNavButton({
  handleUpgradeToPro,
}: {
  handleUpgradeToPro: () => void;
}) {
  return (
    <>
      <Button className="hidden md:block" onClick={() => handleUpgradeToPro()}>
        Upgrade To Pro 🔥
      </Button>
      <Button className="md:hidden" onClick={() => handleUpgradeToPro()}>
        Get Pro 🔥
      </Button>
    </>
  );
}

export function ShowSubscriptionDetailsButton({
  handleManageSubscription,
}: {
  handleManageSubscription: () => void;
}) {
  return (
    <Button onClick={() => handleManageSubscription()}>
      Manage My Subscription
    </Button>
  );
}
