import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/summaries(.*)",
  "/upload(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const user = await auth();
  if (isProtectedRoute(req) && !user.userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("returnUrl", req.url);
    return NextResponse.redirect(signInUrl);
  }
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
