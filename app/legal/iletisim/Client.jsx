"use client";
import { useEffect, useMemo, useState } from "react";

/** Dil tespiti: localStorage.lang → tr | en | ar | de */
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

const TEXTS = {
  tr: {
    brand: "Üreten Eller",
    title: "İletişim",
    intro:
      "Destek, bilgi talebi, şikâyet ve hukuki başvurularınız için aşağıdaki kanalları kullanabilirsiniz.",
    addressTitle: "Adres",
    address: "Gümüşyaka Mahallesi, Rahmi Sokak, No:27A, Silivri / İstanbul",
    taxTitle: "Vergi Bilgileri",
    tax: "Silivri Vergi Dairesi — VKN: 9530226667",
    contactTitle: "İrtibat",
    phone: "WhatsApp: +90 505 727 91 43",
    email: "E-posta: destek@ureten-eller.com",
    kep: "KEP: (varsa buraya yazılacaktır)",
    hoursTitle: "Çalışma Saatleri",
    hours: "Hafta içi 09:30–18:00 (resmî tatiller hariç).",
    slaTitle: "Dönüş Süreleri",
    sla:
      "Taleplere 24 saat içinde ön geri dönüş hedeflenir. Kritik güvenlik/ödeme talepleri önceliklidir.",
    complaintTitle: "Şikâyet / Uyuşmazlık",
    complaint:
      "Önce ilgili ilan/sipariş numarasını belirtiniz. Aracı hizmet sağlayıcı olarak kayıtları inceler, satıcı ile çözüm sürecini başlatırız. Tüketici uyuşmazlıklarında Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.",
    map: "Haritada Gör",
    quick: "Hızlı Geçiş",
  },
  en: {
    brand: "Ureten Eller",
    title: "Contact",
    intro:
      "For support, information requests, complaints and legal inquiries, use the channels below.",
    addressTitle: "Address",
    address: "Gumusyaka Neighborhood, Rahmi Street, No:27A, Silivri / Istanbul",
    taxTitle: "Tax",
    tax: "Silivri Tax Office — TIN: 9530226667",
    contactTitle: "Contact",
    phone: "WhatsApp: +90 505 727 91 43",
    email: "Email: destek@ureten-eller.com",
    kep: "KEP: (if applicable)",
    hoursTitle: "Working Hours",
    hours: "Weekdays 09:30–18:00 (excluding public holidays).",
    slaTitle: "Response Times",
    sla:
      "We aim to respond within 24 hours. Security/payment issues are prioritized.",
    complaintTitle: "Complaint / Dispute",
    complaint:
      "Please include the relevant listing/order number. As an intermediary, we review records and initiate resolution with the seller. Consumer Arbitration Committees and Consumer Courts are competent for disputes.",
    map: "View on Map",
    quick: "Quick Links",
  },
  ar: {
    brand: "أُنتِج بالأيادي",
    title: "اتصال",
    intro:
      "للدعم وطلبات المعلومات والشكاوى والأسئلة القانونية، استخدم القنوات التالية.",
    addressTitle: "العنوان",
    address: "حي غوموشياكا، شارع رحمي، رقم 27A، سيلفري / إسطنبول",
    taxTitle: "الضرائب",
    tax: "دائرة ضرائب سيلفري — رقم: 9530226667",
    contactTitle: "جهات الاتصال",
    phone: "واتساب: ‎+90 505 727 91 43",
    email: "بريد: destek@ureten-eller.com",
    kep: "KEP: (إن وُجد)",
    hoursTitle: "ساعات العمل",
    hours: "أيام الأسبوع 09:30–18:00 (باستثناء العطل الرسمية).",
    slaTitle: "أوقات الاستجابة",
    sla:
      "نسعى للرد خلال 24 ساعة. تُعطى قضايا الأمان/المدفوعات أولوية.",
    complaintTitle: "شكوى / نزاع",
    complaint:
      "الرجاء ذكر رقم الإعلان/الطلب. بصفتنا وسيطًا نراجع السجلات ونبدأ الحل مع البائع. الهيئات والمحاكم الاستهلاكية مختصة بالنزاعات.",
    map: "عرض على الخريطة",
    quick: "روابط سريعة",
  },
  de: {
    brand: "Ureten Eller",
    title: "Kontakt",
    intro:
      "Für Support, Informationsanfragen, Beschwerden und rechtliche Anliegen nutzen Sie bitte die folgenden Kanäle.",
    addressTitle: "Adresse",
    address: "Viertel Gumusyaka, Rahmi-Straße 27A, Silivri / Istanbul",
    taxTitle: "Steuer",
    tax: "Finanzamt Silivri — St-Nr.: 9530226667",
    contactTitle: "Kontakt",
    phone: "WhatsApp: +90 505 727 91 43",
    email: "E-Mail: destek@ureten-eller.com",
    kep: "KEP: (falls vorhanden)",
    hoursTitle: "Öffnungszeiten",
    hours: "Werktags 09:30–18:00 (außer an Feiertagen).",
    slaTitle: "Reaktionszeiten",
    sla:
      "Antwort in der Regel innerhalb von 24 Stunden. Sicherheits-/Zahlungsthemen haben Priorität.",
    complaintTitle: "Beschwerde / Streitfall",
    complaint:
      "Bitte geben Sie die Anzeige-/Bestellnummer an. Als Vermittler prüfen wir die Protokolle und starten die Klärung mit dem Verkäufer. Verbraucherschlichtungsstellen und Verbrauchgerichte sind zuständig.",
    map: "Auf Karte anzeigen",
    quick: "Schnellzugriff",
  },
};

export const metadata = { title: "İletişim • Üreten Eller" };

export default function ContactPage() {
  const lang = useLang();
  const t = useMemo(() => TEXTS[lang] || TEXTS.tr, [lang]);
  const dir = lang === "ar" ? "rtl" : "ltr";

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

          <div className="grid">
            <section>
              <h2>{t.addressTitle}</h2>
              <p>{t.address}</p>
              <p><a className="link" href="https://maps.google.com/?q=Gümüşyaka Mahallesi Rahmi Sokak No:27A Silivri İstanbul" target="_blank" rel="noreferrer">{t.map}</a></p>
            </section>

            <section>
              <h2>{t.taxTitle}</h2>
              <p>{t.tax}</p>
              <h2>{t.contactTitle}</h2>
              <ul className="list">
                <li>{t.phone}</li>
                <li>{t.email}</li>
                <li>{t.kep}</li>
              </ul>
            </section>

            <section>
              <h2>{t.hoursTitle}</h2>
              <p>{t.hours}</p>
              <h2>{t.slaTitle}</h2>
              <p>{t.sla}</p>
            </section>
          </div>

          <h2>{t.complaintTitle}</h2>
          <p>{t.complaint}</p>

          <hr />
          <p className="quick">
            <strong>{t.quick}:</strong>{" "}
            <a href="/legal/hakkimizda">Hakkımızda</a> •{" "}
            <a href="/legal/gizlilik">Gizlilik</a> •{" "}
            <a href="/legal/kullanim-sartlari">Kullanım Şartları</a>
          </p>
        </article>
      </main>


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
        .link{color:#0ea5e9;text-decoration:none}
        .grid{display:grid;gap:16px;grid-template-columns:repeat(3,1fr)}
        .list{margin:0;padding-left:18px}
        @media (max-width:900px){.grid{grid-template-columns:1fr 1fr}}
        @media (max-width:640px){.grid{grid-template-columns:1fr}}
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
