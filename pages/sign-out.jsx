"use client";
import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";

export default function SignOutRedirect(){
  const { signOut } = useClerk();
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        await signOut({ redirectUrl: "/" }); // ÇIKIŞ -> /
      } catch (e) {
        if (alive) window.location.replace("/");
      }
    })();
    return () => { alive = false; };
  }, []);
  return (
    <>
      <noscript><meta httpEquiv="refresh" content="0; url=/" /></noscript>
      <p style={{padding:16,textAlign:"center"}}>Çıkış yapılıyor…</p>
    </>
  );
}
