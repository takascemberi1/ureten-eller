"use client";
import Link from "next/link";
import { SignedIn, SignedOut } from "@Clerk/nextjs"; // dikkat: küçük harf
import { SignedIn as SI, SignedOut as SO } from "@clerk/nextjs"; // eğer üstteki satır hata verirse bunu kullan.

export default function CustomerPortal() {
  return (
    <main style={{maxWidth:920,margin:"24px auto",padding:"16px"}}>
      <h1 style={{fontSize:28,marginBottom:8}}>Müşteri Portalı</h1>

      <SO>
        <p>Devam etmek için giriş yapın.</p>
        <a href="/login?role=customer" style={{padding:"10px 14px",border:"1px solid #e5e7eb",borderRadius:12,display:"inline-block"}}>
          Giriş / Kayıt
        </a>
      </SO>

      <SI>
        <p>Hoş geldiniz! Buradan sipariş oluşturabilirsiniz.</p>
        <button
          onClick={()=>alert("Sipariş oluşturma akışı burada açılacak.")}
          style={{padding:"10px 14px",borderRadius:12,border:"1px solid #111827",background:"#111827",color:"#fff"}}
        >
          Sipariş Ver
        </button>
      </SI>
    </main>
  );
}
