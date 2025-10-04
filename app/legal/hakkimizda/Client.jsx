"use client";
import { useEffect, useState, useMemo } from "react";

/** Dil tespiti: localStorage.lang → tr | en | ar | de  */
function useLang() {
  const [lang, setLang] = useState("tr");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const s = localStorage.getItem("lang");
      if (s && ["tr", "en", "ar", "de"].includes(s)) setLang(s);
    }
  }, []);
  return lang;
}

/** 4 dil tam metin */
const TEXTS = {
  tr: {
    title: "Hakkımızda",
    intro:
      "Üreten Eller; yerel üreticileri ve evde üretenleri alıcılarla buluşturan, güvenli ve şeffaf bir aracı hizmet sağlayıcı platformdur.",
    legalTitle: "Hukuki Bilgiler",
    unvan: "Unvan: Üreten Eller (Şahıs İşletmesi)",
    vergi: "Vergi Dairesi / No: Silivri Vergi Dairesi — 9530226667",
    adres:
      "Adres: Gümüşyaka Mahallesi, Rahmi Sokak, No:27A, Silivri / İstanbul",
    iletisim:
      "İletişim: WhatsApp +90 505 727 91 43 • E-posta: destek@ureten-eller.com",
    offerTitle: "Ne Sunuyoruz?",
    offer: [
      "Ücretsiz ilan, premium vitrin/mağaza ve reklam çözümleri",
      "Güvenli ödeme (escrow): ödeme teslim onayına kadar blokede tutulur",
      "14 gün cayma hakkı ve mevzuata uygun iade süreçleri için şablonlar",
      "Dolandırıcılığa karşı doğrulama, kayıt ve risk kontrolleri",
    ],
    modelTitle: "Aracı Model ve Sorumluluk",
    model:
      "Satış sözleşmesi doğrudan alıcı ile satıcı arasında kurulur. Üreten Eller, 6563 sayılı Kanun kapsamında aracı hizmet sağlayıcıdır; ürünün ayıplı çıkması, teslimat ve iade süreçlerinden doğrudan sorumlu değildir. Uyuşmazlıklarda destek sağlar, güvenli ödeme akışını yönetir.",
    monetTitle: "Gelir Modeli",
    monet:
      "Platform, ürün satışından komisyon almaz. Gelir; premium üyelik, vitrin/doping ve reklam hizmetlerinden elde edilir.",
    bansTitle: "Yasaklı Kategoriler (Örnek)",
    bans:
      "Alkol, tütün, cinsel içerikli ürünler, canlı hayvan, yasa dışı/sağlığa zararlı maddeler, fikri-mülkiyet ihlalli ve mevzuata aykırı ürünler kesinlikle yasaktır.",
    sustainTitle: "Sürdürülebilirlik",
    sustain:
      "Atığı azaltan, yerel üretimi ve kadın emeğini görünür kılan; adil fiyat, güvenli ticaret ve topluluk ilkeleri ile hareket ederiz.",
    quick: "Hızlı Geçiş",
    brand: "Üreten Eller",
  },
  en: {
    title: "About Us",
    intro:
      "Ureten Eller is a marketplace that connects local makers with buyers, operating as a secure and transparent intermediary service provider.",
    legalTitle: "Legal Information",
    unvan: "Trade name: Ureten Eller (Sole Proprietorship)",
    vergi: "Tax Office / No: Silivri Tax Office — 9530226667",
    adres:
      "Address: Gumusyaka Neighborhood, Rahmi Street, No:27A, Silivri / Istanbul",
    iletisim:
      "Contact: WhatsApp +90 505 727 91 43 • Email: destek@ureten-eller.com",
    offerTitle: "What We Offer",
    offer: [
      "Free listings, premium showcase/store and advertising options",
      "Secure escrow payments: funds are held until delivery is confirmed",
      "14-day right of withdrawal and compliant return templates",
      "Anti-fraud verifications, logging and risk controls",
    ],
    modelTitle: "Intermediary Model & Responsibility",
    model:
      "The sales contract is concluded directly between buyer and seller. Ureten Eller is an intermediary under Law No. 6563; it is not directly liable for product defects, delivery or returns. We facilitate dispute support and manage secure payment flow.",
    monetTitle: "Monetization",
    monet:
      "We do not take sales commission. Revenue comes from premium memberships, showcase/boosting and ads.",
    bansTitle: "Prohibited Categories (Examples)",
    bans:
      "Alcohol, tobacco, adult content, live animals, illegal/harmful substances, IP-infringing and unlawful items are strictly prohibited.",
    sustainTitle: "Sustainability",
    sustain:
      "We reduce waste and highlight local & women’s labor with fair pricing, secure trade and community guidelines.",
    quick: "Quick Links",
    brand: "Ureten Eller",
  },
  ar: {
    title: "من نحن",
    intro:
      "«أُنتِج بالأيادي» سوق يربط المُنتِجات المحليات بالمشترين، ويعمل كمزوّد خدمة وسيط آمن وشفاف.",
    legalTitle: "معلومات قانونية",
    unvan: "الاسم التجاري: أُنتِج بالأيادي (منشأة فردية)",
    vergi: "دائرة الضرائب / الرقم: سيلفري — 9530226667",
    adres:
      "العنوان: حي غوموشياكا، شارع رحمي، رقم 27A، سيلفري / إسطنبول",
    iletisim:
      "اتصال: واتساب ‎+90 505 727 91 43 • بريد: destek@ureten-eller.com",
    offerTitle: "ماذا نقدّم",
    offer: [
      "إعلانات مجانية، واجهات مميّزة/متجر وخيارات إعلانية",
      "دفع آمن (حجز المبلغ حتى تأكيد الاستلام)",
      "حق الانسحاب خلال 14 يومًا وقوالب مرتجعات متوافقة",
      "تحقق ضد الاحتيال، سجلات ومراقبة مخاطر",
    ],
    modelTitle: "نموذج الوساطة والمسؤولية",
    model:
      "العقد بين البائع والمشتري مباشرة. «أُنتِج بالأيادي» وسيط بموجب القانون 6563؛ غير مسؤول مباشرة عن العيوب أو التسليم أو الإرجاع. نسهّل حل النزاعات وندير التدفق الآمن للدفع.",
    monetTitle: "آلية الدخل",
    monet:
      "لا نأخذ عمولة من المبيعات. الدخل من العضويات المميزة، الواجهة/الترويج والإعلانات.",
    bansTitle: "فئات محظورة (أمثلة)",
    bans:
      "الكحول، التبغ، المحتوى الجنسي، الحيوانات الحية، المواد غير القانونية/الضارة، وانتهاكات الملكية الفكرية ممنوعة قطعًا.",
    sustainTitle: "الاستدامة",
    sustain:
      "نقلّل النفايات ونبرز عمل المرأة والإنتاج المحلي بأسعار عادلة وتجارة آمنة وإرشادات مجتمعية.",
    quick: "روابط سريعة",
    brand: "Üreten Eller",
  },
  de: {
    title: "Über uns",
    intro:
      "Ureten Eller ist ein Marktplatz, der lokale Produzentinnen mit Käufern verbindet und als sicherer, transparenter Vermittler agiert.",
    legalTitle: "Rechtliche Informationen",
    unvan: "Firmenname: Ureten Eller (Einzelunternehmen)",
    vergi: "Finanzamt / Nr.: Silivri — 9530226667",
    adres:
      "Adresse: Viertel Gumusyaka, Rahmi-Straße 27A, Silivri / Istanbul",
    iletisim:
      "Kontakt: WhatsApp +90 505 727 91 43 • E-Mail: destek@ureten-eller.com",
    offerTitle: "Unser Angebot",
    offer: [
      "Kostenlose Anzeigen, Premium-Schaufenster/Shop und Werbung",
      "Sichere Treuhandzahlung: Auszahlung erst nach Lieferbestätigung",
      "14-tägiges Widerrufsrecht und konforme Retourenvorlagen",
      "Betrugsprävention, Protokollierung und Risikokontrollen",
    ],
    modelTitle: "Vermittlermodell & Haftung",
    model:
      "Der Kaufvertrag kommt direkt zwischen Käufer und Verkäufer zustande. Ureten Eller ist Vermittler gem. Gesetz Nr. 6563; keine direkte Haftung für Mängel, Lieferung oder Rückgaben. Wir unterstützen bei Streitfällen und steuern den sicheren Zahlungsfluss.",
    monetTitle: "Monetarisierung",
    monet:
      "Keine Verkaufsprovision. Einnahmen aus Premium-Mitgliedschaften, Schaufenster/Boosting und Werbung.",
    bansTitle: "Verbotene Kategorien (Beispiele)",
    bans:
      "Alkohol, Tabak, Erwachsenenartikel, lebende Tiere, illegale/gefährliche Stoffe sowie IP-verletzende Waren sind strikt untersagt.",
    sustainTitle: "Nachhaltigkeit",
    sustain:
      "Wir reduzieren Abfall und stärken lokale & Frauenarbeit – mit fairen Preisen, sicherem Handel und Community-Regeln.",
    quick: "Schnellzugriff",
    brand: "Ureten Eller",
  },
};

export const metadata = { title: "Hakkımızda • Üreten Eller" };

export default function AboutPage() {
  const lang = useLang();
  const t = useMemo(() => TEXTS[lang] || TEXTS.tr, [lang]);

  return (
    <div className="page">
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

          <h2>{t.legalTitle}</h2>
          <ul>
            <li>{t.unvan}</li>
            <li>{t.vergi}</li>
            <li>{t.adres}</li>
            <li>{t.iletisim}</li>
          </ul>

          <h2>{t.offerTitle}</h2>
          <ul>{t.offer.map((x, i) => <li key={i}>{x}</li>)}</ul>

          <h2>{t.modelTitle}</h2>
          <p>{t.model}</p>

          <h2>{t.monetTitle}</h2>
          <p>{t.monet}</p>

          <h2>{t.bansTitle}</h2>
          <p>{t.bans}</p>

          <h2>{t.sustainTitle}</h2>
          <p>{t.sustain}</p>

          <hr />
          <p className="quick">
            <strong>{t.quick}:</strong>{" "}
            <a href="/legal/iletisim">İletişim</a> •{" "}
            <a href="/legal/gizlilik">Gizlilik</a> •{" "}
            <a href="/legal/kullanim-sartlari">Kullanım Şartları</a>
          </p>
        </article>
      </main>

      {/* Siyah mega-footer */}
      <footer className="footer">
        <div className="wrap grid">
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
            <a href="/legal/gizlilik#cerez">Çerez Yönetimi</a>
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
        .btn:hover{border-color:var(--focus)}
        .page{background:var(--bg);min-height:100vh;color:var(--ink)}
        .paper{background:var(--paper);border:1px solid var(--line);border-radius:14px;margin:18px 0;padding:18px}
        .paper h1{margin:.1em 0 .4em}
        .paper h2{margin:1.2em 0 .5em}
        .paper p,.paper li{line-height:1.7}
        .quick a{color:#0ea5e9;text-decoration:none}
        .footer{background:var(--footer);color:#e5e7eb;margin-top:32px}
        .grid{display:grid;gap:24px;padding:28px 0;grid-template-columns:repeat(3,1fr)}
        .footer h4{margin:0 0 8px 0;color:#fff}
        .footer a{display:block;color:#d1d5db;text-decoration:none;margin:6px 0}
        .footer a:hover{color:#fff}
        .copy{border-top:1px solid #232329;padding:12px 0;text-align:center}
        @media (max-width:900px){.grid{grid-template-columns:1fr 1fr}}
        @media (max-width:640px){.grid{grid-template-columns:1fr}}
      `}</style>
    </div>
  );
}
