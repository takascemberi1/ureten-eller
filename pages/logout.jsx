"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useClerk } from "@clerk/nextjs";

export default function Logout() {
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next") || "/";   // hedef: pages/index.jsx ("/")
    let cancelled = false;

    (async () => {
      try {
        await signOut({ redirectUrl: next }); // Clerk yönlendirme
      } finally {
        if (!cancelled) router.replace(next); // HER DURUMDA eve
      }
    })();

    return () => { cancelled = true; };
  }, [signOut, router]);

  return null;
}
