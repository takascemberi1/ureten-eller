"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Onboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const sp = useSearchParams();
  const role = sp.get("role") === "seller" ? "seller" : "customer";

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) { router.replace(`/login?role=${role}`); return; }

    const current = user.publicMetadata?.role;
    const goto = role === "seller" ? "/portal/seller" : "/portal/customer";

    (current !== role
      ? user.update({ publicMetadata: { role } })
      : Promise.resolve()
    ).finally(() => router.replace(goto));
  }, [isLoaded, user, role, router]);

  return <p style={{padding:24}}>Yönlendiriliyor…</p>;
}
