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

/** 4 dil metinleri */
const T = {
  tr: {
    brand: "Üreten Eller",
    title: "Gizlilik Politikası",
    intro:
      "Bu Gizlilik Politikası; 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca Üreten Eller’in kişisel verileri hangi amaçlarla işlediğini, kimlerle paylaştığını, ne kadar süre sakladığını ve haklarınızı açıklar.",
    controllerTitle: "Veri Sorumlusu",
    controller:
      "Üreten Eller (Şahıs İşletmesi). Silivri Vergi Dairesi / VKN: 9530226667. Adres: Gümüşyaka Mahallesi, Rahmi Sokak, No:27A, Silivri / İstanbul. İletişim: WhatsApp +90 505 727 91 43 • destek@ureten-eller.com",
    collectedTitle: "Toplanan Kişisel Veriler",
    collectedList: [
      "Hesap: ad-soyad, e-posta, telefon, adres bilgileriniz; kimlik doğrulama verileri.",
      "İşlem: ilan içerikleri, sipariş/ödeme (ödeme kuruluşu üzerinden), fatura verileri.",
      "Teknik: çerezler, oturum kimliği, IP, tarayıcı/cihaz bilgisi, kullanım analitiği.",
      "İletişim: destek talepleri, itiraz/şikâyet kayıtları, mesajlaşma logları.",
    ],
    purposeTitle: "İşleme Amaçları ve Hukuki Sebepler",
    purposeIntro:
      "Verileriniz aşağıdaki amaçlarla ve KVKK m.5/2 (a,c,ç,e,f) kapsamındaki hukuki sebeplere dayanarak işlenir; gerektiğinde açık rızanız alınır:",
    purposes: [
      "Hizmet sunumu: üyelik, ilan, güvenli ödeme (escrow), sipariş ve teslim süreçlerinin yürütülmesi.",
      "Dolandırıcılık ve kötüye kullanımın önlenmesi; güvenlik, denetim ve kayıt yönetimi.",
      "Mevzuattan kaynaklanan yükümlülükler: faturalama, saklama, resmi mercilere bilgi verme.",
      "İletişim ve müşteri memnuniyeti; pazarlama tercihlerinize uygun bilgilendirme.",
    ],
    shareTitle: "Aktarımlar (Alıcı Grupları)",
    share:
      "Ödeme işlemleri için lisanslı ödeme kuruluşlarına (PayTR, iyzico), barındırma/BT/analitik sağlayıcılarına, danışmanlarımız ve hukuken yetkili kamu kurumlarına aktarım yapılabilir. Yurt dışına aktarım, kullanılan altyapıya göre KVKK’daki istisnalar veya açık rıza kapsamında yürütülür.",
    cookiesTitle: "Çerezler ve Benzeri Teknolojiler",
    cookiesIntro:
      "Sitemizde aşağıdaki çerez türleri kullanılır. Tarayıcınızdan yönetebilir veya sitedeki “Çerez Tercihleri” arayüzünden kategori bazlı izinleri değiştirebilirsiniz.",
    cookiesKinds: [
      "Zorunlu: oturum açma, güvenlik ve yük dengeleme için gerekli.",
      "İşlevsel: dil tercihi, kullanıcı deneyimi ayarları.",
      "Analitik: kullanım istatistikleri ve performans ölçümü.",
      "Pazarlama (opsiyonel): kampanya ve yeniden hedefleme (açık rıza ile).",
    ],
    retentionTitle: "Saklama Süreleri",
    retentionList: [
      "Hesap verileri: üyelik boyunca; fesih sonrası yasal saklama süreleri.",
      "İşlem/fatura: VUK ve ilgili mevzuat uyarınca asgari süreler.",
      "Log ve güvenlik kayıtları: makul süre; uyuşmazlık hallerinde dava zamanaşımı.",
    ],
    rightsTitle: "Haklarınız (KVKK m.11)",
    rightsIntro:
      "Aşağıdaki haklara sahipsiniz. Başvurularınızı İletişim sayfasındaki kanallardan iletebilirsiniz.",
    rightsList: [
      "Kişisel verilere erişme ve bilgi talebi.",
      "Düzeltme, silme veya anonimleştirme talebi.",
      "İşlemeye itiraz ve kısıtlama talebi.",
      "Veri taşınabilirliği (uygulanabildiği ölçüde).",
      "Açık rızayı geri çekme.",
    ],
    securityTitle: "Güvenlik",
    security:
      "Uygun teknik/idari tedbirler uygulanır (erişim yetkilendirme, şifreleme, ağ güvenliği, log yönetimi). Şüpheli durumlarda hesabınızı korumak için derhal bizimle iletişime geçin.",
    updateTitle: "Değişiklikler",
    update:
      "Bu politika güncellenebilir. En güncel sürüm bu sayfada yayımlanır.",
    quick: "Hızlı Geçiş",
    quickAbout: "Hakkımızda",
    quickTerms: "Kullanım Şartları",
    quickReturns: "Teslimat & İade",
    cookiesAnchor: "Çerez Yönetimi",
  },
  en: {
    brand: "Ureten Eller",
    title: "Privacy Policy",
    intro:
      "This Privacy Policy explains how Ureten Eller processes personal data under Turkish Law No. 6698 (KVKK): purposes, sharing, retention and your rights.",
    controllerTitle: "Data Controller",
    controller:
      "Ureten Eller (Sole Proprietorship). Silivri Tax Office / TIN: 9530226667. Address: Gumusyaka, Rahmi St. 27A, Silivri / Istanbul. Contact: WhatsApp +90 505 727 91 43 • destek@ureten-eller.com",
    collectedTitle: "Data We Collect",
    collectedList: [
      "Account: name-surname, email, phone, address; identity/auth data.",
      "Transactions: listings, orders/payments (via PSP), invoicing data.",
      "Technical: cookies, session IDs, IP, device/browser info, analytics.",
      "Support: request/complaint records, messaging logs.",
    ],
    purposeTitle: "Purposes & Legal Bases",
    purposeIntro:
      "We process data for the purposes below on the legal bases of KVKK art.5/2 (a,c,ç,e,f); where required, we seek consent:",
    purposes: [
      "Service delivery: membership, listings, secure escrow payments, orders and delivery.",
      "Fraud prevention and abuse mitigation; security, auditing and logging.",
      "Legal obligations: invoicing, retention, disclosures to authorities.",
      "Communication and customer care; marketing per your preferences.",
    ],
    shareTitle: "Disclosures (Recipient Groups)",
    share:
      "Licensed payment institutions (PayTR, iyzico), hosting/IT/analytics providers, advisors and competent public authorities. Cross-border transfers rely on KVKK exceptions or consent depending on infrastructure.",
    cookiesTitle: "Cookies & Similar Technologies",
    cookiesIntro:
      "We use the following cookie categories. Manage them via your browser or the on-site “Cookie Preferences” panel.",
    cookiesKinds: [
      "Strictly necessary: login, security and load-balancing.",
      "Functional: language and UX preferences.",
      "Analytics: usage statistics and performance.",
      "Marketing (optional): campaigns/retargeting (with consent).",
    ],
    retentionTitle: "Retention",
    retentionList: [
      "Account: during membership; then as required by law.",
      "Transactions/invoices: per tax/accounting regulations.",
      "Logs/security: for reasonable periods; longer in disputes.",
    ],
    rightsTitle: "Your Rights",
    rightsIntro:
      "You may exercise the following rights via the channels on the Contact page:",
    rightsList: [
      "Access and information request.",
      "Rectification, erasure or anonymization.",
      "Objection to processing and restriction.",
      "Data portability (where applicable).",
      "Withdrawal of consent.",
    ],
    securityTitle: "Security",
    security:
      "We apply appropriate technical/organizational measures (access control, encryption, network security, logging). Contact us immediately if you suspect misuse.",
    updateTitle: "Updates",
    update: "This policy may be updated; the latest version is always published here.",
    quick: "Quick Links",
    quickAbout: "About",
    quickTerms: "Terms",
    quickReturns: "Shipping & Returns",
    cookiesAnchor: "Cookie Preferences",
  },
  ar: {
    brand: "أُنتِج بالأيادي",
    title: "سياسة الخصوصية",
    intro:
      "توضح هذه السياسة كيفية معالجة «أُنتِج بالأيادي» للبيانات الشخصية وفق قانون KVKK التركي: الأغراض والمشاركة وفترات الاحتفاظ وحقوقك.",
    controllerTitle: "المتحكم بالبيانات",
    controller:
      "أُنتِج بالأيادي (منشأة فردية). دائرة ضرائب سيلفري / 9530226667. العنوان: حي غوموشياكا، شارع رحمي 27A، سيلفري / إسطنبول. الاتصال: واتساب ‎+90 505 727 91 43 • destek@ureten-eller.com",
    collectedTitle: "البيانات التي نجمعها",
    collectedList: [
      "الحساب: الاسم، البريد، الهاتف، العنوان؛ بيانات الهوية/المصادقة.",
      "المعاملات: الإعلانات، الطلبات/المدفوعات (عبر جهة الدفع)، فواتير.",
      "التقنية: الكوكيز، مُعرّف الجلسة، IP، معلومات الجهاز/المتصفح، التحليلات.",
      "الدعم: سجلات الطلبات/الشكاوى، سجلات المراسلة.",
    ],
    purposeTitle: "الأغراض والأسس القانونية",
    purposeIntro:
      "نعالج البيانات للأغراض التالية بموجب المادة 5/2 من KVKK؛ وعند اللزوم نطلب الموافقة:",
    purposes: [
      "تقديم الخدمة: العضوية، الإعلانات، الدفع الآمن (حجز المبلغ)، الطلبات والتسليم.",
      "مكافحة الاحتيال وإساءة الاستخدام؛ الأمان، التدقيق، السجلات.",
      "الالتزامات القانونية: الفوترة، الاحتفاظ، إخطار الجهات الرسمية.",
      "التواصل وخدمة العملاء؛ التسويق وفق تفضيلاتك.",
    ],
    shareTitle: "الإفصاح (فئات الجهات المستلمة)",
    share:
      "مؤسسات الدفع المرخّصة (PayTR، iyzico)، مزودو الاستضافة/تقنية المعلومات/التحليلات، المستشارون والجهات العامة المختصة. النقل عبر الحدود يتم وفق استثناءات KVKK أو بالموافقة.",
    cookiesTitle: "ملفات الارتباط وما يماثلها",
    cookiesIntro:
      "نستخدم الفئات التالية. يمكنك إدارتها من المتصفح أو من لوحة «تفضيلات ملفات الارتباط».",
    cookiesKinds: [
      "ضرورية للغاية: تسجيل الدخول والأمان وتوازن التحميل.",
      "وظيفية: اللغة وتفضيلات التجربة.",
      "تحليلية: إحصاءات الاستخدام والأداء.",
      "تسويقية (اختيارية): الحملات وإعادة الاستهداف (بالموافقة).",
    ],
    retentionTitle: "فترات الاحتفاظ",
    retentionList: [
      "الحساب: طوال مدة العضوية؛ ثم حسب متطلبات القانون.",
      "المعاملات/الفواتير: وفق اللوائح الضريبية/المحاسبية.",
      "السجلات/الأمان: لفترات معقولة؛ أطول عند النزاعات.",
    ],
    rightsTitle: "حقوقك",
    rightsIntro:
      "يمكنك ممارسة الحقوق التالية عبر قنوات صفحة «اتصال»:",
    rightsList: [
      "الوصول إلى البيانات وطلب المعلومات.",
      "التصحيح أو الحذف أو إخفاء الهوية.",
      "الاعتراض على المعالجة وتقييدها.",
      "قابلية نقل البيانات (حيثما أمكن).",
      "سحب الموافقة.",
    ],
    securityTitle: "الأمان",
    security:
      "نطبق تدابير تقنية/تنظيمية مناسبة (التحكم في الوصول، التشفير، أمان الشبكة، التسجيل). يُرجى التواصل فورًا عند الاشتباه بسوء الاستخدام.",
    updateTitle: "التحديثات",
    update:
      "قد نقوم بتحديث هذه السياسة؛ سيتم نشر النسخة الأحدث هنا دائمًا.",
    quick: "روابط سريعة",
    quickAbout: "من نحن",
    quickTerms: "الشروط",
    quickReturns: "التسليم والإرجاع",
    cookiesAnchor: "تفضيلات ملفات الارتباط",
  },
  de: {
    brand: "Ureten Eller",
    title: "Datenschutz",
    intro:
      "Diese Richtlinie erklärt die Verarbeitung personenbezogener Daten nach türkischem KVKK: Zwecke, Weitergaben, Aufbewahrung und Ihre Rechte.",
    controllerTitle: "Verantwortlicher",
    controller:
      "Ureten Eller (Einzelunternehmen). Finanzamt Silivri / St-Nr.: 9530226667. Adresse: Gumusyaka, Rahmi-Str. 27A, Silivri / Istanbul. Kontakt: WhatsApp +90 505 727 91 43 • destek@ureten-eller.com",
    collectedTitle: "Welche Daten wir erheben",
    collectedList: [
      "Konto: Name, E-Mail, Telefon, Adresse; Identitäts-/Auth-Daten.",
      "Transaktionen: Inserate, Bestellungen/Zahlungen (via PSP), Rechnungsdaten.",
      "Technisch: Cookies, Sitzungs-IDs, IP, Gerät/Browser, Analytics.",
      "Support: Anfragen/Beschwerden, Nachrichten-Protokolle.",
    ],
    purposeTitle: "Zwecke & Rechtsgrundlagen",
    purposeIntro:
      "Verarbeitung gem. KVKK Art.5/2 (a,c,ç,e,f); ggf. holen wir eine Einwilligung ein:",
    purposes: [
      "Dienstleistung: Mitgliedschaft, Inserate, sichere Treuhandzahlungen, Bestellungen und Lieferung.",
      "Betrugsprävention, Sicherheit, Audits und Protokollierung.",
      "Gesetzliche Pflichten: Rechnungslegung, Aufbewahrung, Meldungen.",
      "Kommunikation & Kundenservice; Marketing nach Ihren Präferenzen.",
    ],
    shareTitle: "Weitergaben (Empfängerkreise)",
    share:
      "Lizenzierte Zahlungsdienste (PayTR, iyzico), Hosting/IT/Analytics, Berater und Behörden. Drittlandübermittlungen basieren auf KVKK-Ausnahmen oder Einwilligung.",
    cookiesTitle: "Cookies & ähnliche Technologien",
    cookiesIntro:
      "Sie können Cookies im Browser oder über „Cookie-Einstellungen“ steuern.",
    cookiesKinds: [
      "Unbedingt erforderlich: Login, Sicherheit, Load-Balancing.",
      "Funktional: Sprache, UX-Präferenzen.",
      "Analyse: Nutzungsstatistiken, Performance.",
      "Marketing (optional): Kampagnen/Retargeting (mit Einwilligung).",
    ],
    retentionTitle: "Aufbewahrung",
    retentionList: [
      "Konto: während der Mitgliedschaft; danach gesetzlich erforderlich.",
      "Transaktionen/Rechnungen: nach Steuer-/Buchführungsrecht.",
      "Logs/Sicherheit: angemessene Dauer; länger bei Streitfällen.",
    ],
    rightsTitle: "Ihre Rechte",
    rightsIntro:
      "Sie können folgende Rechte über die Kontaktseite ausüben:",
    rightsList: [
      "Auskunft und Information.",
      "Berichtigung, Löschung oder Anonymisierung.",
      "Widerspruch und Einschränkung der Verarbeitung.",
      "Datenübertragbarkeit (soweit anwendbar).",
      "Widerruf der Einwilligung.",
    ],
    securityTitle: "Sicherheit",
    security:
      "Wir setzen angemessene technische/organisatorische Maßnahmen ein (Zugriffskontrolle, Verschlüsselung, Netzwerksicherheit, Logging).",
    updateTitle: "Aktualisierungen",
    update:
      "Diese Richtlinie kann aktualisiert werden; die neueste Version finden Sie stets hier.",
    quick: "Schnellzugriff",
    quickAbout: "Über uns",
    quickTerms: "Nutzungsbedingungen",
    quickReturns: "Lieferung & Rückgabe",
    cookiesAnchor: "Cookie-Einstellungen",
  },
};

export const metadata = { title: "Gizlilik • Üreten Eller" };

export default function PrivacyPage() {
  const lang = useLang();
  const t = useMemo(() => T[lang] || T.tr, [lang]);
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

          <h2>{t.controllerTitle}</h2>
          <p>{t.controller}</p>

          <h2>{t.collectedTitle}</h2>
          <ul>{t.collectedList.map((x, i) => <li key={i}>{x}</li>)}</ul>

          <h2>{t.purposeTitle}</h2>
          <p>{t.purposeIntro}</p>
          <ul>{t.purposes.map((x, i) => <li key={i}>{x}</li>)}</ul>

          <h2>{t.shareTitle}</h2>
          <p>{t.share}</p>

          <h2 id="cerez">{t.cookiesTitle}</h2>
          <p>{t.cookiesIntro}</p>
          <ul>{t.cookiesKinds.map((x, i) => <li key={i}>{x}</li>)}</ul>
          <p>
            <a className="link" href="/legal/gizlilik#cerez">{t.cookiesAnchor}</a>
          </p>

          <h2>{t.retentionTitle}</h2>
          <ul>{t.retentionList.map((x, i) => <li key={i}>{x}</li>)}</ul>

          <h2 id="haklar">{t.rightsTitle}</h2>
          <p>{t.rightsIntro}</p>
          <ul>{t.rightsList.map((x, i) => <li key={i}>{x}</li>)}</ul>

          <h2>{t.securityTitle}</h2>
          <p>{t.security}</p>

          <h2>{t.updateTitle}</h2>
          <p>{t.update}</p>

          <hr />
          <p className="quick">
            <strong>{t.quick}:</strong>{" "}
            <a href="/legal/hakkimizda">{t.quickAbout}</a> •{" "}
            <a href="/legal/kullanim-sartlari">{t.quickTerms}</a> •{" "}
            <a href="/legal/teslimat-iade">{t.quickReturns}</a>
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
        .link{color:#0ea5e9;text-decoration:none}
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
