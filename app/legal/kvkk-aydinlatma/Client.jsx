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
    title: "KVKK Aydınlatma Metni",
    intro:
      "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) m.10 uyarınca, kişisel verilerinizin işlenmesine ilişkin olarak veri sorumlusu sıfatıyla sizi bilgilendiriyoruz.",
    controllerTitle: "1) Veri Sorumlusunun Kimliği",
    controller:
      "Üreten Eller (Şahıs İşletmesi) • Silivri Vergi Dairesi / VKN: 9530226667 • Adres: Gümüşyaka Mah., Rahmi Sokak, No:27A, Silivri / İstanbul • İletişim: WhatsApp +90 505 727 91 43 • destek@ureten-eller.com",
    purposesTitle: "2) Kişisel Verilerin İşlenme Amaçları",
    purposes: [
      "Platformun işletilmesi: üyelik, ilan, güvenli ödeme (escrow), sipariş ve teslim süreçleri.",
      "Dolandırıcılığın önlenmesi, güvenlik, denetim ve kayıt yönetimi.",
      "Mevzuattan kaynaklanan yükümlülüklerin yerine getirilmesi (faturalama, saklama, bildirim).",
      "Müşteri desteği ve iletişim; tercihlerinize bağlı pazarlama/duyuru.",
    ],
    transfersTitle: "3) Aktarım Yapılan Alıcı Grupları",
    transfers:
      "Ödeme kuruluşları (PayTR, iyzico), barındırma/BT/analitik sağlayıcıları, danışmanlar, iş ortakları ve hukuken yetkili kamu kurumları. Yurt dışına aktarım, kullanılan altyapıya göre KVKK istisnaları veya açık rıza kapsamında yapılabilir.",
    methodTitle: "4) Toplama Yöntemi ve Hukuki Sebep",
    methodIntro:
      "Veriler; çevrimiçi formlar, işlem kayıtları, çerezler, çağrı/mesaj kanalları ve sözleşmesel süreçler yoluyla otomatik/otomatik olmayan yollarla toplanır. İşleme, KVKK m.5/2 (a,c,ç,e,f) hükümleri ile sözleşmenin kurulması/ifası, hukuki yükümlülük ve meşru menfaat hukuki sebeplerine; gerektiğinde açık rızaya dayanır.",
    categoriesTitle: "5) İşlenen Veri Kategorileri (Örnek)",
    categories: [
      "Kimlik/İletişim: ad-soyad, e-posta, telefon, adres.",
      "Hesap/Profil: kullanıcı adı, rol, tercih ve ayarlar.",
      "İşlem: ilan, sipariş, ödeme (PSP üzerinden), fatura.",
      "Teknik: çerezler, oturum, IP, cihaz/tarayıcı bilgisi, log.",
      "Destek: talep/şikâyet kayıtları, mesajlaşma logları.",
    ],
    rightsTitle: "6) İlgili Kişinin Hakları (KVKK m.11)",
    rightsIntro:
      "Aşağıdaki haklarınızı İletişim sayfamızdaki kanallardan kullanabilirsiniz:",
    rights: [
      "Kişisel verilere erişim ve bilgi talebi.",
      "Düzeltme, silme/anonimleştirme talebi.",
      "İşlemeye itiraz ve kısıtlama talebi.",
      "Veri taşınabilirliği (uygulanabildiği ölçüde).",
      "Açık rızayı geri çekme.",
    ],
    retentionTitle: "7) Saklama Süreleri",
    retention: [
      "Hesap verileri: üyelik boyunca; fesih sonrası yasal saklama sürelerince.",
      "İşlem/fatura: vergi ve muhasebe mevzuatındaki asgari süreler.",
      "Log ve güvenlik: makul süre; uyuşmazlık halinde zamanaşımı süresince.",
    ],
    securityTitle: "8) Güvenlik Tedbirleri",
    security:
      "Erişim yetkilendirme, şifreleme, ağ güvenliği, kayıt yönetimi ve düzenli kontroller gibi teknik/idari tedbirler uygulanır.",
    updatesTitle: "9) Güncellemeler",
    updates:
      "Bu aydınlatma metni güncellenebilir. Son sürüm her zaman bu sayfada yayımlanır.",
    quick: "Hızlı Geçiş",
  },

  en: {
    brand: "Ureten Eller",
    title: "KVKK Information Notice",
    intro:
      "Pursuant to Turkish Law No. 6698 (KVKK) art.10, we inform you about our processing of personal data as the data controller.",
    controllerTitle: "1) Data Controller",
    controller:
      "Ureten Eller (Sole Proprietorship) • Silivri Tax Office / TIN: 9530226667 • Address: Gumusyaka, Rahmi St. 27A, Silivri / Istanbul • Contact: WhatsApp +90 505 727 91 43 • destek@ureten-eller.com",
    purposesTitle: "2) Purposes of Processing",
    purposes: [
      "Operating the platform: membership, listings, secure escrow payments, orders and delivery.",
      "Fraud prevention, security, audits and logging.",
      "Fulfillment of legal obligations (invoicing, retention, disclosures).",
      "Support and communication; marketing/announcements per preferences.",
    ],
    transfersTitle: "3) Recipient Groups",
    transfers:
      "Payment institutions (PayTR, iyzico), hosting/IT/analytics providers, consultants, partners and competent public authorities. Cross-border transfers rely on KVKK exceptions or consent depending on infrastructure.",
    methodTitle: "4) Collection Method & Legal Basis",
    methodIntro:
      "Data is collected via online forms, transactions, cookies, messaging/call channels and contractual processes by automated/non-automated means. Processing relies on KVKK art.5/2 (a,c,ç,e,f) (contract, legal obligation, legitimate interest); where required, on consent.",
    categoriesTitle: "5) Categories of Data (Examples)",
    categories: [
      "Identity/Contact: name, email, phone, address.",
      "Account/Profile: username, role, preferences.",
      "Transaction: listings, orders, payments (via PSP), invoices.",
      "Technical: cookies, session IDs, IP, device/browser, logs.",
      "Support: request/complaint records, messaging logs.",
    ],
    rightsTitle: "6) Data Subject Rights (KVKK art.11)",
    rightsIntro:
      "You may exercise the following rights via the channels on our Contact page:",
    rights: [
      "Access and information request.",
      "Rectification, erasure/anonymization.",
      "Objection to processing and restriction.",
      "Data portability (where applicable).",
      "Withdrawal of consent.",
    ],
    retentionTitle: "7) Retention",
    retention: [
      "Account data: during membership; then per statutory retention.",
      "Transactions/invoices: per tax/accounting laws.",
      "Logs/security: reasonable periods; statute of limitations in disputes.",
    ],
    securityTitle: "8) Security Measures",
    security:
      "We implement access control, encryption, network security, log management and periodic checks.",
    updatesTitle: "9) Updates",
    updates:
      "This notice may be updated; the latest version is always published here.",
    quick: "Quick Links",
  },

  ar: {
    brand: "أُنتِج بالأيادي",
    title: "إشعار KVKK",
    intro:
      "وفق المادة 10 من قانون حماية البيانات التركي KVKK، نُعلمكم بكيفية معالجة بياناتكم بصفتنا المتحكّم بالبيانات.",
    controllerTitle: "1) المتحكّم بالبيانات",
    controller:
      "أُنتِج بالأيادي (منشأة فردية) • دائرة ضرائب سيلفري / 9530226667 • العنوان: حي غوموشياكا، شارع رحمي 27A، سيلفري / إسطنبول • الاتصال: واتساب ‎+90 505 727 91 43 • destek@ureten-eller.com",
    purposesTitle: "2) أغراض المعالجة",
    purposes: [
      "تشغيل المنصّة: العضوية، الإعلانات، الدفع الموثوق (حجز)، الطلبات والتسليم.",
      "منع الاحتيال، الأمان، التدقيق والسجلات.",
      "الالتزامات القانونية (الفوترة، الاحتفاظ، الإبلاغ).",
      "الدعم والتواصل؛ التسويق وفق التفضيلات.",
    ],
    transfersTitle: "3) جهات الاستلام",
    transfers:
      "مؤسسات الدفع (PayTR، iyzico)، مزودو الاستضافة/تقنية المعلومات/التحليلات، المستشارون، الشركاء والجهات العامة المختصة. النقل عبر الحدود وفق استثناءات KVKK أو بالموافقة.",
    methodTitle: "4) طريقة الجمع والأساس القانوني",
    methodIntro:
      "يُجمع البيانات عبر النماذج والمعاملات والكوكيز وقنوات الرسائل/المكالمات والعمليات التعاقدية بوسائل آلية وغير آلية. تستند المعالجة إلى المادة 5/2 من KVKK؛ وعند اللزوم إلى الموافقة.",
    categoriesTitle: "5) فئات البيانات (أمثلة)",
    categories: [
      "الهوية/الاتصال: الاسم، البريد، الهاتف، العنوان.",
      "الحساب/الملف: اسم المستخدم، الدور، التفضيلات.",
      "المعاملات: الإعلانات، الطلبات، المدفوعات (عبر PSP)، الفواتير.",
      "التقنية: الكوكيز، معرف الجلسة، IP، الجهاز/المتصفح، السجلات.",
      "الدعم: سجلات الطلبات/الشكاوى، سجلات المراسلة.",
    ],
    rightsTitle: "6) حقوق صاحب البيانات",
    rightsIntro:
      "يمكنك ممارسة الحقوق الآتية عبر قنوات صفحة «اتصال»:",
    rights: [
      "الوصول وطلب المعلومات.",
      "التصحيح أو الحذف/إخفاء الهوية.",
      "الاعتراض على المعالجة وتقييدها.",
      "قابلية نقل البيانات (حيثما أمكن).",
      "سحب الموافقة.",
    ],
    retentionTitle: "7) فترات الاحتفاظ",
    retention: [
      "بيانات الحساب: طوال مدة العضوية؛ ثم حسب المتطلبات القانونية.",
      "المعاملات/الفواتير: وفق قوانين الضرائب/المحاسبة.",
      "السجلات/الأمان: مدد معقولة؛ ووفق مدة التقادم في النزاعات.",
    ],
    securityTitle: "8) تدابير الأمان",
    security:
      "نطبّق التحكم بالوصول، التشفير، أمن الشبكة، إدارة السجلات وفحوصات دورية.",
    updatesTitle: "9) التحديثات",
    updates:
      "قد يتم تحديث هذا الإشعار؛ تُنشر أحدث نسخة هنا.",
    quick: "روابط سريعة",
  },

  de: {
    brand: "Ureten Eller",
    title: "KVKK-Hinweis",
    intro:
      "Gemäß Art.10 des türkischen Datenschutzgesetzes (KVKK) informieren wir Sie über die Verarbeitung personenbezogener Daten als Verantwortlicher.",
    controllerTitle: "1) Verantwortlicher",
    controller:
      "Ureten Eller (Einzelunternehmen) • Finanzamt Silivri / St-Nr.: 9530226667 • Adresse: Gumusyaka, Rahmi-Str. 27A, Silivri / Istanbul • Kontakt: WhatsApp +90 505 727 91 43 • destek@ureten-eller.com",
    purposesTitle: "2) Verarbeitungszwecke",
    purposes: [
      "Betrieb der Plattform: Mitgliedschaft, Inserate, sichere Treuhandzahlungen, Bestellungen & Lieferung.",
      "Betrugsprävention, Sicherheit, Audits und Protokollierung.",
      "Erfüllung gesetzlicher Pflichten (Rechnungen, Aufbewahrung, Meldungen).",
      "Support & Kommunikation; Marketing gemäß Präferenzen.",
    ],
    transfersTitle: "3) Empfängerkreise",
    transfers:
      "Zahlungsdienste (PayTR, iyzico), Hosting/IT/Analytics, Berater, Partner sowie zuständige Behörden. Drittlandübermittlungen basieren auf KVKK-Ausnahmen oder Einwilligung.",
    methodTitle: "4) Erhebungsmethode & Rechtsgrundlage",
    methodIntro:
      "Erhebung über Online-Formulare, Transaktionen, Cookies, Nachrichten/Anrufe und vertragliche Prozesse, automatisiert/nicht automatisiert. Rechtsgrundlagen: KVKK Art.5/2 (a,c,ç,e,f); ggf. Einwilligung.",
    categoriesTitle: "5) Datenkategorien (Beispiele)",
    categories: [
      "Identität/Kontakt: Name, E-Mail, Telefon, Adresse.",
      "Konto/Profil: Benutzername, Rolle, Präferenzen.",
      "Transaktion: Inserate, Bestellungen, Zahlungen (über PSP), Rechnungen.",
      "Technisch: Cookies, Sitzungs-IDs, IP, Gerät/Browser, Logs.",
      "Support: Anfragen/Beschwerden, Nachrichtenprotokolle.",
    ],
    rightsTitle: "6) Betroffenenrechte (KVKK Art.11)",
    rightsIntro:
      "Sie können folgende Rechte über die Kanäle auf der Kontakt-Seite ausüben:",
    rights: [
      "Auskunft & Information.",
      "Berichtigung, Löschung/Anonymisierung.",
      "Widerspruch & Einschränkung der Verarbeitung.",
      "Datenübertragbarkeit (soweit anwendbar).",
      "Widerruf der Einwilligung.",
    ],
    retentionTitle: "7) Aufbewahrung",
    retention: [
      "Kontodaten: während der Mitgliedschaft; danach gesetzlich.",
      "Transaktionen/Rechnungen: nach Steuer-/Buchführungsrecht.",
      "Logs/Sicherheit: angemessene Dauer; Verjährungsfristen bei Streit.",
    ],
    securityTitle: "8) Sicherheit",
    security:
      "Zugriffskontrolle, Verschlüsselung, Netzwerksicherheit, Log-Management und regelmäßige Prüfungen.",
    updatesTitle: "9) Aktualisierungen",
    updates:
      "Dieser Hinweis kann aktualisiert werden; die neueste Fassung steht hier.",
    quick: "Schnellzugriff",
  },
};

export const metadata = { title: "KVKK Aydınlatma • Üreten Eller" };

export default function KvkkPage() {
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

          <h2>{t.purposesTitle}</h2>
          <ul>{t.purposes.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2>{t.transfersTitle}</h2>
          <p>{t.transfers}</p>

          <h2>{t.methodTitle}</h2>
          <p>{t.methodIntro}</p>

          <h2>{t.categoriesTitle}</h2>
          <ul>{t.categories.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2 id="haklar">{t.rightsTitle}</h2>
          <p>{t.rightsIntro}</p>
          <ul>{t.rights.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2>{t.retentionTitle}</h2>
          <ul>{t.retention.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2>{t.securityTitle}</h2>
          <p>{t.security}</p>

          <h2>{t.updatesTitle}</h2>
          <p>{t.updates}</p>

          <hr />
          <p className="quick">
            <strong>{t.quick}:</strong>{" "}
            <a href="/legal/gizlilik">Gizlilik</a> •{" "}
            <a href="/legal/kullanim-sartlari">Kullanım Şartları</a> •{" "}
            <a href="/legal/mesafeli-satis-sozlesmesi">Mesafeli Satış</a>
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
