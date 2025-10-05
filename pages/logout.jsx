"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

export default function Logout() {
  const { signOut } = useClerk();
  const sp = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const next = sp?.get("next") || "/";
    let cancelled = false;

    (async () => {
      try {
        await signOut({ redirectUrl: next });
        if (!cancelled) router.replace(next);           // Clerk bazen ignore ederse
      } catch (e) {
        if (!cancelled) router.replace(next);           // Oturum yoksa/hatada da eve
      }
    })();

    return () => { cancelled = true; };
  }, [sp, signOut, router]);

  return null;
}
