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

export function ShowSubscriptionDetailsButton({
  handleUpgradeToPro,
}: {
  handleUpgradeToPro: () => void;
}) {
  return (
    <Button onClick={() => handleUpgradeToPro()}>Manage My Subscription</Button>
  );
}
