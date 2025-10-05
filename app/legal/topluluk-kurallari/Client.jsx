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

/** 4 dil — Topluluk Kuralları & Yasaklı Ürünler */
const T = {
  tr: {
    brand: "Üreten Eller",
    title: "Topluluk Kuralları & Yasaklı Ürünler",
    intro:
      "Üreten Eller; güvenli, saygılı ve yasal bir pazar deneyimi amaçlar. Aşağıdaki kurallar tüm kullanıcılar için geçerlidir. İhlaller, içerik kaldırma ve hesap kısıtlama/askıya alma ile sonuçlanabilir.",
    behaviorTitle: "1) Davranış Kuralları",
    behavior: [
      "Saygılı iletişim: hakaret, nefret söylemi, taciz, tehdit ve ayrımcılık yasaktır.",
      "Dolandırıcılık ve manipülasyon yasaktır. Sahte belge, sahte takip/puan vb. kabul edilmez.",
      "Gizlilik: üçüncü kişilerin kişisel verilerini izinsiz paylaşmayın.",
      "Doğruluk: ilan, fiyat, stok ve teslim bilgilerini doğru girin; aldatıcı pratiklerden kaçının.",
    ],
    listingTitle: "2) İlan İçeriği Standartları",
    listing: [
      "Net başlık, gerçek fotoğraf ve doğru açıklama kullanın.",
      "Fiyat, teslim süresi, iade/ değişim şartlarını açıkça belirtin.",
      "Telif/marka/sanatsal hakları ihlal eden görsel veya metin kullanmayın.",
      "Arama manipülasyonu (etiket doldurma, yanıltıcı kategori) yasaktır.",
    ],
    escrowTitle: "3) Ödeme Güvenliği (Escrow)",
    escrow:
      "Ödemeler lisanslı ödeme kuruluşları (PayTR, iyzico) üzerinden tahsil edilir ve teslim onayına kadar blokede tutulur. Teslim onayı/taşıyıcı belgesi ile bedel satıcıya aktarılır. İade/cayma hallerinde PSP akışı uygulanır.",
    bannedTitle: "4) Yasaklı Ürün & Hizmetler (Kesin Yasak)",
    bannedIntro:
      "Aşağıdaki kategoriler mevzuat ve platform güvenliği gereği yasaktır. İhlalde ilan derhal kaldırılır ve hesap kısıtlanabilir:",
    banned: [
      "Alkol ve alkol türevleri.",
      "Tütün, tütün ürünleri ve elektronik sigara/vape ürünleri.",
      "Cinsel içerikli ürünler ve yetişkin amaçlı materyaller.",
      "Canlı hayvan, vahşi yaşamdan elde edilen ürünler.",
      "Yasa dışı maddeler, uyuşturucular, zararlı/tehlikeli kimyasallar.",
      "Reçeteye tabi/ilaç niteliğindeki ürünler, tıbbi cihazların yetkisiz satışı.",
      "Silah, mühimmat, patlayıcı, bıçak/yaralayıcı aletler ve bunların aksamları.",
      "Kaçak/çalıntı mallar, sahte/imitasyon marka ürünler; korsan yazılım/medya.",
      "Kişisel veriler, finansal bilgi, hesap/sim kart/IMEI gibi yasa dışı hizmetler.",
      "Kumar, bahis, sahte belge ve her türlü yasalara aykırı hizmet.",
    ],
    restrictedTitle: "5) Sınırlı/Koşullu İçerikler",
    restricted: [
      "Gıda, kozmetik, oyuncak vb. ürünlerde mevzuata uygun etiket/izin beyanı zorunludur.",
      "Kişiye özel ve hijyenik ürünlerde iade istisnaları açıkça belirtilmelidir.",
      "Tehlikeli olabilecek hobi malzemeleri için güvenlik uyarıları eklenmelidir.",
    ],
    minorsTitle: "6) Yaş Sınırı",
    minors:
      "18 yaşından küçükler platformu yasal temsilci onayı olmadan kullanamaz. Yetişkin gözetimi gerektiren ürünlerin satışı yapılamaz.",
    reportTitle: "7) İhlal Bildirimi",
    report:
      "Herhangi bir ihlal görürseniz ilan numarasıyla birlikte İletişim sayfasından bildirin. Kayıtlar incelenir ve gerekirse resmi mercilerle işbirliği yapılır.",
    penaltiesTitle: "8) Yaptırımlar",
    penalties: [
      "İçerik kaldırma, görünürlük kısıtlama, geçici/kalıcı hesap askıya alma.",
      "Tekrarlayan/ ağır ihlallerde kalıcı uzaklaştırma ve resmi başvuru.",
    ],
    lawTitle: "9) Uygulanacak Hukuk",
    law:
      "Kurallar Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda İstanbul mahkemeleri yetkilidir.",
    quick: "Hızlı Geçiş",
  },

  en: {
    brand: "Ureten Eller",
    title: "Community Guidelines & Prohibited Items",
    intro:
      "We aim for a safe, respectful and lawful marketplace. The rules below apply to all users. Violations may lead to removal and account restriction/suspension.",
    behaviorTitle: "1) Behavior",
    behavior: [
      "Be respectful: no harassment, hate speech, threats or discrimination.",
      "No fraud/manipulation. No fake docs, fake reviews/follows.",
      "Privacy: do not share third-party personal data without consent.",
      "Accuracy: truthful listings, prices, stock and delivery info.",
    ],
    listingTitle: "2) Listing Standards",
    listing: [
      "Use clear titles, real photos and accurate descriptions.",
      "State price, delivery time, return/exchange terms clearly.",
      "No IP-infringing images/text or counterfeit branding.",
      "No search manipulation (tag stuffing, wrong categories).",
    ],
    escrowTitle: "3) Payment Safety (Escrow)",
    escrow:
      "Payments run via licensed PSPs (PayTR, iyzico) and are held in escrow until delivery confirmation. Refund/withdrawal flows follow PSP rules.",
    bannedTitle: "4) Prohibited Items/Services (Strict Ban)",
    bannedIntro:
      "The categories below are strictly forbidden. Violations result in removal and account actions:",
    banned: [
      "Alcohol and derivatives.",
      "Tobacco products and e-cig/vape items.",
      "Adult/sexual products and explicit materials.",
      "Live animals and wildlife products.",
      "Illegal drugs, harmful/dangerous chemicals.",
      "Prescription-only medicines; unauthorized medical devices.",
      "Weapons, ammunition, explosives, and harmful blades/tools.",
      "Stolen/contraband goods, counterfeits, pirated software/media.",
      "Personal data/financial info trading; SIM/IMEI/account services.",
      "Gambling, betting, forged documents, and any unlawful service.",
    ],
    restrictedTitle: "5) Restricted/Conditional",
    restricted: [
      "Food, cosmetics, toys require compliant labels/permissions.",
      "Personalized/hygienic items must disclose return exceptions.",
      "Potentially hazardous hobby supplies require safety warnings.",
    ],
    minorsTitle: "6) Minors",
    minors:
      "Under 18 may not use the platform without legal guardian consent. Adults-only or supervised products are not permitted.",
    reportTitle: "7) Reporting",
    report:
      "If you see a breach, report with the listing/order number via the Contact page. We review logs and cooperate with authorities if needed.",
    penaltiesTitle: "8) Enforcement",
    penalties: [
      "Removal, visibility limits, temporary/permanent suspension.",
      "Repeat/severe violations → permanent ban and legal escalation.",
    ],
    lawTitle: "9) Law",
    law:
      "Governed by Turkish law. Istanbul courts have jurisdiction.",
    quick: "Quick Links",
  },

  ar: {
    brand: "أُنتِج بالأيادي",
    title: "إرشادات المجتمع والعناصر المحظورة",
    intro:
      "نهدف إلى سوق آمن ومحترم ومتوافق مع القانون. يسري ما يلي على جميع المستخدمين. قد تؤدي المخالفات إلى إزالة المحتوى وتعليق الحساب.",
    behaviorTitle: "1) السلوك",
    behavior: [
      "الاحترام واجب: لا للتحرش أو خطاب الكراهية أو التهديد أو التمييز.",
      "ممنوع الاحتيال والتلاعب والمراجعات/المتابعات المزيفة.",
      "الخصوصية: لا تشارك بيانات الآخرين دون موافقة.",
      "الدقة: معلومات صحيحة في الإعلان والسعر والتسليم.",
    ],
    listingTitle: "2) معايير الإعلان",
    listing: [
      "عنوان واضح وصور حقيقية ووصف دقيق.",
      "اذكر السعر، زمن التسليم، شروط الإرجاع/الاستبدال بوضوح.",
      "ممنوع انتهاك الملكية الفكرية أو العلامات المقلدة.",
      "ممنوع التحايل على البحث (وسوم مضللة/تصنيف خاطئ).",
    ],
    escrowTitle: "3) أمان الدفع (حجز/ضمان)",
    escrow:
      "تُنفّذ المدفوعات عبر مزوّدين مرخّصين (PayTR، iyzico) وتُحجز حتى تأكيد التسليم. الاسترداد وفق مسار مزوّد الدفع.",
    bannedTitle: "4) العناصر/الخدمات المحظورة (حظر صارم)",
    bannedIntro:
      "الفئات التالية محظورة بشكل قاطع. المخالفة تؤدي إلى الإزالة وإجراءات على الحساب:",
    banned: [
      "الكحول ومشتقاته.",
      "التبغ ومنتجاته والسجائر الإلكترونية/الفيب.",
      "منتجات ومحتويات جنسية.",
      "حيوانات حية ومنتجات الحياة البرية.",
      "مواد غير قانونية وكيماويات خطرة.",
      "أدوية بوصفة وأجهزة طبية غير مصرّح بها.",
      "أسلحة وذخائر ومتفجرات وأدوات حادّة ضارة.",
      "بضائع مسروقة/مهرّبة وتقليد وعناصر مقرصنة.",
      "الاتجار بالبيانات الشخصية/المالية وخدمات الحساب/SIM/IMEI.",
      "قمار/مراهنة ومستندات مزيفة وأي خدمة غير قانونية.",
    ],
    restrictedTitle: "5) محتويات مقيّدة/مشروطة",
    restricted: [
      "الأغذية/التجميل/الألعاب تتطلب بطاقات وتعليمات متوافقة.",
      "المنتجات المخصّصة/الصحية يجب توضيح استثناءات الإرجاع لها.",
      "مستلزمات الهوايات الخطرة تستلزم تحذيرات أمان.",
    ],
    minorsTitle: "6) القُصّر",
    minors:
      "تحت 18 عامًا لا يستخدمون المنصّة دون وليّ. منتجات للبالغين/تحت إشراف ممنوعة.",
    reportTitle: "7) الإبلاغ",
    report:
      "أبلِغ مع رقم الإعلان/الطلب عبر صفحة «اتصال». نراجع السجلات ونتعاون مع الجهات المختصة عند الحاجة.",
    penaltiesTitle: "8) التنفيذ",
    penalties: [
      "إزالة المحتوى وتقييد الظهور وتعليق مؤقت/دائم.",
      "تكرار/مخالفات جسيمة → حظر دائم وإجراءات قانونية.",
    ],
    lawTitle: "9) القانون",
    law:
      "يُطبّق القانون التركي. الاختصاص لمحاكم إسطنبول.",
    quick: "روابط سريعة",
  },

  de: {
    brand: "Ureten Eller",
    title: "Community-Richtlinien & Verbotene Artikel",
    intro:
      "Wir wollen einen sicheren, respektvollen und rechtskonformen Marktplatz. Verstöße können zur Entfernung und (dauerhaften) Sperre führen.",
    behaviorTitle: "1) Verhalten",
    behavior: [
      "Respekt: kein Hate, keine Belästigung, Drohung oder Diskriminierung.",
      "Kein Betrug/Manipulation; keine Fake-Bewertungen/Follows.",
      "Privatsphäre achten; keine Daten Dritter ohne Einwilligung.",
      "Richtigkeit bei Inseraten, Preisen, Lieferangaben.",
    ],
    listingTitle: "2) Inserat-Standards",
    listing: [
      "Klare Titel, echte Fotos, korrekte Beschreibungen.",
      "Preis, Lieferzeit, Rückgabe/Umtausch deutlich angeben.",
      "Keine Urheber-/Markenrechtsverletzungen oder Fälschungen.",
      "Keine Suchmanipulation (Tag-Spam, falsche Kategorie).",
    ],
    escrowTitle: "3) Zahlungssicherheit (Treuhand)",
    escrow:
      "Zahlungen über lizenzierte PSPs (PayTR, iyzico), treuhänderisch bis Lieferbestätigung. Erstattungen gem. PSP-Prozess.",
    bannedTitle: "4) Strikt Verbotene Artikel/Dienste",
    bannedIntro:
      "Folgende Kategorien sind strikt verboten. Verstöße → Entfernung/Sanktionen:",
    banned: [
      "Alkohol.",
      "Tabak- und E-Zigaretten/Vapes.",
      "Erwachsenen-/Sex-Artikel und explizite Inhalte.",
      "Lebende Tiere, Wildtierprodukte.",
      "Illegale Drogen, gefährliche Chemikalien.",
      "Verschreibungspflichtige Arznei; nicht autorisierte Medizinprodukte.",
      "Waffen, Munition, Explosivstoffe, gefährliche Messer/Werkzeuge.",
      "Hehlerware/Schmuggel, Fälschungen, Raubkopien.",
      "Handel mit personenbezogenen/finanziellen Daten; SIM/IMEI/Account-Dienste.",
      "Glücksspiel/Wetten, gefälschte Dokumente, rechtswidrige Dienste.",
    ],
    restrictedTitle: "5) Eingeschränkt/Bedingt",
    restricted: [
      "Lebensmittel/Kosmetik/Spielwaren: konforme Kennzeichnung/Erlaubnisse.",
      "Personalisierte/hygienische Artikel: Rückgabe-Ausnahmen angeben.",
      "Gefährliche Hobby-Materialien: Sicherheitswarnungen.",
    ],
    minorsTitle: "6) Minderjährige",
    minors:
      "Unter 18 nur mit gesetzlichem Vertreter. Adults-only/aufsichtspflichtige Produkte nicht zulässig.",
    reportTitle: "7) Meldung",
    report:
      "Verstöße mit Anzeige-/Bestellnummer über die Kontaktseite melden. Wir prüfen Protokolle und arbeiten mit Behörden zusammen.",
    penaltiesTitle: "8) Maßnahmen",
    penalties: [
      "Entfernung, Sichtbarkeitsbeschränkung, temporäre/dauerhafte Sperre.",
      "Wiederholte/schwere Verstöße → dauerhafte Sperre, rechtliche Schritte.",
    ],
    lawTitle: "9) Recht",
    law:
      "Türkisches Recht; Gerichtsstand Istanbul.",
    quick: "Schnellzugriff",
  },
};

export const metadata = { title: "Topluluk Kuralları • Üreten Eller" };

export default function CommunityRulesPage() {
  const lang = useLang();
  const t = useMemo(()=> T[lang] || T.tr, [lang]);
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

          <h2>{t.behaviorTitle}</h2>
          <ul>{t.behavior.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2>{t.listingTitle}</h2>
          <ul>{t.listing.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2> {t.escrowTitle}</h2>
          <p>{t.escrow}</p>

          <h2 id="yasakli-urunler">{t.bannedTitle}</h2>
          <p>{t.bannedIntro}</p>
          <ul>{t.banned.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2>{t.restrictedTitle}</h2>
          <ul>{t.restricted.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2>{t.minorsTitle}</h2>
          <p>{t.minors}</p>

          <h2>{t.reportTitle}</h2>
          <p>{t.report}</p>

          <h2>{t.penaltiesTitle}</h2>
          <ul>{t.penalties.map((x,i)=><li key={i}>{x}</li>)}</ul>

          <h2>{t.lawTitle}</h2>
          <p>{t.law}</p>

          <hr/>
          <p className="quick">
            <strong>{t.quick}:</strong>{" "}
            <a href="/legal/kullanim-sartlari">Kullanım Şartları</a> •{" "}
            <a href="/legal/mesafeli-satis-sozlesmesi">Mesafeli Satış</a> •{" "}
            <a href="/legal/teslimat-iade">Teslimat & İade</a>
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
        .wrap{max-width:1100px;margin:0 auto;padding:0 16px}
        .topbar{position:sticky;top:0;z-index:30;background:#fff;border-bottom:1px solid var(--line)}
        .topbar .wrap{height:56px;display:flex;align-items:center;justify-content:space-between}
        .brand{font-weight:800;text-decoration:none;color:var(--brand)}
        .btn{display:inline-block;padding:8px 12px;border-radius:10px;border:1px solid var(--line);text-decoration:none;color:var(--brand)}
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
