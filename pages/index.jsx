"use client";
import { useEffect, useMemo, useState } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

/** ---- i18n (TR/EN/AR/DE) ---- */
const SUPPORTED = ["tr","en","ar","de"];

const STR = {
  tr: {
    brand: "Üreten Eller",
    heroTitle: "Üreten Ellere Hoş Geldiniz",
    motto: [
      "Amacımız: ev hanımlarına bütçe katkısı sağlamak.",
      "Amacımız: müşterilere uygun fiyatlı ürünlere erişim sunmak.",
      "Amacımız: kadın emeğini görünür ve kazançlı kılmak.",
      "Amacımız: kaliteli ürünü, adil fiyata ulaştırmak.",
    ],
    sellerPortal: "Üreten El Portalı",
    customerPortal: "Müşteri Portalı",
    needAuth: "Önce kayıt olmalısınız.",
    categories: "Kategorilerimiz",
    orderNow: "Sipariş Ver",
    postAd: "İlan Ver",
  },
  en: {
    brand: "Ureten Eller",
    heroTitle: "Welcome to Ureten Eller",
    motto: [
      "Our aim: support household budgets of women.",
      "Our aim: give customers affordable access to products.",
      "Our aim: make women’s labor visible and rewarding.",
      "Our aim: deliver quality at a fair price.",
    ],
    sellerPortal: "Maker Portal",
    customerPortal: "Customer Portal",
    needAuth: "Please sign up first.",
    categories: "Our Categories",
    orderNow: "Order Now",
    postAd: "Post Listing",
  },
  ar: {
    brand: "أُنتِج بالأيادي",
    heroTitle: "مرحبًا بكم",
    motto: [
      "هدفنا: دعم ميزانية ربّات البيوت.",
      "هدفنا: إتاحة منتجات بأسعار مناسبة للعملاء.",
      "هدفنا: إبراز عمل المرأة وجعله مُجزياً.",
      "هدفنا: جودة بسعر عادل.",
    ],
    sellerPortal: "بوابة المُنتِجات",
    customerPortal: "بوابة العملاء",
    needAuth: "يرجى التسجيل أولًا.",
    categories: "تصنيفاتنا",
    orderNow: "اطلب الآن",
    postAd: "أنشئ إعلانًا",
  },
  de: {
    brand: "Ureten Eller",
    heroTitle: "Willkommen bei Ureten Eller",
    motto: [
      "Unser Ziel: Haushaltsbudgets von Frauen stärken.",
      "Unser Ziel: Günstigen Zugang für Kund:innen ermöglichen.",
      "Unser Ziel: Frauenarbeit sichtbar und lohnend machen.",
      "Unser Ziel: Qualität zum fairen Preis liefern.",
    ],
    sellerPortal: "Portal für Anbieterinnen",
    customerPortal: "Kundenportal",
    needAuth: "Bitte zuerst registrieren.",
    categories: "Unsere Kategorien",
    orderNow: "Jetzt bestellen",
    postAd: "Anzeige erstellen",
  },
};

const LOCALE_LABEL = { tr: "Türkçe", en: "English", ar: "العربية", de: "Deutsch" };

/** Kategoriler (4 dil) */
const CATS = {
  tr: [
    { icon:"🍲", title:"Yemekler", subs:["Ev yemekleri","Börek-çörek","Çorba","Zeytinyağlı","Pilav-makarna","Et-tavuk","Kahvaltılık","Meze","Dondurulmuş","Çocuk öğünleri","Diyet/vegan/gf"] },
    { icon:"🎂", title:"Pasta & Tatlı", subs:["Yaş pasta","Kek-cupcake","Kurabiye","Şerbetli","Sütlü","Cheesecake","Diyet tatlı","Çikolata/şekerleme","Doğum günü setleri"] },
    { icon:"🫙", title:"Reçel • Turşu • Sos", subs:["Reçel-marmelat","Pekmez","Turşu","Domates/biber sos","Acı sos","Salça","Sirke","Konserve"] },
    { icon:"🌾", title:"Yöresel / Kışlık", subs:["Erişte","Tarhana","Yufka","Mantı","Kurutulmuş sebze-meyve","Salça","Sirke","Konserve"] },
    { icon:"🥗", title:"Diyet / Vegan / Glutensiz", subs:["Fit tabaklar","Vegan yemekler","GF unlu mamuller","Şekersiz tatlı","Keto ürün","Protein atıştırmalık"] },
    { icon:"💍", title:"Takı", subs:["Bileklik","Kolye","Küpe","Yüzük","Halhal","Broş","Setler","İsimli/kişiye özel","Makrome","Doğal taş","Reçine","Tel sarma"] },
    { icon:"👶", title:"Bebek & Çocuk", subs:["Hayvan/bebek figürleri","Çıngırak","Diş kaşıyıcı örgü","Bez oyuncak/kitap","Montessori oyuncak","Setler","Örgü patik-bere","Bebek battaniyesi","Önlük-ağız bezi","Lohusa seti","Saç aksesuarı","El emeği kıyafet"] },
    { icon:"🧶", title:"Örgü / Triko", subs:["Hırka","Kazak","Atkı-bere","Panço","Şal","Çorap","Bebek takımı","Yelek","Kırlent-örtü"] },
    { icon:"✂️", title:"Dikiş / Terzilik", subs:["Paça/onarım","Fermuar değişimi","Perde dikişi","Nevresim-yastık","Masa örtüsü","Özel dikim","Kostüm"] },
    { icon:"🧵", title:"Makrome & Dekor", subs:["Duvar süsü","Saksı askısı","Anahtarlık","Avize","Amerikan servis/runner","Sepet","Raf/duvar dekoru"] },
    { icon:"🏠", title:"Ev Dekor & Aksesuar", subs:["Keçe işleri","Kırlent","Kapı süsü","Tepsi süsleme","Çerçeve","Rüya kapanı","Tablo"] },
    { icon:"🕯️", title:"Mum & Kokulu Ürünler", subs:["Soya/balmumu mum","Kokulu taş","Oda spreyi","Tütsü","Jel mum","Hediye seti"] },
    { icon:"🧼", title:"Doğal Sabun & Kozmetik", subs:["Zeytinyağlı sabun","Bitkisel sabunlar","Katı şampuan","Dudak balmı","Krem/merhem","Banyo tuzu","Lavanta kesesi"] },
    { icon:"🧸", title:"Amigurumi & Oyuncak (dekoratif)", subs:["Anahtarlık","Magnet","Koleksiyon figürü","Dekor bebek/karakter","İsimli amigurumi"] },
  ],
  en: [
    { icon:"🍲", title:"Meals", subs:["Home meals","Savory bakes","Soup","Olive oil dishes","Rice-pasta","Meat-chicken","Breakfast","Meze","Frozen","Kids meals","Diet/vegan/gf"] },
    { icon:"🎂", title:"Cakes & Sweets", subs:["Layer cake","Cupcake","Cookies","Syrupy","Milk desserts","Cheesecake","Diet sweets","Chocolate/candy","Birthday sets"] },
    { icon:"🫙", title:"Jam • Pickle • Sauce", subs:["Jam-marmalade","Molasses","Pickles","Tomato/pepper sauce","Hot sauce","Paste","Vinegar","Canned"] },
    { icon:"🌾", title:"Regional / Winter Prep", subs:["Noodles","Tarhana","Yufka","Manti","Dried veg/fruit","Paste","Vinegar","Canned"] },
    { icon:"🥗", title:"Diet / Vegan / Gluten-free", subs:["Fit bowls","Vegan meals","GF bakery","Sugar-free desserts","Keto items","Protein snacks"] },
    { icon:"💍", title:"Jewelry", subs:["Bracelet","Necklace","Earrings","Ring","Anklet","Brooch","Sets","Personalized","Macrame","Gemstones","Resin","Wire wrap"] },
    { icon:"👶", title:"Baby & Kids", subs:["Animal/baby figures","Rattle","Knit teether","Cloth toy/book","Montessori toy","Sets","Knit booties-hats","Baby blanket","Bib/burp cloth","Maternity set","Hair accessory","Handmade wear"] },
    { icon:"🧶", title:"Knitwear", subs:["Cardigan","Sweater","Scarf-hat","Poncho","Shawl","Socks","Baby set","Vest","Pillow/cover"] },
    { icon:"✂️", title:"Sewing / Tailor", subs:["Hemming/repair","Zipper change","Curtains","Bedding","Tablecloth","Custom sew","Costume"] },
    { icon:"🧵", title:"Macrame & Decor", subs:["Wall hanging","Plant hanger","Keychain","Pendant lamp","Table runner","Basket","Shelf/decor"] },
    { icon:"🏠", title:"Home Decor & Accessories", subs:["Felt crafts","Pillow","Door wreath","Tray decor","Frame","Dreamcatcher","Painting"] },
    { icon:"🕯️", title:"Candles & Scents", subs:["Soy/beeswax candles","Aroma stone","Room spray","Incense","Gel candle","Gift sets"] },
    { icon:"🧼", title:"Natural Soap & Cosmetics", subs:["Olive oil soap","Herbal soaps","Solid shampoo","Lip balm","Cream/salve","Bath salt","Lavender sachet"] },
    { icon:"🧸", title:"Amigurumi & Toys (decor)", subs:["Keychain","Magnet","Collectible figure","Decor doll/character","Named amigurumi"] },
  ],
  ar: [
    { icon:"🍲", title:"وجبات", subs:["بيتي","معجنات مالحة","شوربة","أكلات زيت الزيتون","أرز-معكرونة","لحم-دجاج","فطور","مقبلات","مجمدة","وجبات أطفال","نباتي/خالي جلوتين"] },
    { icon:"🎂", title:"كعك وحلويات", subs:["كيك طبقات","كب كيك","بسكويت","شرباتية","ألبان","تشيز كيك","دايت","شوكولاتة/حلوى","طقم عيد ميلاد"] },
    { icon:"🫙", title:"مربى • مخلل • صوص", subs:["مربى","دبس","مخللات","صلصة طماطم/فلفل","حار","معجون","خل","معلبات"] },
    { icon:"🌾", title:"مأكولات تراثية/تحضيرات الشتاء", subs:["مكرونة بيتية","طرحنة","يوفكا","مانطي","مجففات","معجون","خل","معلبات"] },
    { icon:"🥗", title:"حمية/نباتي/خالي جلوتين", subs:["أطباق صحية","نباتي","مخبوزات GF","حلويات بدون سكر","كيتو","سناك بروتين"] },
    { icon:"💍", title:"إكسسوارات", subs:["أساور","قلائد","أقراط","خواتم","خلخال","بروش","طقم","مخصص بالاسم","ماكرامه","أحجار","ريزن","سلك"] },
    { icon:"👶", title:"رضّع وأطفال", subs:["مجسّمات حيوانات/رضع","خشخيشة","عضّاضة تريكو","لعبة/كتاب قماشي","مونتيسوري","أطقم","حذاء/قبعة تريكو","بطانية","مريلة","طقم نفاس","اكسسوار شعر","ملابس يدوية"] },
    { icon:"🧶", title:"تريكو", subs:["جاكيت","بلوز","وشاح/قبعة","بونشو","شال","جوارب","طقم أطفال","صديري","وسادة/غطاء"] },
    { icon:"✂️", title:"خياطة/تفصيل", subs:["تقصير/تصليح","تغيير سحاب","ستائر","مفارش سرير","مفرش طاولة","تفصيل خاص","بدلات"] },
    { icon:"🧵", title:"ماكرامه وديكور", subs:["تعليقة حائط","حامل نبات","ميدالية","إضاءة معلّقة","مفرش","سلة","رف/ديكور"] },
    { icon:"🏠", title:"ديكور المنزل", subs:["أعمال فيلت","وسادة","زينة باب","صينية مزينة","إطار","صائد أحلام","لوحة"] },
    { icon:"🕯️", title:"شموع وروائح", subs:["شموع صويا/نحل","حجر عطري","معطر غرف","بخور","شمعة جل","أطقم هدايا"] },
    { icon:"🧼", title:"صابون طبيعي وتجميلي", subs:["صابون زيت زيتون","أعشاب","شامبو صلب","بلسم شفاه","كريم/مرهم","ملح حمام","أكياس لافندر"] },
    { icon:"🧸", title:"أميجورومي وألعاب (ديكور)", subs:["ميدالية","مغناطيس","فيجور تجميعي","دمية ديكور","أميجورومي باسم"] },
  ],
  de: [
    { icon:"🍲", title:"Speisen", subs:["Hausmannskost","Herzhafte Backwaren","Suppe","Olivenölgerichte","Reis-Pasta","Fleisch-Hähnchen","Frühstück","Meze","Tiefgekühlt","Kindermahlzeiten","Diät/Vegan/GF"] },
    { icon:"🎂", title:"Torten & Süßes", subs:["Sahnetorte","Cupcake","Kekse","Sirupgebäck","Milchdesserts","Käsekuchen","Diät Desserts","Schoko/Bonbon","Geburtstags-Sets"] },
    { icon:"🫙", title:"Marmelade • Pickles • Soßen", subs:["Marmelade","Melasse","Eingelegtes","Tomaten-/Pfeffersoße","Scharfsoße","Paste","Essig","Eingewecktes"] },
    { icon:"🌾", title:"Regional / Wintervorrat", subs:["Nudeln hausgemacht","Tarhana","Yufka","Manti","Getrocknetes","Paste","Essig","Vorrat"] },
    { icon:"🥗", title:"Diät / Vegan / Glutenfrei", subs:["Fit Bowls","Vegane Speisen","GF Bäckerei","Zuckerfrei","Keto","Protein-Snacks"] },
    { icon:"💍", title:"Schmuck", subs:["Armband","Kette","Ohrringe","Ring","Fußkettchen","Brosche","Sets","Personalisierte","Makramee","Edelsteine","Harz","Draht"] },
    { icon:"👶", title:"Baby & Kinder", subs:["Tier/Baby-Figuren","Rassel","Beißring Strick","Stoffspielzeug/-buch","Montessori","Sets","Strick-Schühchen/Mützen","Babydecke","Lätzchen","Wochenbett-Set","Haar-Accessoire","Handgemachte Kleidung"] },
    { icon:"🧶", title:"Strickwaren", subs:["Cardigan","Pullover","Schal-Mütze","Poncho","Tuch","Socken","Baby-Set","Weste","Kissen/Decke"] },
    { icon:"✂️", title:"Nähen / Schneiderei", subs:["Saum/Reparatur","Reißverschluss","Gardinen","Bettwäsche","Tischdecke","Maßanfertigung","Kostüm"] },
    { icon:"🧵", title:"Makramee & Deko", subs:["Wandbehang","Pflanzenhänger","Schlüsselanh.","Pendelleuchte","Tischläufer","Korb","Regal/Deko"] },
    { icon:"🏠", title:"Wohndeko & Accessoires", subs:["Filzarbeiten","Kissen","Türkranz","Tablettdeko","Rahmen","Traumfänger","Bild"] },
    { icon:"🕯️", title:"Kerzen & Düfte", subs:["Soja/Bienenwachs","Duftstein","Raumspray","Weihrauch","Gelkerze","Geschenksets"] },
    { icon:"🧼", title:"Naturseife & Kosmetik", subs:["Olivenölseife","Kräuterseifen","Festes Shampoo","Lippenbalsam","Creme/Salbe","Badesalz","Lavendelsäckchen"] },
    { icon:"🧸", title:"Amigurumi & Spielzeug (Deko)", subs:["Schlüsselanh.","Magnet","Sammelfigur","Deko-Puppe","Amigurumi mit Name"] },
  ],
};

/** ---- Dil seçimi (kalıcı) ---- */
function useLang() {
  const [lang, setLang] = useState("tr");
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved && SUPPORTED.includes(saved)) setLang(saved);
  }, []);
  useEffect(() => { localStorage.setItem("lang", lang); }, [lang]);
  const t = useMemo(() => STR[lang] || STR.tr, [lang]);
  return { lang, setLang, t };
}

/** ---- Sayfa ---- */
export default function Home() {
  const { lang, setLang, t } = useLang();
  const [i, setI] = useState(0);

  // Dönen motto
  useEffect(() => {
    const id = setInterval(() => setI(x => (x + 1) % t.motto.length), 2800);
    return () => clearInterval(id);
  }, [t.motto]);

  const go = (href) => { window.location.href = href; };
  const needAuth = (role) => {
    alert(t.needAuth);
    window.location.href = `/login?role=${role}`;
  };

  const cats = CATS[lang] || CATS.tr;

  return (
    <main className="wrap">
      {/* Global Dil Dropdown (her sayfada görünmesi için basit, sabit konum) */}
      <div className="langbox">
        <select
          aria-label="Language"
          value={lang}
          onChange={(e)=>setLang(e.target.value)}
        >
          {SUPPORTED.map(k => <option key={k} value={k}>{LOCALE_LABEL[k]}</option>)}
        </select>
      </div>

      <section className="hero">
        <img src="/assets/images/logo.png" alt={t.brand} width="96" height="96" className="logo"/>
        <h1>{t.brand}</h1>
        <h2>{t.heroTitle}</h2>
        <p key={i} className="lead fade">{t.motto[i]}</p>

        <div className="ctaRow">
          <SignedOut>
            <button className="btnPrimary" onClick={()=>needAuth("seller")}>{t.sellerPortal}</button>
            <button className="btnGhost"   onClick={()=>needAuth("customer")}>{t.customerPortal}</button>
          </SignedOut>
          <SignedIn>
            <button className="btnPrimary" onClick={()=>go("/portal/seller")}>{t.sellerPortal}</button>
            <button className="btnGhost"   onClick={()=>go("/portal/customer")}>{t.customerPortal}</button>
          </SignedIn>
        </div>
      </section>

      <section className="cats">
        <h3>{t.categories}</h3>
        <div className="grid">
          {cats.map((c, idx)=>(
            <article key={idx} className="card hue" style={{"--i": idx}}>
              <div className="cardHead">
                <span className="icon" aria-hidden>{c.icon}</span>
                <h4>{c.title}</h4>
              </div>

              {/* Daha toplu görünüm: 3 sütun chip grid */}
              <div className="subsGrid">
                {c.subs.map((s, k)=>(
                  <span key={k} className="chip">{s}</span>
                ))}
              </div>

              <div className="actions">
                <SignedOut>
                  <button className="mini dark"  onClick={()=>needAuth("customer")}>{t.orderNow}</button>
                  <button className="mini ghost" onClick={()=>needAuth("seller")}>{t.postAd}</button>
                </SignedOut>
                <SignedIn>
                  <button className="mini dark"  onClick={()=>go("/portal/customer")}>{t.orderNow}</button>
                  <button className="mini ghost" onClick={()=>go("/portal/seller")}>{t.postAd}</button>
                </SignedIn>
              </div>
            </article>
          ))}
        </div>
      </section>

      <style jsx global>{`
        :root{
          --ink:#0f172a; --muted:#475569;
          --paperA: rgba(255,255,255,.86);
          --lineA: rgba(255,255,255,.45);
          --c1:#ff80ab; --c2:#a78bfa; --c3:#60a5fa; --c4:#34d399;
        }
        html,body{height:100%}
        body{
          margin:0; color:var(--ink);
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif;
          background:
            radial-gradient(1200px 800px at -10% -10%, rgba(255,255,255,.35), transparent 60%),
            linear-gradient(120deg, var(--c1), var(--c2), var(--c3), var(--c4));
          background-size: 320% 320%;
          animation: drift 16s ease-in-out infinite;
        }
        @keyframes drift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

        .wrap{maxWidth:1120px; max-width:1120px; margin:0 auto; padding:32px 20px;}

        .langbox{
          position:fixed; top:12px; right:12px; z-index:50;
          background:rgba(255,255,255,.9); border:1px solid #e5e7eb; border-radius:12px; padding:6px 10px; backdrop-filter:blur(8px);
        }
        .langbox select{ border:none; background:transparent; font-weight:600; cursor:pointer; }

        .hero{display:grid; place-items:center; text-align:center; gap:10px; padding:72px 0 34px;}
        .logo{filter: drop-shadow(0 10px 24px rgba(0,0,0,.18)); border-radius:20px}
        h1{margin:8px 0 0; font-size:48px; letter-spacing:.3px}
        h2{margin:2px 0 6px; font-size:24px; color:#1f2937}
        .lead{max-width:820px; color:var(--muted); margin:0 auto 18px; font-size:17px}
        .fade{animation:fade 400ms ease}
        @keyframes fade{from{opacity:0; transform:translateY(4px)} to{opacity:1; transform:none}}

        .ctaRow{display:flex; gap:12px; flex-wrap:wrap; justify-content:center; margin-top:8px}
        .btnPrimary{
          padding:12px 18px; border-radius:999px; border:none; cursor:pointer;
          background:#111827; color:#fff; font-weight:600; box-shadow:0 8px 24px rgba(0,0,0,.15);
        }
        .btnGhost{
          padding:12px 18px; border-radius:999px; cursor:pointer; font-weight:600;
          background:var(--paperA); border:1px solid var(--lineA); color:#111827; backdrop-filter: blur(8px);
        }

        .cats h3{font-size:22px; margin:30px 0 14px; text-align:center;}
        .grid{
          display:grid; gap:16px;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }
        .card{
          border-radius: 18px; padding:16px;
          background: var(--paperA); border: 1px solid var(--lineA); 
          backdrop-filter: blur(8px);
          box-shadow: 0 12px 28px rgba(0,0,0,.08);
          transition: transform .2s ease, box-shadow .2s ease, filter .5s linear;
        }
        .card:hover{ transform: translateY(-4px); box-shadow:0 16px 36px rgba(0,0,0,.12); }

        /* Dinamik renk: her karta farklı hue + akış animasyonu */
        .hue{ animation: hue 12s linear infinite; }
        @keyframes hue{ from{ filter:hue-rotate(calc(var(--i)*12deg)); } to{ filter:hue-rotate(calc(var(--i)*12deg + 360deg)); } }

        .cardHead{display:flex; align-items:center; gap:10px; margin-bottom:8px}
        .icon{font-size:22px}
        h4{margin:0; font-size:18px}

        /* Daha toplu: 3 sütun chip grid, düzenli yığın */
        .subsGrid{
          display:grid; gap:8px; grid-template-columns: repeat(3, minmax(0,1fr));
        }
        .chip{
          display:block; text-align:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
          padding:8px 10px; border-radius:12px; font-size:12px;
          background: rgba(255,255,255,.92); border:1px solid #e5e7eb;
        }

        .actions{display:flex; gap:8px; justify-content:center; margin-top:12px}
        .mini{
          padding:9px 12px; border-radius:10px; border:1px solid #e5e7eb; background:#fff; cursor:pointer; font-weight:600;
        }
        .mini.dark{ background:#111827; color:#fff; border-color:#111827; }
        .mini.ghost{ background:#fff; color:#111827; }
      `}</style>
    </main>
  );
}
