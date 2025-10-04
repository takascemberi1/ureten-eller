"use client";
import { useEffect } from "react";

// / isteğini /home.html'e yönlendir
export const metadata = { title: "Üreten Eller" };

export default function LandingRedirect(){
  useEffect(()=>{ if(typeof window!=="undefined"){ window.location.replace("/home.html"); }},[]);
  // JS kapalıysa:
  return <noscript><meta httpEquiv="refresh" content="0; url=/home.html" /></noscript>;
}
