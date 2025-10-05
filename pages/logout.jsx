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
        await signOut({ redirectUrl: next });   // Clerk düzgün yönlendirirse iş biter
        if (!cancelled) router.replace(next);   # Ek güvenlik: yine de eve gönder
      } catch (e) {
        if (!cancelled) router.replace(next);   # Oturum yoksa/hatada da eve
      }
    })();

    return () => { cancelled = true; };
  }, [sp, signOut, router]);

  return null;
}
