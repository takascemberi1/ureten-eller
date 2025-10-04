'use client'

// app/legal/gizlilik/page.jsx — 4 dil desteği ve PayTR/İyzico uyumlu kapsam
// Dil seçimi: ?lang=tr|en|ar|de (varsayılan tr)

function getLang(searchParams){
  const raw = (searchParams?.lang||'tr')+'';
  const l = raw.toLowerCase();
  return ['tr','en','ar','de'].includes(l) ? l : 'tr';
}

const COMPANY = {
  brand: 'Üreten Eller',
  email: 'info@takascemberi.com',
  phone: '+90 505 727 91 43',
  taxNo: 'VKM 9530226667',
  taxOffice: 'Silivri Vergi Dairesi',
  addressMasked: 's***** g**** mah. r****** sk. no:27A, Silivri / İstanbul',
};

const STR = {
  tr: {
    title: 'Gizlilik Politikası',
    updated: 'Güncellenme Tarihi',
    print: 'Yazdır',
    intro: `${COMPANY.brand} olarak kullanıcılarımızın kişisel verilerinin güvenliğine önem veriyoruz. Bu politika; hangi verileri işlediğimizi, hangi amaçlarla kullandığımızı, hukuki dayanakları ve haklarınızı açıklar.`,
    toc: 'İçindekiler',
    sections: {
      scope: {
        h: 'Kapsam ve Tanımlar',
        p: 'Bu politika web sitemiz, mobil/PWA uygulamamız ve müşteri destek kanallarımız (e‑posta, WhatsApp, form) üzerinden işlenen verileri kapsar. Kişisel veri; kimliği belirli veya belirlenebilir gerçek kişiye ilişkin her türlü bilgidir.'
      },
      dataWeCollect: {
        h: 'Topladığımız Veriler',
        items: [
          'Hesap verileri (ad‑soyad, e‑posta, telefon, dil tercihi).',
          'Profil içerikleri (avatar, adres defteri, favoriler).',
          'İşlem verileri (sepet, sipariş, iade/uyuşmazlık kayıtları, kargo bilgileri).',
          'Ödeme göstergeleri (tutar, maskelemiş kart işaretleri) — kart verisi ödeme kuruluşu tarafından işlenir, biz tam kart numarası tutmayız.',
          'Teknik veriler (IP, cihaz/çerez tanımlayıcıları, oturum, log).',
          'İletişim kayıtları (mesajlar, çağrı/sohbet özetleri).'
        ]
      },
      purposes: {
        h: 'İşleme Amaçlarımız',
        items: [
          'Hizmetin sunulması: üyelik, giriş, siparişlerin oluşturulması/teslimi.',
          'Ödeme ve dolandırıcılık önleme: PayTR/iyzico gibi ödeme kuruluşları ile işlem.',
          'Müşteri desteği: talep yönetimi, iade/uyuşmazlık süreçleri.',
          'Güvenlik: kötüye kullanım/şikayet incelemeleri, kayıtların tutulması.',
          'Geliştirme: performans ölçümlemeleri ve ürün iyileştirmeleri.',
          'Pazarlama (izinli): bülten/kampanya bildirimleri.'
        ]
      },
      legalBases: {
        h: 'Hukuki Dayanaklar',
        p: 'KVKK m.5 ve m.6 uyarınca; sözleşmenin kurulması/ifası, hukuki yükümlülük, meşru menfaat ve açık rıza (pazarlama iletişimi gibi) dayanaklarına göre işlem yaparız.'
      },
      sharing: {
        h: 'Aktarım ve Paylaşım',
        items: [
          'Ödeme kuruluşları: iyzico / PayTR (ödeme işlemleri, sahteciliğin önlenmesi).',
          'Kargo/lojistik: teslimat ve iade süreçleri için zorunlu bilgiler.',
          'Barındırma ve altyapı: bulut sağlayıcılar (barındırma, yedekleme, güvenlik).',
          'Yasal merciler: zorunlu hallerde resmi makamlarla paylaşım.'
        ]
      },
      cookies: {
        h: 'Çerezler ve Benzeri Teknolojiler',
        p1: 'Sitemizde zorunlu, analitik ve tercihe bağlı çerezler kullanılır. Zorunlu çerezler oturum ve güvenlik için gereklidir. Analitik çerezler site performansını ölçmemize yardımcı olur. Pazarlama çerezleri açık rızaya tabidir.',
        p2: 'Tarayıcınızın ayarlarından çerezleri yönetebilir veya sitemizdeki çerez tercih panelini kullanarak (yakında) seçim yapabilirsiniz.',
        tableHead: ['Tür', 'Amaç', 'Saklama Süresi'],
        tableRows: [
          ['Zorunlu', 'Giriş, oturum, güvenlik', 'Oturum süresi'],
          ['Analitik', 'Kullanım ve performans ölçümü', '13 ay'],
          ['Tercih', 'Dil/konum gibi kişiselleştirme', '6‑12 ay'],
        ]
      },
      rights: {
        h: 'Haklarınız',
        items: [
          'Kayıtlı verilerinize erişme ve bilgi talep etme.',
          'Yanlış/eksik verilerin düzeltilmesini isteme.',
          'Silme (unutulma hakkı) ve işlem kısıtlama talebi.',
          'İtiraz etme ve rızayı geri alma (pazarlama iletileri).',
          'Kurumumuza ve KVKK Kurumu’na şikâyet hakkı.'
        ]
      },
      retention: {
        h: 'Saklama Süreleri',
        p: 'Hukuki yükümlülük ve meşru menfaatler doğrultusunda veriler; sözleşmesel ve mali kayıtlar için asgari kanuni süreler boyunca (ör. 10 yıl mali kayıtlar) saklanır; amaç sona erdiğinde anonimleştirilir veya silinir.'
      },
      contact: {
        h: 'İletişim',
        p: `Bu politika ve KVKK kapsamındaki talepleriniz için: e‑posta: ${COMPANY.email} • Tel/WhatsApp: ${COMPANY.phone} • Adres (maskeleme ile): ${COMPANY.addressMasked}. Vergi Dairesi: ${COMPANY.taxOffice} • Vergi No: ${COMPANY.taxNo}.`
      },
      updates: {
        h: 'Güncellemeler',
        p: 'Bu politika ihtiyaç halinde güncellenebilir. Önemli değişiklikleri siteden duyururuz.'
      }
    },
    en: {
      title: 'Privacy Policy',
      updated: 'Last Updated',
      print: 'Print',
      intro: `${COMPANY.brand} values your privacy. This policy explains what data we process, for which purposes, on what legal bases, and your rights.`,
      toc: 'Contents',
      sections: {
        scope:{h:'Scope & Definitions',p:'Covers our website, mobile/PWA and support channels (email, WhatsApp, forms). Personal data means any information relating to an identified or identifiable natural person.'},
        dataWeCollect:{h:'Data We Collect',items:['Account data (name, email, phone, language).','Profile (avatar, address book, favorites).','Transaction data (cart, orders, returns/disputes, shipping).','Payment indicators (amount, masked card markers) — full card data is processed by the PSP; we do not store PAN.','Technical (IP, device/cookie IDs, session, logs).','Support records (messages, chat summaries).']},
        purposes:{h:'Purposes',items:['Provide the service: account, checkout, delivery.','Fraud prevention & payments: PSPs such as iyzico/PayTR.','Customer support: returns/disputes handling.','Security & abuse prevention.','Product improvement & analytics.','Marketing (consent‑based).']},
        legalBases:{h:'Legal Bases',p:'Contract performance, legal obligation, legitimate interest, and consent (for marketing).'},
        sharing:{h:'Disclosures',items:['Payment service providers: iyzico / PayTR.','Carriers/logistics for delivery & returns.','Hosting & cloud infrastructure.','Public authorities where legally required.']},
        cookies:{h:'Cookies & Similar Tech',p1:'We use necessary, analytics and preference cookies. Marketing cookies require consent.',p2:'You can manage cookies via your browser settings or our upcoming cookie preferences panel.',tableHead:['Type','Purpose','Retention'],tableRows:[['Necessary','Login, session, security','Session'],['Analytics','Usage & performance measurement','13 months'],['Preference','Language/location personalisation','6‑12 months']]},
        rights:{h:'Your Rights',items:['Access and information.','Rectification.','Erasure and restriction.','Objection & withdraw consent (marketing).','Complain to authority.']},
        retention:{h:'Retention',p:'Records are kept for mandatory statutory periods (e.g., tax/accounting) and then anonymised or deleted.'},
        contact:{h:'Contact',p:`Email: ${COMPANY.email} • Tel/WhatsApp: ${COMPANY.phone} • Address (masked): ${COMPANY.addressMasked}. Tax Office: ${COMPANY.taxOffice} • Tax No: ${COMPANY.taxNo}.`},
        updates:{h:'Updates',p:'We may update this policy; material changes will be announced on the site.'}
      }
    },
    ar: {
      title:'سياسة الخصوصية',
      updated:'تاريخ التحديث',
      print:'طباعة',
      intro:`نحن في ${COMPANY.brand} نهتم بخصوصيتكم. تشرح هذه السياسة أنواع البيانات وأغراض المعالجة والأسس القانونية وحقوقكم.`,
      toc:'المحتويات',
      sections:{
        scope:{h:'النطاق والتعاريف',p:'تشمل موقعنا وتطبيق PWA وقنوات الدعم (البريد الإلكتروني وواتساب والنماذج).'},
        dataWeCollect:{h:'البيانات التي نجمعها',items:['بيانات الحساب (الاسم، البريد، الهاتف، اللغة).','الملف الشخصي (الصورة، دفتر العناوين، المفضلة).','بيانات المعاملات (السلة، الطلبات، المرتجعات/النزاعات، الشحن).','مؤشرات الدفع (المبلغ وعلامات البطاقة المقنّعة) — تتم معالجة بيانات البطاقة الكاملة لدى مزوّد الدفع، ولا نخزن PAN.','بيانات تقنية (IP ومعرّفات الجهاز/الكوكيز والجلسات والسجلات).','سجلات الدعم (الرسائل وملخّصات الدردشة).']},
        purposes:{h:'الأغراض',items:['تقديم الخدمة: الحساب والدفع والتسليم.','منع الاحتيال والدفع عبر مزوّدين مثل iyzico/PayTR.','دعم العملاء: إدارة المرتجعات/النزاعات.','الأمن ومنع إساءة الاستخدام.','التحسين والتحليلات.','التسويق بموافقة.']},
        legalBases:{h:'الأسس القانونية',p:'تنفيذ العقد، الالتزام القانوني، المصلحة المشروعة، والموافقة (للتسويق).'},
        sharing:{h:'الإفصاحات',items:['مزودو خدمات الدفع: iyzico / PayTR.','شركات الشحن واللوجستيات.','الاستضافة والسحابة.','الجهات الرسمية عند الطلب القانوني.']},
        cookies:{h:'الكوكيز والتقنيات المشابهة',p1:'نستخدم الكوكيز الضرورية والتحليلية ويفضَّل بعضها. تتطلب التسويقية موافقة.',p2:'يمكن إدارة الكوكيز من إعدادات المتصفح أو لوحة تفضيلات الكوكيز (قريبًا).',tableHead:['النوع','الغرض','الاحتفاظ'],tableRows:[['ضروري','تسجيل الدخول والجلسة والأمان','جلسة'],['تحليلي','قياس الاستخدام والأداء','13 شهر'],['تفضيل','تخصيص اللغة/الموقع','6‑12 شهر']]},
        rights:{h:'حقوقكم',items:['الوصول وطلب المعلومات','تصحيح البيانات','المحو وتقييد المعالجة','الاعتراض وسحب الموافقة (التسويق)','الشكوى لدى الجهة المختصة']},
        retention:{h:'الاحتفاظ',p:'يتم الاحتفاظ بالسجلات وفق الفترات القانونية ثم تُزال أو تُجهّل.'},
        contact:{h:'التواصل',p:`البريد: ${COMPANY.email} • واتساب/هاتف: ${COMPANY.phone} • العنوان (مقنّع): ${COMPANY.addressMasked}. دائرة الضرائب: ${COMPANY.taxOffice} • رقم الضريبة: ${COMPANY.taxNo}.`},
        updates:{h:'التحديثات',p:'قد نحدّث هذه السياسة، وسيتم الإعلان عن التغييرات المهمة في الموقع.'}
      }
    },
    de: {
      title:'Datenschutzerklärung',
      updated:'Aktualisiert am',
      print:'Drucken',
      intro:`${COMPANY.brand} schützt Ihre personenbezogenen Daten. Diese Erklärung erläutert Datenarten, Zwecke, Rechtsgrundlagen und Ihre Rechte.`,
      toc:'Inhalt',
      sections:{
        scope:{h:'Geltungsbereich & Begriffe',p:'Gilt für Website, PWA und Supportkanäle (E‑Mail, WhatsApp, Formulare).'},
        dataWeCollect:{h:'Welche Daten wir verarbeiten',items:['Kontodaten (Name, E‑Mail, Telefon, Sprache).','Profil (Avatar, Adressbuch, Favoriten).','Transaktionen (Warenkorb, Bestellungen, Retouren/Streitfälle, Versand).','Zahlungsindikatoren (Betrag, maskierte Kartenmarker) — vollständige Kartendaten verarbeitet der PSP, wir speichern keine PAN.','Technik (IP, Geräte-/Cookie-IDs, Sitzungen, Logs).','Supportprotokolle (Nachrichten, Chat‑Zusammenfassungen).']},
        purposes:{h:'Zwecke',items:['Bereitstellung des Dienstes.','Betrugsprävention & Zahlungen (iyzico/PayTR).','Kundensupport & Retouren/Streitfälle.','Sicherheit & Missbrauchsprävention.','Produktverbesserung & Analytik.','Marketing (mit Einwilligung).']},
        legalBases:{h:'Rechtsgrundlagen',p:'Vertragserfüllung, gesetzliche Pflicht, berechtigtes Interesse, Einwilligung (Marketing).'},
        sharing:{h:'Weitergaben',items:['Zahlungsdienstleister: iyzico / PayTR.','Carrier/Logistik.','Hosting & Cloud.','Behörden, sofern gesetzlich erforderlich.']},
        cookies:{h:'Cookies & ähnliche Technologien',p1:'Wir nutzen notwendige, Analyse‑ und Präferenz‑Cookies. Marketing‑Cookies benötigen Einwilligung.',p2:'Verwalten Sie Cookies im Browser oder künftig über unser Cookie‑Panel.',tableHead:['Typ','Zweck','Aufbewahrung'],tableRows:[['Notwendig','Login, Sitzung, Sicherheit','Sitzung'],['Analyse','Nutzung & Performance','13 Monate'],['Präferenz','Sprache/Ort‑Personalisierung','6‑12 Monate']]},
        rights:{h:'Ihre Rechte',items:['Auskunft','Berichtigung','Löschung & Einschränkung','Widerspruch & Widerruf (Marketing)','Beschwerde bei der Behörde']},
        retention:{h:'Aufbewahrung',p:'Gesetzliche Mindestfristen (z.B. Steuer/Accounting); danach Anonymisierung oder Löschung.'},
        contact:{h:'Kontakt',p:`E‑Mail: ${COMPANY.email} • Tel/WhatsApp: ${COMPANY.phone} • Adresse (maskiert): ${COMPANY.addressMasked}. Finanzamt: ${COMPANY.taxOffice} • Steuernr.: ${COMPANY.taxNo}.`},
        updates:{h:'Aktualisierungen',p:'Wesentliche Änderungen werden auf der Website angekündigt.'}
      }
    }
  }
};

export default function PrivacyPage({ searchParams }){
  const lang = getLang(searchParams);
  const L = STR[lang];
  const S = L.sections;

  const updatedStr = new Date().toLocaleDateString(lang==='ar'?'ar':lang, { year:'numeric', month:'2-digit', day:'2-digit' });

  return (
    <div style={wrap}>
      <header style={head}>
        <div>
          <h1 style={{margin:'0 0 6px'}}>{L.title}</h1>
          <div style={{fontSize:13,opacity:.75}}>{L.updated}: {updatedStr}</div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <a className="btn" href="#" onClick={(e)=>{e.preventDefault(); if(typeof window!=='undefined') window.print();}}>
            🖨 {L.print}
          </a>
        </div>
      </header>

      <aside style={tocBox}>
        <strong style={{display:'block',marginBottom:8}}>{L.toc}</strong>
        <nav style={{display:'grid',gap:6}}>
          <a href="#scope">{S.scope.h}</a>
          <a href="#data">{S.dataWeCollect.h}</a>
          <a href="#purposes">{S.purposes.h}</a>
          <a href="#legal">{S.legalBases.h}</a>
          <a href="#sharing">{S.sharing.h}</a>
          <a href="#cookies">{S.cookies.h}</a>
          <a href="#rights">{S.rights.h}</a>
          <a href="#retention">{S.retention.h}</a>
          <a href="#contact">{S.contact.h}</a>
          <a href="#updates">{S.updates.h}</a>
        </nav>
      </aside>

      <section style={content}>
        <p>{L.intro}</p>

        <h3 id="scope">{S.scope.h}</h3>
        <p>{S.scope.p}</p>

        <h3 id="data">{S.dataWeCollect.h}</h3>
        <ul>
          {S.dataWeCollect.items.map((x,i)=>(<li key={i}>{x}</li>))}
        </ul>

        <h3 id="purposes">{S.purposes.h}</h3>
        <ul>
          {S.purposes.items.map((x,i)=>(<li key={i}>{x}</li>))}
        </ul>

        <h3 id="legal">{S.legalBases.h}</h3>
        <p>{S.legalBases.p}</p>

        <h3 id="sharing">{S.sharing.h}</h3>
        <ul>
          {S.sharing.items.map((x,i)=>(<li key={i}>{x}</li>))}
        </ul>

        <h3 id="cookies">{S.cookies.h}</h3>
        <p>{S.cookies.p1}</p>
        <p>{S.cookies.p2}</p>
        <div style={{overflowX:'auto'}}>
          <table style={table}>
            <thead>
              <tr>
                {S.cookies.tableHead.map((h,i)=>(<th key={i} style={th}>{h}</th>))}
              </tr>
            </thead>
            <tbody>
              {S.cookies.tableRows.map((r,i)=>(
                <tr key={i}>
                  {r.map((c,j)=>(<td key={j} style={td}>{c}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 id="rights">{S.rights.h}</h3>
        <ul>
          {S.rights.items.map((x,i)=>(<li key={i}>{x}</li>))}
        </ul>

        <h3 id="retention">{S.retention.h}</h3>
        <p>{S.retention.p}</p>

        <h3 id="contact">{S.contact.h}</h3>
        <p>{S.contact.p}</p>

        <h3 id="updates">{S.updates.h}</h3>
        <p>{S.updates.p}</p>
      </section>

      <style>{`
        .btn{border:1px solid #e5e7eb;background:#fff;color:#111827;border-radius:10px;padding:8px 12px;font-weight:700;text-decoration:none}
        .btn:hover{background:#111827;color:#fff;border-color:#111827}
        @media (max-width: 900px){
          .grid{grid-template-columns:1fr !important}
          aside{position:static !important; top:auto !important}
        }
      `}</style>
    </div>
  );
}

// --- Stiller ---
const wrap = { display:'grid', gap:16 };
const head = { display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 };
const tocBox = { position:'sticky', top:74, alignSelf:'start', padding:12, border:'1px solid #e5e7eb', borderRadius:12, background:'#f8fafc' };
const content = { display:'grid', gap:10 };
const table = { width:'100%', borderCollapse:'collapse', marginTop:8 };
const th = { textAlign:'left', borderBottom:'1px solid #e5e7eb', padding:'8px 10px', fontWeight:800 };
const td = { borderBottom:'1px solid #f1f5f9', padding:'8px 10px' };
