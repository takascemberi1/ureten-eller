'use client'

// app/legal/kvkk-aydinlatma/page.jsx — KVKK Aydınlatma Metni (TR/EN/AR/DE özetleriyle)
// ?lang=tr|en|ar|de (varsayılan tr)

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
    title:'KVKK Aydınlatma Metni',
    updated:'Güncellenme Tarihi',
    print:'Yazdır',
    toc:'İçindekiler',
    sections:{
      identity:{h:'1) Veri Sorumlusunun Kimliği',p:`Veri Sorumlusu: ${COMPANY.brand}. İletişim: ${COMPANY.email} / ${COMPANY.phone}. Adres (maskeleme): ${COMPANY.addressMasked}. Vergi Dairesi: ${COMPANY.taxOffice} — Vergi No: ${COMPANY.taxNo}.`},
      purposes:{h:'2) Kişisel Verilerin İşlenme Amaçları',items:[
        'Üyelik, kimlik doğrulama ve hesap yönetimi',
        'Sipariş, ödeme, teslimat ve iade/uyuşmazlık süreçlerinin yürütülmesi',
        'Müşteri ilişkileri ve destek faaliyetleri',
        'Dolandırıcılık ve kötüye kullanımın önlenmesi, güvenlik',
        'Hukuki yükümlülüklerin yerine getirilmesi ve kayıtların tutulması',
        'Pazarlama iletişimleri (açık rıza mevcutsa)'
      ]},
      legal:{h:'3) İşlemenin Hukuki Sebepleri',p:'KVKK madde 5 ve 6: (i) sözleşmenin kurulması/ifası için zorunluluk, (ii) hukuki yükümlülüğün yerine getirilmesi, (iii) veri sorumlusunun meşru menfaati, (iv) açık rıza (pazarlama/çerez tercihi gibi alanlarda). Özel nitelikli veriler yalnızca kanuni şartlar varsa işlenir.'},
      collect:{h:'4) Toplama Yöntemleri ve Kategoriler',items:[
        'Elektronik ortam: web, mobil/PWA, destek formları ve mesajlaşma',
        'İşlem kayıtları: sepet, sipariş, iade/uyuşmazlık, kargo',
        'Teknik veriler: IP, cihaz/çerez tanımlayıcıları, oturum, log',
        'Ödeme göstergeleri: tutar, işlem sonucu (tam kart bilgisi ödeme kuruluşunda tutulur)'
      ]},
      transfer:{h:'5) Aktarımlar (Yurt İçi / Yurt Dışı)',items:[
        'Ödeme kuruluşları (iyzico / PayTR): ödeme, sahteciliğin önlenmesi',
        'Kargo/lojistik firmaları: teslimat/iade',
        'Barındırma ve bulut hizmetleri',
        'Gerekli hallerde yetkili kamu kurum ve kuruluşları'
      ],note:'Yurt dışına aktarım gereken hallerde KVKK m.9 kapsamındaki şartlara uyulur ve gerekli koruma tedbirleri sağlanır.'},
      rights:{h:'6) İlgili Kişinin Hakları (KVKK m.11)',items:[
        'Kişisel verilerin işlenip işlenmediğini öğrenme',
        'İşlenmişse buna ilişkin bilgi talep etme',
        'Amacına uygun kullanılıp kullanılmadığını öğrenme',
        'Yurt içi/dışı aktarılan üçüncü kişileri bilme',
        'Eksik veya yanlış işlenmişse düzeltilmesini isteme',
        'KVKK ve ilgili kanunlara aykırı işlenmişse silinmesini/yok edilmesini isteme',
        'Bu işlemlerin aktarıldığı üçüncü kişilere bildirilmesini isteme',
        'Otomatik analiz sonucu aleyhe sonuca itiraz etme',
        'Zarara uğranması hâlinde tazminat talep etme'
      ]},
      apply:{h:'7) Başvuru Usulü',p:`KVKK kapsamındaki taleplerinizi "KVKK Başvuru Formu" formatında ${COMPANY.email} adresine e‑posta ile gönderebilir veya posta/WhatsApp üzerinden iletebilirsiniz. Kimlik doğrulaması için hesap e‑postası/telefonu gerekebilir. Başvurular 30 gün içinde ücretsiz olarak sonuçlandırılır (ilave maliyet doğarsa KVKK'ya uygun ücret alınabilir).`},
      retention:{h:'8) Saklama Süreleri',p:'Sözleşmesel ve mali kayıtlar kanuni asgari süreler boyunca saklanır (ör. vergi mevzuatı gereği). Amaç sona erdiğinde veriler silinir, yok edilir veya anonimleştirilir.'},
      updates:{h:'9) Güncellemeler',p:'İş süreçlerinde veya mevzuatta değişiklik olması hâlinde bu Aydınlatma Metni güncellenebilir.'}
    }
  },
  en:{
    title:'KVKK Information Notice',
    updated:'Last Updated',
    print:'Print',
    toc:'Contents',
    sections:{
      identity:{h:'1) Data Controller',p:`Controller: ${COMPANY.brand}. Contact: ${COMPANY.email} / ${COMPANY.phone}. Address (masked): ${COMPANY.addressMasked}. Tax Office: ${COMPANY.taxOffice} — Tax No: ${COMPANY.taxNo}.`},
      purposes:{h:'2) Purposes of Processing',items:['Account & authentication','Orders, payment, delivery, returns/disputes','Customer support','Fraud prevention & security','Legal compliance & record keeping','Marketing communications (with consent)']},
      legal:{h:'3) Legal Bases',p:'KVKK Articles 5–6: contract, legal obligation, legitimate interest, and consent (e.g., marketing/cookies). Special categories processed only when legally permitted.'},
      collect:{h:'4) Methods & Categories',items:['Electronic means: web, PWA, support forms & messaging','Transactions: cart, order, return/dispute, shipping','Technical: IP, device/cookie IDs, sessions, logs','Payment indicators only (full card data at PSP)']},
      transfer:{h:'5) Disclosures / Transfers',items:['PSPs (iyzico / PayTR)','Carriers & logistics','Hosting/cloud providers','Competent authorities when required'],note:'Cross‑border transfers (if any) follow KVKK Art. 9 safeguards.'},
      rights:{h:'6) Your Rights (KVKK Art.11)',items:['Right to be informed','Access','Rectification','Erasure/Destruction','Notification to third parties','Objection to profiling','Right to damages']},
      apply:{h:'7) How to Apply',p:`Send a request ("KVKK Application Form") to ${COMPANY.email}. Identity verification via account email/phone may be required. We respond within 30 days in line with KVKK.`},
      retention:{h:'8) Retention',p:'Records are retained for statutory periods; thereafter deleted or anonymised.'},
      updates:{h:'9) Updates',p:'This notice may be updated when processes or laws change.'}
    }
  },
  ar:{
    title:'إشعار معلومات KVKK',
    updated:'تاريخ التحديث',
    print:'طباعة',
    toc:'المحتويات',
    sections:{
      identity:{h:'1) متحكم البيانات',p:`${COMPANY.brand} • البريد: ${COMPANY.email} • الهاتف/واتساب: ${COMPANY.phone} • العنوان (مقنّع): ${COMPANY.addressMasked}. مكتب الضرائب: ${COMPANY.taxOffice} • الرقم الضريبي: ${COMPANY.taxNo}.`},
      purposes:{h:'2) أغراض المعالجة',items:['الحساب والمصادقة','الطلبات والدفع والتسليم والمرتجعات/النزاعات','دعم العملاء','منع الاحتيال والأمن','الامتثال القانوني وحفظ السجلات','التسويق بموافقة']},
      legal:{h:'3) الأسس القانونية',p:'وفق المادتين 5-6 من KVKK: العقد، الالتزام القانوني، المصلحة المشروعة، والموافقة. تتم معالجة الفئات الخاصة فقط في الحالات المصرّح بها قانونيًا.'},
      collect:{h:'4) طرق وفئات الجمع',items:['إلكترونيًا: الموقع وتطبيق PWA ونماذج الدعم والرسائل','المعاملات: السلة والطلب والإرجاع/النزاعات والشحن','تقني: IP ومعرّفات الأجهزة/الكوكيز والجلسات والسجلات','مؤشرات الدفع فقط (بيانات البطاقة الكاملة لدى مزود الدفع)']},
      transfer:{h:'5) النقل/الإفصاح',items:['مزودو الدفع (iyzico/PayTR)','شركات الشحن واللوجستيات','الاستضافة والحوسبة السحابية','الجهات الرسمية عند الطلب'],note:'إذا حدث نقل عبر الحدود فيتم وفق المادة 9 من KVKK.'},
      rights:{h:'6) الحقوق (المادة 11)',items:['المعرفة','الوصول','التصحيح','المحو/الإتلاف','الإخطار للأطراف الثالثة','الاعتراض على التنميط','التعويض']},
      apply:{h:'7) طريقة التقديم',p:`أرسل نموذج طلب KVKK إلى ${COMPANY.email}. قد نطلب التحقق من الهوية عبر بريد/هاتف الحساب. سنجيب خلال 30 يومًا.`},
      retention:{h:'8) الاحتفاظ',p:'تُحفظ السجلات وفق الفترات القانونية ثم تُمحى أو تُجهّل.'},
      updates:{h:'9) التحديثات',p:'قد يتم تحديث هذا الإشعار عند تغير الإجراءات أو القوانين.'}
    }
  },
  de:{
    title:'KVKK‑Informationshinweis',
    updated:'Aktualisiert am',
    print:'Drucken',
    toc:'Inhalt',
    sections:{
      identity:{h:'1) Verantwortlicher',p:`${COMPANY.brand}. Kontakt: ${COMPANY.email} / ${COMPANY.phone}. Adresse (maskiert): ${COMPANY.addressMasked}. Finanzamt: ${COMPANY.taxOffice} • Steuernr.: ${COMPANY.taxNo}.`},
      purposes:{h:'2) Verarbeitungszwecke',items:['Konto & Authentifizierung','Bestellung, Zahlung, Lieferung, Retouren/Streitfälle','Kundensupport','Betrugsprävention & Sicherheit','Gesetzliche Pflichten & Aufzeichnungen','Marketing (mit Einwilligung)']},
      legal:{h:'3) Rechtsgrundlagen',p:'KVKK Art.5–6: Vertrag, gesetzliche Pflicht, berechtigtes Interesse, Einwilligung. Besondere Kategorien nur wenn gesetzlich zulässig.'},
      collect:{h:'4) Erhebung & Kategorien',items:['Elektronisch: Website, PWA, Supportformulare & Messaging','Transaktionen: Warenkorb, Bestellung, Retouren/Streitfälle, Versand','Technisch: IP, Geräte-/Cookie-IDs, Sitzungen, Logs','Nur Zahlungsindikatoren (Kartendaten beim PSP)']},
      transfer:{h:'5) Offenlegungen/Übermittlungen',items:['Zahlungsdienstleister (iyzico/PayTR)','Carrier/Logistik','Hosting/Cloud','Behörden, falls erforderlich'],note:'Grenzüberschreitende Übermittlungen gem. KVKK Art.9.'},
      rights:{h:'6) Rechte (KVKK Art.11)',items:['Auskunft','Zugang','Berichtigung','Löschung/Vernichtung','Mitteilung an Dritte','Widerspruch gegen Profiling','Schadensersatz']},
      apply:{h:'7) Antragstellung',p:`Anträge (KVKK‑Formular) an ${COMPANY.email}. Identitätsprüfung über Konto‑E‑Mail/Telefon möglich. Antwort binnen 30 Tagen.`},
      retention:{h:'8) Aufbewahrung',p:'Aufbewahrung gem. gesetzlichen Mindestfristen, danach Löschung/Anonymisierung.'},
      updates:{h:'9) Aktualisierungen',p:'Hinweis wird bei Prozess-/Rechtsänderungen angepasst.'}
    }
  }
};

export default function KVKKPage({ searchParams }){
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
          <a href="#identity">{S.identity.h}</a>
          <a href="#purposes">{S.purposes.h}</a>
          <a href="#legal">{S.legal.h}</a>
          <a href="#collect">{S.collect.h}</a>
          <a href="#transfer">{S.transfer.h}</a>
          <a href="#rights">{S.rights.h}</a>
          <a href="#apply">{S.apply.h}</a>
          <a href="#retention">{S.retention.h}</a>
          <a href="#updates">{S.updates.h}</a>
        </nav>
      </aside>

      <section style={content}>
        <h3 id="identity">{S.identity.h}</h3>
        <p>{S.identity.p}</p>

        <h3 id="purposes">{S.purposes.h}</h3>
        <ul>{S.purposes.items.map((x,i)=>(<li key={i}>{x}</li>))}</ul>

        <h3 id="legal">{S.legal.h}</h3>
        <p>{S.legal.p}</p>

        <h3 id="collect">{S.collect.h}</h3>
        <ul>{S.collect.items.map((x,i)=>(<li key={i}>{x}</li>))}</ul>

        <h3 id="transfer">{S.transfer.h}</h3>
        <ul>{S.transfer.items.map((x,i)=>(<li key={i}>{x}</li>))}</ul>
        <p style={{fontSize:13,opacity:.8}}>{S.transfer.note}</p>

        <h3 id="rights">{S.rights.h}</h3>
        <ul>{S.rights.items.map((x,i)=>(<li key={i}>{x}</li>))}</ul>

        <h3 id="apply">{S.apply.h}</h3>
        <p>{S.apply.p}</p>

        <h3 id="retention">{S.retention.h}</h3>
        <p>{S.retention.p}</p>

        <h3 id="updates">{S.updates.h}</h3>
        <p>{S.updates.p}</p>
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
