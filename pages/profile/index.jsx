"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAuth, useUser, SignedIn, SignedOut } from "@clerk/nextjs";

/* ---------------- i18n (TR/EN/AR/DE) ---------------- */
const SUP = ["tr","en","ar","de"];
const STR = {
  tr:{
    brand:"Üreten Eller",
    title:"Profil",
    roleSeller:"Üreten El",
    roleCustomer:"Müşteri",
    fullName:"Ad Soyad",
    email:"E‑posta",
    city:"Şehir",
    settings:"Ayarlar",
    save:"Kaydet",
    cancel:"Vazgeç",
    changePwd:"Şifreyi Değiştir",
    goSecurity:"Güvenlik Sayfası",
    upload:"Fotoğrafı Değiştir",
    uploading:"Yükleniyor…",
    saved:"Kaydedildi",
    error:"Bir hata oluştu",
    rating:"Puanın",
    sellerTabs:{ live:"Yayındaki", pending:"Onay Bekleyen", expired:"Süresi Dolu" },
    noAds:"Henüz ilan yok.",
    orders:"Siparişlerin",
    noOrders:"Henüz sipariş yok.",
    kycTitle:"Kimlik & IBAN Doğrulama",
    kycDesc:"Ödemelerin aktarılması için kimliğini ve IBAN’ını doğrula.",
    kycStatus_ok:"Doğrulandı",
    kycStatus_missing:"Eksik",
    kycStart:"Doğrulamayı Başlat",
    ibanVerify:"IBAN Doğrula",
    payoutTitle:"Ödeme Durumu",
    payoutDesc:"Ödemeler teslim onayı sonrası emanet hesabından IBAN’ına aktarılır.",
    subm:"Alt Mağaza No",
    iban:"IBAN",
    premiumTitle:"Premium Üyelik",
    premiumDesc:"Komisyonsuz model + ekstra vitrin, rozet ve destek.",
    buyPremium:"Premium Satın Al",
    managePremium:"Aboneliği Yönet",
    notifyTitle:"Bildirimler",
    emailNotify:"E‑posta bildirimi",
    smsNotify:"SMS bildirimi",
    waNotify:"WhatsApp bildirimi",
    logout:"Çıkış",
    legal:{ privacy:"Gizlilik", about:"Hakkımızda", contact:"İletişim", terms:"Kullanım Şartları", kvkk:"KVKK Aydınlatma", distance:"Mesafeli Satış", returns:"Teslimat & İade", cookies:"Çerez Politikası", rules:"Yasaklı Ürünler" },
  },
  en:{
    brand:"Ureten Eller",
    title:"Profile",
    roleSeller:"Maker",
    roleCustomer:"Customer",
    fullName:"Full Name",
    email:"Email",
    city:"City",
    settings:"Settings",
    save:"Save",
    cancel:"Cancel",
    changePwd:"Change Password",
    goSecurity:"Open Security Page",
    upload:"Change Photo",
    uploading:"Uploading…",
    saved:"Saved",
    error:"Something went wrong",
    rating:"Your Rating",
    sellerTabs:{ live:"Live", pending:"Pending", expired:"Expired" },
    noAds:"No listings.",
    orders:"Your Orders",
    noOrders:"No orders yet.",
    kycTitle:"KYC & IBAN Verification",
    kycDesc:"Verify your identity and IBAN to receive payouts.",
    kycStatus_ok:"Verified",
    kycStatus_missing:"Incomplete",
    kycStart:"Start Verification",
    ibanVerify:"Verify IBAN",
    payoutTitle:"Payout Status",
    payoutDesc:"Funds are held in escrow and released after delivery confirmation.",
    subm:"Sub‑merchant ID",
    iban:"IBAN",
    premiumTitle:"Premium Membership",
    premiumDesc:"Zero commission + extra showcase, badge and support.",
    buyPremium:"Buy Premium",
    managePremium:"Manage Subscription",
    notifyTitle:"Notifications",
    emailNotify:"Email notifications",
    smsNotify:"SMS notifications",
    waNotify:"WhatsApp notifications",
    logout:"Sign out",
    legal:{ privacy:"Privacy", about:"About", contact:"Contact", terms:"Terms", kvkk:"KVKK Notice", distance:"Distance Sales", returns:"Shipping & Returns", cookies:"Cookie Policy", rules:"Prohibited Items" },
  },
  ar:{
    brand:"أُنتِج بالأيادي",
    title:"الملف الشخصي",
    roleSeller:"المُنتِجة",
    roleCustomer:"العميل",
    fullName:"الاسم الكامل",
    email:"البريد",
    city:"المدينة",
    settings:"إعدادات",
    save:"حفظ",
    cancel:"إلغاء",
    changePwd:"تغيير كلمة المرور",
    goSecurity:"صفحة الأمان",
    upload:"تغيير الصورة",
    uploading:"جارٍ الرفع…",
    saved:"تم الحفظ",
    error:"حدث خطأ",
    rating:"تقييمك",
    sellerTabs:{ live:"منشور", pending:"بانتظار", expired:"منتهي" },
    noAds:"لا توجد إعلانات.",
    orders:"طلباتك",
    noOrders:"لا توجد طلبات.",
    kycTitle:"التحقق من الهوية وIBAN",
    kycDesc:"ثبّت هويتك وIBAN لاستلام الدفعات.",
    kycStatus_ok:"مُوثّق",
    kycStatus_missing:"ناقص",
    kycStart:"ابدأ التحقق",
    ibanVerify:"تحقق من IBAN",
    payoutTitle:"حالة الدفعات",
    payoutDesc:"الأموال في الضمان وتُحوّل بعد تأكيد الاستلام.",
    subm:"رقم التاجر الفرعي",
    iban:"IBAN",
    premiumTitle:"عضوية بريميوم",
    premiumDesc:"بدون عمولة + عرض إضافي وشارة ودعم.",
    buyPremium:"اشترِ بريميوم",
    managePremium:"إدارة الاشتراك",
    notifyTitle:"الإشعارات",
    emailNotify:"تنبيهات البريد",
    smsNotify:"تنبيهات الرسائل",
    waNotify:"تنبيهات واتساب",
    logout:"تسجيل الخروج",
    legal:{ privacy:"الخصوصية", about:"من نحن", contact:"اتصال", terms:"الشروط", kvkk:"إشعار KVKK", distance:"البيع عن بعد", returns:"التسليم والإرجاع", cookies:"سياسة الكوكيز", rules:"العناصر المحظورة" },
  },
  de:{
    brand:"Ureten Eller",
    title:"Profil",
    roleSeller:"Anbieterin",
    roleCustomer:"Kunde",
    fullName:"Name",
    email:"E‑Mail",
    city:"Stadt",
    settings:"Einstellungen",
    save:"Speichern",
    cancel:"Abbrechen",
    changePwd:"Passwort ändern",
    goSecurity:"Sicherheitsseite",
    upload:"Foto ändern",
    uploading:"Lädt…",
    saved:"Gespeichert",
    error:"Fehler aufgetreten",
    rating:"Deine Bewertung",
    sellerTabs:{ live:"Aktiv", pending:"Ausstehend", expired:"Abgelaufen" },
    noAds:"Keine Inserate.",
    orders:"Bestellungen",
    noOrders:"Keine Bestellungen.",
    kycTitle:"Identitäts- & IBAN‑Prüfung",
    kycDesc:"Verifiziere Identität und IBAN für Auszahlungen.",
    kycStatus_ok:"Verifiziert",
    kycStatus_missing:"Unvollständig",
    kycStart:"Verifizierung starten",
    ibanVerify:"IBAN prüfen",
    payoutTitle:"Auszahlungsstatus",
    payoutDesc:"Treuhandzahlung bis zur Lieferbestätigung.",
    subm:"Sub‑Merchant ID",
    iban:"IBAN",
    premiumTitle:"Premium-Mitgliedschaft",
    premiumDesc:"0 % Provision + Vitrine, Badge, Support.",
    buyPremium:"Premium kaufen",
    managePremium:"Abo verwalten",
    notifyTitle:"Benachrichtigungen",
    emailNotify:"E‑Mail‑Benachr.",
    smsNotify:"SMS‑Benachr.",
    waNotify:"WhatsApp‑Benachr.",
    logout:"Abmelden",
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

/* ---------------- Sayfa (ROL KİLİTLİ) ---------------- */
export default function ProfilePage(){
  const { t, lang, setLang, dir } = useLang();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();

  const [role,setRole] = useState(""); // "seller" | "customer"
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

  // Load user + rol kilidi
  useEffect(()=>{
    if(!userLoaded||!user) return;
    const meta = (user.unsafeMetadata||user.publicMetadata)||{};
    const r = (meta.role==="seller"||meta.role==="customer")?meta.role:(typeof window!=="undefined"? localStorage.getItem("role"):"")||"customer";
    setRole(r);

    const full = meta.full_name || [user.firstName,user.lastName].filter(Boolean).join(" ");
    const city = meta.city || (typeof window!=="undefined"? localStorage.getItem("city"):"") || "";
    setForm(f=>({ ...f, fullName: full||"", username: user.username||"", city }));

    try{ const savedRating = Number(localStorage.getItem("my_rating")||0); if(Number.isFinite(savedRating)) setRating(savedRating);}catch{}
  },[userLoaded,user]);

  // Data preload (seller)
  useEffect(()=>{
    if(role!=="seller") return;
    (async()=>{
      try{ const r = await fetch("/api/ads/my", { cache:"no-store" }); if(r.ok){ const data = await r.json(); setAds({ live:data.live||[], pending:data.pending||[], expired:data.expired||[] }); return; } }catch{}
      try{ const stub = JSON.parse(localStorage.getItem("ads_my")||"{}"); setAds({ live:stub.live||[], pending:stub.pending||[], expired:stub.expired||[] }); }catch{}
    })();
  },[role]);

  // Data preload (customer)
  useEffect(()=>{
    if(role!=="customer") return;
    (async()=>{
      try{ const r = await fetch("/api/orders/my?limit=20", { cache:"no-store" }); if(r.ok){ const data = await r.json(); setOrders(Array.isArray(data)?data:[]); return; } }catch{}
      try{ const stub = JSON.parse(localStorage.getItem("orders_my")||"[]"); setOrders(Array.isArray(stub)?stub:[]);}catch{}
    })();
  },[role]);

  // KYC & payout meta (salt okunur, butonlar akışı başlatır)
  const kyc = useMemo(()=>{
    const m = (user?.unsafeMetadata||user?.publicMetadata)||{};
    return {
      kyc_status: m.kyc_status||"missing", // missing | pending | verified
      iban_verified: !!m.iban_verified,
      submerchant_id: m.submerchant_id||"",
      iban_last4: (m.iban||"").slice(-4)
    };
  },[user]);

  function starClick(i){ const val=i+1; setRating(val); try{localStorage.setItem("my_rating",String(val));}catch{} }

  async function onAvatarChange(e){ const file = e.target.files?.[0]; if(!file) return; try{ setBusy(true); setMsg(t.uploading); await user.setProfileImage({ file }); setMsg(t.saved);}catch{ setMsg(t.error);} finally{ setBusy(false); setTimeout(()=>setMsg(""),1200);} }

  async function saveSettings(e){ e.preventDefault(); setBusy(true); setMsg(""); try{
    const [firstName,...rest]=(form.fullName||"").trim().split(" ");
    const lastName=rest.join(" ");
    await user.update({ username: form.username||undefined, firstName: firstName||undefined, lastName: lastName||undefined, unsafeMetadata:{ ...((user.unsafeMetadata||user.publicMetadata)||{}), full_name: form.fullName||"", city: form.city||"" } });
    try{ localStorage.setItem("city", form.city||""); localStorage.setItem("full_name", form.fullName||""); }catch{}
    if(form.newPwd||form.newPwd2){ if(form.newPwd!==form.newPwd2){ setMsg("Şifreler eşleşmiyor."); setBusy(false); return;} window.open("/user/profile/security","_blank"); }
    setMsg(t.saved); setSettingsOpen(false);
  }catch{ setMsg(t.error);} finally{ setBusy(false); setTimeout(()=>setMsg(""),1200);} }

  function goto(h){ if(typeof window!=="undefined") window.location.href=h; }

  return (
    <div className="wrap" dir={dir}>
      {/* Dil seçici */}
      <div className="langbox"><select aria-label="Language" value={lang} onChange={e=>{setLang(e.target.value); try{localStorage.setItem("lang",e.target.value);}catch{}}}>{SUP.map(k=> <option key={k} value={k}>{k.toUpperCase()}</option>)}</select></div>

      <SignedOut><p style={{padding:16}}>Yönlendiriliyor…</p></SignedOut>
      <SignedIn>
        {/* HEAD */}
        <header className="head">
          <div className="avatarBox">
            <div className="ring"><img src={user?.imageUrl||"/assets/images/logo.png"} alt="avatar"/></div>
            <label className="uploadBtn">{busy? t.uploading : t.upload}<input type="file" accept="image/*" onChange={onAvatarChange} disabled={busy}/></label>
            <div className="rating"><span>★</span>{[0,1,2,3,4].map(i=>(<button key={i} className={i<rating?"star on":"star"} onClick={()=>starClick(i)} aria-label={`star-${i+1}`}>★</button>))}</div>
          </div>

          <div className="prim">
            <div className="roleChip">{role==="seller"?t.roleSeller:t.roleCustomer}</div>
            <h1 className="ttl">{t.title}</h1>
            <div className="fldRow"><label>{t.fullName}</label><div className="val">{form.fullName||"—"}</div></div>
            <div className="fldRow"><label>{t.email}</label><div className="val">{user?.primaryEmailAddress?.emailAddress||"—"}</div></div>
            <div className="fldRow"><label>{t.city}</label><div className="val">{form.city || (typeof window!=="undefined"?localStorage.getItem("city"):"") || "—"}</div></div>
            <div className="actions">
              <button className="btn" onClick={()=>setSettingsOpen(true)}>⚙️ {t.settings}</button>
              <a className="btn ghost" href="/logout">{t.logout}</a>
            </div>
            {msg && <div className="msg">{msg}</div>}
          </div>
        </header>

        {/* SELLER BLOCKS */}
        {role==="seller" && (
          <>
            <section className="grid2">
              <article className="card hue">
                <h3>{t.kycTitle}</h3>
                <p className="muted">{t.kycDesc}</p>
                <div className="kv">
                  <span>KYC</span>
                  <b className={kyc.kyc_status==="verified"?"ok":"warn"}>{kyc.kyc_status==="verified"?t.kycStatus_ok:t.kycStatus_missing}</b>
                </div>
                <div className="kv">
                  <span>{t.iban}</span>
                  <b className={kyc.iban_verified?"ok":"warn"}>{kyc.iban_verified?`***${kyc.iban_last4||""}`:"—"}</b>
                </div>
                <div className="row">
                  <button className="btn dark" onClick={()=>goto("/api/kyc/start")}>{t.kycStart}</button>
                  <button className="btn" onClick={()=>goto("/api/kyc/iban-start")}>{t.ibanVerify}</button>
                </div>
              </article>
              <article className="card">
                <h3>{t.payoutTitle}</h3>
                <p className="muted">{t.payoutDesc}</p>
                <div className="kv"><span>{t.subm}</span><b>{kyc.submerchant_id||"—"}</b></div>
                <div className="kv"><span>{t.iban}</span><b>{kyc.iban_last4?`***${kyc.iban_last4}`:"—"}</b></div>
                <div className="row">
                  <a className="btn" href="/portal/seller/payouts">Ekstre</a>
                  <a className="btn" href="/portal/seller/settings">Ayarlar</a>
                </div>
              </article>
              <article className="card hue">
                <h3>{t.premiumTitle}</h3>
                <p className="muted">{t.premiumDesc}</p>
                <div className="row"><button className="btn dark" onClick={()=>goto("/api/billing/checkout?plan=premium")}>{t.buyPremium}</button><a className="btn" href="/portal/billing">{t.managePremium}</a></div>
              </article>
            </section>

            <div className="tabs">{["live","pending","expired"].map(k=>(<button key={k} className={tab===k?"tab active":"tab"} onClick={()=>setTab(k)}>{t.sellerTabs[k]}</button>))}
              <div className="flexgap"><a className="btn" href="/portal/seller/new">Yeni İlan</a><a className="btn" href="/portal/seller/bulk">Toplu Ürün</a></div>
            </div>
            <AdList items={ads[tab]} emptyText={t.noAds} />
          </>
        )}

        {/* CUSTOMER BLOCKS */}
        {role==="customer" && (
          <>
            <section className="card"><h3>{t.orders}</h3><OrderList items={orders} emptyText={t.noOrders}/></section>
            <section className="card"><h3>{t.notifyTitle}</h3>
              <NotifyPrefs langKey={lang} t={t} />
            </section>
          </>
        )}

        {/* Ayarlar Paneli */}
        {settingsOpen && (
          <div className="sheet" role="dialog" aria-modal="true">
            <div className="sheetCard">
              <div className="sheetHead"><strong>⚙️ {t.settings}</strong><button className="btn ghost" onClick={()=>setSettingsOpen(false)}>✕</button></div>
              <form onSubmit={saveSettings} className="grid">
                <label className="lab"><span>{t.fullName}</span><input value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})}/></label>
                <label className="lab"><span>Kullanıcı adı</span><input value={form.username} onChange={e=>setForm({...form, username:e.target.value})}/></label>
                <label className="lab"><span>{t.city}</span><input value={form.city} onChange={e=>setForm({...form, city:e.target.value})}/></label>
                <div className="sep"/>
                <div className="lab"><strong>🔒 {t.changePwd}</strong></div>
                <label className="lab"><span>Yeni şifre</span><input type="password" value={form.newPwd} onChange={e=>setForm({...form, newPwd:e.target.value})} /></label>
                <label className="lab"><span>Yeni şifre (tekrar)</span><input type="password" value={form.newPwd2} onChange={e=>setForm({...form, newPwd2:e.target.value})} /></label>
                <a className="link" href="/user/profile/security" target="_blank" rel="noreferrer">➡️ {t.goSecurity}</a>
                <div className="row"><button type="button" className="btn ghost" onClick={()=>setSettingsOpen(false)}>{t.cancel}</button><button className="btn dark" disabled={busy}>{busy?"…":t.save}</button></div>
              </form>
            </div>
          </div>
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
          <div className="copy">© {new Date().getFullYear()} {t.brand}</div>
        </footer>
      </SignedIn>

      {/* Stil */}
      <style jsx>{`
        .wrap{min-height:100vh; padding:16px 14px 120px; background:
          radial-gradient(1000px 700px at -10% -10%, rgba(255,255,255,.35), transparent 60%),
          linear-gradient(120deg,#ff80ab,#a78bfa,#60a5fa,#34d399); background-size:320% 320%; animation:drift 16s ease-in-out infinite}
        @keyframes drift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

        .langbox{position:fixed; top:12px; right:12px; z-index:50; background:rgba(255,255,255,.9); border:1px solid #e5e7eb; border-radius:12px; padding:6px 10px; backdrop-filter:blur(8px)}
        .langbox select{border:none; background:transparent; font-weight:800; cursor:pointer}

        .head{max-width:1120px; margin:10px auto; display:grid; gap:14px; grid-template-columns:220px 1fr; background:rgba(255,255,255,.86); border:1px solid rgba(255,255,255,.5); border-radius:20px; padding:16px; backdrop-filter:blur(10px)}
        @media (max-width:820px){ .head{grid-template-columns:1fr} }

        .avatarBox{display:grid; gap:10px; justify-items:center}
        .ring{padding:6px; border-radius:999px; background:conic-gradient(from 0deg,#ff80ab,#a78bfa,#60a5fa,#34d399,#ff80ab)}
        .ring img{display:block; width:136px; height:136px; object-fit:cover; border-radius:999px; background:#f1f5f9}
        .uploadBtn{font-weight:900; border:1px solid #e5e7eb; background:#fff; padding:8px 12px; border-radius:12px; cursor:pointer}
        .uploadBtn input{display:none}
        .rating{display:flex; align-items:center; gap:6px; font-weight:900}
        .star{border:none; background:transparent; font-size:18px; cursor:pointer; opacity:.35}
        .star.on{opacity:1}

        .roleChip{display:inline-block; padding:4px 10px; border-radius:999px; background:#111827; color:#fff; font-weight:900; font-size:12px}
        .prim .ttl{margin:8px 0; font-size:28px}
        .fldRow{display:grid; grid-template-columns:190px 1fr; gap:8px; align-items:center}
        .fldRow label{font-weight:900; color:#111827}
        .val{padding:8px 12px; border-radius:12px; background:#fff; border:1px solid #e5e7eb}
        .actions{margin-top:10px; display:flex; gap:8px; flex-wrap:wrap}
        .btn{border:1px solid #e5e7eb; background:#fff; color:#111827; border-radius:12px; padding:9px 12px; font-weight:900; cursor:pointer}
        .btn.dark{background:#111827; color:#fff; border-color:#111827}
        .btn.ghost{background:#fff}
        .msg{margin-top:8px; font-size:13px; background:#f1f5f9; border:1px solid #e5e7eb; padding:6px 10px; border-radius:10px; width:max-content}

        .grid2{max-width:1120px; margin:14px auto; display:grid; gap:14px; grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}
        .card{background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:14px}
        .card.hue{animation:hue 12s linear infinite}
        @keyframes hue{from{filter:hue-rotate(0)}to{filter:hue-rotate(360deg)}}
        h3{margin:0 0 6px}
        .muted{color:#475569; font-size:13px; margin:0 0 10px}
        .kv{display:flex; justify-content:space-between; border:1px dashed #e5e7eb; border-radius:10px; padding:8px 10px; margin:8px 0}
        .ok{color:#16a34a}
        .warn{color:#dc2626}
        .row{display:flex; gap:8px; flex-wrap:wrap}

        .tabs{max-width:1120px; margin:10px auto; display:flex; gap:8px; align-items:center; background:rgba(255,255,255,.72); border:1px solid #e5e7eb; padding:6px; border-radius:14px}
        .tab{border:none; padding:10px 14px; border-radius:12px; font-weight:900; cursor:pointer}
        .tab.active{background:#111827; color:#fff}
        .flexgap{margin-left:auto; display:flex; gap:8px}

        .ads{display:grid; gap:10px; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); max-width:1120px; margin:10px auto}
        .ad{border:1px solid #e5e7eb; border-radius:14px; overflow:hidden; background:#fff}
        .thumb{width:100%; aspect-ratio:4/3; background:#f1f5f9}
        .body{padding:10px}
        .title{margin:0 0 6px; font-size:14px; font-weight:900}

        .ordersWrap{display:grid; gap:10px}
        .order{display:grid; grid-template-columns:120px 1fr auto; gap:10px; align-items:center; border:1px solid #e5e7eb; border-radius:14px; background:#fff; padding:10px}
        @media (max-width:720px){ .order{grid-template-columns:1fr; align-items:start} }
        .status{font-weight:900; padding:6px 10px; border-radius:999px; color:#fff; width:max-content}
        .s-prep{background:#6366f1}
        .s-ship{background:#06b6d4}
        .s-delv{background:#16a34a}
        .s-rtx{background:#dc2626}
        .acts{display:flex; gap:8px; flex-wrap:wrap}
        .linkBtn{border:1px solid #111827; background:#111827; color:#fff; border-radius:10px; padding:8px 10px; text-decoration:none; font-weight:800}

        .sheet{position:fixed; inset:0; background:rgba(0,0,0,.35); display:grid; place-items:end center; padding:20px; z-index:50}
        .sheetCard{width:100%; max-width:640px; background:#fff; border:1px solid #e5e7eb; border-radius:16px; overflow:hidden}
        .sheetHead{display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-bottom:1px solid #e5e7eb}
        .grid{display:grid; gap:10px; padding:12px}
        .lab{display:grid; gap:6px}
        input{padding:9px 12px; border:1px solid #e5e7eb; border-radius:12px; font-size:14px; outline:none}
        .sep{height:1px; background:#e5e7eb; margin:4px 0}
        .link{font-weight:900; text-decoration:none; color:#111827}

        .legal{margin:16px auto 0; background:#0b0b0f; color:#cbd5e1}
        .cols{display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:14px; max-width:1120px; margin:0 auto; padding:18px 14px}
        .legal h4{color:#fff; margin:0 0 6px}
        .legal a{display:block; color:#cbd5e1; text-decoration:none; padding:2px 0}
        .legal a:hover{color:#fff}
        .copy{border-top:1px solid #232329; text-align:center; padding:10px; font-size:13px}
      `}</style>
    </div>
  );
}

/* ----- Bileşenler ----- */
function AdList({ items, emptyText }){
  if(!items || !items.length){ return <div className="card"><p>{emptyText}</p></div>; }
  return (
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
  );
}

function OrderList({ items, emptyText }){
  if(!items || !items.length){ return <div className="ordersWrap"><div className="order"><div><b>—</b><div style={{color:'#475569',fontSize:13}}>{emptyText}</div></div></div></div>; }
  const pill = (s)=>{
    const v = String(s||"").toLowerCase();
    if(v.includes("hazırl")) return "status s-prep";
    if(v.includes("kargo")) return "status s-ship";
    if(v.includes("teslim")) return "status s-delv";
    if(v.includes("iade")) return "status s-rtx";
    return "status s-prep";
  };
  return (
    <div className="ordersWrap">
      {items.map((o,idx)=>{
        const id = o.id || o.code || `#${idx+1}`;
        const when = o.date || o.createdAt || "";
        const price = o.total || o.price || "";
        const status = o.status || "";
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
              <span className={pill(status)}>{status}</span>
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
  );
}

function NotifyPrefs({ t, langKey }){
  const [pref,setPref]=useState({ email:true, sms:false, wa:false });
  useEffect(()=>{ try{ const s=JSON.parse(localStorage.getItem("notify_prefs")||"null"); if(s) setPref(s);}catch{} },[]);
  async function persist(next){ setPref(next); try{ localStorage.setItem("notify_prefs", JSON.stringify(next)); await fetch("/api/profile/notify",{ method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(next)}); }catch{} }
  return (
    <div className="row" style={{gap:16}}>
      <label style={{display:'flex',alignItems:'center',gap:8}}><input type="checkbox" checked={pref.email} onChange={e=>persist({...pref,email:e.target.checked})}/> {t.emailNotify}</label>
      <label style={{display:'flex',alignItems:'center',gap:8}}><input type="checkbox" checked={pref.sms} onChange={e=>persist({...pref,sms:e.target.checked})}/> {t.smsNotify}</label>
      <label style={{display:'flex',alignItems:'center',gap:8}}><input type="checkbox" checked={pref.wa} onChange={e=>persist({...pref,wa:e.target.checked})}/> {t.waNotify}</label>
    </div>
  );
}
