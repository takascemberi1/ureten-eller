// app/legal/teslimat-iade/page.jsx — SERVER COMPONENT
export const dynamic = 'force-static'

const SUP=['tr','en','ar','de']
function normalizeLang(r){ const b=String(r||'').toLowerCase().split('-')[0]; return SUP.includes(b)?b:'tr' }
function pickPack(T,l){ const p=T?.[l]||T?.tr||{}; return {...p,sections:Array.isArray(p.sections)?p.sections:[]} }
function ContactWhatsApp(){ return '+90 505 727 91 43' }

const T = {
  tr:{
    title:'Teslimat & İade',
    intro:'Teslimat süresi, iade koşulları ve ücret iadesi aşağıda açıklanmıştır.',
    sections:[
      {h:'Teslimat',ul:[
        'Sipariş onayından sonra satıcının ilanında belirtilen sürelerde kargoya verilir',
        'Kargo takip numarası sağlanır',
        'Hasarlı paket/ürün 48 saat içinde bildirilmelidir'
      ]},
      {h:'İade Koşulları',ul:[
        '14 gün cayma hakkı (istisnalar: hijyen, kişiye özel üretimler, hızla bozulan ürünler)',
        'Ürün mümkünse orijinal ambalajıyla ve yeniden satılabilir durumda olmalıdır',
        'İade talebi onaylandıktan sonra kargo bilgisi/etiketi sağlanır'
      ]},
      {h:'Ücret İadesi',p:'İade kabulünden sonra, orijinal ödeme yöntemine iade edilir. Banka süreçleri nedeniyle yansıma süresi değişebilir.'},
      {h:'Destek',p:`Her adımda yardım için WhatsApp ${ContactWhatsApp()}`}
    ]
  },
  en:{
    title:'Shipping & Returns',
    intro:'Delivery, return conditions and refunds.',
    sections:[
      {h:'Shipping',ul:[
        'Shipped within seller-declared time after order confirmation',
        'Tracking number provided',
        'Report damaged package/item within 48 hours'
      ]},
      {h:'Returns',ul:[
        '14-day withdrawal right (exceptions: hygiene, personalized, perishable)',
        'Preferably in original packaging and resaleable condition',
        'Return label/carrier info after approval'
      ]},
      {h:'Refunds',p:'Processed to original payment method after acceptance; bank posting times may vary.'},
      {h:'Support',p:`WhatsApp ${ContactWhatsApp()} for assistance`}
    ]
  },
  ar:{ title:'الشحن والإرجاع', intro:'التسليم وشروط الإرجاع واسترداد المبلغ.', sections:[
    {h:'الشحن',ul:['الشحن ضمن المدة المعلنة','توفير رقم تتبع','الإبلاغ عن الضرر خلال 48 ساعة']},
    {h:'الإرجاع',ul:['14 يومًا (استثناءات: صحي/شخصي/سريع التلف)','يفضل التغليف الأصلي وحالة قابلة للبيع','توفير ملصق الإرجاع بعد الموافقة']},
    {h:'الاسترداد',p:'إلى طريقة الدفع الأصلية؛ قد تختلف مدد البنك.'},
    {h:'الدعم',p:`واتساب ${ContactWhatsApp()}`}
  ]},
  de:{ title:'Versand & Rückgabe', intro:'Lieferung, Rückgaberegeln und Erstattungen.', sections:[
    {h:'Versand',ul:['Versand innerhalb der angegebenen Zeit','Sendungsverfolgung','Schäden binnen 48 Std. melden']},
    {h:'Rückgabe',ul:['14 Tage Widerruf (Ausnahmen: Hygiene/personalisiert/verderblich)','Möglichst Originalverpackung, wiederverkäuflich','Retourenlabel nach Genehmigung']},
    {h:'Erstattung',p:'Auf ursprüngliche Zahlungsmethode; Bankdauer kann variieren.'},
    {h:'Support',p:`WhatsApp ${ContactWhatsApp()}`}
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
