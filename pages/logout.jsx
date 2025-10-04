import { useEffect } from "react";
import { useRouter } from "next/router";
import { useClerk } from "@clerk/nextjs";
export default function Logout(){
  const { signOut } = useClerk();
  const router = useRouter();
  useEffect(()=>{(async()=>{
    try{
      if(typeof window!=="undefined"){
        for(const k of ["role","full_name","il","ilce","city","my_rating","lang"]) try{localStorage.removeItem(k);}catch{}
      }
      const next = (router.query?.next && decodeURIComponent(router.query.next)) || "/";
      await signOut({ redirectUrl: next });
    }catch(e){ router.replace("/"); }
  })();},[signOut,router]);
  return null;
}
