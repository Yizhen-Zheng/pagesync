"use client";
import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import BgGradient from "@/components/common/bg-gradient";
export default function Page() {
  // TODO: check if this work for protecting all login required pages
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/dashboard";

  return (
    <section className="flex justify-center items-center lg:min-h-[40vh]">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <BgGradient className="from-rose-400 via-rose-300 to-rose-200" />
        <Suspense fallback={<div>Loading...</div>}>
          <SignIn fallbackRedirectUrl={returnUrl} />;
        </Suspense>
      </div>
    </section>
  );
}
