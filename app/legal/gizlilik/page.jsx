// app/legal/gizlilik/page.jsx  — SERVER COMPONENT
export const dynamic = 'force-static'

// Yardımcılar
const SUP=['tr','en','ar','de']
function normalizeLang(raw){ const b=String(raw||'').toLowerCase().split('-')[0]; return SUP.includes(b)?b:'tr' }
function pickPack(T,lang){ const p=T?.[lang]||T?.tr||{}; return {...p,sections:Array.isArray(p.sections)?p.sections:[]} }
function MaskedAddress(){ return 's***** g**** mah. rahmet sk. no: 27A, Silivri / İstanbul' }
function SellerLegalName(){ return 'Üreten Eller (Şahıs İşletmesi)' }
function TaxBlockTR(){ return 'VKM: 9530226667 • Silivri Vergi Dairesi' }
function ContactWhatsApp(){ return '+90 505 727 91 43' }

const T = {
  tr: {
    title: 'Gizlilik Politikası',
    intro: 'Kişisel verileriniz 6698 sayılı KVKK ve ilgili mevzuat uyarınca işlenir, saklanır ve korunur.',
    sections: [
      { h:'1) Veri Sorumlusu', p:`${SellerLegalName()} — ${TaxBlockTR()}. Adres (maskeli): ${MaskedAddress()}. İletişim: WhatsApp ${ContactWhatsApp()}.` },
      { h:'2) Toplanan Veriler ve Kaynaklar', ul:[
        'Hesap verileri: ad-soyad, kullanıcı adı, e-posta, telefon',
        'İşlem verileri: sipariş, ödeme, iade/iptal kayıtları',
        'Lojistik verileri: teslimat/fatura adresi, kargo bilgileri',
        'Teknik veriler: IP, cihaz, tarayıcı bilgisi; çerezler ve benzeri teknolojiler',
        'İçerik verileri: ürün fotoğrafları, mesajlaşma kayıtları (ihlalleri önleme amaçlı sınırlı süre)'
      ]},
      { h:'3) İşleme Amaçları ve Hukuki Sebepler', p:'Sözleşmenin ifası (sipariş/teslimat/ödeme), meşru menfaat (güvenlik, dolandırıcılık önleme), açık rıza (pazarlama bildirimleri) ve hukuki yükümlülüklerin yerine getirilmesi amaçlarıyla veriler işlenir.' },
      { h:'4) Paylaşım/Aktarım', ul:[
        'Ödeme kuruluşları (PayTR/iyzico vb.) — sadece ödeme işlemleri için gerekli veriler',
        'Kargo/lojistik firmaları — teslimat için zorunlu veriler',
        'Barındırma, güvenlik, denetim ve hukuk danışmanları — asgari ve amaçla sınırlı',
        'Yasal merciler — mevzuat gerektirdiğinde'
      ]},
      { h:'5) Saklama Süreleri', p:'Mali kayıtlar Vergi Usul Kanunu gereği 10 yıl; hesap/işlem verileri ilgili ilişki ve zamanaşımı süreleri boyunca; pazarlama rızası geri çekilene kadar saklanır. Süre dolunca güvenli şekilde silinir/anonimleştirilir.' },
      { h:'6) Çerezler', p:'Oturum, tercih, güvenlik ve analitik çerezleri kullanılır. Tarayıcı ayarlarından çerezleri yönetebilirsiniz. Çerez reddi, bazı işlevlerin kısıtlanmasına yol açabilir.' },
      { h:'7) Güvenlik', p:'Veri güvenliği için şifreleme (TLS), erişim kontrolleri, ilke bazlı yetkilendirme ve kayıt izleme uygulanır. İnternet üzerindeki iletimin mutlak güvenliği garanti edilemez.' },
      { h:'8) Çocukların Verileri', p:'16 yaş altına ait veriler, veli/vasi izni olmaksızın pazarlama amacıyla işlenmez. Tespit edilirse silinir.' },
      { h:'9) Haklar', ul:[
        'Erişim ve bilgi talebi',
        'Düzeltme/güncelleme',
        'Silme/unutulma (mevzuat istisnaları saklı)',
        'İşlemeye itiraz ve kısıtlama talebi',
        'Veri taşınabilirliği (uygun olduğunda)',
        'Açık rızayı geri çekme'
      ]},
      { h:'10) Başvuru ve Şikayet', p:`Taleplerinizi İletişim sayfasından veya WhatsApp ${ContactWhatsApp()} üzerinden iletebilirsiniz. KVKK Kurumu’na şikayet hakkınız saklıdır.` },
      { h:'11) Uluslararası Aktarım', p:'Hizmet sağlayıcıların yurt dışındaki sunucuları sebebiyle sınırlı aktarımlar olabilir. Yeterli koruma ve sözleşmesel güvenceler uygulanır.' },
      { h:'12) Politika Değişiklikleri', p:'Politika güncellemeleri sitede yayımlanır ve yürürlük tarihinden itibaren geçerlidir.' }
    ]
  },
  en: {
    title: 'Privacy Policy',
    intro: 'We process, store and protect personal data under applicable laws (e.g., KVKK/GDPR).',
    sections: [
      { h:'1) Controller', p:`${SellerLegalName()} — Tax: ${TaxBlockTR()}. Masked address: ${MaskedAddress()}. Contact: WhatsApp ${ContactWhatsApp()}.` },
      { h:'2) Data We Collect', ul:[
        'Account: full name, username, email, phone',
        'Transactions: orders, payments, returns/cancellations',
        'Logistics: shipping/billing addresses, tracking info',
        'Technical: IP, device, browser; cookies & similar tech',
        'Content: product photos, in-app messages (retained briefly to prevent abuse)'
      ]},
      { h:'3) Purposes & Legal Bases', p:'Contract performance (order/delivery/payment), legitimate interests (security/fraud prevention), consent (marketing), and legal obligations.' },
      { h:'4) Sharing/Transfers', ul:[
        'Payment service providers (e.g., PayTR/iyzico) — limited to payment processing',
        'Carriers/logistics — delivery',
        'Hosting, security, audit, legal advisors — minimal & purpose-bound',
        'Authorities — where required by law'
      ]},
      { h:'5) Retention', p:'Accounting records: 10 years; account/transaction data for the duration of relationship and limitation periods; marketing until consent withdrawn; then deletion/anonymization.' },
      { h:'6) Cookies', p:'Session, preference, security and analytics cookies are used. Manage via browser settings; blocking may limit features.' },
      { h:'7) Security', p:'TLS, access control, policy-based authorization and logging. No method is 100% secure over the Internet.' },
      { h:'8) Children', p:'No marketing processing for under 16 without guardian consent. We delete if discovered.' },
      { h:'9) Your Rights', ul:[
        'Access & information',
        'Rectification',
        'Erasure (subject to legal exceptions)',
        'Objection / restriction',
        'Portability (where applicable)',
        'Withdraw consent'
      ]},
      { h:'10) Requests & Complaints', p:`Use our Contact page or WhatsApp ${ContactWhatsApp()}. You may lodge a complaint with the authority.` },
      { h:'11) International Transfers', p:'Some providers may host data abroad; adequate safeguards apply.' },
      { h:'12) Changes', p:'Updates are published on this page and effective upon posting.' }
    ]
  },
  ar: {
    title: 'سياسة الخصوصية',
    intro: 'نقوم بمعالجة بياناتك الشخصية وفقًا للقوانين المعمول بها (KVKK/GDPR).',
    sections: [
      { h:'1) المسؤول عن المعالجة', p:`${SellerLegalName()} — الضرائب: ${TaxBlockTR()}. العنوان (مخفي): ${MaskedAddress()}. التواصل: واتساب ${ContactWhatsApp()}.` },
      { h:'2) البيانات المجمَّعة', ul:[
        'الحساب: الاسم، البريد، الهاتف',
        'المعاملات: الطلبات، المدفوعات، المرتجعات',
        'اللوجستيات: عناوين الشحن/الفواتير، التتبع',
        'التقنية: IP والجهاز والمتصفح؛ ملفات تعريف الارتباط',
        'المحتوى: صور المنتجات والرسائل داخل التطبيق'
      ]},
      { h:'3) الأغراض والأسس القانونية', p:'تنفيذ العقد، المصلحة المشروعة (الأمن ومنع الاحتيال)، الموافقة (التسويق)، الالتزامات القانونية.' },
      { h:'4) المشاركة/التحويل', ul:[
        'مزودو الدفع (PayTR/iyzico)',
        'شركات الشحن',
        'الاستضافة والأمن والمراجعة والمستشارون',
        'السلطات عند الطلب القانوني'
      ]},
      { h:'5) مدة الاحتفاظ', p:'السجلات المالية 10 سنوات؛ بيانات الحساب/المعاملات حسب المدد القانونية؛ التسويق حتى سحب الموافقة.' },
      { h:'6) الكوكيز', p:'نستخدم كوكيز الجلسة والتفضيلات والأمن والتحليلات.' },
      { h:'7) الأمان', p:'TLS وضوابط الوصول والتسجيل.' },
      { h:'8) الأطفال', p:'لا معالجة تسويقية دون موافقة الوصي لمن هم دون 16 عامًا.' },
      { h:'9) الحقوق', ul:['الوصول','التصحيح','المحو','الاعتراض/التقييد','قابلية النقل (عند الاقتضاء)','سحب الموافقة'] },
      { h:'10) الطلبات والشكاوى', p:`اتصل بنا أو عبر واتساب ${ContactWhatsApp()}.` },
      { h:'11) التحويلات الدولية', p:'قد يتم الاستضافة خارج البلاد مع ضمانات مناسبة.' },
      { h:'12) التغييرات', p:'أي تحديثات تُنشر هنا وتصبح نافذة عند النشر.' }
    ]
  },
  de: {
    title: 'Datenschutzerklärung',
    intro: 'Wir verarbeiten personenbezogene Daten gemäß geltendem Recht (KVKK/GDPR).',
    sections: [
      { h:'1) Verantwortlicher', p:`${SellerLegalName()} — Steuern: ${TaxBlockTR()}. Maskierte Adresse: ${MaskedAddress()}. Kontakt: WhatsApp ${ContactWhatsApp()}.` },
      { h:'2) Erhobene Daten', ul:[
        'Konto: Name, E-Mail, Telefon',
        'Transaktionen: Bestellungen, Zahlungen, Retouren',
        'Logistik: Liefer-/Rechnungsadressen, Sendungsverfolgung',
        'Technik: IP, Gerät, Browser; Cookies',
        'Inhalte: Produktfotos, In-App-Nachrichten'
      ]},
      { h:'3) Zwecke & Rechtsgrundlagen', p:'Vertragserfüllung, berechtigtes Interesse (Sicherheit/Betrugsprävention), Einwilligung (Marketing), rechtliche Pflichten.' },
      { h:'4) Weitergabe/Übermittlung', ul:[
        'Zahlungsdienste (PayTR/iyzico)',
        'Versanddienstleister',
        'Hosting, Sicherheit, Audit, Rechtsberatung',
        'Behörden, sofern gesetzlich erforderlich'
      ]},
      { h:'5) Aufbewahrung', p:'Buchhaltungsunterlagen 10 Jahre; Kontodaten gem. Fristen; Marketing bis Widerruf.' },
      { h:'6) Cookies', p:'Sitzungs-, Präferenz-, Sicherheits- und Analyse-Cookies.' },
      { h:'7) Sicherheit', p:'TLS, Zugriffssteuerung und Protokollierung.' },
      { h:'8) Kinder', p:'Keine Marketing-Verarbeitung ohne Zustimmung des Vormunds (<16).' },
      { h:'9) Rechte', ul:['Auskunft','Berichtigung','Löschung','Widerspruch/Einschränkung','Übertragbarkeit (sofern anwendbar)','Widerruf'] },
      { h:'10) Anfragen & Beschwerden', p:`Kontaktseite oder WhatsApp ${ContactWhatsApp()}.` },
      { h:'11) Internationale Übermittlungen', p:'Ggf. Auslands-Hosting mit geeigneten Garantien.' },
      { h:'12) Änderungen', p:'Aktualisierungen werden hier veröffentlicht.' }
    ]
  }
}

export default function Page({ searchParams }) {
  const lang = normalizeLang(searchParams?.lang)
  const pack = pickPack(T, lang)
  return (
    <article style={{maxWidth:980,margin:'18px auto',padding:'12px 14px'}}>
      <h1>{pack.title}</h1>
      {pack.intro && <p>{pack.intro}</p>}
      {pack.sections.map((s,i)=>(
        <section key={i} style={{marginTop:14}}>
          {s.h && <h2 style={{margin:'8px 0'}}>{s.h}</h2>}
          {s.p && <p>{s.p}</p>}
          {Array.isArray(s.ul) && <ul>{s.ul.map((li,ix)=><li key={ix}>{li}</li>)}</ul>}
        </section>
      ))}
    </article>
  )
}
