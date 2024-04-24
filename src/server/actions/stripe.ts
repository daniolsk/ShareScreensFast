"use server";
import "server-only";

import { currentUser, auth } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { stripe } from "../stripe";
import { absolutePath } from "@/lib/utils";

const settingsUrl = absolutePath("/");

export async function getStripeRedirect() {
  const { userId } = auth();
  const user = await currentUser();

  if (!user || !userId) throw new Error("Unauthorized");

  const userSubscription = await db.userSubscription.findUnique({
    where: {
      userId: userId,
    },
  });

  if (userSubscription?.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripeCustomerId,
      return_url: settingsUrl,
    });

    redirect(stripeSession.url);
  }

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: settingsUrl,
    cancel_url: settingsUrl,
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: user.emailAddresses[0]?.emailAddress,
    line_items: [
      {
        price_data: {
          currency: "USD",
          product_data: {
            name: "Share Screens Fast Pro",
            description: "Unlimited Screens to share!",
          },
          unit_amount: 499,
          recurring: { interval: "month" },
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId,
    },
  });

  if (!stripeSession.url) throw new Error("Stripe Checkout Url Error");

  redirect(stripeSession.url);
}
