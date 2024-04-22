import {
  ShowSubscriptionDetailsButton,
  UpgradeToProButton,
} from "@/components/StripeActionButtons";
import { UPLOAD_IMAGE_LIMIT } from "@/constants/uploadImageLimit";
import { checkSubscription } from "@/lib/subscription";
import { getStripeRedirect } from "@/server/actions/stripe";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const isSubscribed = await checkSubscription();
  const { userId } = auth();

  if (!userId) return redirect("/");
  const handleStripeAction = async () => {
    "use server";

    await getStripeRedirect();
  };

  const limit = await db.userImageUploadLimit.findUnique({
    where: {
      userId,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {!isSubscribed ? (
        <div>
          <UpgradeToProButton handleUpgradeToPro={handleStripeAction} />
        </div>
      ) : (
        <div>
          <ShowSubscriptionDetailsButton
            handleManageSubscription={handleStripeAction}
          />
        </div>
      )}
      <div className="flex items-end gap-4">
        <div className="text-lg">Your current plan:</div>
        <div className="text-3xl font-bold">
          {isSubscribed ? "Pro" : "Demo"}
        </div>
      </div>
      <div className="flex items-end gap-4">
        <div className="text-lg">Images uploads left:</div>
        <div className="text-3xl font-bold">
          {isSubscribed
            ? `(Infinity)`
            : limit
              ? `${limit.uploadedImages} / ${UPLOAD_IMAGE_LIMIT}`
              : `0 / ${UPLOAD_IMAGE_LIMIT}`}
        </div>
      </div>
    </div>
  );
}
