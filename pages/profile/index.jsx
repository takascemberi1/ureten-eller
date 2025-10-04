"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useAuth, useUser, SignedIn, SignedOut } from "@clerk/nextjs";

/* --- basit i18n (TR varsayılan) --- */
const STR = {
  tr: {
    title: "Profil",
    settings: "Ayarlar",
    save: "Kaydet",
    cancel: "Vazgeç",
    fullName: "Ad Soyad",
    email: "E-posta",
    city: "Şehir",
    tabs: { live: "Yayındaki", pending: "Onay Bekleyen", expired: "Süresi Dolmuş" },
    noAds: "Henüz ilan yok.",
    messages: "Mesajlar",
    notifications: "Bildirimler",
    home: "Ana Sayfa",
  },
  en: {
    title: "Profile",
    settings: "Settings",
    save: "Save",
    cancel: "Cancel",
    fullName: "Full Name",
    email: "Email",
    city: "City",
    tabs: { live: "Live", pending: "Pending", expired: "Expired" },
    noAds: "No listings.",
    messages: "Messages",
    notifications: "Notifications",
    home: "Home",
  },
  ar: { /* gerekirse genişletirsin */ ...this },
  de: { /* gerekirse genişletirsin */ ...this },
};

function useLang(){
  const [lang,setLang]=useState("tr");
  useEffect(()=>{ try{
    const s=localStorage.getItem("lang"); if(s && STR[s]) setLang(s);
  }catch{} },[]);
  const t = useMemo(()=>STR[lang]||STR.tr,[lang]);
  return { t, lang, setLang };
}

export default function ProfilePage(){
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { t } = useLang();

  // rol tespiti (public/unsafeMetadata -> yoksa localStorage -> müşteri)
  const [role,setRole]=useState("customer"); // "seller" | "customer"
  useEffect(()=>{ try{
    const meta = (user?.unsafeMetadata||user?.publicMetadata)||{};
    const r = (meta.role==="seller"||meta.role==="customer") ? meta.role :
              (localStorage.getItem("role")||"customer");
    setRole(r);
  }catch{} },[user]);

  // guard
  useEffect(()=>{
    if(!isLoaded) return;
    if(!isSignedIn) router.replace("/login");
  },[isLoaded,isSignedIn,router]);

  const [tab,setTab]=useState("live");
  const [ads,setAds]=useState({ live:[], pending:[], expired:[] });

  // DEMO: localStorage + /api/ads/my varsa yükle
  useEffect(()=>{ let alive=true;(async()=>{
    try{
      const stub = JSON.parse(localStorage.getItem("ads_my")||"{}");
      if(alive) setAds({
        live: stub.live||[], pending: stub.pending||[], expired: stub.expired||[]
      });
    }catch{}
    try{
      const res = await fetch("/api/ads/my",{ cache:"no-store" });
      if(res.ok){
        const data = await res.json();
        if(alive) setAds({
          live: data.live||[], pending: data.pending||[], expired: data.expired||[]
        });
      }
    }catch{}
  })(); return ()=>{alive=false}; },[]);

  const fullName = useMemo(()=>{
    const meta = (user?.unsafeMetadata||user?.publicMetadata)||{};
    return meta.full_name || [user?.firstName,user?.lastName].filter(Boolean).join(" ") || "";
  },[user]);

  const city = useMemo(()=>{
    try{ return localStorage.getItem("city") || (user?.unsafeMetadata?.city)||""; }catch{ return ""; }
  },[user]);

  return (
    <div className="wrap">
      <SignedOut><p>Yönlendiriliyor…</p></SignedOut>
      <SignedIn>
        <header className="head">
          <div className="avatar">
            <img src={user?.imageUrl||"/assets/images/logo.png"} alt="avatar"/>
          </div>
          <div className="info">
            <h1>{t.title}</h1>
            <div className="row"><label>{t.fullName}</label><span>{fullName||"—"}</span></div>
            <div className="row"><label>{t.email}</label><span>{user?.primaryEmailAddress?.emailAddress||"—"}</span></div>
            <div className="row"><label>{t.city}</label><span>{city||"—"}</span></div>
            <div className="actions">
              <button className="btn" onClick={()=>router.push("/profile/settings")}>⚙️ {t.settings}</button>
            </div>
          </div>
        </header>

        {role==="seller" && (
          <nav className="tabs">
            {["live","pending","expired"].map(k=>(
              <button key={k} className={tab===k?"tab active":"tab"} onClick={()=>setTab(k)}>{t.tabs[k]}</button>
            ))}
          </nav>
        )}

        {role==="seller" ? (
          <AdList items={ads[tab]} emptyText={t.noAds}/>
        ) : (
          <div className="card">
            <h3>📦 Siparişlerim</h3>
            <p>Henüz sipariş yok.</p>
          </div>
        )}

        <footer className="bottombar">
          <div className="mini"><button className="iconbtn" onClick={()=>router.push("/home.html")}>🏠</button><span>{t.home}</span></div>
          <div className="mini"><button className="iconbtn" onClick={()=>router.push("/messages")}>💬</button><span>{t.messages}</span></div>
          <div className="mini"><button className="iconbtn" onClick={()=>router.push("/notifications")}>🔔</button><span>{t.notifications}</span></div>
        </footer>
      </SignedIn>

      <style jsx>{`
        .wrap{min-height:100vh; padding:16px 14px 96px;
          background: radial-gradient(1000px 700px at -10% -10%, rgba(255,255,255,.35), transparent 60%),
                      linear-gradient(120deg,#ff80ab,#a78bfa,#60a5fa,#34d399);
          background-size:320% 320%; animation:drift 16s ease-in-out infinite;}
        @keyframes drift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .head{max-width:980px; margin:10px auto; display:grid; gap:14px; grid-template-columns:160px 1fr;
          background:rgba(255,255,255,.9); border:1px solid rgba(255,255,255,.5); border-radius:18px; padding:14px; backdrop-filter:blur(10px)}
        @media(max-width:720px){ .head{grid-template-columns:1fr} }
        .avatar img{width:140px; height:140px; border-radius:999px; object-fit:cover; background:#f1f5f9}
        .info h1{margin:0 0 6px}
        .row{display:grid; grid-template-columns:160px 1fr; gap:8px; align-items:center; margin:6px 0}
        .row label{font-weight:700; color:#111827}
        .row span{padding:8px 12px; border-radius:12px; background:#fff; border:1px solid #e5e7eb}
        .actions{margin-top:8px}
        .btn{border:1px solid #e5e7eb; background:#111827; color:#fff; border-radius:12px; padding:9px 12px; font-weight:800; cursor:pointer}

        .tabs{max-width:980px; margin:10px auto; display:flex; gap:8px; background:rgba(255,255,255,.72);
          border:1px solid #e5e7eb; padding:6px; border-radius:14px}
        .tab{border:none; padding:10px 14px; border-radius:12px; font-weight:800; cursor:pointer}
        .tab.active{background:#111827; color:#fff}

        .card{max-width:980px; margin:10px auto; background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:14px}

        .bottombar{position:fixed; left:0; right:0; bottom:0; z-index:20; display:flex; justify-content:space-around; gap:8px; padding:10px;
          background:rgba(255,255,255,.92); border-top:1px solid #e5e7eb; backdrop-filter:blur(10px)}
        .iconbtn{width:42px; height:42px; border:1px solid #e5e7eb; background:#fff; border-radius:12px; cursor:pointer}
        .mini{display:grid; place-items:center; gap:4px; font-size:12px}
      `}</style>
    </div>
  );
}

function AdList({ items, emptyText }){
  if(!items || !items.length) return <div className="card"><p>{emptyText}</p></div>;
  return (
    <div className="card">
      <div className="ads">
        {items.map((a,idx)=>(
          <a key={idx} className="ad" href={a.url||"#"}>
            <div className="thumb" style={a.img?{backgroundImage:`url(${a.img})`,backgroundSize:"cover",backgroundPosition:"center"}:undefined}/>
            <div className="body">
              <h4 className="title">{a.title||"İlan"}</h4>
              <div style={{display:"flex",justifyContent:"space-between",color:"#475569",fontSize:13}}>
                <span>{a.cat||""}</span><b>{a.price||""}</b>
              </div>
            </div>
          </a>
        ))}
      </div>
      <style jsx>{`
        .ads{display:grid; gap:10px; grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
        .ad{border:1px solid #e5e7eb; border-radius:14px; overflow:hidden; background:#fff}
        .thumb{width:100%; aspect-ratio:4/3; background:#f1f5f9}
        .body{padding:10px}
        .title{margin:0 0 6px; font-size:14px; font-weight:800}
      `}</style>
    </div>
  );
}
