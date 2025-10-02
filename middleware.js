// middleware.js
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Sadece /portal/... korumalı olsun, diğer sayfalar serbest
const isProtectedRoute = createRouteMatcher(["/portal(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth().protect(); // giriş yoksa Clerk login akışına yollar
  }
});

export const config = {
  matcher: [
    // Next.js internal ve statikleri atla
    "/((?!_next|.*\\..*).*)",
    // API/trpc her zaman çalışsın
    "/(api|trpc)(.*)",
  ],
};
