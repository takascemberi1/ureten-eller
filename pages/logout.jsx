"use client";
import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";

export default function Logout() {
  const { signOut } = useClerk();

  useEffect(() => {
    (async () => {
      try {
        await signOut({ redirectUrl: "/" }); // ÇIKIŞ → ANASAYFA
      } catch {
        window.location.href = "/";
      }
    })();
  }, [signOut]);

  return null;
}
