// app/legal/mesafeli-satis-sozlesmesi/page.jsx — SERVER COMPONENT
export const dynamic = 'force-static'

const SUP=['tr','en','ar','de']
function normalizeLang(r){ const b=String(r||'').toLowerCase().split('-')[0]; return SUP.includes(b)?b:'tr' }
function pickPack(T,l){ const p=T?.[l]||T?.tr||{}; return {...p,sections:Array.isArray(p.sections)?p.sections:[]} }
function MaskedAddress(){ return 's***** g**** mah. rahmet sk. no: 27A, Silivri / İstanbul' }
function SellerLegalName(){ return 'Üreten Eller (Şahıs İşletmesi)' }
function ContactWhatsApp(){ return '+90 505 727 91 43' }

const T = {
  tr:{
    title:'Mesafeli Satış Sözleşmesi',
    intro:'6502 sayılı Tüketicinin Korunması Hakkında Kanun ve ilgili yönetmelikler uyarınca düzenlenmiştir.',
    sections:[
      {h:'Taraflar',p:`Satıcı: ${SellerLegalName()} (Adres maskeli: ${MaskedAddress()}) — Müşteri: kayıtlı kullanıcı.`},
      {h:'Konu',p:'Elektronik ortamda yapılan ürün/hizmet satışına ilişkin hükümler.'},
      {h:'Ürün Bilgileri ve Fiyat',p:'Ürün özellikleri ilan sayfasında; vergiler ve kargo ücretleri ödeme ekranında şeffaf biçimde gösterilir.'},
      {h:'Ödeme ve Fatura',p:'Ödeme PayTR/iyzico vb. aracılığı ile güvenli şekilde alınır. E-arşiv/e-fatura (uygunsa) e-posta ile iletilebilir.'},
      {h:'Teslimat',p:'Satıcı tarafından belirtilen sürede kargoya verilir; takip numarası sağlanır.'},
      {h:'Cayma Hakkı',p:'Teslimden itibaren 14 gün içinde cayma hakkı vardır. İstisnalar: hijyen/kişisel kullanım ürünleri, kişiye özel üretimler, çabuk bozulan mallar.'},
      {h:'İade Süreci',ul:[
        'Cayma bildirimi yazılı/sabit veri saklayıcıyla yapılır',
        'Ürün kullanılmamış/yeniden satılabilir halde olmalıdır',
        'İade kargo bilgisi ve etiketi (varsa) sağlanır'
      ]},
      {h:'Ayıplı Mal',p:'6502 sayılı Kanun kapsamındaki seçimlik haklar saklıdır (bedel iadesi, ücretsiz onarım, değişim, ayıp oranında indirim).'},
      {h:'Uyuşmazlık Çözümü',p:'İl/İlçe Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir. Öncesinde iletişim ve arabuluculuk önerilir (WhatsApp: '+ContactWhatsApp()+').' }
    ]
  },
  en:{
    title:'Distance Sales Agreement',
    intro:'Prepared under Turkish consumer law and related regulations.',
    sections:[
      {h:'Parties',p:`Seller: ${SellerLegalName()} (masked address: ${MaskedAddress()}) — Buyer: registered user.`},
      {h:'Subject',p:'Terms for sales concluded electronically.'},
      {h:'Product & Price',p:'Features shown on the listing; taxes/shipping shown transparently at checkout.'},
      {h:'Payment & Invoicing',p:'Securely processed (e.g., PayTR/iyzico). E-archive/e-invoice (if applicable) may be emailed.'},
      {h:'Delivery',p:'Shipped within the declared time; tracking provided.'},
      {h:'Right of Withdrawal',p:'14 days after delivery. Exceptions: hygiene/personalized/perishable goods.'},
      {h:'Returns',ul:['Written notice on a durable medium','Item unused/resaleable','Return label & carrier info provided where available']},
      {h:'Defective Goods',p:'Statutory remedies apply (refund, repair, replacement, price reduction).'},
      {h:'Disputes',p:'Consumer arbitration committees/courts are competent. Please contact us first (WhatsApp: '+ContactWhatsApp()+').'}
    ]
  },
  ar:{ title:'عقد البيع عن بُعد', intro:'وفق قانون حماية المستهلك التركي.', sections:[
    {h:'الأطراف',p:`البائع: ${SellerLegalName()} (العنوان مخفي: ${MaskedAddress()}) — المشتري: مستخدم مسجّل.`},
    {h:'الموضوع',p:'أحكام إتمام المبيعات إلكترونيًا.'},
    {h:'المنتج والسعر',p:'الخصائص معروضة في صفحة الإعلان؛ الضرائب والشحن تظهر عند الدفع.'},
    {h:'الدفع والفاتورة',p:'معالجة آمنة (PayTR/iyzico). قد تُرسل الفاتورة إلكترونيًا.'},
    {h:'التسليم',p:'شحن ضمن المدة المعلنة مع رقم تتبع.'},
    {h:'حق الانسحاب',p:'14 يومًا من التسليم؛ استثناءات: منتجات شخصية/صحية/سريعة التلف.'},
    {h:'الإرجاع',ul:['إشعار كتابي','غير مستخدم وقابل للبيع','توفير ملصق الإرجاع إن وُجد']},
    {h:'العيوب',p:'الحقوق القانونية سارية.'},
    {h:'النزاعات',p:'اللجان/المحاكم المختصة؛ الرجاء التواصل أولًا (واتساب: '+ContactWhatsApp()+').'}
  ]},
  de:{ title:'Fernabsatzvertrag', intro:'Gemäß türkischem Verbraucherschutzrecht.', sections:[
    {h:'Parteien',p:`Verkäufer: ${SellerLegalName()} (maskierte Adresse: ${MaskedAddress()}) — Käufer: registrierter Nutzer.`},
    {h:'Gegenstand',p:'Bedingungen für elektronisch geschlossene Verkäufe.'},
    {h:'Produkt & Preis',p:'Merkmale in der Anzeige; Steuern/Versand beim Checkout.'},
    {h:'Zahlung & Rechnung',p:'Sicher verarbeitet (z. B. PayTR/iyzico). E-Rechnung ggf. per E-Mail.'},
    {h:'Lieferung',p:'Versand innerhalb der angegebenen Zeit; Tracking bereitgestellt.'},
    {h:'Widerrufsrecht',p:'14 Tage ab Lieferung; Ausnahmen: Hygiene, personalisierte, verderbliche Waren.'},
    {h:'Retouren',ul:['Schriftliche Mitteilung','Unbenutzt/wiederverkäuflich','Retourenlabel falls verfügbar']},
    {h:'Mängel',p:'Gesetzliche Gewährleistungsrechte gelten.'},
    {h:'Streitfälle',p:'Zuständig: Verbraucher-Schlichtungsstellen/Gerichte. Bitte zuerst Kontakt (WhatsApp: '+ContactWhatsApp()+').'}
  ]}
}

export default function Page({ searchParams }){
  const lang=normalizeLang(searchParams?.lang)
  const pack=pickPack(T,lang)
  return (
    <article style={{maxWidth:980,margin:'18px auto',padding:'12px 14px'}}>
      <h1>{pack.title}</h1>
      {pack.intro && <p>{pack.intro}</p>}
      {pack.sections.map((s,i)=>(
        <section key={i} style={{marginTop:12}}>
          {s.h && <h2>{s.h}</h2>}
          {s.p && <p>{s.p}</p>}
          {Array.isArray(s.ul)&&<ul>{s.ul.map((li,ix)=><li key={ix}>{li}</li>)}</ul>}
        </section>
      ))}
    </article>
  )
}
