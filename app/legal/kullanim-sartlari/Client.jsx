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
    title: "Kullanım Şartları",
    intro:
      "Bu Kullanım Şartları, Üreten Eller platformunun kullanımına ilişkin kuralları ve hak/yükümlülükleri düzenler. Siteyi kullanarak bu şartları kabul etmiş sayılırsınız.",
    defsTitle: "1) Tanımlar",
    defs: [
      "Platform: Üreten Eller web sitesi ve ilgili mobil arayüzler.",
      "Kullanıcı: Siteyi ziyaret eden, üye olan veya işlem yapan gerçek/tüzel kişi.",
      "Satıcı: İlan oluşturan ve ürün/hizmet sunan kullanıcı.",
      "Alıcı: Satıcıların ilanladığı ürün/hizmetleri sipariş eden kullanıcı.",
      "Hesap: Kullanıcıya ait üyelik profili.",
    ],
    membershipTitle: "2) Üyelik ve Hesap",
    membership: [
      "Kullanıcı, kayıt esnasında doğru ve güncel bilgi vermekle yükümlüdür.",
      "Hesap güvenliği (şifre, cihaz erişimi) kullanıcı sorumluluğundadır.",
      "Birden fazla sahte hesap açılması, kimlik taklidi, yetkisiz erişim yasaktır.",
      "Hesap bilgilerinin üçüncü kişilerle paylaşılmasından doğan sonuçlardan kullanıcı sorumludur.",
    ],
    listingTitle: "3) İlan Kuralları ve Yasaklı Ürünler",
    listingIntro:
      "Satıcı; yürürlükteki mevzuata uygun, doğru ve eksiksiz ilan vermekle yükümlüdür.",
    listing: [
      "Taklit/kaçak, tehlikeli, mevzuata aykırı ürünler; telif/marka ihlalli içerikler yasaktır.",
      "AÇIK YASAK: Alkol, tütün, cinsel içerikli ürünler, canlı hayvan, yasa dışı/sağlığa zararlı maddeler, tıbbi reçeteli ürünler.",
      "Ürün nitelikleri, fiyat, teslimat ve iade şartları açıkça belirtilmelidir.",
      "Yanıltıcı görsel/metin kullanımı, manipülatif etiketleme ve spam yasaktır.",
    ],
    paymentsTitle: "4) Ödeme, Bloke (Escrow) ve Ücretlendirme",
    payments: [
      "Ödeme, lisanslı ödeme kuruluşları (ör. PayTR, iyzico) üzerinden tahsil edilir.",
      "Tutar, alıcının teslimi onayına (veya taşıma belgesine) kadar blokede tutulur.",
      "Teslim onayı ile birlikte bedel satıcıya aktarılır; iade süreçlerinde bedel iade akışına alınır.",
      "Platform, ürün satışından komisyon almaz; gelir premium üyelik, vitrin/doping ve reklam hizmetlerinden elde edilir.",
      "Ödeme süreçlerindeki gecikmeler ödeme kuruluşu/banka prosedürlerine bağlı olabilir.",
    ],
    intermediaryTitle: "5) Aracı Hizmet Sağlayıcı Rolü",
    intermediary:
      "Satış sözleşmesi alıcı ile satıcı arasında kurulur. Üreten Eller, 6563 sayılı Kanun kapsamında aracı hizmet sağlayıcıdır; ürünün ayıplı çıkması, teslimat, iade ve cayma süreçlerinden doğrudan sorumlu değildir. Ancak kayıtları inceler, tarafları bilgilendirir ve çözüm sürecini kolaylaştırır.",
    returnsTitle: "6) Cayma ve İade",
    returns: [
      "Tüketici mevzuatı uyarınca alıcı, 14 gün içinde cayma hakkını kullanabilir (istisnalar: kişiye özel üretim, çabuk bozulabilen veya hijyen gerektiren ürünler vb.).",
      "İade koşulları ilanda ve sipariş özetinde açıkça belirtilir; ayıplı ürün hallerinde iade kargo bedeli satıcıya aittir.",
      "Ücret iadesi, ödeme kuruluşu aracılığıyla alıcının kullandığı ödeme yöntemine yapılır.",
    ],
    ipTitle: "7) Fikri ve Sınai Mülkiyet",
    ip: [
      "Platform arayüzü, marka, logo, yazılım ve tasarımların tüm hakları saklıdır.",
      "Kullanıcı, yüklediği içerik için Üreten Eller’e dünya çapında, devredilebilir, alt lisanslanabilir, basit lisanslı bir kullanım hakkı verdiğini kabul eder.",
      "Üçüncü kişilerin haklarını ihlal eden içerikler tespit edildiğinde kaldırılabilir.",
    ],
    abuseTitle: "8) Kötüye Kullanım ve Askıya Alma",
    abuse: [
      "Dolandırıcılık şüphesi, yasa dışı faaliyet, spam veya moderasyon ihlallerinde hesap kısıtlanabilir/askıya alınabilir.",
      "Yasal mercilerden gelen taleplerde ilgili kayıtlar mevzuata uygun şekilde paylaşılabilir.",
    ],
    liabilityTitle: "9) Sorumluluk Reddi",
    liability: [
      "Kesinti, bakım, altyapı arızaları ve üçüncü taraf hizmet kaynaklı gecikmelerden doğan dolaylı zararlardan Üreten Eller sorumlu değildir.",
      "Kullanıcıların kusurundan, ilan içeriğinden ve üçüncü taraf işlemlerden doğan zararlardan ilgili kullanıcı sorumludur.",
    ],
    terminationTitle: "10) Fesih",
    termination:
      "Kullanıcı, hesabını dilediği zaman kapatabilir. Kurallara aykırılık, yasal yükümlülük veya güvenlik gerekçeleriyle Üreten Eller hesabı askıya alabilir ya da feshedebilir.",
    lawTitle: "11) Uygulanacak Hukuk ve Yetki",
    law:
      "Bu şartlar Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda İstanbul mahkemeleri ve icra daireleri yetkilidir.",
    updateTitle: "12) Değişiklikler",
    update:
      "Şartlar güncellenebilir; en güncel sürüm bu sayfada yayımlanır.",
    quick: "Hızlı Geçiş",
  },

  en: {
    brand: "Ureten Eller",
    title: "Terms of Use",
    intro:
      "These Terms govern your use of Ureten Eller. By using the site, you accept these Terms.",
    defsTitle: "1) Definitions",
    defs: [
      "Platform: Ureten Eller website and related mobile interfaces.",
      "User: any natural/legal person visiting, registering or transacting.",
      "Seller: user who creates listings and offers goods/services.",
      "Buyer: user who orders listed goods/services.",
      "Account: the user’s membership profile.",
    ],
    membershipTitle: "2) Membership & Account",
    membership: [
      "Users must provide accurate, up-to-date information.",
      "Account security (password, device access) is the user’s responsibility.",
      "Fake accounts, impersonation and unauthorized access are prohibited.",
      "User is liable for sharing account credentials with third parties.",
    ],
    listingTitle: "3) Listings & Prohibited Items",
    listingIntro:
      "Sellers must post lawful, accurate and complete listings.",
    listing: [
      "Counterfeit/illegal/dangerous items and IP-infringing content are prohibited.",
      "STRICT BAN: alcohol, tobacco, adult content, live animals, illegal/harmful substances, prescription-only medical items.",
      "List essential attributes, price, delivery and return terms clearly.",
      "No misleading visuals/texts, manipulative tags or spam.",
    ],
    paymentsTitle: "4) Payments, Escrow & Fees",
    payments: [
      "Payments are processed via licensed PSPs (e.g., PayTR, iyzico).",
      "Funds are held in escrow until delivery is confirmed.",
      "Upon confirmation, the amount is released to the seller; refunds follow PSP flow.",
      "No sales commission by the Platform; revenue from premium plans, boosts and ads.",
      "Delays may arise from PSP/bank procedures.",
    ],
    intermediaryTitle: "5) Intermediary Role",
    intermediary:
      "The sales contract is between buyer and seller. Ureten Eller is an intermediary under Law No. 6563 and is not directly liable for defects, delivery or returns. We review records and facilitate resolution.",
    returnsTitle: "6) Withdrawal & Returns",
    returns: [
      "Consumers may withdraw within 14 days (subject to statutory exceptions).",
      "Return conditions are shown in the listing/order; faulty items’ return shipping is borne by the seller.",
      "Refunds are made via the PSP to the original payment method.",
    ],
    ipTitle: "7) Intellectual Property",
    ip: [
      "All platform UI, marks, software and designs are protected.",
      "User grants Ureten Eller a worldwide, transferable, sublicensable, non-exclusive license to use uploaded content.",
      "Unlawful content may be removed upon notice.",
    ],
    abuseTitle: "8) Abuse & Suspension",
    abuse: [
      "Fraud suspicion, illegal activity, spam or moderation breaches may lead to restriction/suspension.",
      "Records may be shared with authorities as required by law.",
    ],
    liabilityTitle: "9) Liability",
    liability: [
      "Ureten Eller is not liable for indirect damages from outages, maintenance, third-party failures.",
      "Users are liable for their own content and actions.",
    ],
    terminationTitle: "10) Termination",
    termination:
      "Users may close accounts anytime. Breaches or legal/security grounds may lead to suspension/termination.",
    lawTitle: "11) Governing Law & Jurisdiction",
    law:
      "Turkish law applies. Istanbul courts have jurisdiction.",
    updateTitle: "12) Updates",
    update:
      "The latest version is always published here.",
    quick: "Quick Links",
  },

  ar: {
    brand: "أُنتِج بالأيادي",
    title: "شروط الاستخدام",
    intro:
      "تنظّم هذه الشروط استخدامك للمنصّة. باستخدامك للموقع فأنت توافق عليها.",
    defsTitle: "1) التعاريف",
    defs: [
      "المنصّة: موقع «أُنتِج بالأيادي» وواجهاته.",
      "المستخدم: كل شخص طبيعي/اعتباري يزور أو يسجّل أو يجري معاملات.",
      "البائع: من ينشئ الإعلانات ويعرض سلعة/خدمة.",
      "المشتري: من يطلب السلع/الخدمات المُعلنة.",
      "الحساب: ملف عضوية المستخدم.",
    ],
    membershipTitle: "2) العضوية والحساب",
    membership: [
      "يجب تقديم معلومات صحيحة ومحدّثة.",
      "أمن الحساب (كلمة المرور، الأجهزة) مسؤولية المستخدم.",
      "ممنوع الحسابات المزيّفة، انتحال الهوية، الوصول غير المصرّح.",
      "المستخدم مسؤول عن مشاركة بيانات الحساب مع الغير.",
    ],
    listingTitle: "3) الإعلانات والعناصر المحظورة",
    listingIntro:
      "يجب أن تكون الإعلانات قانونية ودقيقة وكاملة.",
    listing: [
      "ممنوع السلع المقلّدة/غير القانونية/الخطرة وانتهاك الحقوق الفكرية.",
      "حظر صارم: الكحول، التبغ، المحتوى الجنسي، الحيوانات الحية، المواد غير القانونية/الضارّة، الأدوية بوصفة فقط.",
      "بيان الصفات والسعر والتسليم والإرجاع بوضوح.",
      "منع الصور/النصوص المضلّلة والوسوم المخادعة والرسائل المزعجة.",
    ],
    paymentsTitle: "4) المدفوعات والحجز والرسوم",
    payments: [
      "تُعالج المدفوعات عبر مزوّدي دفع مرخّصين (PayTR, iyzico).",
      "يُحجز المبلغ حتى تأكيد الاستلام.",
      "بعد التأكيد يُحوّل المبلغ للبائع؛ الاستردادات عبر جهة الدفع.",
      "لا عمولة بيع للمنصّة؛ الدخل من العضوية المميّزة، الترويج والإعلانات.",
      "قد تحدث تأخيرات بسبب إجراءات البنك/جهة الدفع.",
    ],
    intermediaryTitle: "5) دور الوسيط",
    intermediary:
      "العقد بين المشتري والبائع. «أُنتِج بالأيادي» وسيط وفق القانون 6563؛ غير مسؤول مباشرة عن العيوب أو التسليم أو الإرجاع. نراجع السجلات ونُيسّر الحل.",
    returnsTitle: "6) الانسحاب والإرجاع",
    returns: [
      "للمستهلك حق الانسحاب خلال 14 يومًا (مع الاستثناءات القانونية).",
      "شروط الإرجاع تظهر في الإعلان/الطلب؛ الشحن لعناصر العيب على البائع.",
      "الاسترداد عبر جهة الدفع إلى وسيلة الدفع الأصلية.",
    ],
    ipTitle: "7) الملكية الفكرية",
    ip: [
      "واجهة المنصّة والعلامات والبرمجيات والتصاميم محمية.",
      "يمنح المستخدم ترخيصًا عالميًا قابلًا للنقل والترخيص الفرعي لاستخدام المحتوى المرفوع.",
      "يُزال المحتوى غير القانوني عند الإبلاغ.",
    ],
    abuseTitle: "8) إساءة الاستخدام والتعليق",
    abuse: [
      "الاحتيال أو النشاط غير القانوني أو خرق الإشراف قد يؤدي للتقييد/التعليق.",
      "قد نشارك السجلات مع السلطات وفق القانون.",
    ],
    liabilityTitle: "9) المسؤولية",
    liability: [
      "لا نتحمّل الأضرار غير المباشرة بسبب انقطاعات/صيانة/أعطال أطراف ثالثة.",
      "المستخدم مسؤول عن محتواه وتصرفاته.",
    ],
    terminationTitle: "10) الإنهاء",
    termination:
      "يمكن للمستخدم إغلاق الحساب في أي وقت. قد نُعلّق/ننهي الحساب عند المخالفة أو لأسباب قانونية/أمنية.",
    lawTitle: "11) القانون والاختصاص",
    law:
      "يُطبّق القانون التركي. محاكم إسطنبول مختصّة.",
    updateTitle: "12) التحديثات",
    update:
      "يُنشر أحدث إصدار هنا دائمًا.",
    quick: "روابط سريعة",
  },

  de: {
    brand: "Ureten Eller",
    title: "Nutzungsbedingungen",
    intro:
      "Diese Bedingungen regeln die Nutzung der Plattform. Mit der Nutzung akzeptieren Sie sie.",
    defsTitle: "1) Begriffe",
    defs: [
      "Plattform: Website und mobile Oberflächen von Ureten Eller.",
      "Nutzer: jede natürliche/juristische Person, die besucht/registriert/handelt.",
      "Verkäufer: Nutzer, der Inserate erstellt und Waren/Dienste anbietet.",
      "Käufer: Nutzer, der Waren/Dienste bestellt.",
      "Konto: Mitgliedsprofil des Nutzers.",
    ],
    membershipTitle: "2) Mitgliedschaft & Konto",
    membership: [
      "Angaben müssen korrekt und aktuell sein.",
      "Kontosicherheit (Passwort, Gerätezugriff) liegt beim Nutzer.",
      "Fake-Accounts, Identitätsdiebstahl, unbefugter Zugriff sind verboten.",
      "Teilen von Zugangsdaten mit Dritten erfolgt auf eigenes Risiko.",
    ],
    listingTitle: "3) Inserate & Verbotene Artikel",
    listingIntro:
      "Inserate müssen rechtmäßig, korrekt und vollständig sein.",
    listing: [
      "Verbot: gefälschte/illegale/gefährliche Waren und IP-Verstöße.",
      "STRIKTES VERBOT: Alkohol, Tabak, Erwachsenenartikel, lebende Tiere, illegale/gefährliche Stoffe, verschreibungspflichtige Medizin.",
      "Eigenschaften, Preis, Lieferung & Rückgabe klar angeben.",
      "Keine irreführenden Darstellungen/Tags, kein Spam.",
    ],
    paymentsTitle: "4) Zahlungen, Treuhand & Entgelte",
    payments: [
      "Zahlungen über lizenzierte Zahlungsdienste (z. B. PayTR, iyzico).",
      "Gelder werden bis zur Lieferbestätigung treuhänderisch gehalten.",
      "Nach Bestätigung: Auszahlung an den Verkäufer; Rückerstattungen über den PSP.",
      "Keine Verkaufsprovision; Erlöse aus Premium, Boosts und Werbung.",
      "Verzögerungen können durch PSP/Bank entstehen.",
    ],
    intermediaryTitle: "5) Vermittlerrolle",
    intermediary:
      "Kaufvertrag zwischen Käufer und Verkäufer. Ureten Eller ist Vermittler gem. Gesetz Nr. 6563; keine direkte Haftung für Mängel/Lieferung/Rückgaben. Wir prüfen Protokolle und unterstützen die Klärung.",
    returnsTitle: "6) Widerruf & Rückgaben",
    returns: [
      "14-tägiges Widerrufsrecht (gesetzliche Ausnahmen vorbehalten).",
      "Rückgabebedingungen im Inserat/Bestellübersicht; bei Mängeln trägt der Verkäufer die Rücksendekosten.",
      "Erstattungen über den PSP auf die ursprüngliche Zahlmethode.",
    ],
    ipTitle: "7) Geistiges Eigentum",
    ip: [
      "UI, Marken, Software und Designs sind geschützt.",
      "Der Nutzer räumt eine weltweite, übertragbare, unterlizenzierbare, einfache Lizenz für hochgeladene Inhalte ein.",
      "Rechtswidrige Inhalte können entfernt werden.",
    ],
    abuseTitle: "8) Missbrauch & Sperre",
    abuse: [
      "Betrugsverdacht, illegale Aktivitäten, Spam oder Moderationsverstöße können zur Einschränkung/Sperre führen.",
      "Weitergabe von Daten an Behörden nach Rechtslage möglich.",
    ],
    liabilityTitle: "9) Haftung",
    liability: [
      "Keine Haftung für indirekte Schäden durch Ausfälle/Wartung/Drittparteien.",
      "Nutzer haften für eigene Inhalte und Handlungen.",
    ],
    terminationTitle: "10) Kündigung",
    termination:
      "Konto kann jederzeit geschlossen werden. Bei Verstößen oder rechtl./sicherheitsrelevanten Gründen ist eine Sperre/Kündigung möglich.",
    lawTitle: "11) Recht & Gerichtsstand",
    law:
      "Türkisches Recht; Gerichtsstand Istanbul.",
    updateTitle: "12) Aktualisierungen",
    update:
      "Die aktuelle Fassung wird hier veröffentlicht.",
    quick: "Schnellzugriff",
  },
};

export const metadata = { title: "Kullanım Şartları • Üreten Eller" };

export default function TermsPage() {
  const lang = useLang();
  const t = useMemo(() => T[lang] || T.tr, [lang]);
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <div className="page" dir={dir}>
      {/* Üst bar */}
      <header className="topbar">
        <div className="wrap">
          <a className="brand" href="/">{t.brand}</a>
          <nav><a className="btn" href="/logout?next=/">Çıkış</a></nav>
        </div>
      </header>

      {/* İçerik */}
      <main className="wrap">
        <article className="paper">
          <h1>{t.title}</h1>
          <p>{t.intro}</p>

          <h2 id="tanımlar">{t.defsTitle}</h2>
          <ul>{t.defs.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2>{t.membershipTitle}</h2>
          <ul>{t.membership.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2 id="yasaklar">{t.listingTitle}</h2>
          <p>{t.listingIntro}</p>
          <ul>{t.listing.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2>{t.paymentsTitle}</h2>
          <ul>{t.payments.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2>{t.intermediaryTitle}</h2>
          <p>{t.intermediary}</p>

          <h2>{t.returnsTitle}</h2>
          <ul>{t.returns.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2>{t.ipTitle}</h2>
          <ul>{t.ip.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2>{t.abuseTitle}</h2>
          <ul>{t.abuse.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2>{t.liabilityTitle}</h2>
          <ul>{t.liability.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2>{t.terminationTitle}</h2>
          <p>{t.termination}</p>

          <h2>{t.lawTitle}</h2>
          <p>{t.law}</p>

          <h2>{t.updateTitle}</h2>
          <p>{t.update}</p>

          <hr />
          <p className="quick">
            <strong>{t.quick}:</strong>{" "}
            <a href="/legal/gizlilik">Gizlilik</a> •{" "}
            <a href="/legal/kvkk-aydinlatma">KVKK</a> •{" "}
            <a href="/legal/mesafeli-satis-sozlesmesi">Mesafeli Satış</a>
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
