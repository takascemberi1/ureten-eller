"use client";
import { useEffect, useMemo, useState } from "react";

/** Dil: localStorage.lang → tr | en | ar | de */
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

/** 4 dil — teslimat, iade, cayma, hasar, escrow akışı */
const T = {
  tr: {
    brand: "Üreten Eller",
    title: "Teslimat & İade",
    intro:
      "Üreten Eller aracı hizmet sağlayıcıdır. Teslimat ve iade süreçlerinden birincil olarak Satıcı sorumludur; biz kayıtları tutar, güvenli ödeme (escrow) akışını yönetir ve çözümü kolaylaştırırız.",
    shipTitle: "1) Teslimat Koşulları",
    shipList: [
      "Teslimat, Satıcı tarafından Alıcı’nın sipariş sırasında belirttiği adrese gerçekleştirilir.",
      "Kargo ücreti/taşıma sorumluluğu, ilanda ve sipariş özetinde belirtilen şekildedir.",
      "Hazırlık süresi ürünün niteliğine göre değişebilir (kişiye özel üretim, elde yapım vb.).",
      "Mücbir sebep/taşıyıcı kaynaklı gecikmelerde Satıcı, Alıcı’yı derhal bilgilendirir.",
    ],
    timeTitle: "2) Teslim Süreleri",
    time:
      "Standart ürünlerde 1–7 iş günü içinde kargolama amaçlanır. Kişiye özel/elde üretim ürünlerde süre ilanda belirtilir.",
    addressTitle: "3) Adres ve Teslim Almama",
    addressList: [
      "Adresin doğruluğu Alıcı sorumluluğundadır; yanlış/adrese ulaşılamama halinde ek kargo bedeli oluşabilir.",
      "Alıcı’nın paketi teslim almaması halinde, iade/yeniden gönderim süreçleri ilandaki koşullara tabidir.",
    ],
    damageTitle: "4) Kargo Hasarı ve Tutanak",
    damageList: [
      "Paket hasarlı ise kargo görevlisi yanındayken tutanak tutturunuz ve fotoğraf çekiniz.",
      "Hasar tutanağı olmayan başvurularda inceleme uzayabilir; satıcıyla iletişime geçiniz.",
    ],
    withdrawTitle: "5) Cayma Hakkı (14 Gün)",
    withdrawIntro:
      "Tüketici; teslimden itibaren 14 gün içinde gerekçe göstermeksizin cayabilir.",
    withdrawExTitle: "İstisnalar (Örnek)",
    withdrawEx: [
      "Alıcı talebine göre kişiselleştirilen ürünler.",
      "Çabuk bozulabilen/son kullanma tarihi geçebilecek ürünler.",
      "Hijyen sebebiyle iadesi uygun olmayan, ambalajı açılmış ürünler.",
      "Alıcının onayıyla ifası tamamlanan dijital içerik/hizmetler.",
    ],
    returnTitle: "6) İade Süreci",
    returnList: [
      "Cayma/iade talebini platform mesajları veya İletişim sayfasındaki kanallardan Satıcı’ya iletiniz (sipariş numarasıyla).",
      "Ürün, mümkünse orijinal ambalaj/aksesuarlarıyla, yeniden satılabilir halde gönderilmelidir.",
      "Ayıplı mal hallerinde iade kargo bedeli Satıcı’ya aittir; caymada aksi ilanda belirtilmedikçe Alıcı öder.",
    ],
    refundTitle: "7) Ücret İadesi ve Escrow",
    refundList: [
      "Ödeme lisanslı ödeme kuruluşu (örn. PayTR, iyzico) üzerinden alınır ve teslim onayına kadar blokede tutulur.",
      "Cayma/iade şartları sağlandığında, ödeme kuruluşu akışına göre bedel iade sürecine alınır.",
      "İade; kullanılan ödeme yöntemine ve bankaya bağlı olarak hesabınıza yansıyana dek birkaç iş günü sürebilir.",
    ],
    cancelTitle: "8) Kargolama Öncesi İptal",
    cancel:
      "Satıcı ürünü kargolamadan önce Alıcı iptal talebinde bulunabilir. İptal onayıyla bedel bloke çözülerek iade akışına alınır.",
    exchangeTitle: "9) Değişim",
    exchange:
      "Değişim imkânı Satıcı’nın stok ve ilan koşullarına bağlıdır; aksi halde iade prosedürü uygulanır.",
    disputeTitle: "10) Uyuşmazlık",
    dispute:
      "Aracı olarak kayıtları inceler ve tarafları bilgilendiririz. Çözümsüzlük halinde tüketici uyuşmazlıklarında Tüketici Hakem Heyetleri/Tüketici Mahkemeleri yetkilidir.",
    quick: "Hızlı Geçiş",
  },

  en: {
    brand: "Ureten Eller",
    title: "Shipping & Returns",
    intro:
      "Ureten Eller is an intermediary. The Seller is primarily responsible for delivery/returns; we keep records, manage secure escrow payments and facilitate resolution.",
    shipTitle: "1) Delivery Conditions",
    shipList: [
      "Delivery is made by the Seller to the address provided by the Buyer.",
      "Shipping fee/liability follow the listing and order summary.",
      "Preparation time may vary (custom/handmade items).",
      "Delays due to force majeure/carrier must be promptly notified by the Seller.",
    ],
    timeTitle: "2) Lead Times",
    time:
      "Standard items are targeted to ship within 1–7 business days. Custom/handmade timelines are stated in the listing.",
    addressTitle: "3) Address & Non-Receipt",
    addressList: [
      "Address accuracy is the Buyer’s responsibility; re-shipping may incur additional cost.",
      "If the Buyer does not take delivery, return/re-ship terms follow the listing policies.",
    ],
    damageTitle: "4) Transit Damage & Report",
    damageList: [
      "If the package is damaged, request a courier report on the spot and take photos.",
      "Lack of a damage report may delay investigation; contact the Seller.",
    ],
    withdrawTitle: "5) Right of Withdrawal (14 Days)",
    withdrawIntro:
      "Consumers may withdraw within 14 days of delivery without any reason.",
    withdrawExTitle: "Exceptions (Examples)",
    withdrawEx: [
      "Personalized goods made to Buyer’s request.",
      "Perishables/expiry-risk goods.",
      "Unsealed goods not suitable for return for health/hygiene.",
      "Digital content/services fully performed upon explicit approval.",
    ],
    returnTitle: "6) Return Procedure",
    returnList: [
      "Notify the Seller via platform messaging or Contact channels (with order number).",
      "Return in original packaging/accessories where possible, in resellable condition.",
      "For faulty goods, return shipping is borne by the Seller; for withdrawal, unless stated otherwise, by the Buyer.",
    ],
    refundTitle: "7) Refund & Escrow",
    refundList: [
      "Payments are processed via licensed PSPs (e.g., PayTR, iyzico) and held in escrow until delivery confirmation.",
      "Once return conditions are met, refunds follow the PSP flow.",
      "Bank posting times may take several business days.",
    ],
    cancelTitle: "8) Cancellation Before Shipment",
    cancel:
      "Buyer may request cancellation before shipment. Upon confirmation, escrow is released into the refund flow.",
    exchangeTitle: "9) Exchanges",
    exchange:
      "Exchanges depend on Seller stock/listing terms; otherwise, the return procedure applies.",
    disputeTitle: "10) Disputes",
    dispute:
      "We review records and inform parties. If unresolved, Consumer Arbitration Committees/Courts are competent.",
    quick: "Quick Links",
  },

  ar: {
    brand: "أُنتِج بالأيادي",
    title: "التسليم والإرجاع",
    intro:
      "«أُنتِج بالأيادي» وسيط. يتحمّل البائع المسؤولية الأساسية عن التسليم/الإرجاع؛ ونحن ندير الحجز (الضمان) ونسهّل الحل.",
    shipTitle: "1) شروط التسليم",
    shipList: [
      "يُجري البائع التسليم لعنوان المشتري.",
      "رسوم/مسؤولية الشحن وفق الإعلان وملخص الطلب.",
      "قد تختلف مدة التجهيز (المخصص/المصنوع يدويًا).",
      "عند القوة القاهرة/تأخير الناقل يُخطر البائع المشتري فورًا.",
    ],
    timeTitle: "2) المدد",
    time:
      "تستهدف المنتجات القياسية الشحن خلال 1–7 أيام عمل. تُذكر مدد المنتجات المخصصة في الإعلان.",
    addressTitle: "3) العنوان وعدم الاستلام",
    addressList: [
      "دقة العنوان مسؤولية المشتري؛ قد تُفرض كلفة إضافية للإرسال مجددًا.",
      "عند عدم استلام الطرد، تُطبّق شروط الإعلان للإرجاع/إعادة الإرسال.",
    ],
    damageTitle: "4) ضرر الشحن ومحضر",
    damageList: [
      "إن كان الطرد متضررًا فأبلغ شركة النقل فورًا واطلب محضرًا والتقط صورًا.",
      "غياب المحضر قد يؤخر المعالجة؛ تواصل مع البائع.",
    ],
    withdrawTitle: "5) حق الانسحاب (14 يومًا)",
    withdrawIntro:
      "يجوز للمستهلك الانسحاب خلال 14 يومًا من التسليم دون سبب.",
    withdrawExTitle: "الاستثناءات (أمثلة)",
    withdrawEx: [
      "السلع المُخصّصة حسب طلب المشتري.",
      "السلع القابلة للتلف/الانتهاء.",
      "السلع المفتوحة غير المناسبة للإرجاع لأسباب صحية/نظافة.",
      "المحتوى/الخدمة الرقمية المُنجزة بالكامل بموافقة صريحة.",
    ],
    returnTitle: "6) إجراء الإرجاع",
    returnList: [
      "أبلغ البائع عبر رسائل المنصّة أو قنوات «اتصال» (مع رقم الطلب).",
      "إرجاع بالعبوة/الملحقات إن أمكن وبحالة قابلة للبيع.",
      "في العيب يتحمّل البائع الشحن؛ في الانسحاب يتحمّله المشتري ما لم يُذكر خلاف ذلك.",
    ],
    refundTitle: "7) الاسترداد والضمان",
    refundList: [
      "تُعالج المدفوعات عبر مزوّد دفع مرخّص وتُحتجز حتى تأكيد التسليم.",
      "عند استيفاء شروط الإرجاع يبدأ مسار الاسترداد عبر مزوّد الدفع.",
      "قد تستغرق عودة المبلغ عدة أيام عمل بحسب البنك.",
    ],
    cancelTitle: "8) الإلغاء قبل الشحن",
    cancel:
      "يمكن طلب الإلغاء قبل الشحن. عند الموافقة، يُحرَّر الحجز وتبدأ عملية الاسترداد.",
    exchangeTitle: "9) الاستبدال",
    exchange:
      "الاستبدال حسب مخزون البائع وشروط الإعلان؛ وإلا تُطبّق إجراءات الإرجاع.",
    disputeTitle: "10) النزاعات",
    dispute:
      "نراجع السجلات ونبلّغ الأطراف. عند عدم الحل تكون هيئات/محاكم المستهلك مختصّة.",
    quick: "روابط سريعة",
  },

  de: {
    brand: "Ureten Eller",
    title: "Lieferung & Rückgabe",
    intro:
      "Ureten Eller ist Vermittler. Für Lieferung/Rückgabe ist primär der Verkäufer verantwortlich; wir führen Aufzeichnungen, verwalten Treuhandzahlungen (Escrow) und erleichtern die Klärung.",
    shipTitle: "1) Lieferbedingungen",
    shipList: [
      "Lieferung durch den Verkäufer an die vom Käufer angegebene Anschrift.",
      "Versandkosten/-haftung gem. Anzeige und Bestellübersicht.",
      "Vorbereitungszeit variiert (personalisiert/Handarbeit).",
      "Bei höherer Gewalt/Transportverzug informiert der Verkäufer umgehend.",
    ],
    timeTitle: "2) Lieferzeiten",
    time:
      "Standardware: Versandziel 1–7 Werktage. Für personalisierte/Handarbeit steht die Frist in der Anzeige.",
    addressTitle: "3) Adresse & Nichtabnahme",
    addressList: [
      "Adressgenauigkeit liegt beim Käufer; erneuter Versand kann kostenpflichtig sein.",
      "Bei Nichtabnahme gelten Rücksende/Neuversand-Bedingungen der Anzeige.",
    ],
    damageTitle: "4) Transportschaden & Protokoll",
    damageList: [
      "Beschädigte Sendung? Vor Ort Protokoll mit dem Zusteller aufnehmen und Fotos machen.",
      "Ohne Protokoll kann die Prüfung verzögert werden; wenden Sie sich an den Verkäufer.",
    ],
    withdrawTitle: "5) Widerrufsrecht (14 Tage)",
    withdrawIntro:
      "Verbraucher können binnen 14 Tagen ab Lieferung ohne Angabe von Gründen widerrufen.",
    withdrawExTitle: "Ausnahmen (Beispiele)",
    withdrawEx: [
      "Nach Wunsch des Käufers personalisierte Waren.",
      "Verderbliche/ablaufgefährdete Waren.",
      "Aus Gesundheits-/Hygienegründen entsiegelte, nicht rückgabefähige Waren.",
      "Vollständig erbrachte digitale Inhalte/Dienste mit ausdrücklicher Zustimmung.",
    ],
    returnTitle: "6) Rückgabeablauf",
    returnList: [
      "Melden Sie den Wunsch an den Verkäufer über die Plattform oder Kontaktkanäle (mit Bestellnummer).",
      "Rückgabe möglichst in Originalverpackung/Zubehör, in wiederverkaufsfähigem Zustand.",
      "Bei Mängeln trägt der Verkäufer die Rücksendekosten; beim Widerruf in der Regel der Käufer, sofern nicht anders angegeben.",
    ],
    refundTitle: "7) Erstattung & Treuhand",
    refundList: [
      "Zahlungen über lizenzierte Zahlungsdienste (z. B. PayTR, iyzico) und treuhänderische Verwahrung bis Lieferbestätigung.",
      "Nach Erfüllung der Bedingungen: Erstattung gem. PSP-Prozess.",
      "Bankseitige Wertstellung kann einige Werktage dauern.",
    ],
    cancelTitle: "8) Stornierung vor Versand",
    cancel:
      "Stornierung vor Versand möglich; nach Bestätigung wird die Treuhand freigegeben und die Erstattung angestoßen.",
    exchangeTitle: "9) Umtausch",
    exchange:
      "Umtausch abhängig von Lager/Anzeigenbedingungen des Verkäufers; andernfalls gilt die Rückgabe.",
    disputeTitle: "10) Streitfälle",
    dispute:
      "Wir prüfen Protokolle und informieren die Parteien. Ungeklärt? Zuständig sind Verbraucher­schlichtungsstellen/-gerichte.",
    quick: "Schnellzugriff",
  },
};

export const metadata = { title: "Teslimat & İade • Üreten Eller" };

export default function ShippingReturnsPage() {
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

        <h2>{t.shipTitle}</h2>
        <ul>{t.shipList.map((x,i)=><li key={i}>{x}</li>)}</ul>

        <h2>{t.timeTitle}</h2>
        <p>{t.time}</p>

        <h2>{t.addressTitle}</h2>
        <ul>{t.addressList.map((x,i)=><li key={i}>{x}</li>)}</ul>

        <h2>{t.damageTitle}</h2>
        <ul>{t.damageList.map((x,i)=><li key={i}>{x}</li>)}</ul>

        <h2>{t.withdrawTitle}</h2>
        <p>{t.withdrawIntro}</p>

        <h3>{t.withdrawExTitle}</h3>
        <ul>{t.withdrawEx.map((x,i)=><li key={i}>{x}</li>)}</ul>

        <h2>{t.returnTitle}</h2>
        <ul>{t.returnList.map((x,i)=><li key={i}>{x}</li>)}</ul>

        <h2>{t.refundTitle}</h2>
        <ul>{t.refundList.map((x,i)=><li key={i}>{x}</li>)}</ul>

        <h2>{t.cancelTitle}</h2>
        <p>{t.cancel}</p>

        <h2>{t.exchangeTitle}</h2>
        <p>{t.exchange}</p>

        <h2>{t.disputeTitle}</h2>
        <p>{t.dispute}</p>

        <hr />
        <p className="quick">
          <strong>{t.quick}:</strong>{" "}
          <a href="/legal/mesafeli-satis-sozlesmesi">Mesafeli Satış</a> •{" "}
          <a href="/legal/kullanim-sartlari">Kullanım Şartları</a> •{" "}
          <a href="/legal/gizlilik">Gizlilik</a>
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
