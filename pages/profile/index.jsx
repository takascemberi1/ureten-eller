"use client";
import KycNotice from "../../components/KycNotice";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAuth, useUser, SignedIn, SignedOut } from "@clerk/nextjs";

/* ======================= i18n (4 Dil) ======================= */
const SUP = ["tr","en","ar","de"];
const STR = {
  tr: {
    pageTitle:"Profil",
    logout:"Çıkış",
    roleSeller:"Satıcı",
    roleCustomer:"Müşteri",
    settings:"Ayarlar",
    save:"Kaydet", cancel:"Vazgeç",
    changePwd:"Şifreyi Değiştir", goSecurity:"Güvenlik Sayfası",
    upload:"Profil Fotoğrafını Değiştir", uploading:"Yükleniyor…", saved:"Kaydedildi", error:"Bir hata oluştu",

    // Ortak kart
    fullName:"Ad Soyad", email:"E‑posta", phone:"Telefon", city:"Şehir",

    // Satıcı
    store:"Mağaza", cover:"Kapak Görseli (yalnızca admin)", storeAbout:"Mağaza Hakkında", badges:"Rozetler",
    fastShip:"Hızlı kargo", vacation:"Tatil Modu", kyc:"Kimlik / Ödeme Açma", sendForApproval:"Onaya Gönder",
    idnum:"TC Kimlik / VKN", iban:"IBAN", taxOffice:"Vergi Dairesi", address:"Adres", kycStatus:"KYC Durumu",
    pending:"Beklemede", approved:"Onaylı", rejected:"Reddedildi", wallet:"Cüzdan",
    escrow:"Blokede (escrow)", withdrawable:"Çekilebilir", paidOut:"Ödenenler",

    orders:"Siparişler", preparing:"Hazırlanıyor", ship:"Kargoya Ver", shipped:"Kargoda", delivered:"Teslim edildi",
    markPreparing:"Hazırlanıyor Yap", markShipped:"Kargoya Ver", markDelivered:"Teslim Edildi Yap", trackingNo:"Takip No",
    trackCargo:"Kargo Takip", problem:"Sorun Bildir",

    listings:"İlanlarım", live:"Yayında", waitApproval:"Onay Bekleyen", expired:"Süresi Dolmuş", rejectedTab:"Reddedildi",
    extend:"Süre Uzat", remove:"Sil", noData:"Henüz kayıt yok.",

    // Müşteri
    myOrders:"Siparişlerim", view:"Görüntüle", confirmReceived:"Teslim Aldım", return:"İade Talebi", reorder:"Tekrar Sipariş",
    writeReview:"Yorum Yaz", rating:"Puan", comment:"Yorum", submit:"Gönder", alreadyReviewed:"Bu siparişe zaten yorum yaptınız.", badWords:"Uygunsuz kelime tespit edildi.",

    // Ayarlar
    profileSettings:"Profil Ayarları", username:"Kullanıcı adı", province:"İl", district:"İlçe",

    // Alt menü
    home:"Ana Sayfa", messages:"Mesajlar", noti:"Bildirimler",

    // Siyah legal footer
    corp:"Kurumsal", about:"Hakkımızda", contact:"İletişim", privacy:"Gizlilik", terms:"Kullanım Şartları",
    kvkk:"KVKK Aydınlatma", terms2:"Gizlilik & Kullanım", distance:"Mesafeli Satış", returns:"Teslimat & İade",
    cookies:"Çerez Politikası", help:"Yardım", banned:"Yasaklı Ürünler", allLegal:"Tüm Legal", homepage:"Ana Sayfa",
    copyright:"© 2025 Üreten Eller",
  },
  en:{
    pageTitle:"Profile", logout:"Sign out", roleSeller:"Seller", roleCustomer:"Customer", settings:"Settings",
    save:"Save", cancel:"Cancel", changePwd:"Change Password", goSecurity:"Open Security Page",
    upload:"Change Profile Photo", uploading:"Uploading…", saved:"Saved", error:"Something went wrong",
    fullName:"Full Name", email:"Email", phone:"Phone", city:"City",
    store:"Store", cover:"Cover Image (admin only)", storeAbout:"About Store", badges:"Badges",
    fastShip:"Fast shipping", vacation:"Vacation Mode", kyc:"KYC / Enable Payouts", sendForApproval:"Send for Approval",
    idnum:"National/Tax ID", iban:"IBAN", taxOffice:"Tax Office", address:"Address", kycStatus:"KYC Status",
    pending:"Pending", approved:"Approved", rejected:"Rejected", wallet:"Wallet",
    escrow:"In Escrow", withdrawable:"Withdrawable", paidOut:"Paid Out",
    orders:"Orders", preparing:"Preparing", ship:"Ship", shipped:"Shipped", delivered:"Delivered",
    markPreparing:"Mark Preparing", markShipped:"Mark Shipped", markDelivered:"Mark Delivered", trackingNo:"Tracking No",
    trackCargo:"Track", problem:"Report Issue",
    listings:"My Listings", live:"Live", waitApproval:"Pending", expired:"Expired", rejectedTab:"Rejected",
    extend:"Extend", remove:"Delete", noData:"No data yet.",
    myOrders:"My Orders", view:"View", confirmReceived:"Confirm Received", return:"Request Return", reorder:"Re‑order",
    writeReview:"Write Review", rating:"Rating", comment:"Comment", submit:"Submit", alreadyReviewed:"You already reviewed this.", badWords:"Inappropriate words detected.",
    profileSettings:"Profile Settings", username:"Username", province:"Province", district:"District",
    home:"Home", messages:"Messages", noti:"Notifications",
    corp:"Company", about:"About", contact:"Contact", privacy:"Privacy", terms:"Terms",
    kvkk:"KVKK Notice", terms2:"Privacy & Terms", distance:"Distance Sales", returns:"Shipping & Returns",
    cookies:"Cookie Policy", help:"Help", banned:"Banned Items", allLegal:"All Legal", homepage:"Home",
    copyright:"© 2025 Ureten Eller",
  },
  ar:{
    pageTitle:"الملف", logout:"تسجيل الخروج", roleSeller:"بائعة", roleCustomer:"عميل", settings:"إعدادات",
    save:"حفظ", cancel:"إلغاء", changePwd:"تغيير كلمة المرور", goSecurity:"صفحة الأمان",
    upload:"تغيير الصورة", uploading:"جارٍ الرفع…", saved:"تم الحفظ", error:"حدث خطأ",
    fullName:"الاسم الكامل", email:"البريد", phone:"الهاتف", city:"المدينة",
    store:"المتجر", cover:"صورة الغلاف (للمشرف)", storeAbout:"نبذة عن المتجر", badges:"الأوسمة",
    fastShip:"شحن سريع", vacation:"وضع الإجازة", kyc:"توثيق / تفعيل المدفوعات", sendForApproval:"إرسال للموافقة",
    idnum:"الرقم الوطني/الضريبي", iban:"IBAN", taxOffice:"دائرة الضرائب", address:"العنوان", kycStatus:"حالة التوثيق",
    pending:"بالانتظار", approved:"مقبول", rejected:"مرفوض", wallet:"المحفظة",
    escrow:"محجوز (ضمان)", withdrawable:"قابل للسحب", paidOut:"تم الدفع",
    orders:"الطلبات", preparing:"قيد التحضير", ship:"إرسال", shipped:"مشحون", delivered:"تم التسليم",
    markPreparing:"تحضير", markShipped:"إرسال", markDelivered:"تم التسليم", trackingNo:"رقم التتبع",
    trackCargo:"تتبع", problem:"تبليغ مشكلة",
    listings:"إعلاناتي", live:"منشور", waitApproval:"بانتظار", expired:"منتهي", rejectedTab:"مرفوض",
    extend:"تمديد", remove:"حذف", noData:"لا يوجد بيانات.",
    myOrders:"طلباتي", view:"عرض", confirmReceived:"استلمت الطلب", return:"طلب إرجاع", reorder:"إعادة الطلب",
    writeReview:"اكتب مراجعة", rating:"تقييم", comment:"تعليق", submit:"إرسال", alreadyReviewed:"قمت بالمراجعة سابقًا.", badWords:"كلمات غير لائقة.",
    profileSettings:"إعدادات الملف", username:"اسم المستخدم", province:"الولاية", district:"الحي",
    home:"الرئيسية", messages:"الرسائل", noti:"الإشعارات",
    corp:"الشركة", about:"من نحن", contact:"اتصال", privacy:"الخصوصية", terms:"الشروط",
    kvkk:"إشعار KVKK", terms2:"الخصوصية والشروط", distance:"البيع عن بعد", returns:"التسليم والإرجاع",
    cookies:"سياسة الكوكيز", help:"مساعدة", banned:"منتجات محظورة", allLegal:"الكل قانوني", homepage:"الصفحة الرئيسية",
    copyright:"© 2025 Üreten Eller",
  },
  de:{
    pageTitle:"Profil", logout:"Abmelden", roleSeller:"Anbieterin", roleCustomer:"Kunde", settings:"Einstellungen",
    save:"Speichern", cancel:"Abbrechen", changePwd:"Passwort ändern", goSecurity:"Sicherheitsseite",
    upload:"Foto ändern", uploading:"Lädt…", saved:"Gespeichert", error:"Fehler",
    fullName:"Name", email:"E‑Mail", phone:"Telefon", city:"Stadt",
    store:"Shop", cover:"Titelbild (nur Admin)", storeAbout:"Über den Shop", badges:"Abzeichen",
    fastShip:"Schneller Versand", vacation:"Urlaubsmodus", kyc:"KYC / Auszahlungen", sendForApproval:"Zur Prüfung senden",
    idnum:"Steuer/ID", iban:"IBAN", taxOffice:"Finanzamt", address:"Adresse", kycStatus:"KYC‑Status",
    pending:"Ausstehend", approved:"Bestätigt", rejected:"Abgelehnt", wallet:"Wallet",
    escrow:"In Treuhand", withdrawable:"Auszahlbar", paidOut:"Ausgezahlt",
    orders:"Bestellungen", preparing:"In Bearbeitung", ship:"Versenden", shipped:"Unterwegs", delivered:"Zugestellt",
    markPreparing:"Als in Bearbeitung", markShipped:"Als versendet", markDelivered:"Als zugestellt", trackingNo:"Sendungsnr.",
    trackCargo:"Sendung", problem:"Problem melden",
    listings:"Meine Inserate", live:"Aktiv", waitApproval:"Prüfung", expired:"Abgelaufen", rejectedTab:"Abgelehnt",
    extend:"Verlängern", remove:"Löschen", noData:"Noch keine Daten.",
    myOrders:"Meine Bestellungen", view:"Ansehen", confirmReceived:"Erhalten", return:"Retoure", reorder:"Nochmal bestellen",
    writeReview:"Bewertung schreiben", rating:"Bewertung", comment:"Kommentar", submit:"Senden", alreadyReviewed:"Schon bewertet.", badWords:"Unangemessene Wörter.",
    profileSettings:"Profil‑Einstellungen", username:"Benutzername", province:"Bundesland", district:"Bezirk",
    home:"Start", messages:"Nachrichten", noti:"Benachr.",
    corp:"Unternehmen", about:"Über uns", contact:"Kontakt", privacy:"Datenschutz", terms:"Nutzungsbed.",
    kvkk:"KVKK‑Hinweis", terms2:"Privacy & Terms", distance:"Fernabsatz", returns:"Lieferung & Rückgabe",
    cookies:"Cookie‑Richtlinie", help:"Hilfe", banned:"Verbotene Artikel", allLegal:"Alle Rechtstexte", homepage:"Startseite",
    copyright:"© 2025 Ureten Eller",
  }
};

function useLang(){
  const [lang,setLang] = useState("tr");
  useEffect(()=>{
    if(typeof window!=="undefined"){
      const s = localStorage.getItem("lang");
      if(s && SUP.includes(s)) setLang(s);
      document.documentElement.lang = s||"tr";
      document.documentElement.dir = (s==="ar")?"rtl":"ltr";
    }
  },[]);
  const t = useMemo(()=>STR[lang]||STR.tr,[lang]);
  return {t,lang,setLang};
}

/* ======================= Yardımcılar ======================= */
async function jget(url){ try{ const r=await fetch(url,{cache:"no-store"}); return r.ok?await r.json():null; }catch{ return null; } }
async function jpatch(url,body){ try{ const r=await fetch(url,{method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body||{})}); return await r.json(); }catch{ return {ok:false}; } }
async function jpost(url,body){ try{ const r=await fetch(url,{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body||{})}); return await r.json(); }catch{ return {ok:false}; } }

const BAD_WORDS = [/sik|orospu|am(ı|i)na|küfür|hakaret|terör/i]; // istemediğiniz kelimeleri arttırın
const isClean = (txt)=> !BAD_WORDS.some(rx=>rx.test(txt||""));

/* ======================= Profil Sayfası ======================= */
export default function Profile(){
  const { t } = useLang();
  const router = useRouter();
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();

  const [role, setRole] = useState("customer"); // server/metadata belirler
  const [isAdmin, setIsAdmin] = useState(false);

  const [orders, setOrders] = useState([]); // hem satıcı hem müşteri için doldurulur
  const [listings, setListings] = useState({ live:[], pending:[], expired:[], rejected:[] });

  const [wallet, setWallet] = useState({ escrow:0, withdrawable:0, paidOut:0 });

  const [storeForm, setStoreForm] = useState({ coverUrl:"", about:"", fast:false, vacation:false });
  const [kyc, setKyc] = useState({ idnum:"", iban:"", tax:"", addr:"", status:"pending" });

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  // Guard
  useEffect(()=>{
    if(!isLoaded) return;
    if(!isSignedIn) router.replace("/login");
  },[isLoaded,isSignedIn,router]);

  // Kullanıcıyı ve datayı yükle
  useEffect(()=>{
    if(!userLoaded||!user) return;
    const meta = (user.unsafeMetadata||user.publicMetadata)||{};
    const r = (meta.role==="seller"||meta.role==="customer")?meta.role:(typeof window!=="undefined"? localStorage.getItem("role")||"customer":"customer");
    setRole(r);
    setIsAdmin(Boolean(meta.isAdmin));

    // Wallet
    jget("/api/wallet/my").then(d=>{ if(d&&d.ok){ setWallet({escrow:d.escrow||0, withdrawable:d.withdrawable||0, paidOut:d.paidOut||0}); } });

    // Orders
    jget(`/api/orders/my?role=${r}`).then(d=>{ if(d&&d.ok){ setOrders(d.items||[]); } });

    // Listings (satıcı)
    if(r==="seller"){
      jget("/api/ads/my").then(d=>{ if(d){ setListings({ live:d.live||[], pending:d.pending||[], expired:d.expired||[], rejected:d.rejected||[] }); } });
    }

    // Store (satıcı) & KYC stub (local fallback)
    if(r==="seller" && typeof window!=="undefined"){
      try{ const s=JSON.parse(localStorage.getItem("store_form")||"{}"); setStoreForm({coverUrl:s.coverUrl||"", about:s.about||"", fast:Boolean(s.fast), vacation:Boolean(s.vacation)});}catch{}
      try{ const k=JSON.parse(localStorage.getItem("kyc_form")||"{}"); setKyc({ idnum:k.idnum||"", iban:k.iban||"", tax:k.tax||"", addr:k.addr||"", status:k.status||"pending"}); }catch{}
    }
  },[userLoaded,user]);

  /* --------------- Satıcı: sipariş aksiyonları --------------- */
  const doPreparing = async (id)=>{ const r=await jpatch(`/api/orders/${id}`,{action:"markPreparing"}); if(r?.ok){ refreshOrders(); } };
  const doShipped = async (id)=>{
    const trackingNo = prompt(t.trackingNo+"?")||"";
    if(!trackingNo.trim()) return;
    const r=await jpatch(`/api/orders/${id}`,{action:"markShipped", trackingNo});
    if(r?.ok){ refreshOrders(); }
  };
  const doDelivered = async (id)=>{ const r=await jpatch(`/api/orders/${id}`,{action:"markDelivered"}); if(r?.ok){ refreshOrders(); } };

  const refreshOrders = ()=>{ jget(`/api/orders/my?role=${role}`).then(d=>{ if(d&&d.ok){ setOrders(d.items||[]); } }); };

  /* --------------- Müşteri: yorum/puan tek sefer --------------- */
  const [rvOpen,setRvOpen] = useState(false);
  const [rvOrder,setRvOrder] = useState(null);
  const [rvStars,setRvStars] = useState(0);
  const [rvText,setRvText] = useState("");
  const reviewedKey = (o)=> `rev_${o?.id}`;
  const canReview = (o)=>{
    if(role!=="customer") return false;
    if(!(o&&o.status==="delivered")) return false;
    if(typeof window!=="undefined"){ if(localStorage.getItem(reviewedKey(o))) return false; }
    return true;
  };
  const submitReview = async ()=>{
    if(!isClean(rvText)) { alert(STR.tr.badWords); return; }
    // DEMO: server yerine local işaretleyelim; prod'da /api/reviews/create çağır.
    if(typeof window!=="undefined" && rvOrder){ localStorage.setItem(reviewedKey(rvOrder),"1"); }
    setRvOpen(false); setRvOrder(null); setRvStars(0); setRvText("");
    alert(STR.tr.saved);
  };

  /* --------------- Ayarlar --------------- */
  const openSettings=()=>setSettingsOpen(true);
  const closeSettings=()=>setSettingsOpen(false);
  const [form,setForm] = useState({ fullName:"", username:"", il:"", ilce:"" });
  useEffect(()=>{
    if(!user) return;
    const meta=(user.unsafeMetadata||user.publicMetadata)||{};
    const fn = meta.full_name || [user.firstName,user.lastName].filter(Boolean).join(" ") || "";
    const il = meta.il || ""; const ilce=meta.ilce||"";
    setForm({fullName:fn, username:user.username||"", il, ilce});
  },[user]);

  async function onAvatarChange(e){
    const file = e.target.files?.[0]; if(!file) return;
    try{ setBusy(true); setMsg(t.uploading); await user.setProfileImage({ file }); setMsg(t.saved);}catch{ setMsg(t.error);} finally{ setBusy(false); setTimeout(()=>setMsg(""),1200);} }

  async function saveSettings(e){
    e.preventDefault(); setBusy(true);
    try{
      const [firstName,...rest] = (form.fullName||"").trim().split(" ");
      const lastName = rest.join(" ");
      await user.update({ username: form.username||undefined, firstName:firstName||undefined, lastName:lastName||undefined,
        unsafeMetadata:{ ...((user.unsafeMetadata||user.publicMetadata)||{}), full_name:form.fullName, il:form.il||"", ilce:form.ilce||""}
      });
      setMsg(t.saved); setSettingsOpen(false);
    }catch{ setMsg(t.error);} finally{ setBusy(false); setTimeout(()=>setMsg(""),1200);} }

  /* --------------- Satıcı: mağaza & KYC --------------- */
  const saveStore = ()=>{
    if(typeof window!=="undefined"){
      localStorage.setItem("store_form", JSON.stringify(storeForm));
      alert(t.saved);
    }
  };
  const sendKyc = ()=>{
    const st = { ...kyc, status:"pending" };
    if(typeof window!=="undefined"){ localStorage.setItem("kyc_form", JSON.stringify(st)); }
    alert(t.pending);
  };

  /* ======================= UI ======================= */
  return (
    <div className="wrap">
      <SignedOut><p>Yönlendiriliyor…</p></SignedOut>
      <SignedIn>
        {/* Üst başlık */}
        <header className="header">
          <div className="idbox">
            <img className="avatar" src={user?.imageUrl||"/assets/images/logo.png"} alt="avatar"/>
            <div>
              <h1 className="ttl">{t.pageTitle} <small className="chip">{role==="seller"?t.roleSeller:t.roleCustomer}</small></h1>
              <div className="meta"><b>{t.fullName}:</b> {form.fullName||"—"} · <b>{t.email}:</b> {user?.primaryEmailAddress?.emailAddress||"—"}</div>
            </div>
          </div>
          <div className="actions">
            <button className="btn" onClick={openSettings}>⚙️ {t.settings}</button>
            <a className="btn ghost" href="/logout?next=/">⇦ {t.logout}</a>
          </div>
        </header>
        {msg && <div className="msg">{msg}</div>}

        {/* Satıcı Paneli */}
        {role==="seller" && (
          <section className="grid2">
            {/* Mağaza */}
            <article className="card">
              <h3>🏪 {t.store}</h3>
              <div className="row">
                <label className="lab">
                  <span>{t.cover}</span>
                  <input type="text" value={storeForm.coverUrl} onChange={e=>setStoreForm({...storeForm, coverUrl:e.target.value})} placeholder="https://…" disabled={!isAdmin}/>
                  {!isAdmin && <small style={{opacity:.75}}>Bu alan sadece admin tarafından yönetilir.</small>}
                </label>
                <label className="lab">
                  <span>{t.storeAbout}</span>
                  <textarea rows={3} value={storeForm.about} onChange={e=>setStoreForm({...storeForm, about:e.target.value})} placeholder="{t.storeAbout}"/>
                </label>
                <div className="lab rowline">
                  <label className="chk"><input type="checkbox" checked={storeForm.fast} onChange={e=>setStoreForm({...storeForm, fast:e.target.checked})}/> {t.fastShip}</label>
                  <label className="chk"><input type="checkbox" checked={storeForm.vacation} onChange={e=>setStoreForm({...storeForm, vacation:e.target.checked})}/> {t.vacation}</label>
                </div>
                <div>
                  <button className="btn dark" onClick={saveStore}>{t.save}</button>
                </div>
              </div>
            </article>

            {/* KYC */}
            <article className="card">
              <h3>🪪 {t.kyc} <small style={{marginLeft:8,color:"#64748b",fontSize:12,fontWeight:600}}>{lang==="tr" ? "Bu bilgiler yalnızca hesap sahibi ve ödeme sağlayıcı (PSP) arasında saklı tutulur; vitrinde görünmez." : lang==="en" ? "These details are kept only between the account owner and the payment provider (PSP); not shown on the storefront." : lang==="ar" ? "تُحفظ هذه البيانات بين صاحب الحساب ومزوّد الدفع فقط (PSP)؛ لا تظهر للعامة." : "Diese Angaben bleiben nur zwischen Kontoinhaber und Zahlungsanbieter (PSP); nicht öffentlich sichtbar."}</small></h3>
    <KycNotice lang={lang} />
              <div className="grid">
                <label className="lab"><span>{t.idnum}</span><input value={kyc.idnum} onChange={e=>setKyc({...kyc,idnum:e.target.value})}/></label>
                <label className="lab"><span>{t.iban}</span><input value={kyc.iban} onChange={e=>setKyc({...kyc,iban:e.target.value})}/></label>
                <label className="lab"><span>{t.taxOffice}</span><input value={kyc.tax} onChange={e=>setKyc({...kyc,tax:e.target.value})}/></label>
                <label className="lab"><span>{t.address}</span><input value={kyc.addr} onChange={e=>setKyc({...kyc,addr:e.target.value})}/></label>
                <div className="lab"><span>{t.kycStatus}</span><b className="chip">{t[kyc.status]||t.pending}</b></div>
                <div><button className="btn" onClick={sendKyc}>{t.sendForApproval}</button></div>
              </div>
            </article>

            {/* Cüzdan */}
            <article className="card">
              <h3>💼 {t.wallet}</h3>
              <div className="wallet">
                <div className="wbox"><span>{t.escrow}</span><b>₺{wallet.escrow.toLocaleString("tr-TR",{minimumFractionDigits:2})}</b></div>
                <div className="wbox"><span>{t.withdrawable}</span><b>₺{wallet.withdrawable.toLocaleString("tr-TR",{minimumFractionDigits:2})}</b></div>
                <div className="wbox"><span>{t.paidOut}</span><b>₺{wallet.paidOut.toLocaleString("tr-TR",{minimumFractionDigits:2})}</b></div>
              </div>
            </article>

            {/* Siparişler (Satıcı) */}
            <article className="card span2">
              <h3>📦 {t.orders}</h3>
              <OrderList items={orders} t={t} role="seller" onPreparing={doPreparing} onShipped={doShipped} onDelivered={doDelivered} />
            </article>

            {/* İlanlar */}
            <article className="card span2">
              <h3>🗂️ {t.listings}</h3>
              <ListingTabs t={t} data={listings} onExtend={(id)=>alert("extend "+id)} onRemove={(id)=>alert("remove "+id)} />
            </article>
          </section>
        )}

        {/* Müşteri Paneli */}
        {role==="customer" && (
          <section className="grid1">
            <article className="card">
              <h3>📦 {t.myOrders}</h3>
              <OrderList items={orders} t={t} role="customer" canReview={canReview} onOpenReview={(o)=>{ setRvOrder(o); setRvOpen(true); }} onConfirm={(id)=>doDelivered(id)} />
            </article>

            {/* Adres defteri (basit link) */}
            <article className="card">
              <h3>📮 {"Adres Defteri"}</h3>
              <div className="row">
                <a className="btn" href="/profile/addresses">➕ Adres Ekle</a>
              </div>
            </article>
          </section>
        )}

        {/* Yorum Sheet */}
        {rvOpen && (
          <div className="sheet" role="dialog" aria-modal="true">
            <div className="sheetCard">
              <div className="sheetHead"><b>{t.writeReview}</b><button className="btn ghost" onClick={()=>setRvOpen(false)}>✕</button></div>
              <div className="grid">
                <div>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <span>{t.rating}:</span>
                    {[0,1,2,3,4].map(i=> (
                      <button key={i} className={i<rvStars?"star on":"star"} onClick={()=>setRvStars(i+1)} aria-label={`star-${i+1}`}>★</button>
                    ))}
                  </div>
                </div>
                <label className="lab"><span>{t.comment}</span>
                  <textarea rows={4} value={rvText} onChange={e=>setRvText(e.target.value)} placeholder=""/>
                </label>
                <div className="row end">
                  <button className="btn" onClick={()=>setRvOpen(false)}>{t.cancel}</button>
                  <button className="btn dark" onClick={submitReview}>{t.submit}</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ayarlar Sheet */}
        {settingsOpen && (
          <div className="sheet" role="dialog" aria-modal="true">
            <div className="sheetCard">
              <div className="sheetHead"><b>⚙️ {t.profileSettings}</b><button className="btn ghost" onClick={closeSettings}>✕</button></div>
              <form className="grid" onSubmit={saveSettings}>
                <label className="lab"><span>{t.fullName}</span><input value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})}/></label>
                <label className="lab"><span>{t.username}</span><input value={form.username} onChange={e=>setForm({...form, username:e.target.value})}/></label>
                <label className="lab"><span>{t.province}</span><input value={form.il} onChange={e=>setForm({...form, il:e.target.value})}/></label>
                <label className="lab"><span>{t.district}</span><input value={form.ilce} onChange={e=>setForm({...form, ilce:e.target.value})}/></label>
                <div className="lab">
                  <span>{t.upload}</span>
                  <input type="file" accept="image/*" onChange={onAvatarChange}/>
                </div>
                <a className="link" href="/user/profile/security" target="_blank" rel="noreferrer">➡️ {t.changePwd} / {t.goSecurity}</a>
                <div className="row end">
                  <button type="button" className="btn" onClick={closeSettings}>{t.cancel}</button>
                  <button className="btn dark" disabled={busy}>{busy?"…":t.save}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Alt Bar (sabit) */}
        <nav className="bottombar">
          <button className="iconbtn" onClick={()=>router.push("/home.html")}>
            🏠<span>{t.home}</span>
          </button>
          <button className="iconbtn" onClick={()=>router.push("/messages")}>
            💬<span>{t.messages}</span>
          </button>
          <button className="iconbtn" onClick={()=>router.push("/notifications")}>
            🔔<span>{t.noti}</span>
          </button>
        </nav>

        {/* Siyah Legal Footer (en altta, full genişlik) */}
        <footer className="legalbar">
          <div className="legrow">
            <strong>{t.corp}</strong>
            <a href="/legal/hakkimizda">{t.about}</a>
            <a href="/legal/iletisim">{t.contact}</a>
            <a href="/legal/gizlilik">{t.privacy}</a>
            <a href="/legal/kvkk-aydinlatma">{t.kvkk}</a>
            <a href="/legal/kullanim-sartlari">{t.terms}</a>
            <a href="/legal/mesafeli-satis-sozlesmesi">{t.distance}</a>
            <a href="/legal/teslimat-iade">{t.returns}</a>
            <a href="/legal/cerez-politikasi">{t.cookies}</a>
            <a href="/legal/topluluk-kurallari">{t.banned}</a>
            <a href="/legal">{t.allLegal}</a>
            <a href="/home.html">{t.homepage}</a>
            <span className="copy">{t.copyright}</span>
          </div>
        </footer>

      </SignedIn>

      <style jsx>{`
        .wrap{ min-height:100vh; padding: 12px 12px calc(64px + 56px + 20px); /* bottom nav + legal + gap */ }
        .header{ max-width:1100px; margin:10px auto; display:flex; align-items:center; justify-content:space-between; gap:12px }
        .idbox{ display:flex; gap:12px; align-items:center }
        .avatar{ width:64px; height:64px; border-radius:999px; object-fit:cover; }
        .ttl{ margin:0; font-size:22px }
        .chip{ background:#111827; color:#fff; padding:2px 8px; border-radius:999px; font-size:12px; margin-left:6px }
        .meta{ font-size:13px; color:#475569 }
        .actions{ display:flex; gap:8px }
        .btn{ border:1px solid #e5e7eb; background:#fff; border-radius:10px; padding:8px 12px; font-weight:700; cursor:pointer }
        .btn.dark{ background:#111827; border-color:#111827; color:#fff }
        .btn.ghost{ background:#fff }
        .msg{ max-width:1100px; margin:0 auto 10px; padding:6px 10px; background:#f1f5f9; border:1px solid #e5e7eb; border-radius:10px; font-size:13px }

        .grid1{ max-width:1100px; margin:10px auto; display:grid; gap:12px; grid-template-columns:1fr }
        .grid2{ max-width:1100px; margin:10px auto; display:grid; gap:12px; grid-template-columns:repeat(2,1fr) }
        .span2{ grid-column:1/-1 }
        @media (max-width:900px){ .grid2{ grid-template-columns:1fr } }

        .card{ background:#fff; border:1px solid #e5e7eb; border-radius:14px; padding:12px }
        .lab{ display:grid; gap:6px; margin-bottom:8px }
        input, textarea, select{ padding:9px 12px; border:1px solid #e5e7eb; border-radius:10px; font-size:14px; outline:none }
        .row{ display:grid; gap:8px }
        .rowline{ display:flex; gap:12px; align-items:center }
        .chk{ display:flex; gap:6px; align-items:center }
        .wallet{ display:grid; grid-template-columns:repeat(3,1fr); gap:10px }
        .wbox{ border:1px dashed #e5e7eb; border-radius:12px; padding:10px; display:grid }
        .wbox span{ color:#475569; font-size:12px }
        .wbox b{ font-size:18px }

        .list{ display:grid; gap:8px }
        .item{ border:1px solid #e5e7eb; border-radius:10px; padding:10px; display:grid; gap:6px }
        .rowbtns{ display:flex; gap:8px; flex-wrap:wrap }

        /* Sheet */
        .sheet{ position:fixed; inset:0; background:rgba(0,0,0,.35); display:grid; place-items:end center; padding:16px; z-index:60 }
        .sheetCard{ width:100%; max-width:640px; background:#fff; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden }
        .sheetHead{ display:flex; align-items:center; justify-content:space-between; padding:8px 10px; border-bottom:1px solid #e5e7eb }
        .grid{ display:grid; gap:10px; padding:12px }
        .link{ font-weight:800; text-decoration:none; color:#111827 }
        .row.end{ justify-content:flex-end; display:flex; gap:8px }
        .star{ border:none; background:transparent; font-size:20px; cursor:pointer; opacity:.35 }
        .star.on{ opacity:1 }

        /* Alt bar */
        .bottombar{ position:fixed; left:0; right:0; bottom:56px; z-index:40; height:64px; display:flex; justify-content:space-around; align-items:center; background:rgba(255,255,255,.96); border-top:1px solid #e5e7eb; backdrop-filter:blur(8px) }
        .iconbtn{ display:grid; place-items:center; gap:4px; border:none; background:transparent; font-weight:700; cursor:pointer }
        .iconbtn span{ font-size:12px }

        /* Siyah legal footer en altta */
        .legalbar{ position:fixed; left:0; right:0; bottom:0; z-index:30; background:#0b0b0b; color:#f1f5f9; padding:8px 10px }
        .legrow{ display:flex; flex-wrap:wrap; gap:10px; align-items:center; justify-content:center }
        .legalbar a{ color:#fefefe; text-decoration:none; font-weight:700 }
        .copy{ opacity:.8; margin-left:6px }
      `}</style>
    </div>
  );
}

/* ======================= Alt Bileşenler ======================= */
function OrderList({ items, t, role, onPreparing, onShipped, onDelivered, canReview, onOpenReview, onConfirm }){
  if(!items || !items.length){ return <p style={{margin:0, color:'#475569'}}>{t.noData}</p>; }
  return (
    <div className="list">
      {items.map((o,idx)=>{
        const status=o.status||"";
        return (
          <div key={idx} className="item">
            <div style={{display:'flex',justifyContent:'space-between',gap:10,flexWrap:'wrap'}}>
              <b>{o.title||o.items?.[0]?.title||'Ürün'}</b>
              <span style={{opacity:.8}}>{o.code||o.id||''} · {o.date||''}</span>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',gap:10,flexWrap:'wrap'}}>
              <span>₺{(o.amount||0).toLocaleString('tr-TR',{minimumFractionDigits:2})}</span>
              <span className="chip">{t[status]||status}</span>
            </div>
            <div className="rowbtns">
              {role==="seller" && (
                <>
                  <button className="btn" onClick={()=>onPreparing?.(o.id)}>{t.markPreparing}</button>
                  <button className="btn" onClick={()=>onShipped?.(o.id)}>{t.markShipped}</button>
                  <button className="btn" onClick={()=>onDelivered?.(o.id)}>{t.markDelivered}</button>
                  {o.trackingNo && <a className="btn ghost" href={`https://www.google.com/search?q=${encodeURIComponent(o.trackingNo)}`} target="_blank" rel="noreferrer">{t.trackCargo}</a>}
                  <button className="btn ghost">{t.problem}</button>
                </>
              )}
              {role==="customer" && (
                <>
                  <button className="btn">{t.view}</button>
                  {o.trackingNo && <a className="btn ghost" href={`https://www.google.com/search?q=${encodeURIComponent(o.trackingNo)}`} target="_blank" rel="noreferrer">{t.trackCargo}</a>}
                  {typeof canReview==="function" && canReview(o) && <button className="btn" onClick={()=>onOpenReview?.(o)}>{t.writeReview}</button>}
                  {o.status!=="delivered" && <button className="btn dark" onClick={()=>onConfirm?.(o.id)}>{t.confirmReceived}</button>}
                  <button className="btn ghost">{t.return}</button>
                  <button className="btn ghost">{t.reorder}</button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ListingTabs({ t, data, onExtend, onRemove }){
  const tabs = [
    {key:'pending', ttl:t.waitApproval},
    {key:'live', ttl:t.live},
    {key:'expired', ttl:t.expired},
    {key:'rejected', ttl:t.rejectedTab},
  ];
  const [tab,setTab] = useState('pending');
  const items = data[tab]||[];
  return (
    <div>
      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:8}}>
        {tabs.map(x=> (
          <button key={x.key} className={tab===x.key?"btn dark":"btn"} onClick={()=>setTab(x.key)}>{x.ttl}</button>
        ))}
      </div>
      {!items.length ? (
        <p style={{margin:0, color:'#475569'}}>{t.noData}</p>
      ) : (
        <div className="list">
          {items.map((it,idx)=> (
            <div key={idx} className="item">
              <div style={{display:'flex',justifyContent:'space-between',gap:10,flexWrap:'wrap'}}>
                <b>{it.title||'İlan'}</b>
                <span style={{opacity:.8}}>{it.code||it.id||''}</span>
              </div>
              <div className="rowbtns">
                {tab==='expired' && <button className="btn" onClick={()=>onExtend(it.id)}>{t.extend}</button>}
                <button className="btn ghost" onClick={()=>onRemove(it.id)}>{t.remove}</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
