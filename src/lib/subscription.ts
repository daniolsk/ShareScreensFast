import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";

const DAY_IN_MS = 84_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) return false;

  const userSubscription = await db.userSubscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!userSubscription) return false;
  if (!userSubscription.stripeCurrentPeriodEnd) return false;

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now();

  return !!isValid;
};
