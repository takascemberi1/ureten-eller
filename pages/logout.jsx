"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

export default function Logout(){
  const { signOut } = useClerk();
  const sp = useSearchParams();
  useEffect(() => {
    const next = sp?.get("next") || "/";
    (async () => {
      try { await signOut({ redirectUrl: next }); }
      catch { window.location.href = next; }
    })();
  }, [signOut, sp]);
  return null;
}
