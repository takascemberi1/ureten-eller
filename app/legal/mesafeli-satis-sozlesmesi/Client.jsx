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

/** 4 dil – Mesafeli Satış Sözleşmesi (aracı model + escrow) */
const T = {
  tr: {
    brand: "Üreten Eller",
    title: "Mesafeli Satış Sözleşmesi",
    pre:
      "İşbu Mesafeli Satış Sözleşmesi (“Sözleşme”), 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri uyarınca elektronik ortamda kurulmuştur.",
    partiesTitle: "1) Taraflar",
    parties: [
      "Alıcı: Platformda sipariş veren tüketici/kullanıcı (sipariş ekranında kimlik ve iletişim bilgileri yer alır).",
      "Satıcı: İlgili ilanın sahibi olan ve ürün/hizmeti sunan kullanıcı (ilan/sipariş özetinde bilgileri yer alır).",
      "Aracı Hizmet Sağlayıcı: Üreten Eller (Şahıs İşletmesi) – Silivri VD/VKN: 9530226667, Adres: Gümüşyaka Mah., Rahmi Sk. No:27A, Silivri/İstanbul, WhatsApp: +90 505 727 91 43, E-posta: destek@ureten-eller.com.",
    ],
    subjectTitle: "2) Konu ve Kapsam",
    subject:
      "Alıcı’nın Satıcı’ya ait ilandan seçtiği ürün/hizmeti, bedeli karşılığında uzaktan iletişim araçlarıyla satın alması ve teslim/ifa koşullarıdır. Üreten Eller yalnızca aracı hizmet sağlayıcıdır.",
    productsTitle: "3) Ürün/Bedel/Ödeme",
    products: [
      "Ürün/hizmet türü, miktar/adet, vergiler dahil toplam bedel ve kargo ücreti sipariş özetinde yer alır.",
      "Ödeme, lisanslı ödeme kuruluşu (ör. PayTR, iyzico) aracılığıyla tahsil edilir ve teslim onayına kadar blokede tutulur (escrow).",
      "Alıcının teslim/ifa onayı veya taşıma/teslim belgesi ile bedel Satıcı’ya aktarılır; iade halinde PSP akışına uygun şekilde iade yapılır.",
    ],
    deliveryTitle: "4) Teslimat/İfa",
    delivery: [
      "Teslimat Satıcı tarafından, Alıcı’nın sipariş sırasında belirttiği adrese ve sürelerde gerçekleştirilir.",
      "Kargo bedeli ve teslim sorumluluğu ilanda/sipariş özetinde belirtilen şekildedir.",
      "Mücbir sebepler veya taşıyıcı kaynaklı gecikmelerde Satıcı derhal Alıcı’yı bilgilendirir.",
    ],
    rightTitle: "5) Cayma Hakkı (14 Gün)",
    rightIntro:
      "Tüketici, teslimden itibaren 14 gün içinde gerekçe göstermeksizin cayma hakkını kullanabilir.",
    rightEx:
      "İstisnalar: Alıcının istekleri doğrultusunda kişiselleştirilen ürünler; çabuk bozulabilen veya son kullanma tarihi geçebilecek ürünler; tesliminden sonra ambalajı açılan ve sağlık/hijyen açısından iadesi uygun olmayan ürünler; hizmet ifası başlanmış ve onayla icrası tamamlanmış dijital içerikler vb.",
    rightProcTitle: "6) Cayma ve İade Süreci",
    rightProc: [
      "Alıcı, cayma bildirimini platform mesajları veya İletişim sayfasındaki kanallardan Satıcı’ya iletir; Aracı kayıtları inceleyerek süreci kolaylaştırır.",
      "Ürün, orijinal kutusu/aksesuarları ile mevzuata uygun şekilde iade edilir. Ayıplı üründe iade kargo bedeli Satıcı’ya aittir.",
      "Cayma şartlarının sağlanması ve kargonun Satıcı’ya ulaşmasıyla bedel iade sürecine alınır.",
    ],
    defectTitle: "7) Ayıplı Mal ve Garanti",
    defect:
      "6502 sayılı Kanun uyarınca ayıplı mal halleri ve seçimlik haklar (bedel iadesi, ayıp oranında indirim, ücretsiz onarım/ayipsiz misli ile değişim) Satıcı’ya karşı kullanılabilir. Aracı, kayıt ve güvenli ödeme akışını yönetir.",
    commTitle: "8) Ücretlendirme ve Komisyon",
    comm:
      "Platform, ürün satışından komisyon almaz. Satıcı’nın premium/vitrin vb. hizmetler için ödediği bedeller Aracı’nın geliridir.",
    lawTitle: "9) Uygulanacak Hukuk ve Yetki",
    law:
      "Bu Sözleşme Türkiye Cumhuriyeti hukukuna tabidir. Tüketici uyuşmazlıklarında Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.",
    miscTitle: "10) Çeşitli Hükümler",
    misc: [
      "Taraf beyanları, sipariş ve bildirimler elektronik ortamda geçerlidir.",
      "Mücbir sebep: doğal afet, salgın, savaş, grev, resmi kararlar, altyapı arızaları vb.",
      "Metin güncellenebilir; en güncel sürüm bu sayfada yayımlanır.",
    ],
    quick: "Hızlı Geçiş",
  },

  en: {
    brand: "Ureten Eller",
    title: "Distance Sales Agreement",
    pre:
      "This Agreement is concluded electronically under Turkish Consumer Law No.6502 and the Regulation on Distance Contracts.",
    partiesTitle: "1) Parties",
    parties: [
      "Buyer: consumer/user placing the order (identity and contact appear on the order screen).",
      "Seller: listing owner offering the product/service (details in the listing/order).",
      "Intermediary Service Provider: Ureten Eller (Sole Proprietorship) – Silivri Tax Office/TIN: 9530226667, Address: Gumusyaka, Rahmi St. 27A, Silivri/Istanbul, WhatsApp: +90 505 727 91 43, Email: destek@ureten-eller.com.",
    ],
    subjectTitle: "2) Subject & Scope",
    subject:
      "Remote purchase by the Buyer of the Seller’s product/service for a price and the conditions of delivery/performance. Ureten Eller acts only as an intermediary.",
    productsTitle: "3) Product/Price/Payment",
    products: [
      "Type, quantity, total price incl. taxes and shipping appear in the order summary.",
      "Payment is processed via a licensed PSP (e.g., PayTR, iyzico) and held in escrow until delivery confirmation.",
      "Upon confirmation or carrier proof, funds are released to the Seller; refunds follow the PSP flow.",
    ],
    deliveryTitle: "4) Delivery/Performance",
    delivery: [
      "Delivery is by the Seller to the address specified by the Buyer within the indicated time.",
      "Shipping fee/responsibility are as stated in the listing/order.",
      "In force majeure or carrier delays, the Seller informs the Buyer promptly.",
    ],
    rightTitle: "5) Right of Withdrawal (14 Days)",
    rightIntro:
      "The consumer may withdraw within 14 days of delivery without giving any reason.",
    rightEx:
      "Exceptions: personalized goods, perishable items or those with risk of expiry, unsealed goods not suitable for return for health/hygiene reasons, and digital content/services fully performed upon explicit approval, etc.",
    rightProcTitle: "6) Withdrawal & Return Procedure",
    rightProc: [
      "Buyer notifies the Seller via platform messaging or the channels on the Contact page; the Intermediary reviews records and facilitates.",
      "Return with original packaging/accessories as required by law. For faulty goods, return shipping is borne by the Seller.",
      "Once conditions are met and shipment reaches the Seller, the refund process is initiated.",
    ],
    defectTitle: "7) Defective Goods & Warranty",
    defect:
      "Remedies under Law No.6502 (refund, price reduction, free repair/replacement) are exercised against the Seller. The Intermediary manages records and the secure payment flow.",
    commTitle: "8) Fees & Commission",
    comm:
      "The Platform does not charge sales commission. Revenues come from premium/showcase/ads purchased by the Seller.",
    lawTitle: "9) Governing Law & Jurisdiction",
    law:
      "Turkish law applies. Consumer Arbitration Committees/Courts are competent.",
    miscTitle: "10) Miscellaneous",
    misc: [
      "Electronic declarations, orders and notices are valid.",
      "Force majeure: natural disasters, epidemics, war, strikes, official acts, infrastructure failures, etc.",
      "This text may be updated; the latest version is published here.",
    ],
    quick: "Quick Links",
  },

  ar: {
    brand: "أُنتِج بالأيادي",
    title: "عقد البيع عن بُعد",
    pre:
      "يُبرم هذا العقد إلكترونيًا وفق قانون حماية المستهلك التركي رقم 6502 ولائحة العقود عن بُعد.",
    partiesTitle: "1) الأطراف",
    parties: [
      "المشتري: المستهلك/المستخدم الذي يقدّم الطلب (تظهر البيانات في شاشة الطلب).",
      "البائع: مالك الإعلان الذي يقدّم السلعة/الخدمة (تفاصيله في الإعلان/الطلب).",
      "مزوّد الخدمة الوسيط: «أُنتِج بالأيادي» (منشأة فردية) – دائرة ضرائب سيلفري/9530226667، العنوان: حي غوموشياكا، شارع رحمي 27A، سيلفري/إسطنبول، واتساب: ‎+90 505 727 91 43، بريد: destek@ureten-eller.com.",
    ],
    subjectTitle: "2) الموضوع والنطاق",
    subject:
      "شراء عن بُعد لسلعة/خدمة من البائع مقابل ثمن، وشروط التسليم/الأداء. تعمل المنصّة كوسيط فقط.",
    productsTitle: "3) المنتج/الثمن/الدفع",
    products: [
      "النوع والكمية والسعر الإجمالي شامل الضرائب والشحن في ملخص الطلب.",
      "يُعالج الدفع عبر مزوّد مرخّص (PayTR, iyzico) ويُحجز حتى تأكيد الاستلام.",
      "عند التأكيد أو إثبات شركة النقل، تُحوّل الأموال للبائع؛ الاسترداد حسب مسار جهة الدفع.",
    ],
    deliveryTitle: "4) التسليم/الأداء",
    delivery: [
      "يقوم البائع بالتسليم لعنوان المشتري خلال المدد المحددة.",
      "رسوم ومسؤولية الشحن كما في الإعلان/الطلب.",
      "في القوة القاهرة أو تأخير شركة النقل، يُخطر البائع المشتري فورًا.",
    ],
    rightTitle: "5) حق الانسحاب (14 يومًا)",
    rightIntro:
      "يجوز للمستهلك الانسحاب خلال 14 يومًا من التسليم دون إبداء سبب.",
    rightEx:
      "استثناءات: السلع المُفصّلة حسب الطلب؛ السريعة التلف أو القابلة لانتهاء الصلاحية؛ السلع المفتوحة غير المناسبة للإرجاع لأسباب صحية/نظافة؛ المحتوى/الخدمة الرقمية التي أُنجزت بالكامل بموافقة صريحة…",
    rightProcTitle: "6) إجراء الانسحاب والإرجاع",
    rightProc: [
      "يُخطر المشتري البائع عبر رسائل المنصّة أو قنوات «اتصال»؛ ويُيسّر الوسيط العملية.",
      "إرجاع السلعة بعبوتها وإكسسواراتها وفق القانون. في العيب يتحمّل البائع رسوم الإرجاع.",
      "بعد استيفاء الشروط ووصول الشحنة للبائع، يبدأ الاسترداد.",
    ],
    defectTitle: "7) السلعة المعيبة والضمان",
    defect:
      "تمارس حقوق القانون 6502 (الرد، التخفيض، الإصلاح/الاستبدال) تجاه البائع. الوسيط يدير السجلات وتدفق الدفع الآمن.",
    commTitle: "8) الرسوم والعمولة",
    comm:
      "لا تأخذ المنصّة عمولة بيع. الدخل من العضويات المميّزة/العرض/الإعلانات.",
    lawTitle: "9) القانون والاختصاص",
    law:
      "يُطبّق القانون التركي. لجان ومحاكم المستهلك مختصّة.",
    miscTitle: "10) أحكام متفرّقة",
    misc: [
      "البيانات والطلبات والإشعارات الإلكترونية صحيحة.",
      "القوة القاهرة: كوارث طبيعية، أوبئة، حرب، إضراب، قرارات رسمية، أعطال بنية تحتية…",
      "قد يُحدّث هذا النص؛ تُنشر آخر نسخة هنا.",
    ],
    quick: "روابط سريعة",
  },

  de: {
    brand: "Ureten Eller",
    title: "Fernabsatzvertrag",
    pre:
      "Dieser Vertrag wird elektronisch nach dem türkischen Verbraucherrecht Nr.6502 und der Fernabsatzverordnung geschlossen.",
    partiesTitle: "1) Parteien",
    parties: [
      "Käufer: Verbraucher/Nutzer, der bestellt (Daten auf der Bestellseite).",
      "Verkäufer: Inhaber der Anzeige (Details in Anzeige/Bestellung).",
      "Vermittler: Ureten Eller (Einzelunternehmen) – Finanzamt Silivri/St-Nr.: 9530226667, Adresse: Gumusyaka, Rahmi-Str. 27A, Silivri/Istanbul, WhatsApp: +90 505 727 91 43, E-Mail: destek@ureten-eller.com.",
    ],
    subjectTitle: "2) Gegenstand & Umfang",
    subject:
      "Fernkauf der Ware/Dienstleistung des Verkäufers gegen Entgelt sowie Liefer-/Leistungsbedingungen. Ureten Eller handelt nur als Vermittler.",
    productsTitle: "3) Ware/Preis/Zahlung",
    products: [
      "Art, Menge, Gesamtpreis inkl. Steuern und Versand stehen in der Bestellübersicht.",
      "Zahlung über lizenzierten Zahlungsdienst (z. B. PayTR, iyzico) und treuhänderische Verwahrung bis Lieferbestätigung.",
      "Nach Bestätigung/Transportbeleg: Auszahlung an den Verkäufer; Erstattungen gem. PSP-Prozess.",
    ],
    deliveryTitle: "4) Lieferung/Leistung",
    delivery: [
      "Lieferung durch den Verkäufer an die vom Käufer angegebene Anschrift innerhalb der angegebenen Frist.",
      "Versandkosten/-verantwortung wie in Anzeige/Bestellung.",
      "Bei höherer Gewalt/Transportverzug informiert der Verkäufer den Käufer.",
    ],
    rightTitle: "5) Widerrufsrecht (14 Tage)",
    rightIntro:
      "Der Verbraucher kann binnen 14 Tagen ab Lieferung ohne Angabe von Gründen widerrufen.",
    rightEx:
      "Ausnahmen: personalisierte Waren; schnell verderbliche/ablaufgefährdete Waren; nach Öffnung aus Gesundheits-/Hygienegründen nicht rückgabefähige Waren; vollständig erbrachte digitale Inhalte/Dienste mit ausdrücklicher Zustimmung usw.",
    rightProcTitle: "6) Widerruf & Rückgabe",
    rightProc: [
      "Mitteilung an den Verkäufer via Plattform oder Kanäle der Kontaktseite; der Vermittler erleichtert den Ablauf.",
      "Rückgabe mit Originalverpackung/Zubehör gem. Gesetz. Bei Mängeln trägt der Verkäufer die Rücksendekosten.",
      "Nach Eingang und Prüfung wird die Rückerstattung eingeleitet.",
    ],
    defectTitle: "7) Mängel & Gewährleistung",
    defect:
      "Rechte nach Gesetz Nr.6502 (Rückzahlung, Minderung, Nachbesserung/Ersatzlieferung) gegenüber dem Verkäufer. Der Vermittler führt Aufzeichnungen und den sicheren Zahlungsfluss.",
    commTitle: "8) Entgelte & Provision",
    comm:
      "Keine Verkaufsprovision der Plattform. Einnahmen aus Premium/Schaufenster/Werbung.",
    lawTitle: "9) Recht & Gerichtsstand",
    law:
      "Türkisches Recht. Zuständig sind Verbraucher­schlichtungsstellen/-gerichte.",
    miscTitle: "10) Sonstiges",
    misc: [
      "Elektronische Erklärungen/Bestellungen/Benachrichtigungen sind wirksam.",
      "Höhere Gewalt: Naturkatastrophen, Epidemien, Krieg, Streik, amtliche Akte, Infrastrukturstörungen etc.",
      "Aktualisierungen möglich; die neueste Fassung steht hier.",
    ],
    quick: "Schnellzugriff",
  },
};

export const metadata = { title: "Mesafeli Satış • Üreten Eller" };

export default function DistanceSalesPage() {
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
          <p>{t.pre}</p>

          <h2>{t.partiesTitle}</h2>
          <ul>{t.parties.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2>{t.subjectTitle}</h2>
          <p>{t.subject}</p>

          <h2>{t.productsTitle}</h2>
          <ul>{t.products.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2>{t.deliveryTitle}</h2>
          <ul>{t.delivery.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2>{t.rightTitle}</h2>
          <p>{t.rightIntro}</p>
          <p><strong>→ {lang==="tr"?"İstisnalar":"Exceptions"}:</strong> {t.rightEx}</p>

          <h2>{t.rightProcTitle}</h2>
          <ul>{t.rightProc.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2>{t.defectTitle}</h2>
          <p>{t.defect}</p>

          <h2>{t.commTitle}</h2>
          <p>{t.comm}</p>

          <h2>{t.lawTitle}</h2>
          <p>{t.law}</p>

          <h2>{t.miscTitle}</h2>
          <ul>{t.misc.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <hr />
          <p className="quick">
            <strong>{t.quick}:</strong>{" "}
            <a href="/legal/teslimat-iade">Teslimat & İade</a> •{" "}
            <a href="/legal/kullanim-sartlari">Kullanım Şartları</a> •{" "}
            <a href="/legal/gizlilik">Gizlilik</a>
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
