"use client";
import { useEffect, useMemo, useState } from "react";

/** Dil tespiti: localStorage.lang → tr | en | ar | de */
function useLang() {
  const [lang, setLang] = useState("tr");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const s = localStorage.getItem("lang");
      if (s && ["tr","en","ar","de"].includes(s)) setLang(s);
    }
  }, []);
  return lang;
}

/** 4 dil — Çerez Politikası + Tercih Paneli */
const T = {
  tr: {
    brand: "Üreten Eller",
    title: "Çerez (Cookie) Politikası",
    intro:
      "Bu sayfa; sitemizde kullanılan çerez türleri, amaçları, saklama süreleri ve tercihlerinizi nasıl yönetebileceğinizi açıklar. Zorunlu çerezler haricindeki tüm çerezler için rızanız alınır ve dilediğiniz zaman değiştirebilirsiniz.",
    whatTitle: "Çerez Nedir?",
    what:
      "Çerezler; tarayıcınızda saklanan küçük metin dosyalarıdır. Oturumunuzu sürdürmek, tercihlerinizi hatırlamak, site performansını ölçmek ve (izin verirseniz) pazarlama kampanyaları yürütmek için kullanılır.",
    typesTitle: "Kullandığımız Çerez Kategorileri",
    cats: [
      { key:"necessary", name:"Zorunlu", desc:"Güvenlik, oturum açma, yük dengeleme, form koruması. Devre dışı bırakılamaz." },
      { key:"functional", name:"İşlevsel", desc:"Dil ve arayüz tercihleri, kullanıcı deneyimi ayarları." },
      { key:"analytics",  name:"Analitik",  desc:"Site kullanım istatistikleri, performans ölçümü (anonimleştirme uygulanabilir)." },
      { key:"marketing",  name:"Pazarlama", desc:"Kampanya/yeniden hedefleme çerezleri. Onayınız olmadan çalıştırılmaz." },
    ],
    legalTitle: "Hukuki Dayanak ve Rıza",
    legal:
      "KVKK ve ilgili e-gizlilik kurallarına göre; zorunlu çerezler meşru menfaat kapsamında, diğer kategoriler açık rızanıza dayanarak işlenir. Rızanızı istediğiniz zaman geri alabilirsiniz.",
    thirdTitle: "Üçüncü Taraflar (Örnek)",
    third:
      "Barındırma/BT sağlayıcıları, hata izleme/performans araçları, analitik ve (onaylıysa) pazarlama altyapıları. Somut sağlayıcı listeleri ve güncel sürüm bu sayfada yayımlanır.",
    keepTitle: "Saklama Süreleri (Örnek)",
    keep: [
      "Oturum çerezleri: tarayıcı kapanana kadar.",
      "Kalıcı çerezler: 1 günden 12 aya kadar (amaç ve araca göre).",
      "Tercih çerezi: 6 ay (rızanızı hatırlamak için).",
    ],
    manageTitle: "Çerez Tercihleri",
    note:
      "Aşağıdaki anahtarlarla tercihlerinizi belirleyebilirsiniz. Zorunlu çerezler güvenlik ve temel işlevler için gereklidir.",
    save: "Tercihleri Kaydet",
    saved: "Tercihler kaydedildi.",
    reset: "Varsayılanlara Dön",
    linksTitle: "Hızlı Geçiş",
    l1: "Gizlilik Politikası",
    l2: "Kullanım Şartları",
    l3: "KVKK Aydınlatma",
  },

  en: {
    brand: "Ureten Eller",
    title: "Cookie Policy",
    intro:
      "This page explains our cookie categories, purposes, retention and how you can manage your preferences. Except for strictly necessary cookies, we seek your consent and you may change it anytime.",
    whatTitle: "What Are Cookies?",
    what:
      "Cookies are small text files stored in your browser. We use them to keep you logged in, remember preferences, measure performance and—if you consent—run marketing campaigns.",
    typesTitle: "Cookie Categories We Use",
    cats: [
      { key:"necessary", name:"Strictly Necessary", desc:"Security, login, load balancing, form protection. Cannot be disabled." },
      { key:"functional", name:"Functional", desc:"Language and UI preferences, UX settings." },
      { key:"analytics",  name:"Analytics",  desc:"Usage statistics and performance (anonymization may apply)." },
      { key:"marketing",  name:"Marketing", desc:"Campaigns/retargeting. Never run without your consent." },
    ],
    legalTitle: "Legal Basis & Consent",
    legal:
      "Under KVKK and e-privacy rules: necessary cookies rely on legitimate interest; others rely on your explicit consent. You may withdraw at any time.",
    thirdTitle: "Third Parties (Examples)",
    third:
      "Hosting/IT providers, error/performance tooling, analytics and—if consented—marketing stacks. A concrete list and updates are published on this page.",
    keepTitle: "Retention (Examples)",
    keep: [
      "Session cookies: until browser close.",
      "Persistent cookies: 1 day to 12 months (depending on purpose/tool).",
      "Preference cookie: 6 months (to remember your choice).",
    ],
    manageTitle: "Cookie Preferences",
    note:
      "Use the toggles below to set your choices. Necessary cookies are required for security and core features.",
    save: "Save Preferences",
    saved: "Preferences saved.",
    reset: "Reset to Defaults",
    linksTitle: "Quick Links",
    l1: "Privacy Policy",
    l2: "Terms of Use",
    l3: "KVKK Notice",
  },

  ar: {
    brand: "أُنتِج بالأيادي",
    title: "سياسة ملفات الارتباط",
    intro:
      "توضح هذه الصفحة فئات الكوكيز وأغراضها وفترات الاحتفاظ وكيفية إدارة تفضيلاتك. باستثناء الضرورية للغاية، نطلب موافقتك ويمكنك تعديلها في أي وقت.",
    whatTitle: "ما هي ملفات الارتباط؟",
    what:
      "هي ملفات نصية صغيرة في المتصفح. نستخدمها لتسجيل الدخول، تذكّر التفضيلات، قياس الأداء، ومع التسويق (بموافقتك).",
    typesTitle: "الفئات المستخدمة",
    cats: [
      { key:"necessary", name:"ضرورية للغاية", desc:"الأمان، تسجيل الدخول، موازنة التحميل، حماية النماذج. لا يمكن تعطيلها." },
      { key:"functional", name:"وظيفية", desc:"اللغة وتفضيلات الواجهة." },
      { key:"analytics",  name:"تحليلية",  desc:"إحصاءات الاستخدام والأداء (قد نطبّق إخفاء الهوية)." },
      { key:"marketing",  name:"تسويقية", desc:"حملات/إعادة الاستهداف. لا تعمل بدون موافقة." },
    ],
    legalTitle: "الأساس القانوني والموافقة",
    legal:
      "وفق KVKK وقواعد الخصوصية الإلكترونية: الضرورية على أساس المصلحة المشروعة؛ الباقي على موافقتك. يمكنك السحب في أي وقت.",
    thirdTitle: "جهات خارجية (أمثلة)",
    third:
      "الاستضافة/تقنية المعلومات، أدوات الأخطاء/الأداء، التحليلات، والتسويق (بالموافقة). تُنشر القائمة والتحديثات هنا.",
    keepTitle: "فترات الاحتفاظ (أمثلة)",
    keep: [
      "جلسة: حتى إغلاق المتصفح.",
      "دائمة: من يوم إلى 12 شهرًا.",
      "تفضيلات: 6 أشهر.",
    ],
    manageTitle: "تفضيلات ملفات الارتباط",
    note:
      "استخدم الأزرار أدناه لتحديد اختياراتك. الضرورية مطلوبة للأمان والوظائف الأساسية.",
    save: "حفظ التفضيلات",
    saved: "تم الحفظ.",
    reset: "الرجوع للوضع الافتراضي",
    linksTitle: "روابط سريعة",
    l1: "سياسة الخصوصية",
    l2: "شروط الاستخدام",
    l3: "إشعار KVKK",
  },

  de: {
    brand: "Ureten Eller",
    title: "Cookie-Richtlinie",
    intro:
      "Diese Seite erläutert Kategorien, Zwecke, Aufbewahrung und wie Sie Ihre Präferenzen verwalten. Außer unbedingt erforderlichen Cookies holen wir Ihre Einwilligung ein; Sie können diese jederzeit ändern.",
    whatTitle: "Was sind Cookies?",
    what:
      "Kleine Textdateien im Browser. Wir nutzen sie für Login, Präferenzen, Performance und—mit Einwilligung—Marketing.",
    typesTitle: "Von uns genutzte Kategorien",
    cats: [
      { key:"necessary", name:"Unbedingt erforderlich", desc:"Sicherheit, Login, Load-Balancing, Formularschutz. Nicht deaktivierbar." },
      { key:"functional", name:"Funktional", desc:"Sprache und UI-Präferenzen." },
      { key:"analytics",  name:"Analyse",  desc:"Nutzungsstatistiken und Performance (ggf. Anonymisierung)." },
      { key:"marketing",  name:"Marketing", desc:"Kampagnen/Retargeting. Nur mit Einwilligung." },
    ],
    legalTitle: "Rechtsgrundlage & Einwilligung",
    legal:
      "Nach KVKK und E-Privacy: notwendig = berechtigtes Interesse; andere = Einwilligung. Widerruf jederzeit möglich.",
    thirdTitle: "Dritte (Beispiele)",
    third:
      "Hosting/IT, Fehler-/Performance-Tools, Analytics und—bei Einwilligung—Marketing. Eine Liste & Updates veröffentlicht diese Seite.",
    keepTitle: "Aufbewahrung (Beispiele)",
    keep: [
      "Sitzungscookies: bis Browser-Schließung.",
      "Persistente Cookies: 1 Tag bis 12 Monate.",
      "Präferenz-Cookie: 6 Monate.",
    ],
    manageTitle: "Cookie-Einstellungen",
    note:
      "Stellen Sie unten Ihre Auswahl ein. Erforderliche Cookies sind für Sicherheit/Kernfunktionen nötig.",
    save: "Einstellungen speichern",
    saved: "Einstellungen gespeichert.",
    reset: "Auf Standard zurücksetzen",
    linksTitle: "Schnellzugriff",
    l1: "Datenschutz",
    l2: "Nutzungsbedingungen",
    l3: "KVKK-Hinweis",
  },
};

export const metadata = { title: "Çerez Politikası • Üreten Eller" };

export default function CookiePolicyPage() {
  const lang = useLang();
  const t = useMemo(()=> T[lang] || T.tr, [lang]);
  const dir = lang === "ar" ? "rtl" : "ltr";

  // tercih paneli
  const [prefs, setPrefs] = useState({ necessary:true, functional:false, analytics:false, marketing:false });
  const [msg, setMsg] = useState("");

  useEffect(()=>{
    if (typeof window === "undefined") return;
    try{
      const saved = JSON.parse(localStorage.getItem("cookie_prefs")||"{}");
      if (saved && typeof saved === "object") {
        setPrefs({
          necessary:true,
          functional: !!saved.functional,
          analytics: !!saved.analytics,
          marketing: !!saved.marketing
        });
      }
    }catch{}
  },[]);

  function writeCookie(name, value, days=180){
    if (typeof document === "undefined") return;
    const maxAge = Math.max(1, days*24*60*60);
    document.cookie = `${name}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
  }

  function savePrefs(){
    if (typeof window === "undefined") return;
    const toSave = {
      functional: prefs.functional,
      analytics: prefs.analytics,
      marketing: prefs.marketing,
      ts: Date.now()
    };
    localStorage.setItem("cookie_prefs", JSON.stringify(toSave));
    // Basit bayrak çerezleri (3P script yüklerken siz kontrol edeceksiniz)
    writeCookie("cc_functional", prefs.functional ? "1":"0");
    writeCookie("cc_analytics",  prefs.analytics  ? "1":"0");
    writeCookie("cc_marketing",  prefs.marketing  ? "1":"0");
    setMsg(t.saved);
    setTimeout(()=>setMsg(""), 1500);
  }

  function resetPrefs(){
    setPrefs({ necessary:true, functional:false, analytics:false, marketing:false });
    if (typeof window !== "undefined") {
      localStorage.removeItem("cookie_prefs");
      writeCookie("cc_functional","0");
      writeCookie("cc_analytics","0");
      writeCookie("cc_marketing","0");
    }
  }

  return (
    <div className="page" dir={dir}>
      {/* Üst bar */}
      <header className="topbar">
        <div className="wrap">
          <a className="brand" href="/">{t.brand}</a>
          <nav><a className="btn" href="/logout">Çıkış</a></nav>
        </div>
      </header>

      {/* İçerik */}
      <main className="wrap">
        <article className="paper">
          <h1>{t.title}</h1>
          <p>{t.intro}</p>

          <h2>{t.whatTitle}</h2>
          <p>{t.what}</p>

          <h2>{t.typesTitle}</h2>
          <div className="catlist">
            {t.cats.map((c)=>(
              <div className="cat" key={c.key}>
                <div className="row">
                  <strong>{c.name}</strong>
                  {c.key==="necessary" ? (
                    <span className="chip lock">✓</span>
                  ):(
                    <button
                      className={prefs[c.key]?"toggle on":"toggle"}
                      onClick={()=> setPrefs(p=>({...p, [c.key]:!p[c.key]}))}
                      aria-pressed={prefs[c.key]}
                    >
                      <span className="knob"/>
                    </button>
                  )}
                </div>
                <p className="muted">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="actions">
            <button className="btn" onClick={resetPrefs}>{t.reset}</button>
            <button className="btn dark" onClick={savePrefs}>{t.save}</button>
            {msg && <span className="msg">{msg}</span>}
          </div>

          <h2>{t.legalTitle}</h2>
          <p>{t.legal}</p>

          <h2>{t.thirdTitle}</h2>
          <p>{t.third}</p>

          <h2>{t.keepTitle}</h2>
          <ul>
            {t.keep.map((x,i)=><li key={i}>{x}</li>)}
          </ul>

          <hr />
          <p className="quick">
            <strong>{t.linksTitle}:</strong>{" "}
            <a href="/legal/gizlilik">{t.l1}</a> •{" "}
            <a href="/legal/kullanim-sartlari">{t.l2}</a> •{" "}
            <a href="/legal/kvkk-aydinlatma">{t.l3}</a>
          </p>
        </article>
      </main>

      {/* Siyah mega-footer */}
      <footer className="footer">
        <div className="wrap gridf">
          <section>
            <h4>Kurumsal</h4>
            <a href="/legal/hakkimizda">Hakkımızda</a>
            <a href="/legal/iletisim">İletişim</a>
            <a href="/legal/gizlilik">Gizlilik</a>
            <a href="/legal/kvkk-aydinlatma">KVKK Aydınlatma</a>
          </section>
          <section>
            <h4>Gizlilik & Kullanım</h4>
            <a href="/legal/kullanim-sartlari">Kullanım Şartları</a>
            <a href="/legal/mesafeli-satis-sozlesmesi">Mesafeli Satış</a>
            <a href="/legal/teslimat-iade">Teslimat & İade</a>
            <a href="/legal/cerez-politikasi">Çerez Politikası</a>
          </section>
          <section>
            <h4>Yardım</h4>
            <a href="/legal/gizlilik#haklar">Kullanıcı Hakları</a>
            <a href="/legal/kullanim-sartlari#yasaklar">Yasaklı Ürünler</a>
            <a href="/legal/iletisim">Destek</a>
          </section>
        </div>
        <div className="wrap copy">© {new Date().getFullYear()} Üreten Eller</div>
      </footer>

      <style jsx>{`
        :root{
          --ink:#0f172a; --muted:#475569; --bg:#f8fafc;
          --paper:#ffffff; --line:#e5e7eb; --footer:#0b0b0f;
          --brand:#111827; --focus:#0ea5e9;
        }
        *{box-sizing:border-box}
        body{margin:0}
        .wrap{max-width:1100px;margin:0 auto;padding:0 16px}
        .topbar{position:sticky;top:0;z-index:30;background:#fff;border-bottom:1px solid var(--line)}
        .topbar .wrap{height:56px;display:flex;align-items:center;justify-content:space-between}
        .brand{font-weight:800;text-decoration:none;color:var(--brand)}
        .btn{display:inline-block;padding:8px 12px;border-radius:10px;border:1px solid var(--line);text-decoration:none;color:var(--brand)}
        .btn.dark{background:#111827;color:#fff;border-color:#111827}
        .btn:hover{border-color:var(--focus)}
        .page{background:var(--bg);min-height:100vh;color:var(--ink)}
        .paper{background:var(--paper);border:1px solid var(--line);border-radius:14px;margin:18px 0;padding:18px}
        .paper h1{margin:.1em 0 .4em}
        .paper h2{margin:1.2em 0 .5em}
        .paper p,.paper li{line-height:1.7}
        .muted{color:var(--muted)}
        .catlist{display:grid;gap:12px}
        .cat{border:1px solid var(--line);border-radius:12px;padding:12px;background:#fff}
        .row{display:flex;align-items:center;justify-content:space-between;gap:12px}
        .chip.lock{font-size:12px;padding:2px 8px;border-radius:999px;background:#e5e7eb;color:#111827}
        .toggle{width:52px;height:28px;border-radius:999px;border:1px solid var(--line);position:relative;background:#fff;cursor:pointer}
        .toggle .knob{position:absolute;top:2px;left:2px;width:22px;height:22px;border-radius:999px;background:#e5e7eb;transition:all .2s}
        .toggle.on{background:#111827;border-color:#111827}
        .toggle.on .knob{left:28px;background:#fff}
        .actions{display:flex;gap:10px;align-items:center;margin-top:10px}
        .msg{font-size:13px;background:#f1f5f9;border:1px solid var(--line);padding:6px 10px;border-radius:10px}
        .footer{background:var(--footer);color:#e5e7eb;margin-top:32px}
        .gridf{display:grid;gap:24px;padding:28px 0;grid-template-columns:repeat(3,1fr)}
        .footer h4{margin:0 0 8px 0;color:#fff}
        .footer a{display:block;color:#d1d5db;text-decoration:none;margin:6px 0}
        .footer a:hover{color:#fff}
        .copy{border-top:1px solid #232329;padding:12px 0;text-align:center}
        @media (max-width:900px){.gridf{grid-template-columns:1fr 1fr}}
        @media (max-width:640px){.gridf{grid-template-columns:1fr}}
      `}</style>
    </div>
  );
}
