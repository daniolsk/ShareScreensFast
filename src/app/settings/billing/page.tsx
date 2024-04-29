import {
  ShowSubscriptionDetailsButton,
  UpgradeToProButton,
} from "@/components/StripeActionButtons";
import { ALBUMS_LIMIT, UPLOAD_IMAGE_LIMIT } from "@/constants/uploadImageLimit";
import { checkSubscription } from "@/lib/subscription";
import { getStripeRedirect } from "@/server/actions/stripe";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const isSubscribed = await checkSubscription();
  const { userId } = auth();

  if (!userId) return redirect("/");

  const imagesLimit = await db.userImageUploadLimit.findUnique({
    where: {
      userId,
    },
  });
  const albumLimit = await db.userAlbumLimit.findUnique({
    where: {
      userId,
    },
  });

  return (
    <div className="flex w-full flex-col self-start">
      <div className="mb-6 gap-1">
        <h1 className="text-3xl font-semibold">Plans and Billing</h1>
        <h2 className="text-sm text-muted-foreground">
          Manage your subscription for this application
        </h2>
      </div>
      <div className="flex flex-col justify-between gap-6 rounded-xl border p-4 md:flex-row md:gap-0">
        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-4">
            <div className="text-base">Your current plan:</div>
            <div className="text-2xl font-bold">
              {isSubscribed ? "Pro 🔥" : "Demo"}
            </div>
          </div>
          <div className="flex items-end gap-4">
            <div className="text-base">Images uploads left:</div>
            <div className="text-2xl font-bold">
              {isSubscribed
                ? `(Infinity)`
                : imagesLimit
                  ? `${imagesLimit.uploadedImages} / ${UPLOAD_IMAGE_LIMIT}`
                  : `0 / ${UPLOAD_IMAGE_LIMIT}`}
            </div>
          </div>
          <div className="flex items-end gap-4">
            <div className="text-base">Albums left:</div>
            <div className="text-2xl font-bold">
              {isSubscribed
                ? `(Infinity)`
                : albumLimit
                  ? `${albumLimit.createdAlbums} / ${ALBUMS_LIMIT}`
                  : `0 / ${ALBUMS_LIMIT}`}
            </div>
          </div>
        </div>
        <div>
          {!isSubscribed ? (
            <div>
              <UpgradeToProButton handleUpgradeToPro={getStripeRedirect} />
            </div>
          ) : (
            <div>
              <ShowSubscriptionDetailsButton
                handleManageSubscription={getStripeRedirect}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
