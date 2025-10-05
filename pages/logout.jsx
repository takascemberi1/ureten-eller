"use client";
import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";

export default function LogoutPage() {
  const { signOut } = useClerk();
  useEffect(() => {
    const next = new URLSearchParams(window.location.search).get("next") || "/";
    signOut({ redirectUrl: next }).catch(() => window.location.assign(next));
  }, [signOut]);
  return null;
}
