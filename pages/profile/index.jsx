"use client";
import React, { useEffect, useMemo, useState } from "react";

/*****************************************
 * ÜRETEN ELLER — TEK PROFİL PANELİ
 * (Rol Kapısı + Müşteri + Satıcı bir arada)
 * - Mobil/Tablet/Masaüstü uyumlu
 * - Dil: localStorage.lang (tr|en|ar|de)
 * - Sahte veri YOK: API'dan çeker, yoksa boş/skeleton
 * - En altta SİYAH legal panel
 *****************************************/

const SUP = ["tr","en","ar","de"];
const T = {
  tr: {
    brand:"Üreten Eller",
    chooseRole:"Nasıl devam edelim?",
    maker:"Üreten El",
    customer:"Müşteri",
    switchRole:"Rol Değiştir",
    logout:"Çıkış",
    // Customer
    c:{
      hello:"Hoş geldin",
      profile:"Müşteri Profili",
      stats:{orders:"Siparişlerim", returns:"İade Talepleri", msgs:"Mesajlar", favs:"Favoriler"},
      tabs:{orders:"Siparişler", messages:"Mesajlar", favs:"Favoriler", addresses:"Adresler", payments:"Ödemeler", support:"Destek", settings:"Ayarlar"},
      filter:{all:"Hepsi", waiting:"Hazırlanıyor", shipped:"Kargoda", delivered:"Teslim edildi", refund:"İade"},
      actions:{view:"Görüntüle", track:"Kargo Takip", confirm:"Teslimi Onayla", openRefund:"İade Talebi", reorder:"Tekrar Sipariş"},
      empty:"Henüz kayıt yok.", loading:"Yükleniyor…"
    },
    // Seller
    s:{
      title:"Üreten El Paneli",
      tabs:{live:"Yayındaki", pending:"Onay Bekleyen", expired:"Süresi Dolmuş"},
      search:"Ara…", sort:"Sırala", newest:"En yeni", priceAsc:"Fiyat artan", priceDesc:"Fiyat azalan",
      bulk:"Toplu işlem", selectAll:"Tümünü Seç", unselect:"Seçimi Kaldır", takeDown:"Yayından Al", extend:"Süre Uzat",
      actions:{edit:"Düzenle", pause:"Yayından Al", clone:"Kopyala", delete:"Sil"},
      store:"Mağaza Durumu & Evrak",
      ps:"Ödeme Kurulumu",
      wallet:"Cüzdan",
      ordersMini:"Son Siparişler",
      empty:"Henüz ilan yok.", loading:"Yükleniyor…"
    },
    // Footer
    f:{ corp:"Kurumsal", about:"Hakkımızda", contact:"İletişim", privacy:"Gizlilik", kvkk:"KVKK Aydınlatma",
        legal:"Gizlilik & Kullanım", terms:"Kullanım Şartları", distance:"Mesafeli Satış", returns:"Teslimat & İade", cookies:"Çerez Politikası",
        help:"Yardım", banned:"Yasaklı Ürünler", all:"Tüm Legal", home:"Ana Sayfa", copy:(y)=>`© ${y} Üreten Eller` }
  },
  en: {
    brand:"Ureten Eller", chooseRole:"How do you want to continue?", maker:"Maker", customer:"Customer", switchRole:"Switch Role", logout:"Log out",
    c:{ hello:"Welcome", profile:"Customer Profile", stats:{orders:"Orders", returns:"Returns", msgs:"Messages", favs:"Favorites"}, tabs:{orders:"Orders",messages:"Messages",favs:"Favorites",addresses:"Addresses",payments:"Payments",support:"Support",settings:"Settings"}, filter:{all:"All",waiting:"Processing",shipped:"Shipped",delivered:"Delivered",refund:"Return"}, actions:{view:"View",track:"Track",confirm:"Confirm Delivery",openRefund:"Open Return",reorder:"Re‑order"}, empty:"No data yet.", loading:"Loading…" },
    s:{ title:"Maker Panel", tabs:{live:"Live", pending:"Pending", expired:"Expired"}, search:"Search…", sort:"Sort", newest:"Newest", priceAsc:"Price asc", priceDesc:"Price desc", bulk:"Bulk actions", selectAll:"Select all", unselect:"Clear", takeDown:"Take down", extend:"Extend", actions:{edit:"Edit", pause:"Take down", clone:"Clone", delete:"Delete"}, store:"Store Status & Docs", ps:"Payment Setup", wallet:"Wallet", ordersMini:"Recent Orders", empty:"No listings.", loading:"Loading…" },
    f:{ corp:"Company", about:"About", contact:"Contact", privacy:"Privacy", kvkk:"KVKK Notice", legal:"Privacy & Terms", terms:"Terms of Use", distance:"Distance Sales", returns:"Shipping & Returns", cookies:"Cookie Policy", help:"Help", banned:"Prohibited Items", all:"All Legal", home:"Home", copy:(y)=>`© ${y} Ureten Eller` }
  },
  ar: {
    brand:"أُنتِج بالأيادي", chooseRole:"كيف تتابع؟", maker:"المُنتِجة", customer:"العميل", switchRole:"تبديل الدور", logout:"تسجيل خروج",
    c:{ hello:"مرحبًا", profile:"ملف العميل", stats:{orders:"طلباتي", returns:"الإرجاع", msgs:"الرسائل", favs:"المفضلة"}, tabs:{orders:"الطلبات",messages:"الرسائل",favs:"المفضلة",addresses:"العناوين",payments:"المدفوعات",support:"الدعم",settings:"الإعدادات"}, filter:{all:"الكل",waiting:"قيد التجهيز",shipped:"قيد الشحن",delivered:"تم التسليم",refund:"إرجاع"}, actions:{view:"عرض",track:"تتبع",confirm:"تأكيد التسليم",openRefund:"طلب إرجاع",reorder:"إعادة الطلب"}, empty:"لا بيانات بعد.", loading:"جارٍ التحميل…" },
    s:{ title:"لوحة المُنتِجة", tabs:{live:"منشور", pending:"بانتظار", expired:"منتهي"}, search:"ابحث…", sort:"رتّب", newest:"الأحدث", priceAsc:"السعر تصاعدي", priceDesc:"السعر تنازلي", bulk:"إجراء جماعي", selectAll:"تحديد الكل", unselect:"مسح", takeDown:"إيقاف النشر", extend:"تمديد", actions:{edit:"تعديل", pause:"إيقاف", clone:"نسخ", delete:"حذف"}, store:"حالة المتجر والوثائق", ps:"إعداد الدفع", wallet:"المحفظة", ordersMini:"أحدث الطلبات", empty:"لا إعلانات.", loading:"جارٍ التحميل…" },
    f:{ corp:"الشركة", about:"من نحن", contact:"اتصال", privacy:"الخصوصية", kvkk:"إشعار KVKK", legal:"الخصوصية والشروط", terms:"شروط الاستخدام", distance:"البيع عن بُعد", returns:"التسليم والإرجاع", cookies:"سياسة الكوكيز", help:"المساعدة", banned:"المنتجات المحظورة", all:"كل السياسات", home:"الرئيسية", copy:(y)=>`© ${y} أُنتِج بالأيادي` }
  },
  de: {
    brand:"Ureten Eller", chooseRole:"Wie möchtest du fortfahren?", maker:"Anbieterin", customer:"Kunde", switchRole:"Rolle wechseln", logout:"Abmelden",
    c:{ hello:"Willkommen", profile:"Kundenprofil", stats:{orders:"Bestellungen", returns:"Retouren", msgs:"Nachrichten", favs:"Favoriten"}, tabs:{orders:"Bestellungen",messages:"Nachrichten",favs:"Favoriten",addresses:"Adressen",payments:"Zahlungen",support:"Support",settings:"Einstellungen"}, filter:{all:"Alle",waiting:"In Bearbeitung",shipped:"Versandt",delivered:"Zugestellt",refund:"Retoure"}, actions:{view:"Ansehen",track:"Verfolgen",confirm:"Zustellung bestätigen",openRefund:"Retoure öffnen",reorder:"Nochmal kaufen"}, empty:"Noch keine Daten.", loading:"Lädt…" },
    s:{ title:"Anbieterinnen-Panel", tabs:{live:"Aktiv", pending:"Ausstehend", expired:"Abgelaufen"}, search:"Suchen…", sort:"Sortieren", newest:"Neueste", priceAsc:"Preis ↑", priceDesc:"Preis ↓", bulk:"Sammelaktion", selectAll:"Alle wählen", unselect:"Leeren", takeDown:"Deaktivieren", extend:"Verlängern", actions:{edit:"Bearb.", pause:"Stop", clone:"Kopieren", delete:"Löschen"}, store:"Store‑Status & Doku", ps:"Zahlungssetup", wallet:"Wallet", ordersMini:"Letzte Bestellungen", empty:"Keine Inserate.", loading:"Lädt…" },
    f:{ corp:"Unternehmen", about:"Über uns", contact:"Kontakt", privacy:"Datenschutz", kvkk:"KVKK‑Hinweis", legal:"Datenschutz & AGB", terms:"Nutzungsbedingungen", distance:"Fernabsatz", returns:"Lieferung & Rückgabe", cookies:"Cookie‑Richtlinie", help:"Hilfe", banned:"Verbotene Artikel", all:"Alle Rechtstexte", home:"Startseite", copy:(y)=>`© ${y} Ureten Eller` }
  }
};

function useLang(){
  const [lang,setLang] = useState("tr");
  useEffect(()=>{ try{ const s=localStorage.getItem("lang"); if(s && SUP.includes(s)) setLang(s);}catch{} },[]);
  const t = useMemo(()=>T[lang]||T.tr,[lang]);
  const dir = lang==="ar"?"rtl":"ltr";
  return {lang,t,dir};
}

export default function ProfileUnified(){
  const { t, dir } = useLang();
  const [role,setRole] = useState("" as "seller"|"customer"|"");

  // role init
  useEffect(()=>{
    try{ const r = localStorage.getItem("role"); if(r==="seller"||r==="customer") setRole(r as any);}catch{}
  },[]);

  function choose(r){
    try{ localStorage.setItem("role", r); }catch{}
    // Sunucuya da yaz (Clerk metadata) — endpoint sende
    fetch("/api/me/role", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ role:r }) }).catch(()=>{});
    setRole(r as any);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-sky-50" dir={dir}>
      {/* Üst bar */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="font-black tracking-tight">{t.brand}</div>
          <div className="flex items-center gap-2">
            {role && <button onClick={()=>setRole("")} className="px-3 py-1.5 rounded-lg border border-slate-200 font-bold">{t.switchRole}</button>}
            <a href="/logout" className="px-3 py-1.5 rounded-lg border border-slate-200 font-bold hover:bg-slate-900 hover:text-white">{t.logout}</a>
          </div>
        </div>
      </header>

      {/* Rol kapısı */}
      {!role && (
        <section className="max-w-4xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-5">
          <RoleCard title={t.maker} emoji="🧶" onClick={()=>choose("seller")} />
          <RoleCard title={t.customer} emoji="🛍️" onClick={()=>choose("customer")} />
        </section>
      )}

      {/* Rol içerikleri */}
      {role==="customer" && <CustomerPanel t={t} />}
      {role==="seller" && <SellerPanel t={t} />}

      <LegalFooter t={t} />
    </div>
  );
}

function RoleCard({ title, emoji, onClick }){
  return (
    <button onClick={onClick} className="bg-white/80 border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow transition text-left">
      <div className="text-5xl">{emoji}</div>
      <div className="mt-3 text-2xl font-black">{title}</div>
      <div className="mt-1 text-slate-500">Devam etmek için tıkla.</div>
    </button>
  );
}

/*************** MÜŞTERİ PANELİ ***************/
function CustomerPanel({ t }){
  const [tab,setTab] = useState("orders");
  const [filter,setFilter] = useState("all");
  const [orders,setOrders] = useState([]); // gerçek veri
  const [loading,setLoading] = useState(false);

  useEffect(()=>{ let alive=true; (async()=>{
    try{ setLoading(true);
      const q = filter==="all"?"":"?status="+filter; // waiting|shipped|delivered|refund
      const r = await fetch("/api/orders/my"+q);
      if(r.ok){ const d = await r.json(); if(alive) setOrders(Array.isArray(d)?d:(d.items||[])); }
      else if(alive) setOrders([]);
    }catch{ if(alive) setOrders([]);} finally{ if(alive) setLoading(false);} })();
    return ()=>{ alive=false };
  },[filter]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-6 grid gap-5">
      {/* başlık + sayaclar */}
      <div className="bg-white/80 border border-slate-200 rounded-3xl p-5 shadow-sm">
        <div className="text-slate-500 text-sm">{t.c.hello}</div>
        <h1 className="text-2xl md:text-3xl font-black">{t.c.profile}</h1>
      </div>

      {/* sekmeler */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {Object.entries(t.c.tabs).map(([k,label])=> (
          <button key={k} onClick={()=>setTab(k)} className={`px-4 py-2 rounded-xl border font-extrabold flex-shrink-0 ${tab===k? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200 hover:border-slate-400"}`}>{label}</button>
        ))}
      </div>

      {tab==="orders" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {Object.entries(t.c.filter).map(([k,label])=> (
              <button key={k} onClick={()=>setFilter(k)} className={`px-3 py-1.5 rounded-full border text-sm font-semibold ${filter===k?"bg-slate-900 text-white border-slate-900":"bg-white border-slate-200"}`}>{label}</button>
            ))}
          </div>
          {loading && <div className="text-slate-500">{t.c.loading}</div>}
          {!loading && orders.length===0 && <div className="text-slate-500">{t.c.empty}</div>}
          <div className="grid gap-3">
            {orders.map((o)=> (
              <div key={o.id} className="border border-slate-200 rounded-2xl p-4 bg-white/60">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <div className="text-sm text-slate-500">#{o.code||o.id} • {o.date}</div>
                    <div className="font-black">{o.title}</div>
                    <div className="text-slate-700 font-semibold mt-1">{o.price}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded-full text-xs font-bold border bg-slate-50 border-slate-300 text-slate-800">{t.c.filter[o.status]||t.c.filter.all}</span>
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 font-bold">{t.c.actions.view}</button>
                    {o.tracking && <button className="px-3 py-1.5 rounded-lg border border-slate-200 font-bold">{t.c.actions.track}</button>}
                    {(o.status==="shipped"||o.status==="delivered") && <button className="px-3 py-1.5 rounded-lg border border-slate-200 font-bold">{t.c.actions.openRefund}</button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab!=="orders" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-500">{t.c.empty}</div>
      )}
    </section>
  );
}

/*************** SATICI PANELİ ***************/
function SellerPanel({ t }){
  const [tab,setTab] = useState("live");
  const [items,setItems] = useState([]);
  const [loading,setLoading] = useState(false);
  const [selected,setSelected] = useState({});

  async function load(status){
    try{ setLoading(true);
      const r = await fetch(`/api/ads/my?status=${status}`);
      if(r.ok){ const d = await r.json(); setItems(Array.isArray(d)?d:(d.items||[])); } else setItems([]);
    }catch{ setItems([]);} finally{ setLoading(false); }
  }
  useEffect(()=>{ load(tab); },[tab]);

  function toggleAll(){
    if(Object.keys(selected).length===items.length){ setSelected({}); return; }
    const all = {}; items.forEach(x=>{ all[x.id]=true;}); setSelected(all);
  }
  function toggle(id){ setSelected(s=>({ ...s, [id]: !s[id] })); }

  async function bulk(action){
    const ids = Object.keys(selected).filter(k=>selected[k]); if(!ids.length) return;
    await fetch("/api/ads/bulk",{ method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ action, ids })}).catch(()=>{});
    load(tab);
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-6 grid gap-5">
      <div className="bg-white/80 border border-slate-200 rounded-3xl p-5 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-black">{t.s.title}</h1>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {Object.entries(t.s.tabs).map(([k,label])=> (
          <button key={k} onClick={()=>setTab(k)} className={`px-4 py-2 rounded-xl border font-extrabold flex-shrink-0 ${tab===k? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200 hover:border-slate-400"}`}>{label}</button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <button onClick={toggleAll} className="px-3 py-1.5 rounded-full border text-sm font-semibold">{t.s.selectAll}</button>
          <div className="ml-auto flex gap-2">
            <button onClick={()=>bulk("pause")} className="px-3 py-1.5 rounded-lg border text-sm font-bold">{t.s.takeDown}</button>
            <button onClick={()=>bulk("extend")} className="px-3 py-1.5 rounded-lg border text-sm font-bold">{t.s.extend}</button>
          </div>
        </div>

        {loading && <div className="text-slate-500">{t.s.loading}</div>}
        {!loading && items.length===0 && <div className="text-slate-500">{t.s.empty}</div>}

        <div className="grid gap-3">
          {items.map(it=> (
            <div key={it.id} className="border border-slate-200 rounded-2xl p-4 bg-white/60">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <input type="checkbox" checked={!!selected[it.id]} onChange={()=>toggle(it.id)} className="mt-1"/>
                  <div>
                    <div className="font-black">{it.title}</div>
                    <div className="text-slate-600 text-sm">{it.cat} • {it.price}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 rounded-lg border text-sm font-bold">{t.s.actions.edit}</button>
                  <button className="px-3 py-1.5 rounded-lg border text-sm font-bold">{t.s.actions.pause}</button>
                  <button className="px-3 py-1.5 rounded-lg border text-sm font-bold">{t.s.actions.clone}</button>
                  <button className="px-3 py-1.5 rounded-lg border text-sm font-bold text-rose-700 border-rose-200">{t.s.actions.delete}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ödeme & Evrak & Cüzdan özet kartları (placeholder, API gelince doldur) */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4"><div className="font-extrabold mb-1">{t.s.store}</div><div className="text-slate-500 text-sm">Evrak tamamlanmadıysa burada kırmızı uyarı çıkacak.</div></div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4"><div className="font-extrabold mb-1">{t.s.ps}</div><div className="text-slate-500 text-sm">PayTR/iyzico aktivasyon durumu.</div></div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4"><div className="font-extrabold mb-1">{t.s.wallet}</div><div className="text-slate-500 text-sm">Blokede/Ödenen özetleri.</div></div>
      </div>
    </section>
  );
}

/*************** LEGAL FOOTER ***************/
function LegalFooter({ t }){
  const Y = new Date().getFullYear();
  return (
    <footer className="mt-10 bg-[#0b0b0f] text-slate-300">
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-3">
        <section>
          <h4 className="text-white font-bold mb-2">{t.f.corp}</h4>
          <a href="/legal/hakkimizda" className="block hover:text-white">{t.f.about}</a>
          <a href="/legal/iletisim" className="block hover:text-white">{t.f.contact}</a>
          <a href="/legal/gizlilik" className="block hover:text-white">{t.f.privacy}</a>
          <a href="/legal/kvkk-aydinlatma" className="block hover:text-white">{t.f.kvkk}</a>
        </section>
        <section>
          <h4 className="text-white font-bold mb-2">{t.f.legal}</h4>
          <a href="/legal/kullanim-sartlari" className="block hover:text-white">{t.f.terms}</a>
          <a href="/legal/mesafeli-satis-sozlesmesi" className="block hover:text-white">{t.f.distance}</a>
          <a href="/legal/teslimat-iade" className="block hover:text-white">{t.f.returns}</a>
          <a href="/legal/cerez-politikasi" className="block hover:text-white">{t.f.cookies}</a>
        </section>
        <section>
          <h4 className="text-white font-bold mb-2">{t.f.help}</h4>
          <a href="/legal/topluluk-kurallari#yasakli-urunler" className="block hover:text-white">{t.f.banned}</a>
          <a href="/legal" className="block hover:text-white">{t.f.all}</a>
          <a href="/" className="block hover:text-white">{t.f.home}</a>
        </section>
      </div>
      <div className="border-t border-[#232329] text-center py-3 text-sm">{t.f.copy(Y)}</div>
    </footer>
  );
}
