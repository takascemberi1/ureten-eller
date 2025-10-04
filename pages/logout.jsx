import { useEffect } from "react";
import { useRouter } from "next/router";
import { useClerk } from "@clerk/nextjs";

export default function LogoutPage(){
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        if (typeof window !== "undefined") {
          ["role","full_name","il","ilce","city","my_rating","lang"].forEach(k=>localStorage.removeItem(k));
        }
        await signOut({ redirectUrl: "/login" });
      } catch (e) {
        router.replace("/login");
      }
    })();
  }, [signOut, router]);

  return <p style={{padding:16}}>Çıkış yapılıyor…</p>;
}
