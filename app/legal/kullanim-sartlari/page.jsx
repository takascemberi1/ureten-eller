// app/legal/kullanim-sartlari/page.jsx — SERVER COMPONENT
export const dynamic = 'force-static'

const SUP=['tr','en','ar','de']
function normalizeLang(r){ const b=String(r||'').toLowerCase().split('-')[0]; return SUP.includes(b)?b:'tr' }
function pickPack(T,l){ const p=T?.[l]||T?.tr||{}; return {...p,sections:Array.isArray(p.sections)?p.sections:[]} }
function SellerLegalName(){ return 'Üreten Eller (Şahıs İşletmesi)' }

const T = {
  tr: {
    title:'Kullanım Şartları',
    intro:'Platformu kullanarak bu şartları kabul etmiş sayılırsınız.',
    sections:[
      { h:'Tanımlar', ul:['Platform: Üreten Eller pazaryeri','Üreten El: Satıcı','Müşteri: Alıcı kullanıcı'] },
      { h:'Hizmet Kapsamı', p:'El emeği ürünlerin listelenmesi, sipariş, ödeme ve teslimat süreçlerinin kolaylaştırılması.' },
      { h:'Üyelik ve Hesap', ul:['Doğru ve güncel bilgi verme yükümlülüğü','Hesap güvenliği ve gizliliği kullanıcının sorumluluğundadır','Tek kişi/tek hesap ilkesi'] },
      { h:'Yasaklı İçerik', ul:['Yasadışı/sağlığa zararlı ürünler','Telif/marka ihlali','Nefret söylemi, hakaret, spam'] },
      { h:'Satıcı Sorumluluğu', p:'İlan doğruluğu, ürün kalitesi, zamanında teslimat ve iade süreçlerinden satıcı sorumludur.' },
      { h:'Platformun Rolü', p:'Aracılık hizmeti sunulur; satıcı ile müşteri arasındaki sözleşmenin tarafı satıcı ve müşteridir.' },
      { h:'Uyuşmazlık Çözümü', p:'Öncelikle taraflar arası iletişim ve arabuluculuk; çözülemezse yetkili yargı yerleri.' },
      { h:'Değişiklikler', p:'Şartlar güncellenebilir; yayımlandığı tarihten itibaren geçerlidir.' }
    ]
  },
  en: {
    title:'Terms of Use',
    intro:'By using the platform, you accept these terms.',
    sections:[
      { h:'Definitions', ul:['Platform: Ureten Eller marketplace','Maker: Seller','Customer: Buyer user'] },
      { h:'Scope of Service', p:'Listing handmade goods and facilitating orders, payments and deliveries.' },
      { h:'Account', ul:['Provide accurate/up-to-date info','You are responsible for account security','One person / one account'] },
      { h:'Prohibited Content', ul:['Illegal/harmful items','IP infringements','Hate speech, abuse, spam'] },
      { h:'Seller Responsibility', p:'Listing accuracy, product quality, timely delivery and returns belong to the seller.' },
      { h:'Platform Role', p:'We provide intermediation; the sales contract is between seller and customer.' },
      { h:'Disputes', p:'Parties should communicate and mediate first; otherwise competent courts.' },
      { h:'Changes', p:'Terms may be updated and are effective upon publication.' }
    ]
  },
  ar:{ title:'شروط الاستخدام', intro:'باستخدامك المنصة فإنك تقبل هذه الشروط.', sections:[
    {h:'التعريفات',ul:['المنصة: سوق أُنتج بالأيادي','المنتِج: البائع','العميل: المشتري']},
    {h:'نطاق الخدمة',p:'عرض المنتجات اليدوية وتسهيل الطلب والدفع والتسليم.'},
    {h:'الحساب',ul:['تقديم معلومات صحيحة ومحدثة','أنت مسؤول عن أمان الحساب','حساب واحد لكل شخص']},
    {h:'محتوى محظور',ul:['منتجات غير قانونية','تعدي حقوق الملكية','خطاب كراهية/إساءة/رسائل مزعجة']},
    {h:'مسؤولية البائع',p:'دقة الإعلان والجودة والتسليم والإرجاع مسؤولية البائع.'},
    {h:'دور المنصة',p:'خدمة وسيطة؛ العقد بين البائع والعميل.'},
    {h:'المنازعات',p:'التواصل والوساطة أولًا؛ وإلا الجهات القضائية المختصة.'},
    {h:'التغييرات',p:'قد يتم التحديث ويصبح نافذًا عند النشر.'}
  ]},
  de:{ title:'Nutzungsbedingungen', intro:'Durch Nutzung der Plattform akzeptieren Sie diese Bedingungen.', sections:[
    {h:'Begriffe',ul:['Plattform: Ureten Eller Marktplatz','Hersteller: Verkäufer','Kunde: Käufer']},
    {h:'Leistungsumfang',p:'Auflistung handgemachter Waren; Bestellungen, Zahlungen und Lieferungen.'},
    {h:'Konto',ul:['Korrekte/aktuelle Angaben','Konto-Sicherheit liegt bei Ihnen','Eine Person / ein Konto']},
    {h:'Verbotene Inhalte',ul:['Illegale/gefährliche Artikel','IP-Verstöße','Hassrede, Missbrauch, Spam']},
    {h:'Verantwortung des Verkäufers',p:'Richtigkeit, Qualität, rechtzeitige Lieferung, Retouren.'},
    {h:'Rolle der Plattform',p:'Vermittlungsdienst; Vertrag zwischen Verkäufer und Kunde.'},
    {h:'Streitfälle',p:'Kommunikation/Mediation zuerst; sonst zuständige Gerichte.'},
    {h:'Änderungen',p:'Wir können aktualisieren; wirksam mit Veröffentlichung.'}
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
