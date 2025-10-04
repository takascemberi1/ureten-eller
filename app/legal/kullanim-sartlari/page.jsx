'use client'

// app/legal/kullanim-sartlari/page.jsx — Kullanım Şartları (TR/EN/AR/DE)
// Dil seçimi: ?lang=tr|en|ar|de (varsayılan tr)

function getLang(searchParams){
  const raw=(searchParams?.lang||'tr')+''; const l=raw.toLowerCase();
  return ['tr','en','ar','de'].includes(l)?l:'tr';
}

const COMPANY={
  brand:'Üreten Eller',
  email:'info@takascemberi.com',
  phone:'+90 505 727 91 43',
  taxNo:'VKM 9530226667',
  taxOffice:'Silivri Vergi Dairesi',
  addressMasked:'s***** g**** mah. r****** sk. no:27A, Silivri / İstanbul',
};

const STR={
  tr:{
    title:'Kullanım Şartları',
    updated:'Güncellenme Tarihi',
    print:'Yazdır',
    toc:'İçindekiler',
    sections:{
      accept:{h:'1) Kabul ve Kapsam',p:'Bu site ve bağlı mobil/PWA uygulamalarını kullanarak bu şartları kabul etmiş olursunuz. Şartlar, üyelik, ilan verme, sipariş ve mesajlaşma dahil tüm işlemleri kapsar.'},
      account:{h:'2) Üyelik ve Hesap Güvenliği',items:[
        'Hesabın doğruluğundan ve güncelliğinden kullanıcı sorumludur.',
        'Hesap bilgilerinin gizliliği (şifre/2FA) kullanıcıya aittir.',
        'Hesapların devri veya yetkisiz kullanım yasaktır.',
        '18 yaşından küçükler yasal temsilci izni olmadan işlem yapamaz.'
      ]},
      listings:{h:'3) İlanlar ve Ürünler',items:[
        'İlan içerikleri (başlık, açıklama, görsel) gerçeği yansıtmalıdır.',
        'Yasaklı ürün/hizmetler, mevzuata aykırı içerikler yayımlanamaz.',
        'Fiyat, stok, kargo süresi ve iade koşulları açıkça belirtilmelidir.',
        'Telif ve marka ihlallerinden ilan sahibi sorumludur.'
      ]},
      orders:{h:'4) Sipariş, Ödeme ve Teslimat',items:[
        'Sipariş akışı: Sepet → Ödeme → Hazırlık → Kargolama → Teslim.',
        'Ödeme hizmetleri PayTR/iyzico gibi lisanslı kuruluşlarca yürütülür.',
        'Kart verileri platformumuzda tutulmaz (PSP tarafında işlenir).',
        'Teslimat süreleri ve kargo takip bilgileri alıcıya sunulur.'
      ]},
      returns:{h:'5) İptal, İade ve Uyuşmazlık',items:[
        'Mesafeli satış ve tüketici mevzuatı uygulanır.',
        'Alıcı, koşulları sağlayan iadelerde süreç panelinden talep açar.',
        'Uyuşmazlıklar öncelikle platform içi iletişimle çözülmeye çalışılır; sonuç alınamazsa yasal mercilere başvuru hakkı saklıdır.'
      ]},
      conduct:{h:'6) Yasak Davranışlar',items:[
        'Dolandırıcılık, kimlik sahteciliği, çoklu/yalancı hesap kullanımı.',
        'Hakaret, küfür, nefret söylemi, yanıltıcı değerlendirme/yorum.',
        'Kötü amaçlı yazılım, scraping, platform istismarı.',
        'Başkasının kişisel verisini izinsiz paylaşma.'
      ]},
      content:{h:'7) İçerik Hakları',p:'Kullanıcılar yükledikleri içeriklerden sorumludur. Platform; hizmetin sunumu, tanıtımı ve güvenlik amaçlarıyla içerikleri işleyebilir, gerekli hallerde kaldırabilir.'},
      limits:{h:'8) Sorumluluk Sınırı',p:'Mücbir sebepler, altyapı kesintileri, üçüncü taraf servis arızaları ve kullanıcı fiillerinden doğan zararlardan platformumuzu sorumlu tutamazsınız. Dolaylı/yansıma zararlardan sorumluluk kabul edilmez.'},
      privacy:{h:'9) Gizlilik ve KVKK',p:'Kişisel veriler Gizlilik Politikası ve KVKK Aydınlatma Metni’ne uygun işlenir. Çerez tercihleri tarayıcı ve/veya panelden yönetilebilir.'},
      changes:{h:'10) Değişiklikler',p:'Şartlar gerektiğinde güncellenebilir. Önemli değişiklikleri sitede duyururuz. Yayınla birlikte yürürlüğe girer.'},
      law:{h:'11) Uygulanacak Hukuk ve Yetki',p:'Türk hukuku uygulanır. İhtilaflarda İstanbul (Merkez) mahkemeleri ve icra daireleri yetkilidir.'},
      contact:{h:'12) İletişim',p:`E‑posta: ${COMPANY.email} • Tel/WhatsApp: ${COMPANY.phone} • Adres (maskeleme): ${COMPANY.addressMasked}. Vergi Dairesi: ${COMPANY.taxOffice} • Vergi No: ${COMPANY.taxNo}.`}
    }
  },
  en:{
    title:'Terms of Use',
    updated:'Last Updated',
    print:'Print',
    toc:'Contents',
    sections:{
      accept:{h:'1) Acceptance & Scope',p:'By using this website and the mobile/PWA, you accept these Terms. They cover account, listings, orders and messaging.'},
      account:{h:'2) Account & Security',items:['Users are responsible for accurate/up‑to‑date information.','Keep your credentials/2FA confidential.','No transfer or unauthorised use of accounts.','Under 18 requires guardian consent.']},
      listings:{h:'3) Listings & Products',items:['Content must be accurate and lawful.','Prohibited/illegal items are not allowed.','Prices, stock, shipping time, return terms must be clear.','Rights/IP infringement is the lister’s responsibility.']},
      orders:{h:'4) Orders, Payment & Delivery',items:['Flow: Cart → Payment → Preparation → Shipment → Delivery.','Payments handled by licensed PSPs such as PayTR/iyzico.','We do not store full card data (processed by PSP).','Delivery times & tracking are provided to the buyer.']},
      returns:{h:'5) Cancellation, Returns & Disputes',items:['Applicable consumer distance‑sales law applies.','Eligible returns initiated via the panel by the buyer.','Disputes first via in‑platform communication; otherwise legal remedies remain available.']},
      conduct:{h:'6) Prohibited Conduct',items:['Fraud, identity theft, fake/multiple accounts.','Abuse, hate speech, deceptive reviews/ratings.','Malware, scraping, platform abuse.','Sharing others’ personal data without consent.']},
      content:{h:'7) Content Rights',p:'Users are responsible for their content. We may process and remove content when necessary for service, promotion or safety.'},
      limits:{h:'8) Liability',p:'No liability for force majeure, infrastructure outages, third‑party failures or user actions; no indirect/consequential damages.'},
      privacy:{h:'9) Privacy & KVKK',p:'Personal data is processed per the Privacy Policy and KVKK Notice. Cookies can be managed via browser/panel.'},
      changes:{h:'10) Changes',p:'We may update Terms when necessary; material changes will be announced on site and take effect upon publication.'},
      law:{h:'11) Governing Law & Jurisdiction',p:'Turkish law applies. Courts and enforcement offices of Istanbul (Central) have jurisdiction.'},
      contact:{h:'12) Contact',p:`Email: ${COMPANY.email} • Tel/WhatsApp: ${COMPANY.phone} • Address (masked): ${COMPANY.addressMasked}. Tax Office: ${COMPANY.taxOffice} • Tax No: ${COMPANY.taxNo}.`}
    }
  },
  ar:{
    title:'شروط الاستخدام',
    updated:'تاريخ التحديث',
    print:'طباعة',
    toc:'المحتويات',
    sections:{
      accept:{h:'1) القبول والنطاق',p:'باستخدام الموقع وتطبيق PWA فإنك توافق على هذه الشروط وتشمل الحساب والإعلانات والطلبات والرسائل.'},
      account:{h:'2) الحساب والأمان',items:['مسؤولية دقة وتحديث البيانات على المستخدم.','حماية بيانات الدخول والتحقق الثنائي.','منع نقل الحساب أو الاستخدام غير المصرح.','القاصرون يحتاجون موافقة الولي.']},
      listings:{h:'3) الإعلانات والمنتجات',items:['يجب أن يكون المحتوى دقيقًا وقانونيًا.','العناصر المحظورة/غير القانونية ممنوعة.','يجب توضيح السعر والمخزون ووقت الشحن وسياسة الإرجاع.','المعلن مسؤول عن حقوق الملكية.']},
      orders:{h:'4) الطلبات والدفع والتسليم',items:['التدفق: سلة → دفع → تجهيز → شحن → تسليم.','الدفع عبر مزودي خدمة مرخصين مثل PayTR/iyzico.','لا نخزن بيانات البطاقة الكاملة.','يُقدَّم للمشتري زمن التسليم والتتبع.']},
      returns:{h:'5) الإلغاء والإرجاع والنزاعات',items:['تطبق قوانين المستهلك والبيع عن بعد.','يبدأ المشتري الإرجاع المؤهل عبر لوحة التحكم.','تُحل النزاعات أولاً داخل المنصة وإلا فالقضاء متاح.']},
      conduct:{h:'6) سلوكيات محظورة',items:['احتيال وانتحال وهوية وحسابات وهمية.','إساءة/خطاب كراهية/مراجعات مضللة.','برمجيات خبيثة وscraping وإساءة المنصة.','مشاركة بيانات الآخرين دون إذن.']},
      content:{h:'7) حقوق المحتوى',p:'المستخدم مسؤول عن محتواه. قد نعالج/نزيل المحتوى عند الضرورة للخدمة أو الأمان.'},
      limits:{h:'8) المسؤولية',p:'لا مسؤولية عن القوة القاهرة أو انقطاع البنية أو أعطال الأطراف الثالثة أو أفعال المستخدم؛ ولا عن الأضرار غير المباشرة.'},
      privacy:{h:'9) الخصوصية وKVKK',p:'تُعالج البيانات وفق سياسة الخصوصية وإشعار KVKK. يمكن إدارة الكوكيز عبر المتصفح/اللوحة.'},
      changes:{h:'10) التغييرات',p:'قد نحدّث الشروط؛ يتم الإعلان عن التغييرات ويُعمل بها عند النشر.'},
      law:{h:'11) القانون والاختصاص',p:'تطبق القوانين التركية، والاختصاص لمحاكم إسطنبول (المركز).'},
      contact:{h:'12) التواصل',p:`البريد: ${COMPANY.email} • الهاتف/واتساب: ${COMPANY.phone} • العنوان (مقنّع): ${COMPANY.addressMasked}. مكتب الضرائب: ${COMPANY.taxOffice} • الرقم الضريبي: ${COMPANY.taxNo}.`}
    }
  },
  de:{
    title:'Nutzungsbedingungen',
    updated:'Aktualisiert am',
    print:'Drucken',
    toc:'Inhalt',
    sections:{
      accept:{h:'1) Annahme & Geltungsbereich',p:'Durch die Nutzung der Website/PWA akzeptieren Sie diese Bedingungen (Konto, Inserate, Bestellungen, Nachrichten).'},
      account:{h:'2) Konto & Sicherheit',items:['Richtigkeit/Aktualität liegen beim Nutzer.','Zugangsdaten/2FA vertraulich behandeln.','Keine Übertragung oder unbefugte Nutzung.','Minderjährige benötigen Zustimmung der Erziehungsberechtigten.']},
      listings:{h:'3) Inserate & Produkte',items:['Inhalte müssen korrekt und rechtmäßig sein.','Verbotene/illegale Artikel unzulässig.','Preis, Bestand, Versandzeit, Rückgabe klar angeben.','IP/Urheberrechte liegen in der Verantwortung des Anbieters.']},
      orders:{h:'4) Bestellungen, Zahlung & Lieferung',items:['Ablauf: Warenkorb → Zahlung → Vorbereitung → Versand → Zustellung.','Zahlungen über lizenzierte PSPs (PayTR/iyzico).','Keine Speicherung vollständiger Kartendaten.','Lieferzeit & Tracking werden bereitgestellt.']},
      returns:{h:'5) Widerruf, Rückgabe & Streitfälle',items:['Anwendbares Verbrauchsfernabsatzrecht.','Rückgaben über das Panel starten (falls zulässig).','Streitfälle zuerst intern lösen; rechtliche Schritte bleiben möglich.']},
      conduct:{h:'6) Verbotenes Verhalten',items:['Betrug, Identitätsdiebstahl, Fake-/Mehrfachkonten.','Beleidigung, Hassrede, irreführende Bewertungen.','Malware, Scraping, Plattformmissbrauch.','Weitergabe personenbezogener Daten ohne Einwilligung.']},
      content:{h:'7) Inhalte & Rechte',p:'Nutzer sind für Inhalte verantwortlich. Wir dürfen Inhalte verarbeiten/entfernen, wenn nötig für Service/Sicherheit.'},
      limits:{h:'8) Haftung',p:'Keine Haftung für höhere Gewalt, Infrastrukturausfälle, Drittanbieterfehler oder Nutzerhandlungen; keine indirekten/folgenden Schäden.'},
      privacy:{h:'9) Datenschutz & KVKK',p:'Datenverarbeitung gem. Datenschutzerklärung & KVKK‑Hinweis. Cookies verwaltbar via Browser/Panel.'},
      changes:{h:'10) Änderungen',p:'Anpassungen möglich; wesentliche Änderungen werden veröffentlicht und gelten ab Veröffentlichung.'},
      law:{h:'11) Recht & Gerichtsstand',p:'Türkisches Recht. Gerichtsstand: Istanbul (Zentrum).'},
      contact:{h:'12) Kontakt',p:`E‑Mail: ${COMPANY.email} • Tel/WhatsApp: ${COMPANY.phone} • Adresse (maskiert): ${COMPANY.addressMasked}. Finanzamt: ${COMPANY.taxOffice} • Steuernr.: ${COMPANY.taxNo}.`}
    }
  }
};

export default function TermsPage({ searchParams }){
  const lang=getLang(searchParams); const L=STR[lang]; const S=L.sections;
  const updated=new Date().toLocaleDateString(lang==='ar'?'ar':lang,{year:'numeric',month:'2-digit',day:'2-digit'});
  return (
    <div style={wrap}>
      <header style={head}>
        <div>
          <h1 style={{margin:'0 0 6px'}}>{L.title}</h1>
          <div style={{fontSize:13,opacity:.7}}>{L.updated}: {updated}</div>
        </div>
        <a className="btn" href="#" onClick={(e)=>{e.preventDefault(); if(typeof window!=='undefined') window.print();}}>🖨 {L.print}</a>
      </header>

      <aside style={tocBox}>
        <strong style={{display:'block',marginBottom:8}}>{L.toc}</strong>
        <nav style={{display:'grid',gap:6}}>
          <a href="#accept">{S.accept.h}</a>
          <a href="#account">{S.account.h}</a>
          <a href="#listings">{S.listings.h}</a>
          <a href="#orders">{S.orders.h}</a>
          <a href="#returns">{S.returns.h}</a>
          <a href="#conduct">{S.conduct.h}</a>
          <a href="#content">{S.content.h}</a>
          <a href="#limits">{S.limits.h}</a>
          <a href="#privacy">{S.privacy.h}</a>
          <a href="#changes">{S.changes.h}</a>
          <a href="#law">{S.law.h}</a>
          <a href="#contact">{S.contact.h}</a>
        </nav>
      </aside>

      <section style={content}>
        <p>{S.accept.p}</p>

        <h3 id="account">{S.account.h}</h3>
        <ul>{(S.account.items||[]).map((x,i)=>(<li key={i}>{x}</li>))}</ul>

        <h3 id="listings">{S.listings.h}</h3>
        <ul>{(S.listings.items||[]).map((x,i)=>(<li key={i}>{x}</li>))}</ul>

        <h3 id="orders">{S.orders.h}</h3>
        <ul>{(S.orders.items||[]).map((x,i)=>(<li key={i}>{x}</li>))}</ul>

        <h3 id="returns">{S.returns.h}</h3>
        <ul>{(S.returns.items||[]).map((x,i)=>(<li key={i}>{x}</li>))}</ul>

        <h3 id="conduct">{S.conduct.h}</h3>
        <ul>{(S.conduct.items||[]).map((x,i)=>(<li key={i}>{x}</li>))}</ul>

        <h3 id="content">{S.content.h}</h3>
        <p>{S.content.p}</p>

        <h3 id="limits">{S.limits.h}</h3>
        <p>{S.limits.p}</p>

        <h3 id="privacy">{S.privacy.h}</h3>
        <p>{S.privacy.p}</p>

        <h3 id="changes">{S.changes.h}</h3>
        <p>{S.changes.p}</p>

        <h3 id="law">{S.law.h}</h3>
        <p>{S.law.p}</p>

        <h3 id="contact">{S.contact.h}</h3>
        <p>{S.contact.p}</p>
      </section>

      <style>{`
        .btn{border:1px solid #e5e7eb;background:#fff;color:#111827;border-radius:10px;padding:8px 12px;font-weight:700;text-decoration:none}
        .btn:hover{background:#111827;color:#fff;border-color:#111827}
        @media (max-width: 900px){ .grid{grid-template-columns:1fr !important} aside{position:static !important} }
      `}</style>
    </div>
  );
}

const wrap={display:'grid',gap:16};
const head={display:'flex',alignItems:'center',justifyContent:'space-between',gap:10};
const tocBox={position:'sticky',top:74,alignSelf:'start',padding:12,border:'1px solid #e5e7eb',borderRadius:12,background:'#f8fafc'};
const content={display:'grid',gap:10};
