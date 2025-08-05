import { getSummaryById } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import BgGradient from "@/components/common/bg-gradient";

/**
 *
 * @param props
 * @returns
 * what is Partial render: part static
 * why async:
 * await for nextjs to parse URL segments and extract dynamic params([whatever in bracket])
 * and resolve async operations in routing process
 * then returns param obj
 */
export default async function SummaryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const user = await currentUser();
  if (!user?.id) {
    redirect("/sign-in");
  }
  const summary = await getSummaryById(params.id, user.id);
  if (!summary) {
    notFound();
  }
  console.log(params);
  return (
    <div>
      s
      <BgGradient />
    </div>
  );
}
