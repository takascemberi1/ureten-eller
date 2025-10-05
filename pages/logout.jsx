"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useClerk } from "@clerk/nextjs";

export default function Logout() {
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    // query'den next al; yoksa "/"
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next") || "/";

    let cancelled = false;
    (async () => {
      try {
        await signOut({ redirectUrl: next });   // Clerk yönlendirirse ne âlâ
        if (!cancelled) router.replace(next);   // Yine de fallback ile eve
      } catch {
        if (!cancelled) router.replace(next);   // Oturum yoksa/hatada da eve
      }
    })();

    return () => { cancelled = true; };
  }, [signOut, router]);

  return null;
}
