import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getStatusOfUser } from "@/lib/user";

import { UpgradeRequired } from "@/components/common/upgrade-required";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }
  //   const canAccess = false;//for test use
  //   if (!canAccess) {
  //     return <UpgradeRequired />;
  //   }
  const status = await getStatusOfUser(user.emailAddresses[0].emailAddress);
  if (status !== "active") {
    return <UpgradeRequired />;
  }
  return <>{children}</>;
}
