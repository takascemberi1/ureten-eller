// app/legal/iletisim/page.jsx — SERVER COMPONENT
export const dynamic = 'force-static'

const SUP=['tr','en','ar','de']
function normalizeLang(r){ const b=String(r||'').toLowerCase().split('-')[0]; return SUP.includes(b)?b:'tr' }
function pickPack(T,l){ const p=T?.[l]||T?.tr||{}; return {...p,sections:Array.isArray(p.sections)?p.sections:[]} }
function MaskedAddress(){ return 's***** g**** mah. rahmet sk. no: 27A, Silivri / İstanbul' }
function ContactWhatsApp(){ return '+90 505 727 91 43' }

const T = {
  tr:{ title:'İletişim', intro:'Aşağıdaki kanallardan bize ulaşabilirsiniz.', sections:[
    {h:'WhatsApp',p:ContactWhatsApp()},
    {h:'Adres (maskeli)',p:MaskedAddress()},
    {h:'Çalışma Saatleri',p:'Hafta içi 09:00–18:00 (resmi tatiller hariç)'}
  ]},
  en:{ title:'Contact', intro:'Reach us via:', sections:[
    {h:'WhatsApp',p:ContactWhatsApp()},
    {h:'Address (masked)',p:MaskedAddress()},
    {h:'Hours',p:'Weekdays 09:00–18:00 (excl. public holidays)'}
  ]},
  ar:{ title:'اتصال', intro:'تواصل معنا عبر:', sections:[
    {h:'واتساب',p:ContactWhatsApp()},
    {h:'العنوان (مخفي)',p:MaskedAddress()}
  ]},
  de:{ title:'Kontakt', intro:'Kontakt über:', sections:[
    {h:'WhatsApp',p:ContactWhatsApp()},
    {h:'Adresse (maskiert)',p:MaskedAddress()}
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
        </section>
      ))}
    </article>
  )
}
