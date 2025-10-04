"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAuth, useUser, SignedIn, SignedOut } from "@clerk/nextjs";

/* ---------------- i18n (4 dil) ---------------- */
const SUP = ["tr","en","ar","de"];
const STR = {
  tr:{
    title:"Profil", fullName:"Ad Soyad", email:"E‑posta", city:"Şehir", settings:"Ayarlar",
    save:"Kaydet", cancel:"Vazgeç", changePwd:"Şifreyi Değiştir", goSecurity:"Güvenlik Sayfası",
    rating:"Puanın", sellerTabs:{ live:"Yayındaki", pending:"Onay Bekleyen", expired:"Süresi Dolu" },
    orders:"Siparişlerin", noAds:"Henüz ilan yok.", noOrders:"Henüz sipariş yok.",
    upload:"Fotoğrafı Değiştir", uploading:"Yükleniyor…", saved:"Kaydedildi", error:"Bir hata oluştu",
    roleSeller:"Üreten El", roleCustomer:"Müşteri",
    legal:{ privacy:"Gizlilik", about:"Hakkımızda", contact:"İletişim", terms:"Kullanım Şartları", kvkk:"KVKK Aydınlatma", distance:"Mesafeli Satış", returns:"Teslimat & İade", cookies:"Çerez Politikası", rules:"Yasaklı Ürünler" },
  },
  en:{
    title:"Profile", fullName:"Full Name", email:"Email", city:"City", settings:"Settings",
    save:"Save", cancel:"Cancel", changePwd:"Change Password", goSecurity:"Security Page",
    rating:"Your Rating", sellerTabs:{ live:"Live", pending:"Pending", expired:"Expired" },
    orders:"Your Orders", noAds:"No listings.", noOrders:"No orders.",
    upload:"Change Photo", uploading:"Uploading…", saved:"Saved", error:"Something went wrong",
    roleSeller:"Maker", roleCustomer:"Customer",
    legal:{ privacy:"Privacy", about:"About", contact:"Contact", terms:"Terms", kvkk:"KVKK Notice", distance:"Distance Sales", returns:"Shipping & Returns", cookies:"Cookie Policy", rules:"Prohibited Items" },
  },
  ar:{
    title:"الملف الشخصي", fullName:"الاسم الكامل", email:"البريد", city:"المدينة", settings:"إعدادات",
    save:"حفظ", cancel:"إلغاء", changePwd:"تغيير كلمة المرور", goSecurity:"صفحة الأمان",
    rating:"تقييمك", sellerTabs:{ live:"منشور", pending:"بانتظار", expired:"منتهي" },
    orders:"طلباتك", noAds:"لا توجد إعلانات.", noOrders:"لا توجد طلبات.",
    upload:"تغيير الصورة", uploading:"جارٍ الرفع…", saved:"تم الحفظ", error:"حدث خطأ",
    roleSeller:"المُنتِجة", roleCustomer:"العميل",
    legal:{ privacy:"الخصوصية", about:"من نحن", contact:"اتصال", terms:"الشروط", kvkk:"إشعار KVKK", distance:"البيع عن بعد", returns:"التسليم والإرجاع", cookies:"سياسة الكوكيز", rules:"العناصر المحظورة" },
  },
  de:{
    title:"Profil", fullName:"Name", email:"E‑Mail", city:"Stadt", settings:"Einstellungen",
    save:"Speichern", cancel:"Abbrechen", changePwd:"Passwort ändern", goSecurity:"Sicherheitsseite",
    rating:"Deine Bewertung", sellerTabs:{ live:"Aktiv", pending:"Ausstehend", expired:"Abgelaufen" },
    orders:"Bestellungen", noAds:"Keine Inserate.", noOrders:"Keine Bestellungen.",
    upload:"Foto ändern", uploading:"Lädt…", saved:"Gespeichert", error:"Fehler aufgetreten",
    roleSeller:"Anbieterin", roleCustomer:"Kunde",
    legal:{ privacy:"Datenschutz", about:"Über uns", contact:"Kontakt", terms:"Nutzungsbedingungen", kvkk:"KVKK‑Hinweis", distance:"Fernabsatz", returns:"Lieferung & Rückgabe", cookies:"Cookie‑Richtlinie", rules:"Verbotene Artikel" },
  }
};

function useLang(){
  const [lang,setLang]=useState("tr");
  useEffect(()=>{ try{ const s=localStorage.getItem("lang"); if(s&&SUP.includes(s)) setLang(s);}catch{} },[]);
  const t = useMemo(()=>STR[lang]||STR.tr,[lang]);
  const dir = lang==="ar"?"rtl":"ltr";
  return { t, lang, setLang, dir };
}

/* ---------------- Sayfa (rol KİLİTLİ) ---------------- */
export default function ProfilePage(){
  const { t, dir } = useLang();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();

  // form/state
  const [rating,setRating]=useState(0);
  const [settingsOpen,setSettingsOpen]=useState(false);
  const [busy,setBusy]=useState(false);
  const [msg,setMsg]=useState("");
  const [form,setForm]=useState({ fullName:"", username:"", city:"", newPwd:"", newPwd2:"" });
  const [tab,setTab]=useState("live");
  const [ads,setAds]=useState({ live:[], pending:[], expired:[] });
  const [orders,setOrders]=useState([]);

  // Guard
  useEffect(()=>{ if(!isLoaded) return; if(!isSignedIn) router.replace("/login"); },[isLoaded,isSignedIn,router]);

  // Load user (rolü METADATADAN al, UI'da değiştirme YOK)
  const [role,setRole] = useState(""); // "seller" | "customer"
  useEffect(()=>{
    if(!userLoaded||!user) return;
    const meta = (user.unsafeMetadata||user.publicMetadata)||{};
    const r = (meta.role==="seller"||meta.role==="customer")?meta.role: (typeof window!=="undefined"? localStorage.getItem("role") : "") || "customer";
    setRole(r);

    const full = (meta.full_name) || [user.firstName,user.lastName].filter(Boolean).join(" ");
    const city = meta.city || (typeof window!=="undefined"? localStorage.getItem("city"):"") || "";
    setForm(f=>({ ...f, fullName: full||"", username: user.username||"", city }));

    try{ const savedRating = Number(localStorage.getItem("my_rating")||0); if(Number.isFinite(savedRating)) setRating(savedRating);}catch{}
  },[userLoaded,user]);

  // preload data
  useEffect(()=>{
    if(role!=="seller") return;
    (async()=>{
      try{ // SSR/edge cache'i bypass et
        const r = await fetch("/api/ads/my", { cache:"no-store" });
        if(r.ok){ const data = await r.json(); setAds({
          live: data.live||[], pending: data.pending||[], expired: data.expired||[]
        }); return; }
      }catch{}
      try{ const stub = JSON.parse(localStorage.getItem("ads_my")||"{}"); setAds({ live:stub.live||[], pending:stub.pending||[], expired:stub.expired||[] }); }catch{}
    })();
  },[role]);

  useEffect(()=>{
    if(role!=="customer") return;
    (async()=>{
      try{ const r = await fetch("/api/orders/my?limit=20", { cache:"no-store" }); if(r.ok){ const data = await r.json(); setOrders(Array.isArray(data)?data:[]); return; } }catch{}
      try{ const stub = JSON.parse(localStorage.getItem("orders_my")||"[]"); setOrders(Array.isArray(stub)?stub:[]);}catch{}
    })();
  },[role]);

  function starClick(i){ const val=i+1; setRating(val); try{localStorage.setItem("my_rating",String(val));}catch{} }

  async function onAvatarChange(e){
    const file = e.target.files?.[0]; if(!file) return;
    try{ setBusy(true); setMsg(t.uploading); await user.setProfileImage({ file }); setMsg(t.saved); }
    catch{ setMsg(t.error); } finally{ setBusy(false); setTimeout(()=>setMsg(""),1200); }
  }

  async function saveSettings(e){
    e.preventDefault(); setBusy(true); setMsg("");
    try{
      const [firstName,...rest] = (form.fullName||"").trim().split(" ");
      const lastName = rest.join(" ");
      await user.update({ username: form.username||undefined, firstName: firstName||undefined, lastName: lastName||undefined, unsafeMetadata:{ ...((user.unsafeMetadata||user.publicMetadata)||{}), full_name: form.fullName||"", city: form.city||"" } });
      try{ localStorage.setItem("city", form.city||""); localStorage.setItem("full_name", form.fullName||""); }catch{}
      if(form.newPwd||form.newPwd2){ if(form.newPwd!==form.newPwd2){ setMsg("Şifreler eşleşmiyor."); setBusy(false); return; } window.open("/user/profile/security","_blank"); }
      setMsg(t.saved); setSettingsOpen(false);
    }catch{ setMsg(t.error); } finally{ setBusy(false); setTimeout(()=>setMsg(""),1200); }
  }

  return (
    <div className="wrap" dir={dir}>
      <SignedOut><p style={{padding:16}}>Yönlendiriliyor…</p></SignedOut>
      <SignedIn>
        {/* Üst başlık */}
        <header className="head">
          <div className="avatarBox">
            <div className="ring"><img src={user?.imageUrl||"/assets/images/logo.png"} alt="avatar" /></div>
            <label className="uploadBtn">{busy? t.uploading : t.upload}<input type="file" accept="image/*" onChange={onAvatarChange} disabled={busy}/></label>
            <div className="rating"><span>★</span>{Array.from({length:5}).map((_,i)=> (
              <button key={i} className={i<rating?"star on":"star"} onClick={()=>starClick(i)} aria-label={`star-${i+1}`}>★</button>
            ))}</div>
          </div>

          <div className="prim">
            <div className="roleChip">{role==="seller"? t.roleSeller : t.roleCustomer}</div>
            <h1 className="ttl">{t.title}</h1>
            <div className="fldRow"><label>{t.fullName}</label><div className="val">{form.fullName||"—"}</div></div>
            <div className="fldRow"><label>{t.email}</label><div className="val">{user?.primaryEmailAddress?.emailAddress||"—"}</div></div>
            <div className="fldRow"><label>{t.city}</label><div className="val">{form.city|| (typeof window!=="undefined"?localStorage.getItem("city"):"") || "—"}</div></div>
            <div className="actions"><button className="btn" onClick={()=>setSettingsOpen(true)}>⚙️ {t.settings}</button> <a className="btn ghost" href="/logout">Çıkış</a></div>
            {msg && <div className="msg">{msg}</div>}
          </div>
        </header>

        {/* Satıcı ise sekmeler */}
        {role==="seller" && (
          <div className="tabs">{["live","pending","expired"].map(k=> (
            <button key={k} className={tab===k?"tab active":"tab"} onClick={()=>setTab(k)}>{t.sellerTabs[k]}</button>
          ))}</div>
        )}

        {/* İçerik */}
        {role==="seller" ? (
          <AdList items={ads[tab]} emptyText={t.noAds} />
        ) : (
          <OrderList items={orders} emptyText={t.noOrders} />
        )}

        {/* SİYAH LEGAL PANEL */}
        <footer className="legal">
          <div className="cols">
            <section><h4>Kurumsal</h4>
              <a href="/legal/hakkimizda">{t.legal.about}</a>
              <a href="/legal/iletisim">{t.legal.contact}</a>
              <a href="/legal/gizlilik">{t.legal.privacy}</a>
              <a href="/legal/kvkk-aydinlatma">{t.legal.kvkk}</a>
            </section>
            <section><h4>Gizlilik & Kullanım</h4>
              <a href="/legal/kullanim-sartlari">{t.legal.terms}</a>
              <a href="/legal/mesafeli-satis-sozlesmesi">{t.legal.distance}</a>
              <a href="/legal/teslimat-iade">{t.legal.returns}</a>
              <a href="/legal/cerez-politikasi">{t.legal.cookies}</a>
            </section>
            <section><h4>Yardım</h4>
              <a href="/legal/topluluk-kurallari#yasakli-urunler">{t.legal.rules}</a>
              <a href="/">Ana Sayfa</a>
            </section>
          </div>
          <div className="copy">© {new Date().getFullYear()} Üreten Eller</div>
        </footer>
      </SignedIn>

      {/* Stil */}
      <style jsx>{`
        .wrap{min-height:100vh; padding:16px 14px 96px; background:
          radial-gradient(1000px 700px at -10% -10%, rgba(255,255,255,.35), transparent 60%),
          linear-gradient(120deg,#ff80ab,#a78bfa,#60a5fa,#34d399); background-size:320% 320%; animation:drift 16s ease-in-out infinite;}
        @keyframes drift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

        .head{max-width:1100px; margin:10px auto; display:grid; gap:14px; grid-template-columns:200px 1fr;
          background:rgba(255,255,255,.86); border:1px solid rgba(255,255,255,.5); border-radius:20px; padding:16px; backdrop-filter:blur(10px)}
        @media (max-width:760px){ .head{grid-template-columns:1fr} }

        .avatarBox{display:grid; gap:10px; justify-items:center}
        .ring{padding:6px; border-radius:999px; background:conic-gradient(from 0deg, #ff80ab, #a78bfa, #60a5fa, #34d399, #ff80ab)}
        .ring img{display:block; width:128px; height:128px; object-fit:cover; border-radius:999px; background:#f1f5f9}
        .uploadBtn{font-weight:800; border:1px solid #e5e7eb; background:#fff; padding:8px 12px; border-radius:12px; cursor:pointer}
        .uploadBtn input{display:none}
        .rating{display:flex; align-items:center; gap:6px; font-weight:800}
        .star{border:none; background:transparent; font-size:18px; cursor:pointer; opacity:.35}
        .star.on{opacity:1}

        .roleChip{display:inline-block; padding:4px 10px; border-radius:999px; background:#111827; color:#fff; font-weight:900; font-size:12px}
        .prim .ttl{margin:8px 0; font-size:26px}
        .fldRow{display:grid; grid-template-columns:180px 1fr; gap:8px; align-items:center}
        .fldRow label{font-weight:800; color:#111827}
        .val{padding:8px 12px; border-radius:12px; background:#fff; border:1px solid #e5e7eb}
        .actions{margin-top:10px; display:flex; gap:8px; flex-wrap:wrap}
        .btn{border:1px solid #e5e7eb; background:#fff; color:#111827; border-radius:12px; padding:9px 12px; font-weight:900; cursor:pointer}
        .btn.ghost{background:#fff}
        .msg{margin-top:8px; font-size:13px; background:#f1f5f9; border:1px solid #e5e7eb; padding:6px 10px; border-radius:10px; width:max-content}

        .tabs{max-width:1100px; margin:10px auto; display:flex; gap:8px; background:rgba(255,255,255,.72); border:1px solid #e5e7eb; padding:6px; border-radius:14px}
        .tab{border:none; padding:10px 14px; border-radius:12px; font-weight:900; cursor:pointer}
        .tab.active{background:#111827; color:#fff}

        .card{max-width:1100px; margin:10px auto; background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:14px}
        .ads{display:grid; gap:10px; grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
        .ad{border:1px solid #e5e7eb; border-radius:14px; overflow:hidden; background:#fff}
        .thumb{width:100%; aspect-ratio:4/3; background:#f1f5f9}
        .body{padding:10px}
        .title{margin:0 0 6px; font-size:14px; font-weight:900}

        .orders{display:grid; gap:10px}
        .order{display:grid; grid-template-columns:120px 1fr auto; gap:10px; align-items:center; border:1px solid #e5e7eb; border-radius:14px; background:#fff; padding:10px}
        @media (max-width:720px){ .order{grid-template-columns:1fr; align-items:start} }
        .status{font-weight:900; padding:6px 10px; border-radius:999px; background:#0b0b0f; color:#fff; width:max-content}
        .acts{display:flex; gap:8px; flex-wrap:wrap}
        .linkBtn{border:1px solid #111827; background:#111827; color:#fff; border-radius:10px; padding:8px 10px; text-decoration:none; font-weight:800}

        .legal{margin:16px auto 0; background:#0b0b0f; color:#cbd5e1}
        .cols{display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:14px; max-width:1100px; margin:0 auto; padding:18px 14px}
        .legal h4{color:#fff; margin:0 0 6px}
        .legal a{display:block; color:#cbd5e1; text-decoration:none; padding:2px 0}
        .legal a:hover{color:#fff}
        .copy{border-top:1px solid #232329; text-align:center; padding:10px; font-size:13px}
      `}</style>
    </div>
  );
}

/* ----- Alt bileşenler ----- */
function AdList({ items, emptyText }){
  if(!items || !items.length){ return <div className="card"><p>{emptyText}</p></div>; }
  return (
    <div className="card">
      <div className="ads">
        {items.map((a,idx)=> (
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
    </div>
  );
}

function OrderList({ items, emptyText }){
  if(!items || !items.length){ return <div className="card"><p>{emptyText}</p></div>; }
  return (
    <div className="card">
      <div className="orders">
        {items.map((o,idx)=>{
          const id = o.id || o.code || `#${idx+1}`;
          const when = o.date || o.createdAt || "";
          const price = o.total || o.price || "";
          const status = o.status || ""; // Hazırlanıyor / Kargoda / Teslim edildi / İade …
          return (
            <div key={idx} className="order">
              <div style={{display:"grid",gap:4}}>
                <b>{id}</b>
                <span style={{color:"#475569",fontSize:13}}>{when}</span>
              </div>
              <div style={{display:"grid",gap:6}}>
                <div style={{display:"flex",justifyContent:"space-between",gap:10,flexWrap:"wrap"}}>
                  <b>{o.title||o.summary||"Sipariş"}</b>
                  <span>{price}</span>
                </div>
                <span className="status">{status}</span>
              </div>
              <div className="acts">
                {o.tracking && <a className="linkBtn" href={o.tracking} target="_blank" rel="noreferrer">Kargo Takip</a>}
                {o.view && <a className="linkBtn" href={o.view}>Görüntüle</a>}
                {o.canReturn && <a className="linkBtn" href={`/orders/${o.id||idx}/return`}>İade Talebi</a>}
                {o.canReorder && <a className="linkBtn" href={`/orders/${o.id||idx}/reorder`}>Tekrar Sipariş</a>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
