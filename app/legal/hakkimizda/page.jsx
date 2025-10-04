// app/legal/hakkimizda/page.jsx — SERVER COMPONENT
export const dynamic = 'force-static'

const SUP=['tr','en','ar','de']
function normalizeLang(r){ const b=String(r||'').toLowerCase().split('-')[0]; return SUP.includes(b)?b:'tr' }
function pickPack(T,l){ const p=T?.[l]||T?.tr||{}; return {...p,sections:Array.isArray(p.sections)?p.sections:[]} }
function SellerLegalName(){ return 'Üreten Eller (Şahıs İşletmesi)' }
function TaxBlockTR(){ return 'VKM: 9530226667 • Silivri Vergi Dairesi' }

const T = {
  tr:{ title:'Hakkımızda', intro:'El emeği üreticileriyle alıcıları buluşturan adil ve güvenli bir pazaryeriyiz.', sections:[
    {h:'Misyon',p:'Üreten Elleri güçlendirmek; şeffaf fiyat, güvenli ödeme, açık iade.'},
    {h:'Yasal',p:`${SellerLegalName()} — ${TaxBlockTR()}`}
  ]},
  en:{ title:'About Us', intro:'A fair & safe marketplace connecting makers and buyers.', sections:[
    {h:'Mission',p:'Empower makers; transparent pricing, secure payments, clear returns.'},
    {h:'Legal',p:`${SellerLegalName()} — ${TaxBlockTR()}`}
  ]},
  ar:{ title:'من نحن', intro:'سوق عادل وآمن يربط المنتجين بالمشترين.', sections:[
    {h:'المهمة',p:'تمكين المنتجين؛ تسعير شفاف، دفع آمن، إرجاع واضح.'}
  ]},
  de:{ title:'Über uns', intro:'Fairer & sicherer Marktplatz für Handgemachtes.', sections:[
    {h:'Mission',p:'Hersteller stärken; transparente Preise, sichere Zahlungen, klare Retouren.'}
  ]}
}

export default function Page({ searchParams }){
  const lang=normalizeLang(searchParams?.lang)
  const pack=pickPack(T,lang)
  return (
    <article style={{maxWidth:980,margin:'18px auto',padding:'12px 14px'}}>
      <h1>{pack.title}</h1>
      {pack.intro && <p>{pack.intro}</p>}
      {pack.sections.map((s,i)=>(<section key={i} style={{marginTop:12}}>{s.h&&<h2>{s.h}</h2>}{s.p&&<p>{s.p}</p>}</section>))}
    </article>
  )
}
