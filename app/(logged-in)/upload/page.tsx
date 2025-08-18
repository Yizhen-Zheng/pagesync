import BgGradient from "@/components/common/bg-gradient";
import UploadHeader from "@/components/upload/upload-hearder";
import UploadForm from "@/components/upload/upload-form";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUploadLimitOfUser } from "@/lib/user";

export default async function Page() {
  const user = await currentUser();
  if (!user?.id || !user?.emailAddresses?.[0]?.emailAddress) {
    return redirect("/sign-in");
  }
  const { uploadLimit, uploadCount } = await getUploadLimitOfUser(
    user.id,
    user.emailAddresses[0].emailAddress
  );
  if (uploadCount >= uploadLimit) {
    return redirect("/dashboard");
  }

  return (
    <section className="min-h-screen">
      <BgGradient className="" />
      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8  ">
        <div className="flex flex-col items-center justify-center text-center gap-6">
          <UploadHeader />
          <UploadForm />
        </div>
      </div>
    </section>
  );
}
