"use client";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function SellerPortal() {
  return (
    <main style={{maxWidth:920,margin:"24px auto",padding:"16px"}}>
      <h1 style={{fontSize:28,marginBottom:8}}>Üreten El Portalı</h1>

      <SignedOut>
        <p>Devam etmek için giriş yapın.</p>
        <Link href="/login?role=seller" style={{padding:"10px 14px",border:"1px solid #e5e7eb",borderRadius:12,display:"inline-block"}}>
          Giriş / Kayıt
        </Link>
      </SignedOut>

      <SignedIn>
        <p>Hoş geldiniz! Buradan ilan oluşturabilirsiniz.</p>
        <button
          onClick={()=>alert("İlan oluşturma akışı burada açılacak.")}
          style={{padding:"10px 14px",borderRadius:12,border:"1px solid #111827",background:"#111827",color:"#fff"}}
        >
          İlan Ver
        </button>
      </SignedIn>
    </main>
  );
}
