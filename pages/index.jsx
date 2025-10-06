"use client";
import { useEffect, useMemo, useState } from "react";

/* Dil ayarları (kısaltılmış) */
const SUPPORTED = ["tr","en"];
const LOCALE_LABEL = { tr:"Türkçe", en:"English" };
const STR = {
  tr:{
    brand:"Üreten Eller", heroTitle:"Üreten Ellere Hoş Geldiniz",
    sellerPortal:"Üreten El Portalı", customerPortal:"Müşteri Portalı",
    listings:"Son 20 İlan", categories:"Kategorilerimiz",
    view:"İncele", noAds:"Henüz ilan yok.",
    legalBarTitle:"Kurumsal",
    legal:{ corporate:"Kurumsal", about:"Hakkımızda", contact:"İletişim", privacy:"Gizlilik",
            kvkk:"KVKK Aydınlatma", terms:"Kullanım Şartları", distance:"Mesafeli Satış",
            shippingReturn:"Teslimat & İade", cookies:"Çerez Politikası", help:"Yardım",
            banned:"Yasaklı Ürünler", all:"Tüm Legal", home:"Ana Sayfa" }
  },
  en:{
    brand:"Ureten Eller", heroTitle:"Welcome to Ureten Eller",
    sellerPortal:"Maker Portal", customerPortal:"Customer Portal",
    listings:"Latest 20 Listings", categories:"Our Categories",
    view:"View", noAds:"No listings yet.",
    legalBarTitle:"Corporate",
    legal:{ corporate:"Corporate", about:"About Us", contact:"Contact", privacy:"Privacy",
            kvkk:"KVKK Notice", terms:"Terms of Use", distance:"Distance Sales",
            shippingReturn:"Shipping & Returns", cookies:"Cookie Policy", help:"Help",
            banned:"Prohibited Products", all:"All Legal", home:"Home" }
  }
};

const PHRASES = {
  tr:[
    { text:"Kadın emeği değer bulsun.", color:"#c026d3" },
    { text:"El emeği ürünler adil fiyata.", color:"#7c3aed" },
    { text:"Yerelden al, ekonomiye can ver.", color:"#ca8a04" },
  ],
  en:[
    { text:"Women’s labor should be valued.", color:"#c026d3" },
    { text:"Handmade products at fair prices.", color:"#7c3aed" },
    { text:"Buy local, boost the economy.", color:"#ca8a04" },
  ]
};

const CATS = { tr:[
  { icon:"🍲", title:"Yemekler", subs:["Ev yemekleri","Börek-çörek","Çorba"] },
  { icon:"🎂", title:"Pasta & Tatlı", subs:["Yaş pasta","Kurabiye","Sütlü"] },
  { icon:"💍", title:"Takı", subs:["Bileklik","Kolye","Küpe"] },
], en:[
  { icon:"🍲", title:"Meals", subs:["Home meals","Savory bakes","Soup"] },
  { icon:"🎂", title:"Cakes & Sweets", subs:["Layer cake","Cookies","Milk desserts"] },
  { icon:"💍", title:"Jewelry", subs:["Bracelet","Necklace","Earrings"] },
]};

function useLang(){
  const [lang,setLang]=useState("tr");
  useEffect(()=>{ const s=localStorage.getItem("lang"); if(s && SUPPORTED.includes(s)) setLang(s); },[]);
  useEffect(()=>{ localStorage.setItem("lang",lang); document.documentElement.lang=lang; document.documentElement.dir="ltr"; },[lang]);
  return { lang, setLang, t: STR[lang]||STR.tr };
}

export default function Home(){
  const { lang,setLang,t } = useLang();
  const phrases = useMemo(()=>PHRASES[lang]||PHRASES.tr,[lang]);
  const [i,setI] = useState(0);
  const current = phrases[i] || phrases[0];
  const accent = current?.color || "#111827";

  // metni 12 sn'de bir değiştir
  useEffect(()=>{ const id=setInterval(()=>setI(x=>(x+1)%phrases.length),12000); return ()=>clearInterval(id); },[phrases.length]);

  // STATIK ortamda API çağrısı yapmayalım (NEXT_PUBLIC_STATIC=true iken)
  const isStatic = typeof process !== "undefined" && process.env.NEXT_PUBLIC_STATIC === "true";
  const [ads,setAds] = useState([]);
  useEffect(()=>{
    let alive=true;
    (async()=>{
      if(!isStatic){
        try{
          const res = await fetch("/api/ads/public?limit=20",{ cache:"no-store" });
          if(res.ok){
            const data=await res.json();
            if(alive) setAds(Array.isArray(data)?data.slice(0,20):[]);
            return;
          }
        }catch{}
      }
      // fallback: boş
      if(alive) setAds([]);
    })();
    return ()=>{ alive=false; };
  },[isStatic]);

  const cats = CATS[lang] || CATS.tr;

  // Buton davranışı: statik yayında "home.html" (public) sayfasına yönlendirelim ki 404 olmasın
  const go = (href)=>{ window.location.href = href; };

  return (
    <main className="wrap">
      {/* Dil */}
      <div className="langbox">
        <select aria-label="Language" value={lang} onChange={(e)=>setLang(e.target.value)}>
          {SUPPORTED.map(k=><option key={k} value={k}>{LOCALE_LABEL[k]}</option>)}
        </select>
      </div>

      <section className="hero" style={{ "--accent": accent }}>
        <img src="/assets/images/logo.png" alt={t.brand} width="96" height="96" className="logo" />
        <h1 className="title">{t.brand}</h1>
        <h2 className="subtitle">{t.heroTitle}</h2>
        <p key={i} className="lead phrase">{current.text}</p>

        {/* TEK SET BUTON */}
        <div className="ctaRow">
          <button className="btnPrimary" onClick={()=>go("/home.html#role=seller")}>
            {t.sellerPortal}
          </button>
          <button className="btnGhost" onClick={()=>go("/home.html#role=customer")}>
            {t.customerPortal}
          </button>
        </div>
      </section>

      {/* İlanlar */}
      <section className="adsSection">
        <h3>{t.listings}</h3>
        <div className="adsGrid">
          {ads.length===0 ? (
            <div className="adCard"><div className="adBody empty">{t.noAds}</div></div>
          ) : ads.map((a,idx)=>{
            const imgStyle = a?.img ? { backgroundImage:`url(${a.img})`, backgroundSize:"cover", backgroundPosition:"center" } : undefined;
            const title = a?.title || "İlan";
            const cat   = a?.cat || a?.category || "";
            const price = a?.price || "";
            const url   = a?.url || `/ads/${a?.slug || a?.id || ""}`;
            return (
              <div className="adCard" key={idx}>
                <div className="adThumb" style={imgStyle}/>
                <div className="adBody">
                  <h4 className="adTitle">{title}</h4>
                  <div className="adMeta"><span>{cat}</span><b>{price}</b></div>
                </div>
                <div className="adActions">
                  <button className="viewBtn" onClick={()=>go("/home.html#login")}>{t.view}</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Kategoriler */}
      <section className="cats">
        <h3>{t.categories}</h3>
        <div className="grid">
          {cats.map((c, idx)=>{
            const link = `/home.html#cat=${encodeURIComponent(c.title)}`;
            return (
              <article key={idx} className="card" onClick={()=>go(link)}>
                <div className="cardHead"><span className="icon" aria-hidden>{c.icon}</span><h4>{c.title}</h4></div>
                <div className="subsGrid">
                  {c.subs.slice(0,9).map((s,k)=><span key={k} className="chip">{s}</span>)}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Alt bar: linkleri gerçek /legal/* sayfalarına götürüyoruz */}
      <footer className="legalFooter" role="contentinfo">
        <div className="legalWrap">
          <div className="legalTitle">{t.legalBarTitle}</div>
          <nav className="legalLinks" aria-label={t.legalBarTitle}>
            <a href="/legal/">{t.legalBarTitle}</a>
            <a href="/legal/hakkimizda">Hakkımızda</a>
            <a href="/legal/iletisim">İletişim</a>
            <a href="/legal/gizlilik">Gizlilik</a>
            <a href="/legal/kvkk-aydinlatma">KVKK Aydınlatma</a>
            <a href="/legal/kullanim-sartlari">Kullanım Şartları</a>
            <a href="/legal/mesafeli-satis-sozlesmesi">Mesafeli Satış</a>
            <a href="/legal/teslimat-iade">Teslimat & İade</a>
            <a href="/legal/cerez-politikasi">Çerez Politikası</a>
            <a href="/legal/topluluk-kurallari">Topluluk Kuralları</a>
            <a className="homeLink" href="/">{t.legal.home}</a>
          </nav>
        </div>
      </footer>

      <style jsx global>{`
        :root{ --ink:#0f172a; --paperA:rgba(255,255,255,.86); --lineA:rgba(255,255,255,.45); }
        body{ margin:0; color:var(--ink);
              font-family:system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial,sans-serif;
              background:#f8fafc; /* dalgalanma animasyonu kaldırıldı */ }
        .wrap{ max-width:1120px; margin:0 auto; padding:32px 20px 120px; }
        .langbox{ position:fixed; top:12px; right:12px; z-index:50; background:#fff; border:1px solid #e5e7eb; border-radius:12px; padding:6px 10px; }
        .langbox select{ border:none; background:transparent; font-weight:600; cursor:pointer; }
        .hero{ display:grid; place-items:center; text-align:center; gap:10px; padding:72px 0 24px; }
        .logo{ border-radius:20px; }
        .title{ margin:8px 0 0; font-size:44px; color:var(--accent); }
        .subtitle{ margin:2px 0 6px; font-size:22px; color:var(--accent); }
        .lead{ max-width:820px; margin:8px auto 4px; font-size:18px; color:var(--accent); }
        .ctaRow{ display:flex; gap:12px; flex-wrap:wrap; justify-content:center; margin-top:8px; }
        .btnPrimary{ padding:12px 18px; border-radius:999px; border:none; cursor:pointer; background:#111827; color:#fff; font-weight:600; }
        .btnGhost{ padding:12px 18px; border-radius:999px; cursor:pointer; font-weight:600; background:var(--paperA); border:1px solid var(--lineA); color:#111827; }
        .adsSection h3{ font-size:22px; margin:24px 0 12px; text-align:center; }
        .adsGrid{ display:grid; gap:16px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); }
        .adCard{ background:#fff; border:1px solid #e5e7eb; border-radius:16px; overflow:hidden; display:flex; flex-direction:column; }
        .adThumb{ width:100%; aspect-ratio:4/3; background:#f1f5f9; }
        .adBody{ padding:10px; }
        .adBody.empty{ text-align:center; color:#475569; font-weight:600; padding:18px; }
        .adTitle{ margin:0 0 6px; font-weight:700; font-size:15px; }
        .adMeta{ display:flex; justify-content:space-between; align-items:center; color:#475569; font-size:13px; }
        .adActions{ padding:0 10px 12px; }
        .viewBtn{ width:100%; padding:10px 12px; border-radius:10px; border:1px solid #111827; background:#111827; color:#fff; font-weight:700; cursor:pointer; }
        .cats h3{ font-size:22px; margin:28px 0 14px; text-align:center; }
        .grid{ display:grid; gap:16px; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); }
        .card{ border-radius:18px; padding:16px; background:var(--paperA); border:1px solid var(--lineA); cursor:pointer; }
        .cardHead{ display:flex; align-items:center; gap:10px; margin-bottom:8px; }
        .icon{ font-size:22px; }
        h4{ margin:0; font-size:18px; }
        .subsGrid{ display:grid; gap:8px; grid-template-columns:repeat(3,minmax(0,1fr)); }
        .chip{ text-align:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; padding:8px 10px; border-radius:12px; font-size:12px; background:#fff; border:1px solid #e5e7eb; }
        @media (max-width:520px){ .subsGrid{grid-template-columns:repeat(2,minmax(0,1fr));} .title{font-size:36px;} .subtitle{font-size:20px;} }
        .legalFooter{ position:fixed; left:0; right:0; bottom:0; background:#0b0b0b; color:#f8fafc; border-top:1px solid rgba(255,255,255,.12); }
        .legalWrap{ padding:10px 12px 12px; }
        .legalTitle{ font-weight:700; font-size:14px; margin-bottom:6px; }
        .legalLinks{ display:flex; flex-wrap:wrap; gap:10px; }
        .legalLinks a{ color:#e2e8f0; font-size:13px; padding:6px 8px; border-radius:8px; text-decoration:none; }
        .legalLinks a:hover{ background:rgba(255,255,255,.08); color:#fff; }
        .homeLink{ margin-left:auto; font-weight:700; }
      `}</style>
    </main>
  );
}
