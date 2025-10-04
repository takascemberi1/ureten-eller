"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAuth, useUser, SignedIn, SignedOut } from "@clerk/nextjs";

/* ------------------------------------------------------------------
   4 DİL DESTEK (light)  —  home.html'deki localStorage('lang') ile uyumlu
-------------------------------------------------------------------*/
const SUP = ["tr","en","ar","de"];
const STR = {
  tr: {
    roleSeller:"Satıcı", roleCustomer:"Müşteri", profile:"Profil", settings:"Ayarlar",
    logout:"Çıkış", save:"Kaydet", cancel:"Vazgeç", edit:"Düzenle", changePwd:"Şifreyi Değiştir",
    kyc:"Kimlik / Ödeme Açma", wallet:"Cüzdan", store:"Mağaza", listings:"İlanlarım", orders:"Siparişler",
    addresses:"Adres Defteri", reviews:"Yorumlarım", favorites:"Favoriler", notifications:"Bildirimler",
    add:"Ekle", update:"Güncelle", delete:"Sil", default:"Varsayılan", setDefault:"Varsayılan Yap",
    city:"İl", district:"İlçe", phone:"Telefon", email:"E-posta", fullName:"Ad Soyad",
    sellerStats:"Mağaza Skorları", avgPrep:"Ort. hazırlama", onTimeShip:"Zamanında kargo %",
    cancelRate:"İptal oranı", returnRate:"İade oranı",
    kycWarn:"Ödemeleri açmak için aşağıyı doldur ve onaya gönder.",
    tckn:"TC Kimlik / VKN", iban:"IBAN", taxOffice:"Vergi Dairesi", address:"Adres",
    sendForReview:"Onaya Gönder", kycStatus:"KYC Durumu",
    statusPending:"Beklemede", statusApproved:"Onaylı", statusRejected:"Reddedildi",
    walletHeld:"Blokede (escrow)", walletAvailable:"Çekilebilir", walletPaid:"Ödenenler",
    ordersEmpty:"Henüz sipariş yok.",
    oPaid:"Ödeme Alındı", oPreparing:"Hazırlanıyor", oShipped:"Kargoda", oDelivered:"Teslim edildi",
    oReleased:"Para çözüldü", oRefunded:"İade", oCanceled:"İptal",
    markPreparing:"Hazırlanıyor Yap", markShipped:"Kargoya Ver", markDelivered:"Teslim Edildi",
    trackingNo:"Takip No", carrier:"Kargo Firması",
    view:"Görüntüle", track:"Kargo Takip", reorder:"Tekrar Sipariş", refund:"İade Talebi",
    confirmDelivery:"Teslim Aldım", writeReview:"Yorum Yaz", send:"Gönder",
    storeCover:"Kapak Görseli", storeAbout:"Mağaza Hakkında", badges:"Rozetler",
    vacation:"Tatil Modu", from:"Başlangıç", until:"Bitiş",
    notifEmail:"E-posta", notifWhats:"WhatsApp", notifPush:"Push Bildirim",
    addAddress:"Adres Ekle", name:"İsim", line:"Adres satırı", cityShort:"İl", districtShort:"İlçe",
    zip:"PK", invoiceInfo:"Fatura Bilgisi (TC/VKN)", actions:"İşlemler",
    reviewNote:"Yorum yalnızca teslim edilmiş siparişler için açılır.", rating:"Puan",
    footerHead1:"Kurumsal", footerHead2:"Gizlilik & Kullanım", footerHead3:"Yardım",
    about:"Hakkımızda", contact:"İletişim", privacy:"Gizlilik", kvkk:"KVKK Aydınlatma",
    terms:"Kullanım Şartları", distance:"Mesafeli Satış", returns:"Teslimat & İade",
    cookies:"Çerez Politikası", banned:"Yasaklı Ürünler", help:"Yardım", allLegal:"Tüm Legal",
    home:"Ana Sayfa", rights:"© 2025 Üreten Eller",
  },
  en: {
    roleSeller:"Seller", roleCustomer:"Customer", profile:"Profile", settings:"Settings",
    logout:"Sign out", save:"Save", cancel:"Cancel", edit:"Edit", changePwd:"Change Password",
    kyc:"KYC / Payout", wallet:"Wallet", store:"Store", listings:"Listings", orders:"Orders",
    addresses:"Addresses", reviews:"Reviews", favorites:"Favorites", notifications:"Notifications",
    add:"Add", update:"Update", delete:"Delete", default:"Default", setDefault:"Make Default",
    city:"Province", district:"District", phone:"Phone", email:"Email", fullName:"Full Name",
    sellerStats:"Store KPIs", avgPrep:"Avg. prep time", onTimeShip:"On-time ship %",
    cancelRate:"Cancel rate", returnRate:"Return rate",
    kycWarn:"Fill and submit for review to enable payouts.",
    tckn:"National ID / TAX", iban:"IBAN", taxOffice:"Tax Office", address:"Address",
    sendForReview:"Submit", kycStatus:"KYC Status",
    statusPending:"Pending", statusApproved:"Approved", statusRejected:"Rejected",
    walletHeld:"Held (escrow)", walletAvailable:"Available", walletPaid:"Paid out",
    ordersEmpty:"No orders yet.",
    oPaid:"Paid", oPreparing:"Preparing", oShipped:"Shipped", oDelivered:"Delivered",
    oReleased:"Released", oRefunded:"Refunded", oCanceled:"Canceled",
    markPreparing:"Mark Preparing", markShipped:"Ship", markDelivered:"Mark Delivered",
    trackingNo:"Tracking No", carrier:"Carrier",
    view:"View", track:"Track", reorder:"Reorder", refund:"Request Refund",
    confirmDelivery:"Confirm Delivery", writeReview:"Write Review", send:"Send",
    storeCover:"Cover Image", storeAbout:"About Store", badges:"Badges",
    vacation:"Vacation Mode", from:"From", until:"Until",
    notifEmail:"Email", notifWhats:"WhatsApp", notifPush:"Push",
    addAddress:"Add Address", name:"Name", line:"Address line", cityShort:"City", districtShort:"District",
    zip:"ZIP", invoiceInfo:"Invoice Info (ID/VAT)", actions:"Actions",
    reviewNote:"Reviews open only after delivery.", rating:"Rating",
    footerHead1:"Company", footerHead2:"Privacy & Terms", footerHead3:"Help",
    about:"About", contact:"Contact", privacy:"Privacy", kvkk:"KVKK Notice",
    terms:"Terms", distance:"Distance Sales", returns:"Shipping & Returns",
    cookies:"Cookie Policy", banned:"Banned Products", help:"Help", allLegal:"All Legal",
    home:"Home", rights:"© 2025 Ureten Eller",
  },
  ar: {
    roleSeller:"بائعة", roleCustomer:"عميلة", profile:"الملف", settings:"الإعدادات",
    logout:"تسجيل خروج", save:"حفظ", cancel:"إلغاء", edit:"تعديل", changePwd:"تغيير كلمة المرور",
    kyc:"اعرف عميلك/الدفعات", wallet:"المحفظة", store:"المتجر", listings:"إعلاناتي", orders:"طلباتي",
    addresses:"العناوين", reviews:"المراجعات", favorites:"المفضلة", notifications:"الإشعارات",
    add:"إضافة", update:"تحديث", delete:"حذف", default:"افتراضي", setDefault:"اجعله افتراضيًا",
    city:"الولاية", district:"الحي", phone:"الهاتف", email:"البريد", fullName:"الاسم الكامل",
    sellerStats:"مؤشرات المتجر", avgPrep:"متوسط التحضير", onTimeShip:"نسبة الشحن بالوقت",
    cancelRate:"نسبة الإلغاء", returnRate:"نسبة الإرجاع",
    kycWarn:"فعّل الدفعات بإرسال المعلومات للمراجعة.",
    tckn:"هوية/ضريبة", iban:"IBAN", taxOffice:"دائرة الضرائب", address:"العنوان",
    sendForReview:"إرسال", kycStatus:"حالة KYC",
    statusPending:"قيد الانتظار", statusApproved:"مقبول", statusRejected:"مرفوض",
    walletHeld:"مُحتجَز (escrow)", walletAvailable:"متاح", walletPaid:"تم السداد",
    ordersEmpty:"لا توجد طلبات.",
    oPaid:"دُفع", oPreparing:"قيد التحضير", oShipped:"بالشحن", oDelivered:"تم التسليم",
    oReleased:"تم التحويل", oRefunded:"مرتجع", oCanceled:"ملغي",
    markPreparing:"تحضير", markShipped:"إرسال", markDelivered:"تم التسليم",
    trackingNo:"رقم التتبع", carrier:"شركة الشحن",
    view:"عرض", track:"تتبع", reorder:"إعادة طلب", refund:"طلب إرجاع",
    confirmDelivery:"استلمت", writeReview:"أضف مراجعة", send:"إرسال",
    storeCover:"صورة الغلاف", storeAbout:"عن المتجر", badges:"أوسمة",
    vacation:"وضع الإجازة", from:"من", until:"إلى",
    notifEmail:"بريد", notifWhats:"واتساب", notifPush:"دفع",
    addAddress:"أضف عنوانًا", name:"الاسم", line:"سطر العنوان", cityShort:"مدينة", districtShort:"حي",
    zip:"رمز", invoiceInfo:"بيانات الفاتورة", actions:"إجراءات",
    reviewNote:"المراجعات متاحة بعد التسليم فقط.", rating:"تقييم",
    footerHead1:"الشركة", footerHead2:"الخصوصية والشروط", footerHead3:"مساعدة",
    about:"من نحن", contact:"اتصال", privacy:"الخصوصية", kvkk:"KVKK",
    terms:"الشروط", distance:"البيع عن بُعد", returns:"التسليم والإرجاع",
    cookies:"سياسة الكوكيز", banned:"منتجات محظورة", help:"مساعدة", allLegal:"الكل" ,
    home:"الرئيسية", rights:"© 2025 Üreten Eller",
  },
  de: {
    roleSeller:"Anbieterin", roleCustomer:"Kunde", profile:"Profil", settings:"Einstellungen",
    logout:"Abmelden", save:"Speichern", cancel:"Abbrechen", edit:"Bearbeiten", changePwd:"Passwort ändern",
    kyc:"KYC / Auszahlungen", wallet:"Wallet", store:"Shop", listings:"Inserate", orders:"Bestellungen",
    addresses:"Adressen", reviews:"Bewertungen", favorites:"Favoriten", notifications:"Benachrichtigungen",
    add:"Hinzufügen", update:"Aktualisieren", delete:"Löschen", default:"Standard", setDefault:"Als Standard",
    city:"Bundesland", district:"Bezirk", phone:"Telefon", email:"E‑Mail", fullName:"Name",
    sellerStats:"Shop-KPIs", avgPrep:"Ø Vorbereitung", onTimeShip:"Pünktl. Versand %",
    cancelRate:"Storno‑Rate", returnRate:"Retouren‑Rate",
    kycWarn:"Zum Auszahlen Daten einreichen.",
    tckn:"ID/Steuer", iban:"IBAN", taxOffice:"Finanzamt", address:"Adresse",
    sendForReview:"Senden", kycStatus:"KYC‑Status",
    statusPending:"Ausstehend", statusApproved:"Genehmigt", statusRejected:"Abgelehnt",
    walletHeld:"Gesperrt (Escrow)", walletAvailable:"Verfügbar", walletPaid:"Ausgezahlt",
    ordersEmpty:"Noch keine Bestellungen.",
    oPaid:"Bezahlt", oPreparing:"In Arbeit", oShipped:"Versandt", oDelivered:"Zugestellt",
    oReleased:"Freigegeben", oRefunded:"Erstattet", oCanceled:"Storniert",
    markPreparing:"Als in Arbeit", markShipped:"Versenden", markDelivered:"Als zugestellt",
    trackingNo:"Sendungsnr.", carrier:"Dienst",
    view:"Ansehen", track:"Verfolgen", reorder:"Nochmal", refund:"Retoure anfordern",
    confirmDelivery:"Erhalten", writeReview:"Bewertung schreiben", send:"Senden",
    storeCover:"Titelbild", storeAbout:"Über den Shop", badges:"Abzeichen",
    vacation:"Urlaubs‑Modus", from:"Von", until:"Bis",
    notifEmail:"E‑Mail", notifWhats:"WhatsApp", notifPush:"Push",
    addAddress:"Adresse hinzufügen", name:"Name", line:"Adresse", cityShort:"Ort", districtShort:"Bezirk",
    zip:"PLZ", invoiceInfo:"Rechnungsinfo", actions:"Aktionen",
    reviewNote:"Bewertungen erst nach Zustellung.", rating:"Bewertung",
    footerHead1:"Unternehmen", footerHead2:"Datenschutz & AGB", footerHead3:"Hilfe",
    about:"Über uns", contact:"Kontakt", privacy:"Datenschutz", kvkk:"KVKK",
    terms:"Nutzungsbedingungen", distance:"Fernabsatz", returns:"Versand & Rückgabe",
    cookies:"Cookie‑Richtlinie", banned:"Verbotene Produkte", help:"Hilfe", allLegal:"Alle Rechtl.",
    home:"Startseite", rights:"© 2025 Üreten Eller",
  }
};

function useLang(){
  const [lang,setLang]=useState("tr");
  useEffect(()=>{
    if (typeof window!=="undefined"){
      const s = localStorage.getItem("lang");
      if (s && SUP.includes(s)) setLang(s);
    }
  },[]);
  useEffect(()=>{
    if (typeof document!=="undefined"){
      document.documentElement.lang = lang;
      document.documentElement.dir = (lang==="ar"?"rtl":"ltr");
    }
  },[lang]);
  const t = useMemo(()=>STR[lang]||STR.tr,[lang]);
  return {t,lang,setLang};
}

/* ------------------------------------------------------------------
   Yardımcılar (DEMO veri & para hesaplama)
-------------------------------------------------------------------*/
const PRICE = (n)=> new Intl.NumberFormat("tr-TR",{style:"currency",currency:"TRY"}).format(Number(n||0));

function computeWallet(orders){
  let held=0, available=0, paid=0;
  (orders||[]).forEach(o=>{
    const amt = Number(o.amount||0);
    if (["paid","preparing","shipped","delivered"].includes(o.status)) held += amt;
    if (o.status==="released") available += amt; // çekilebilir gibi gösteriyoruz
    if (o.status==="paid_out") paid += amt; // ileride payout logu
  });
  return {held,available,paid};
}

/* ------------------------------------------------------------------
   Ana Bileşen
-------------------------------------------------------------------*/
export default function Profile(){
  const { t } = useLang();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();

  const [role,setRole] = useState("customer"); // URL ile değişmez, metadata'dan gelir
  const [orders,setOrders] = useState([]);
  const [kyc,setKyc] = useState({ tckn:"", iban:"", taxOffice:"", address:"", status:"pending" });
  const [storeInfo,setStoreInfo] = useState({ cover:"", about:"", badges:["Hızlı kargo","Yüksek memnuniyet"], vacation:false, from:"", until:"" });
  const [settingsOpen,setSettingsOpen] = useState(false);
  const [notif,setNotif] = useState({ email:true, whats:false, push:false });
  const [addresses,setAddresses] = useState([]);

  // Guard
  useEffect(()=>{ if(!isLoaded) return; if(!isSignedIn) router.replace("/login"); },[isLoaded,isSignedIn,router]);

  // İlk yük — rol, kyc, siparişler, adresler
  useEffect(()=>{
    if(!userLoaded || !user) return;
    const meta = (user.unsafeMetadata||user.publicMetadata)||{};
    const r = meta.role==="seller"?"seller":"customer";
    setRole(r);

    try{
      // DEMO: localStorage sipariş tohumla (yoksa)
      const raw = localStorage.getItem("orders_demo");
      if(raw){ setOrders(JSON.parse(raw)); }
      else{
        const seed = [
          { id:"UE-241002-11", title:"El yapımı makrome duvar süsü", amount:480, status:"preparing", date:"2025-10-01", sellerId:"u_sell_1", customerId:"u_cust_1", track:"", items:[{sku:"UE-241002-11",qty:1,price:480}], carrier:"" },
          { id:"UE-240928-05", title:"Zeytinyağlı doğal sabun seti", amount:320, status:"shipped", date:"2025-09-28", sellerId:"u_sell_1", customerId:"u_cust_2", track:"PTT123456789TR", items:[{sku:"UE-240928-05",qty:1,price:320}], carrier:"PTT" },
          { id:"UE-240920-02", title:"Vegan kurabiye kutusu", amount:190, status:"delivered", date:"2025-09-20", sellerId:"u_sell_2", customerId:"u_cust_1", track:"YR123456", items:[{sku:"UE-240920-02",qty:1,price:190}], carrier:"Yurtiçi" },
        ];
        localStorage.setItem("orders_demo", JSON.stringify(seed));
        setOrders(seed);
      }
    }catch{}

    try{
      const k = JSON.parse(localStorage.getItem("kyc")||"{}");
      setKyc({ tckn:k.tckn||"", iban:k.iban||"", taxOffice:k.taxOffice||"", address:k.address||"", status:k.status||"pending" });
    }catch{}

    try{
      const s = JSON.parse(localStorage.getItem("store_info")||"{}");
      setStoreInfo({ cover:s.cover||"", about:s.about||"", badges:Array.isArray(s.badges)?s.badges:["Hızlı kargo"], vacation:!!s.vacation, from:s.from||"", until:s.until||"" });
    }catch{}

    try{
      const a = JSON.parse(localStorage.getItem("addresses")||"[]");
      setAddresses(Array.isArray(a)?a:[]);
    }catch{}
  },[userLoaded,user]);

  // Yardımcı: siparişte aksiyon
  async function orderAction(id, action, extra){
    try{
      // Gerçek API varsa kullan
      const res = await fetch(`/api/orders/${id}`, { method:"PATCH", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ action, ...extra })});
      if(res.ok){
        const js = await res.json();
        const o = js.order;
        const next = (orders||[]).map(x=> x.id===o.id? o : x);
        setOrders(next); localStorage.setItem("orders_demo", JSON.stringify(next));
        return;
      }
    }catch{}
    // DEMO fallback (local)
    const next = (orders||[]).map(o=>{
      if(o.id!==id) return o;
      if(action==="markPreparing") return {...o, status:"preparing"};
      if(action==="markShipped") return {...o, status:"shipped", track: (extra?.trackingNo||o.track||""), carrier:(extra?.carrier||o.carrier||"") };
      if(action==="markDelivered") return {...o, status:"delivered"};
      if(action==="refund") return {...o, status:"refunded"};
      return o;
    });
    setOrders(next); localStorage.setItem("orders_demo", JSON.stringify(next));
  }

  // Hızlı hesaplamalar
  const wallet = useMemo(()=>computeWallet(orders),[orders]);

  // Adres helpers
  function addAddress(){
    const a = { id: "ad_"+Math.random().toString(36).slice(2), name:"", line:"", city:"", district:"", zip:"", invoice:"" , def: addresses.length===0 };
    const next=[...addresses,a]; setAddresses(next); localStorage.setItem("addresses",JSON.stringify(next));
  }
  function updAddress(id, patch){
    const next = addresses.map(x=> x.id===id? {...x,...patch}:x); setAddresses(next); localStorage.setItem("addresses",JSON.stringify(next));
  }
  function delAddress(id){
    const next = addresses.filter(x=>x.id!==id); setAddresses(next); localStorage.setItem("addresses",JSON.stringify(next));
  }
  function makeDefault(id){
    const next = addresses.map(x=> ({...x, def: x.id===id})); setAddresses(next); localStorage.setItem("addresses",JSON.stringify(next));
  }

  // KYC kaydet
  async function saveKyc(e){
    e?.preventDefault?.();
    localStorage.setItem("kyc", JSON.stringify(kyc));
    try{ await user?.update({ unsafeMetadata:{...((user?.unsafeMetadata)||{}), kycStatus: kyc.status||"pending" } }); }catch{}
    alert("KYC kaydedildi (demo)");
  }

  // Mağaza bilgisi kaydet
  function saveStore(){ localStorage.setItem("store_info", JSON.stringify(storeInfo)); alert("Mağaza bilgisi kaydedildi (demo)"); }

  // Review sheet (basit demo)
  const [rv,setRv]=useState({ open:false, orderId:"", rating:5, text:"" });
  function openReview(id){ setRv({ open:true, orderId:id, rating:5, text:"" }); }
  function sendReview(){ alert("Yorum gönderildi (moderasyon) – demo"); setRv({ open:false, orderId:"", rating:5, text:"" }); }

  if(!isLoaded || !userLoaded) return <div style={{padding:20}}>Yükleniyor…</div>;

  return (
    <div className="wrap">
      <header className="head">
        <div className="avatarBox">
          <img src={user?.imageUrl||"/assets/images/logo.png"} alt="avatar"/>
        </div>
        <div className="info">
          <div className="role">{role==="seller"?t.roleSeller:t.roleCustomer}</div>
          <h1 className="ttl">{t.profile}</h1>
          <div className="grid2">
            <div className="row"><label>{t.fullName}</label><div>{[user?.firstName,user?.lastName].filter(Boolean).join(" ")||user?.username||"—"}</div></div>
            <div className="row"><label>{t.email}</label><div>{user?.primaryEmailAddress?.emailAddress||"—"}</div></div>
          </div>
          <div className="actions">
            <button className="btn" onClick={()=>setSettingsOpen(true)}>⚙️ {t.settings}</button>
            <a className="btn ghost" href="/logout?next=/home.html">🚪 {t.logout}</a>
          </div>
        </div>
      </header>

      <main className="body">
        {/* Sol sütun */}
        <section className="colL">
          {/* Cüzdan (satıcıda görünür) */}
          {role==="seller" && (
            <div className="card">
              <h3>💼 {t.wallet}</h3>
              <div className="wallet">
                <div className="wItem"><span>{t.walletHeld}</span><b>{PRICE(wallet.held)}</b></div>
                <div className="wItem"><span>{t.walletAvailable}</span><b>{PRICE(wallet.available)}</b></div>
                <div className="wItem"><span>{t.walletPaid}</span><b>{PRICE(wallet.paid)}</b></div>
              </div>
            </div>
          )}

          {/* Siparişler */}
          <div className="card">
            <h3>📦 {t.orders}</h3>
            {(!orders||orders.length===0) && <p>{t.ordersEmpty}</p>}
            <div className="orders">
              {orders.map(o=> (
                <article key={o.id} className={`order ${o.status}`}>
                  <div className="oTop">
                    <div className="oTitle">{o.title}</div>
                    <div className="oAmt">{PRICE(o.amount)}</div>
                  </div>
                  <div className="oMeta">
                    <span>#{o.id}</span>
                    <span>{new Date(o.date).toLocaleDateString("tr-TR")}</span>
                    <span className={`badge s_${o.status}`}>{statusLabel(o.status,t)}</span>
                  </div>
                  <div className="oBtns">
                    {role==="seller" ? (
                      <>
                        {o.status==="paid" && <button className="sm" onClick={()=>orderAction(o.id,"markPreparing")}>{t.markPreparing}</button>}
                        {(o.status==="paid"||o.status==="preparing") && (
                          <button className="sm" onClick={()=>{
                            const trackingNo = prompt(`${t.trackingNo}:`, o.track||"")||"";
                            const carrier = prompt(`${t.carrier}:`, o.carrier||"")||"";
                            if(!trackingNo) return alert("Takip no gerekli");
                            orderAction(o.id,"markShipped",{ trackingNo, carrier });
                          }}>{t.markShipped}</button>
                        )}
                        {o.status==="shipped" && (
                          <button className="sm" onClick={()=>orderAction(o.id,"markDelivered")}>{t.markDelivered}</button>
                        )}
                        {o.track && <a className="sm ghost" target="_blank" rel="noreferrer" href={carrierLink(o.carrier,o.track)}>{t.track}</a>}
                      </>
                    ) : (
                      <>
                        {o.status==="shipped" && <a className="sm ghost" target="_blank" rel="noreferrer" href={carrierLink(o.carrier,o.track)}>{t.track}</a>}
                        {o.status==="delivered" && <button className="sm" onClick={()=>openReview(o.id)}>{t.writeReview}</button>}
                        {o.status==="paid"||o.status==="preparing" ? (
                          <button className="sm warn" onClick={()=>orderAction(o.id,"refund",{reason:"iptal talebi"})}>{t.refund}</button>
                        ) : null}
                        {o.status==="delivered" && (
                          <button className="sm" onClick={()=>orderAction(o.id,"markDelivered")}>{t.confirmDelivery}</button>
                        )}
                        <button className="sm ghost" onClick={()=>alert("Tekrar sipariş (demo)")}>{t.reorder}</button>
                      </>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Yorum sheet */}
          {rv.open && (
            <div className="sheet" role="dialog" aria-modal="true">
              <div className="sheetCard">
                <div className="sheetHead"><b>⭐ {t.writeReview}</b><button className="btn ghost" onClick={()=>setRv(v=>({...v,open:false}))}>✕</button></div>
                <div className="sheetBody">
                  <label className="lab"><span>{t.rating}</span>
                    <input type="number" min={1} max={5} value={rv.rating} onChange={e=>setRv(v=>({...v,rating:Number(e.target.value||5)}))}/>
                  </label>
                  <label className="lab"><span>Metin</span>
                    <textarea value={rv.text} onChange={e=>setRv(v=>({...v,text:e.target.value}))} placeholder={t.reviewNote}/>
                  </label>
                  <div className="row end">
                    <button className="btn" onClick={sendReview}>{t.send}</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Sağ sütun */}
        <aside className="colR">
          {role==="seller" && (
            <div className="card">
              <h3>🏪 {t.store}</h3>
              <div className="lab"><span>{t.storeCover}</span>
                <input type="file" accept="image/*" onChange={e=>{
                  const f=e.target.files?.[0]; if(!f) return; const url=URL.createObjectURL(f);
                  setStoreInfo(s=>({...s,cover:url}));
                }}/>
                {storeInfo.cover && <img src={storeInfo.cover} alt="cover" className="cover"/>}
              </div>
              <div className="lab"><span>{t.storeAbout}</span>
                <textarea value={storeInfo.about} onChange={e=>setStoreInfo(s=>({...s,about:e.target.value}))} placeholder="Mağaza açıklaması"/>
              </div>
              <div className="lab"><span>{t.badges}</span>
                <input value={storeInfo.badges.join(", ")} onChange={e=>setStoreInfo(s=>({...s,badges:e.target.value.split(",").map(x=>x.trim()).filter(Boolean)}))}/>
              </div>
              <div className="lab row">
                <label><input type="checkbox" checked={storeInfo.vacation} onChange={e=>setStoreInfo(s=>({...s,vacation:e.target.checked}))}/> {t.vacation}</label>
                {storeInfo.vacation && (
                  <>
                    <label>{t.from} <input type="date" value={storeInfo.from} onChange={e=>setStoreInfo(s=>({...s,from:e.target.value}))}/></label>
                    <label>{t.until} <input type="date" value={storeInfo.until} onChange={e=>setStoreInfo(s=>({...s,until:e.target.value}))}/></label>
                  </>
                )}
              </div>
              <div className="row end"><button className="btn" onClick={saveStore}>{t.save}</button></div>
            </div>
          )}

          {/* KYC */}
          {role==="seller" && (
            <div className="card">
              <h3>🪪 {t.kyc}</h3>
              <p className="muted">{t.kycWarn}</p>
              <form onSubmit={saveKyc} className="grid">
                <label className="lab"><span>{t.tckn}</span><input value={kyc.tckn} onChange={e=>setKyc(v=>({...v,tckn:e.target.value}))}/></label>
                <label className="lab"><span>{t.iban}</span><input value={kyc.iban} onChange={e=>setKyc(v=>({...v,iban:e.target.value}))}/></label>
                <label className="lab"><span>{t.taxOffice}</span><input value={kyc.taxOffice} onChange={e=>setKyc(v=>({...v,taxOffice:e.target.value}))}/></label>
                <label className="lab"><span>{t.address}</span><textarea value={kyc.address} onChange={e=>setKyc(v=>({...v,address:e.target.value}))}/></label>
                <div className="lab"><span>{t.kycStatus}</span>
                  <select value={kyc.status} onChange={e=>setKyc(v=>({...v,status:e.target.value}))}>
                    <option value="pending">{t.statusPending}</option>
                    <option value="approved">{t.statusApproved}</option>
                    <option value="rejected">{t.statusRejected}</option>
                  </select>
                </div>
                <div className="row end"><button className="btn" type="submit">{t.sendForReview}</button></div>
              </form>
            </div>
          )}

          {/* Adres Defteri – müşteri ağırlıklı */}
          <div className="card">
            <h3>📮 {t.addresses}</h3>
            <div className="row end"><button className="btn" onClick={addAddress}>➕ {t.addAddress}</button></div>
            <div className="addrList">
              {addresses.map(a=> (
                <div key={a.id} className="addr">
                  <div className="row spread">
                    <b>{a.name||"—"}</b>
                    {a.def && <span className="chip">{t.default}</span>}
                  </div>
                  <div className="muted small">{[a.line,a.city,a.district,a.zip].filter(Boolean).join(", ")||"—"}</div>
                  <div className="muted small">{t.invoiceInfo}: {a.invoice||"—"}</div>
                  <div className="row gap">
                    <button className="sm" onClick={()=>updAddress(a.id,{ name: prompt(t.name, a.name||"")||a.name })}>{t.edit}</button>
                    <button className="sm" onClick={()=>updAddress(a.id,{ line: prompt(t.line, a.line||"")||a.line })}>{t.update}</button>
                    {!a.def && <button className="sm" onClick={()=>makeDefault(a.id)}>{t.setDefault}</button>}
                    <button className="sm warn" onClick={()=>delAddress(a.id)}>{t.delete}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bildirim tercihleri */}
          <div className="card">
            <h3>🔔 {t.notifications}</h3>
            <div className="row gap">
              <label><input type="checkbox" checked={notif.email} onChange={e=>setNotif(n=>({...n,email:e.target.checked}))}/> {t.notifEmail}</label>
              <label><input type="checkbox" checked={notif.whats} onChange={e=>setNotif(n=>({...n,whats:e.target.checked}))}/> {t.notifWhats}</label>
              <label><input type="checkbox" checked={notif.push} onChange={e=>setNotif(n=>({...n,push:e.target.checked}))}/> {t.notifPush}</label>
            </div>
          </div>
        </aside>
      </main>

      {/* Ayarlar Sheet */}
      {settingsOpen && (
        <div className="sheet" role="dialog" aria-modal="true">
          <div className="sheetCard">
            <div className="sheetHead"><b>⚙️ {t.settings}</b><button className="btn ghost" onClick={()=>setSettingsOpen(false)}>✕</button></div>
            <div className="sheetBody grid">
              <a className="link" href="/user/profile/security" target="_blank" rel="noreferrer">🔒 {t.changePwd}</a>
              <div className="muted small">Dil seçimi: home.html sağ üstten – bu sayfa localStorage('lang') kullanır.</div>
            </div>
          </div>
        </div>
      )}

      {/* Alt gezinme (mobil) */}
      <nav className="bottombar">
        <div className="mini"><button className="iconbtn" onClick={()=>router.push("/home.html")}>🏠</button><span>{t.home}</span></div>
        <div className="mini"><button className="iconbtn" onClick={()=>router.push("/messages")}>💬</button><span>Mesajlar</span></div>
        <div className="mini"><button className="iconbtn" onClick={()=>router.push("/notifications")}>🔔</button><span>Bildirimler</span></div>
      </nav>

      {/* SİYAH LEGAL PANEL (tek) */}
      <footer className="legal">
        <div className="col">
          <h4>{t.footerHead1}</h4>
          <a href="/legal/hakkimizda">{t.about}</a>
          <a href="/legal/iletisim">{t.contact}</a>
          <a href="/legal/gizlilik">{t.privacy}</a>
          <a href="/legal/kvkk-aydinlatma">{t.kvkk}</a>
        </div>
        <div className="col">
          <h4>{t.footerHead2}</h4>
          <a href="/legal/kullanim-sartlari">{t.terms}</a>
          <a href="/legal/mesafeli-satis-sozlesmesi">{t.distance}</a>
          <a href="/legal/teslimat-iade">{t.returns}</a>
          <a href="/legal/cerez-politikasi">{t.cookies}</a>
        </div>
        <div className="col">
          <h4>{t.footerHead3}</h4>
          <a href="/legal/yasakli-urunler">{t.banned}</a>
          <a href="/legal">{t.allLegal}</a>
          <a href="/home.html">{t.home}</a>
        </div>
        <div className="copy">{t.rights}</div>
      </footer>

      <style jsx>{`
        .wrap{min-height:100vh; padding-bottom:120px; background:
          radial-gradient(1000px 700px at -10% -10%, rgba(255,255,255,.35), transparent 60%),
          linear-gradient(120deg,#ff80ab,#a78bfa,#60a5fa,#34d399); background-size:320% 320%; animation:drift 16s ease-in-out infinite}
        @keyframes drift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

        .head{max-width:1100px; margin:16px auto; display:grid; grid-template-columns:120px 1fr; gap:16px;
          background:rgba(255,255,255,.88); border:1px solid rgba(255,255,255,.5); border-radius:18px; padding:14px; backdrop-filter:blur(10px)}
        @media (max-width:760px){ .head{grid-template-columns:1fr} }
        .avatarBox img{width:110px; height:110px; border-radius:999px; object-fit:cover; background:#f1f5f9; border:2px solid #e5e7eb}
        .ttl{margin:0 0 6px}
        .role{font-weight:800; font-size:12px; color:#111827; opacity:.8}
        .grid2{display:grid; grid-template-columns:1fr 1fr; gap:10px}
        .row{display:flex; align-items:center; gap:8px}
        .row.spread{justify-content:space-between}
        .row.end{justify-content:flex-end}
        .row.gap{gap:8px}
        .row label{font-weight:700}
        .actions{display:flex; gap:8px; margin-top:8px}
        .btn{border:1px solid #e5e7eb; background:#111827; color:#fff; border-radius:12px; padding:9px 12px; font-weight:800; cursor:pointer}
        .btn.ghost{background:#fff; color:#111827}

        .body{max-width:1100px; margin:12px auto 0; display:grid; grid-template-columns:2fr 1fr; gap:16px}
        @media (max-width:960px){ .body{grid-template-columns:1fr} }
        .card{background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:12px}
        .muted{color:#475569}
        .small{font-size:12px}

        .wallet{display:grid; grid-template-columns:repeat(3,1fr); gap:10px}
        .wItem{background:#0f172a; color:#fff; padding:12px; border-radius:12px; display:grid}
        .wItem span{opacity:.8}
        .wItem b{font-size:18px}

        .orders{display:grid; gap:10px}
        .order{border:1px solid #e5e7eb; border-radius:14px; padding:10px; background:#fff}
        .oTop{display:flex; justify-content:space-between; gap:10px}
        .oTitle{font-weight:800}
        .oAmt{font-weight:900}
        .oMeta{display:flex; gap:10px; align-items:center; color:#475569; font-size:12px; margin:6px 0}
        .oBtns{display:flex; gap:8px; flex-wrap:wrap}
        .sm{border:1px solid #111827; background:#111827; color:#fff; border-radius:10px; padding:6px 10px; font-weight:800; cursor:pointer}
        .sm.ghost{background:#fff; color:#111827}
        .sm.warn{background:#ef4444; border-color:#ef4444}
        .badge{padding:3px 8px; border-radius:999px; background:#111827; color:#fff; font-size:11px}
        .s_paid{background:#1f2937}
        .s_preparing{background:#4b5563}
        .s_shipped{background:#2563eb}
        .s_delivered{background:#16a34a}
        .s_released{background:#0f766e}
        .s_refunded{background:#ef4444}
        .s_canceled{background:#6b7280}

        .lab{display:grid; gap:6px; margin:10px 0}
        .lab input, .lab textarea, .lab select{padding:9px 12px; border:1px solid #e5e7eb; border-radius:10px; font-size:14px}
        .cover{width:100%; border-radius:12px; border:1px solid #e5e7eb; margin-top:8px}
        .addrList{display:grid; gap:10px}
        .addr{border:1px solid #e5e7eb; border-radius:12px; padding:10px}
        .chip{background:#111827; color:#fff; border-radius:999px; padding:2px 8px; font-size:11px}

        .sheet{position:fixed; inset:0; background:rgba(0,0,0,.35); display:grid; place-items:center; padding:18px; z-index:50}
        .sheetCard{width:100%; max-width:560px; background:#fff; border:1px solid #e5e7eb; border-radius:16px; overflow:hidden}
        .sheetHead{display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-bottom:1px solid #e5e7eb}
        .sheetBody{padding:12px}
        .grid{display:grid; gap:10px}
        .link{font-weight:800; color:#111827; text-decoration:none}

        .bottombar{position:fixed; left:0; right:0; bottom:64px; display:flex; justify-content:space-around; gap:8px; padding:10px;
          background:rgba(255,255,255,.92); border-top:1px solid #e5e7eb; backdrop-filter:blur(10px); z-index:20}
        .iconbtn{width:42px; height:42px; border:1px solid #e5e7eb; background:#fff; border-radius:12px; cursor:pointer}
        .mini{display:grid; place-items:center; gap:4px; font-size:12px}

        .legal{position:fixed; left:0; right:0; bottom:0; background:#0b0b0c; color:#d1d5db; padding:14px 16px; display:grid; grid-template-columns:repeat(3,1fr); gap:16px; border-top:2px solid #111}
        @media (max-width:860px){ .legal{grid-template-columns:1fr 1fr} }
        @media (max-width:540px){ .legal{grid-template-columns:1fr} }
        .legal h4{margin:0 0 8px; color:#fff}
        .legal a{display:block; color:#d1d5db; text-decoration:none; padding:3px 0}
        .legal .copy{grid-column:1/-1; text-align:center; color:#9ca3af; font-size:12px; margin-top:6px}
      `}</style>
    </div>
  );
}

function statusLabel(s,t){
  return s==="paid"?t.oPaid: s==="preparing"?t.oPreparing: s==="shipped"?t.oShipped: s==="delivered"?t.oDelivered:
    s==="released"?t.oReleased: s==="refunded"?t.oRefunded: s==="canceled"?t.oCanceled: s;
}

function carrierLink(carrier,track){
  const num = encodeURIComponent(track||"");
  const c = (carrier||"").toLowerCase();
  if(c.includes("ptt")) return `https://gonderitakip.ptt.gov.tr/Track/Verify?q=${num}`;
  if(c.includes("yurti")) return `https://www.yurticikargo.com/tr/online-servisler/gonderi-sorgula?code=${num}`;
  if(c.includes("aras")) return `https://kargotakip.araskargo.com.tr/mainpage.aspx?code=${num}`;
  return `https://google.com/search?q=${num}`;
}
