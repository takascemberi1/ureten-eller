// PREVIEW-SAFE PROFILE PAGE (Canvas)
// This top section runs in Canvas without external deps. Below, you'll find the real Next.js files
// wrapped in a big comment block (so Canvas doesn't try to execute server code).

// ---------------- Preview Imports & Stubs ----------------
// No Clerk here; we simulate a signed-in user and an in-memory ads store.

const STR = {
  tr: {
    title: "Profil",
    sub: "Bilgilerini güncelle, fotoğrafını değiştir ve ilanlarını yönet.",
    logout: "Çıkış",
    backHome: "Ana Sayfa",
    infoCard: "Profil Bilgileri",
    name: "Ad Soyad",
    username: "Kullanıcı adı",
    city: "Şehir",
    language: "Dil",
    role: "Rol",
    save: "Kaydet",
    saved: "Kaydedildi.",
    avatarCard: "Profil Fotoğrafı",
    choose: "Dosya seç",
    upload: "Yükle",
    uploading: "Yükleniyor…",
    listings: "İlanlarım",
    live: "Yayındaki",
    pending: "Onay bekleyen",
    expired: "Süresi dolan",
    noItems: "Kayıt yok",
    view: "Görüntüle",
    edit: "Düzenle",
    remove: "Sil",
    pause: "Durdur",
    extend: "Süreyi 30 gün uzat",
    createFirst: "İlk ilanını oluştur",
    newAd: "Yeni İlan",
  },
  en: {
    title: "Profile",
    sub: "Update your info, change avatar and manage your listings.",
    logout: "Sign out",
    backHome: "Home",
    infoCard: "Profile Info",
    name: "Full name",
    username: "Username",
    city: "City",
    language: "Language",
    role: "Role",
    save: "Save",
    saved: "Saved.",
    avatarCard: "Profile Photo",
    choose: "Choose file",
    upload: "Upload",
    uploading: "Uploading…",
    listings: "My Listings",
    live: "Live",
    pending: "Pending",
    expired: "Expired",
    noItems: "No records",
    view: "View",
    edit: "Edit",
    remove: "Delete",
    pause: "Pause",
    extend: "Extend 30 days",
    createFirst: "Create your first listing",
    newAd: "New Listing",
  },
  ar: {
    title: "الملف الشخصي",
    sub: "حدّث بياناتك وغيّر الصورة وأدر الإعلانات.",
    logout: "تسجيل الخروج",
    backHome: "الرئيسية",
    infoCard: "بيانات الملف",
    name: "الاسم الكامل",
    username: "اسم المستخدم",
    city: "المدينة",
    language: "اللغة",
    role: "الدور",
    save: "حفظ",
    saved: "تم الحفظ.",
    avatarCard: "صورة الملف",
    choose: "اختر ملفًا",
    upload: "رفع",
    uploading: "جاري الرفع…",
    listings: "إعلاناتي",
    live: "منشور",
    pending: "بانتظار الموافقة",
    expired: "منتهٍ",
    noItems: "لا يوجد سجلات",
    view: "عرض",
    edit: "تعديل",
    remove: "حذف",
    pause: "إيقاف",
    extend: "تمديد 30 يومًا",
    createFirst: "أنشئ أول إعلان لك",
    newAd: "إعلان جديد",
  },
  de: {
    title: "Profil",
    sub: "Infos aktualisieren, Avatar ändern und Anzeigen verwalten.",
    logout: "Abmelden",
    backHome: "Start",
    infoCard: "Profilinformationen",
    name: "Vollständiger Name",
    username: "Benutzername",
    city: "Stadt",
    language: "Sprache",
    role: "Rolle",
    save: "Speichern",
    saved: "Gespeichert.",
    avatarCard: "Profilbild",
    choose: "Datei wählen",
    upload: "Hochladen",
    uploading: "Wird hochgeladen…",
    listings: "Meine Inserate",
    live: "Live",
    pending: "Ausstehend",
    expired: "Abgelaufen",
    noItems: "Keine Einträge",
    view: "Ansehen",
    edit: "Bearb.",
    remove: "Löschen",
    pause: "Pausieren",
    extend: "30 Tage verlängern",
    createFirst: "Erstelle deine erste Anzeige",
    newAd: "Neue Anzeige",
  },
};

const SUPPORTED = ["tr","en","ar","de"];

function usePreviewLang(){
  const React = require("react");
  const { useEffect, useMemo, useState } = React;
  const [lang,setLang] = useState(() => localStorage.getItem("lang") || "tr");
  useEffect(()=>{ localStorage.setItem("lang", lang); document.documentElement.lang = lang; document.documentElement.dir = (lang==='ar')?'rtl':'ltr'; }, [lang]);
  const t = useMemo(()=> STR[lang] || STR.tr, [lang]);
  return { lang, setLang, t };
}

function fmtDate(d){ try{ const x = new Date(d); return x.toLocaleDateString(); }catch{ return ""; } }

function makeId(){ return Math.random().toString(36).slice(2,10); }
function inDays(days){ return new Date(Date.now()+days*864e5).toISOString(); }

function useDemoStore(){
  const React = require("react");
  const { useEffect, useState } = React;
  const [items,setItems] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem("demo_ads")||"[]"); }catch{ return []; }
  });
  useEffect(()=>{ localStorage.setItem("demo_ads", JSON.stringify(items)); }, [items]);
  function create(){
    const ad = { id: makeId(), title:"İlan Başlığı", cat:"Genel", status:"pending", createdAt: new Date().toISOString(), expiresAt: inDays(30) };
    setItems(x=> [ad, ...x]);
  }
  function patch({id, action}){
    setItems(list => list.map(x => {
      if(x.id!==id) return x;
      if(action==='extend') return { ...x, status:'live', expiresAt: inDays(30) };
      if(action==='pause') return { ...x, status:'pending' };
      return x;
    }));
  }
  function remove(id){ setItems(list=> list.filter(x=>x.id!==id)); }
  return { items, setItems, create, patch, remove };
}

export default function ProfilePreview(){
  const React = require("react");
  const { useRef, useState } = React;
  const { lang, setLang, t:pack } = usePreviewLang();
  const { items, create, patch, remove } = useDemoStore();

  // fake user
  const [fullName,setFullName] = useState("");
  const [username,setUsername] = useState("");
  const [city,setCity] = useState("");
  const [role,setRole] = useState("customer");
  const [saving,setSaving] = useState(false);
  const [savedMsg,setSavedMsg] = useState("");

  const [preview,setPreview] = useState("");
  const [file,setFile] = useState(null);
  const [upLoading,setUpLoading] = useState(false);
  const fileRef = useRef(null);

  const live = items.filter(x => x.status === "live" && (!x.expiresAt || Date.now() < new Date(x.expiresAt).getTime()));
  const pending = items.filter(x => x.status === "pending");
  const expired = items.filter(x => x.status === "expired" || (x.expiresAt && Date.now() >= new Date(x.expiresAt).getTime()));

  function onSave(e){ e.preventDefault(); setSaving(true); setTimeout(()=>{ setSaving(false); setSavedMsg(pack.saved); }, 400); }
  function onFileChange(e){ const f=e.target.files?.[0]; if(!f) return; setFile(f); const r=new FileReader(); r.onload=()=>setPreview(r.result); r.readAsDataURL(f); }
  function onUpload(){ if(!file) return; setUpLoading(true); setTimeout(()=>{ setUpLoading(false); alert("Demo: Avatar güncellendi (önizleme)"); }, 600); }

  return (
    <main className="wrap">
      <div className="top">
        <div className="brand">
          <img src="/assets/images/logo.png" alt="logo" width="36" height="36" />
          <div>
            <h1>{pack.title}</h1>
            <p className="sub">{pack.sub}</p>
          </div>
        </div>
        <div className="right">
          <select value={lang} onChange={e=>setLang(e.target.value)}>
            {SUPPORTED.map(k=> <option key={k} value={k}>{k.toUpperCase()}</option>)}
          </select>
          <a className="btn ghost" href="/">{pack.backHome}</a>
          <a className="btn dark" href="/sign-out">{pack.logout}</a>
        </div>
      </div>

      <section className="grid">
        {/* Avatar */}
        <article className="card glass">
          <h3>{pack.avatarCard}</h3>
          <div className="avatarRow">
            <img className="avatar" src={preview || "/assets/images/logo.png"} alt="avatar" />
            <div className="col">
              <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} />
              <div className="row">
                <button className="btn" onClick={()=>fileRef.current?.click()}>{pack.choose}</button>
                <button className="btn dark" onClick={onUpload} disabled={!file || upLoading}>{upLoading?pack.uploading:pack.upload}</button>
              </div>
            </div>
          </div>
        </article>

        {/* Info */}
        <article className="card glass">
          <h3>{pack.infoCard}</h3>
          <form onSubmit={onSave} className="form">
            <label>
              <span>{pack.name}</span>
              <input value={fullName} onChange={e=>setFullName(e.target.value)} />
            </label>
            <div className="two">
              <label>
                <span>{pack.username}</span>
                <input value={username} onChange={e=>setUsername(e.target.value)} />
              </label>
              <label>
                <span>{pack.city}</span>
                <input value={city} onChange={e=>setCity(e.target.value)} />
              </label>
            </div>
            <div className="two">
              <label>
                <span>{pack.language}</span>
                <select value={lang} onChange={e=>setLang(e.target.value)}>
                  {SUPPORTED.map(k=> <option key={k} value={k}>{k.toUpperCase()}</option>)}
                </select>
              </label>
              <label>
                <span>{pack.role}</span>
                <input value={role} onChange={e=>setRole(e.target.value)} />
              </label>
            </div>
            <div className="row">
              <button className="btn dark" disabled={saving}>{saving?"…":pack.save}</button>
              {savedMsg && <small className="ok">{savedMsg}</small>}
            </div>
          </form>
        </article>
      </section>

      {/* Listings */}
      <section className="card listCard">
        <header className="listHead">
          <h3>{pack.listings}</h3>
          <div className="tabs">
            <a className="btn dark" onClick={(e)=>{e.preventDefault(); create();}}>{pack.newAd}</a>
          </div>
        </header>

        <div className="items">
          {items.map(ad => (
            <div key={ad.id} className="item">
              <div className="meta">
                <strong className="ttl">{ad.title}</strong>
                <small className="muted">{ad.cat} • {fmtDate(ad.createdAt)}{ad.expiresAt?` • exp ${fmtDate(ad.expiresAt)}`:''}</small>
              </div>
              <div className="acts">
                {ad.status==='live' && <a className="btn" href={`#`}>{pack.view}</a>}
                {ad.status==='pending' && <a className="btn" href={`#`}>{pack.edit}</a>}
                {ad.status==='pending' && <button className="btn" onClick={()=>remove(ad.id)}>{pack.remove}</button>}
                {ad.status==='live' && <button className="btn" onClick={()=>patch({id:ad.id, action:'pause'})}>{pack.pause}</button>}
                {ad.status!=='live' && <button className="btn dark" onClick={()=>patch({id:ad.id, action:'extend'})}>{pack.extend}</button>}
              </div>
            </div>
          ))}
          {items.length===0 && (
            <div className="empty">{pack.noItems} — <a href="#" onClick={(e)=>{e.preventDefault(); create();}}>{pack.createFirst}</a></div>
          )}
        </div>
      </section>

      <style jsx>{`
        :root{ --ink:#0f172a; --muted:#475569; --paper:rgba(255,255,255,.86); --line:rgba(255,255,255,.45); --brand:#111827; }
        body{ background: radial-gradient(1200px 800px at -10% -10%, rgba(255,255,255,.35), transparent 60%), linear-gradient(120deg,#ff80ab,#a78bfa,#60a5fa,#34d399); background-size:320% 320%; animation:drift 16s ease-in-out infinite; }
        @keyframes drift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .wrap{max-width:1100px;margin:0 auto;padding:20px}
        .top{display:flex;align-items:center;gap:12px}
        .brand{display:flex;align-items:center;gap:10px}
        .brand h1{margin:0;font-size:22px}
        .sub{margin:2px 0 0;color:var(--muted)}
        .right{margin-left:auto;display:flex;gap:8px;align-items:center}
        .btn{border:1px solid #e5e7eb;background:#fff;color:#111827;border-radius:12px;padding:8px 12px;font-weight:700;cursor:pointer;text-decoration:none}
        .btn.dark{background:#111827;color:#fff;border-color:#111827}
        .btn.ghost{background:#fff}
        .grid{display:grid;gap:12px;grid-template-columns:1fr 1fr;margin-top:12px}
        @media (max-width:900px){ .grid{grid-template-columns:1fr} }
        .card{background:var(--paper);backdrop-filter:blur(10px);border:1px solid var(--line);border-radius:16px;padding:14px;box-shadow:0 16px 36px rgba(0,0,0,.10)}
        .glass{position:relative;overflow:hidden}
        .glass:before{content:"";position:absolute;inset:-40%;filter:blur(60px);opacity:.6;background:radial-gradient(circle at 30% 30%, #ff80ab, transparent 60%),radial-gradient(circle at 70% 60%, #60a5fa, transparent 60%)}
        .glass > *{position:relative}
        h3{margin:0 0 10px;font-size:16px}
        .avatarRow{display:flex;align-items:center;gap:14px}
        .avatar{width:88px;height:88px;border-radius:999px;border:3px solid #fff;box-shadow:0 10px 24px rgba(0,0,0,.18);object-fit:cover}
        .row{display:flex;gap:8px}
        .col{display:grid;gap:8px}
        .form{display:grid;gap:8px}
        .form label{display:grid;gap:6px}
        .form input, .form select{padding:10px 12px;border:1px solid #e5e7eb;border-radius:12px}
        .two{display:grid;gap:8px;grid-template-columns:1fr 1fr}
        @media (max-width:720px){ .two{grid-template-columns:1fr} }
        .ok{color:#059669;margin-left:6px}

        .listCard{margin-top:12px}
        .listHead{display:flex;align-items:center;justify-content:space-between}
        .tabs{display:flex;gap:8px;align-items:center}
        .items{display:grid;gap:8px;margin-top:10px}
        .item{display:flex;align-items:center;justify-content:space-between;border:1px solid #e5e7eb;background:#fff;border-radius:12px;padding:10px}
        .ttl{display:block}
        .muted{color:#64748b}
        .acts{display:flex;gap:8px}
        .empty{padding:14px;text-align:center;color:#475569}
      `}</style>
    </main>
  );
}

/*
=========================== COPY THESE INTO YOUR NEXT.JS REPO ===========================

1) FILE: pages/profile/index.jsx
----------------------------------------------------------------------------------------
"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAuth, SignedIn, SignedOut, useUser } from "@clerk/nextjs";

const SUPPORTED = ["tr","en","ar","de"];
const STR = /* same as in preview (copy from above) */ {};

function useLang() {
  const [lang, setLang] = useState("tr");
  useEffect(() => { const s = localStorage.getItem("lang"); if (s && SUPPORTED.includes(s)) setLang(s); }, []);
  useEffect(() => { localStorage.setItem("lang", lang); try { document.documentElement.lang = lang; document.documentElement.dir = (lang==='ar')?'rtl':'ltr'; } catch {} }, [lang]);
  const t = useMemo(() => STR[lang] || STR.tr, [lang]);
  return { lang, setLang, t };
}

export default function ProfilePage() {
  const { lang, setLang, t } = useLang();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);
  const [upLoading, setUpLoading] = useState(false);
  const fileRef = useRef(null);

  const [items, setItems] = useState([]);
  const [tab, setTab] = useState("live");
  const [busyId, setBusyId] = useState(null);

  useEffect(() => { if (!isLoaded) return; if (!isSignedIn) router.replace("/login?role=customer"); }, [isLoaded, isSignedIn, router]);
  useEffect(() => {
    if (!userLoaded || !user) return;
    const fn = [user.firstName || "", user.lastName || ""].filter(Boolean).join(" ");
    setFullName(fn);
    setUsername(user.username || "");
    setCity((user.publicMetadata?.city || "") + "");
    setRole((user.publicMetadata?.role || "customer") + "");
  }, [userLoaded, user]);
  useEffect(() => { (async()=>{ try{ const r=await fetch("/api/ads/my"); const j=await r.json(); setItems(Array.isArray(j?.items)?j.items:[]); }catch(e){ console.error(e);} })(); }, []);

  async function onSave(e){ e?.preventDefault(); if(!user) return; setSaving(true); setSavedMsg("");
    try{ const [firstName,...rest]=fullName.trim().split(" "); const lastName=rest.join(" "); await user.update({ firstName, lastName, username }); await user.update({ publicMetadata: { ...(user.publicMetadata||{}), city, lang, role } }); setSavedMsg(t.saved); } catch(e){ alert(String(e?.errors?.[0]?.message || e)); } finally{ setSaving(false); }
  }

  function onFileChange(e){ const f=e.target.files?.[0]; if(!f) return; setFile(f); const reader=new FileReader(); reader.onload=()=>setPreview(reader.result); reader.readAsDataURL(f); }
  async function onUploadAvatar(){ if(!file) return; try{ setUpLoading(true); const dataUrl=preview; const mime=file.type||"image/jpeg"; const r=await fetch("/api/profile/avatar", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ data: dataUrl, mime })}); const j=await r.json(); if(!r.ok) throw new Error(j?.error||"Upload failed"); window.location.reload(); } catch(e){ alert(String(e)); } finally{ setUpLoading(false); } }

  const live = items.filter(x => x.status === "live" && (!x.expiresAt || Date.now() < new Date(x.expiresAt).getTime()));
  const pending = items.filter(x => x.status === "pending");
  const expired = items.filter(x => x.status === "expired" || (x.expiresAt && Date.now() >= new Date(x.expiresAt).getTime()));

  async function extend30(id){ setBusyId(id); try{ const r=await fetch("/api/ads/my", { method:"PATCH", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ action:"extend", id, days:30 })}); const j=await r.json(); setItems(j.items||[]);} catch(e){ alert(String(e)); } finally{ setBusyId(null); } }

  return (/* JSX SAME AS PREVIEW, with SignedIn/SignedOut and tabs for live/pending/expired incl. extend/pause/remove */);
}

// helper functions removeAd, pauseAd, fmtDate... (same as preview / earlier)

2) FILE: pages/api/profile/avatar.js
----------------------------------------------------------------------------------------
import { getAuth } from "@clerk/nextjs/server";
export const config = { api: { bodyParser: { sizeLimit: '6mb' } } };
export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const { userId } = getAuth(req);
  if(!userId) return res.status(401).json({ error: 'unauthorized' });
  try{
    const { data, mime } = req.body || {};
    if(!data) return res.status(400).json({ error: 'no data' });
    const base64 = String(data).split(',').pop();
    const buf = Buffer.from(base64, 'base64');
    const form = new FormData();
    const file = new Blob([buf], { type: mime || 'image/jpeg' });
    form.append('file', file, 'avatar.jpg');
    const r = await fetch(`https://api.clerk.com/v1/users/${userId}/profile_image`, { method:'POST', headers:{ Authorization:`Bearer ${process.env.CLERK_SECRET_KEY}` }, body: form });
    const j = await r.json();
    if(!r.ok) return res.status(r.status).json(j);
    return res.status(200).json({ ok:true, user:j });
  }catch(e){ console.error(e); return res.status(500).json({ error:String(e) }); }
}

3) FILE: pages/api/ads/my.js
----------------------------------------------------------------------------------------
import { getAuth } from "@clerk/nextjs/server";
const store = global.__MY_ADS__ || (global.__MY_ADS__ = new Map());
const now = () => new Date().toISOString();
const inDays = (d) => new Date(Date.now()+d*864e5).toISOString();
export default async function handler(req,res){
  const { userId } = getAuth(req); if(!userId) return res.status(401).json({ error:'unauthorized' });
  if(!store.has(userId)) store.set(userId, []);
  let list = store.get(userId);
  if(req.method==='GET') return res.json({ items:list });
  if(req.method==='POST'){
    const b=req.body||{}; const ad={ id: Math.random().toString(36).slice(2,10), title:b.title||'İlan Başlığı', cat:b.cat||'Genel', status:'pending', createdAt: now(), expiresAt: inDays(30) };
    list=[ad,...list]; store.set(userId,list); return res.status(201).json({ item:ad, items:list });
  }
  if(req.method==='PATCH'){
    const { id, action, days=30 } = req.body||{};
    list = list.map(x=>{ if(x.id!==id) return x; if(action==='extend') return { ...x, status:'live', expiresAt: inDays(days) }; if(action==='pause') return { ...x, status:'pending' }; return x; });
    store.set(userId,list); return res.json({ items:list });
  }
  if(req.method==='DELETE'){ const { id } = req.body||{}; list=list.filter(x=>x.id!==id); store.set(userId,list); return res.json({ items:list }); }
  return res.status(405).end();
}

========================================================================================
*/
