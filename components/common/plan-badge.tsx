import { plans } from "@/utils/constants";
import { getUserByEmail } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";
import { cn } from "@/utils/tailwind-utils";

// TODO: make this code cleaner
export async function PlanBadge() {
  let planName, hasPlan;

  const user = await currentUser();
  if (user) {
    const email = user.emailAddresses[0].emailAddress;
    const priceId = await getUserByEmail(email, ["price_id"]);
    const plan = priceId
      ? plans.find((plan) => plan.priceId === priceId.price_id)
      : null;
    console.log("user", user);
    console.log("userPlan", priceId);
    if (plan) {
      planName = plan.name;
      hasPlan = true;
    }
  }

  return (
    <Badge
      variant={"outline"}
      className={cn(
        "ml-2 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 hidden lg:flex flex-row items-center",
        !hasPlan && "from-red-100 to-red-200 border-red-300"
      )}
    >
      <Crown
        className={cn(
          "w-3 h-3 mr-1 text-amber-600 font-semibold",
          !hasPlan && "text-red-600"
        )}
      />
      {planName || "Buy a plan"}
    </Badge>
  );
}
