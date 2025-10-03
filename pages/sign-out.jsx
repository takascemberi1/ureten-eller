import { useEffect } from "react";
import { useRouter } from "next/router";
import { useClerk } from "@clerk/nextjs";
export default function SignOutPage(){const r=useRouter();const {signOut}=useClerk();useEffect(()=>{(async()=>{try{await signOut()}catch{}try{localStorage.removeItem("role");localStorage.removeItem("full_name")}catch{}r.replace("/")})()},[r,signOut]);return null}
