// app/legal/kvkk-aydinlatma/page.jsx — SERVER COMPONENT
export const dynamic = 'force-static'

const SUP=['tr','en','ar','de']
function normalizeLang(r){ const b=String(r||'').toLowerCase().split('-')[0]; return SUP.includes(b)?b:'tr' }
function pickPack(T,l){ const p=T?.[l]||T?.tr||{}; return {...p,sections:Array.isArray(p.sections)?p.sections:[]} }
function MaskedAddress(){ return 's***** g**** mah. rahmet sk. no: 27A, Silivri / İstanbul' }
function SellerLegalName(){ return 'Üreten Eller (Şahıs İşletmesi)' }
function TaxBlockTR(){ return 'VKM: 9530226667 • Silivri Vergi Dairesi' }
function ContactWhatsApp(){ return '+90 505 727 91 43' }

const T = {
  tr: {
    title:'KVKK Aydınlatma Metni',
    intro:'6698 sayılı Kişisel Verilerin Korunması Kanunu’nun 10. maddesi uyarınca bilgilendirme.',
    sections: [
      { h:'Veri Sorumlusu', p:`${SellerLegalName()} — ${TaxBlockTR()} — Maskeli adres: ${MaskedAddress()} — İletişim: WhatsApp ${ContactWhatsApp()}` },
      { h:'İşleme Amaçları', ul:['Üyelik ve kimlik doğrulama','Sipariş/teslimat/ödeme süreçleri','Müşteri desteği ve uyuşmazlık yönetimi','Güvenlik ve dolandırıcılık önleme','Yasal yükümlülükler'] },
      { h:'Veri Aktarımları', p:'Ödeme kuruluşları, kargo, barındırma ve hukuki danışmanlar ile sınırlı ve amaçla bağlantılı paylaşım.' },
      { h:'Toplama Yöntemi ve Hukuki Sebep', p:'Elektronik ortam (web/app), sözleşme, meşru menfaat, açık rıza, hukuki zorunluluk.' },
      { h:'Haklarınız', ul:['KVKK 11 kapsamındaki tüm haklar','Başvuru ve şikayet yolları','Açık rızayı geri çekme'] }
    ]
  },
  en: {
    title:'KVKK Notice',
    intro:'Information pursuant to Turkish Law No. 6698.',
    sections: [
      { h:'Controller', p:`${SellerLegalName()} — ${TaxBlockTR()} — Masked address: ${MaskedAddress()} — Contact: WhatsApp ${ContactWhatsApp()}` },
      { h:'Purposes', ul:['Membership/verification','Orders/delivery/payment','Support & disputes','Security/fraud prevention','Legal obligations'] },
      { h:'Transfers', p:'Payments, carriers, hosting, legal advisors — minimal and purpose-limited.' },
      { h:'Collection & Legal Basis', p:'Electronic means; contract, legitimate interest, consent, legal obligation.' },
      { h:'Your Rights', ul:['Rights under Art. 11 of KVKK','Application & complaint routes','Withdraw consent'] }
    ]
  },
  ar:{ title:'إشعار KVKK', intro:'معلومات وفق القانون 6698.', sections:[
    {h:'المسؤول',p:`${SellerLegalName()} — ${TaxBlockTR()} — العنوان (مخفي): ${MaskedAddress()} — واتساب ${ContactWhatsApp()}`},
    {h:'الأغراض',ul:['العضوية/التحقق','الطلبات/التسليم/الدفع','الدعم والنزاعات','الأمن ومنع الاحتيال','الالتزامات القانونية']},
    {h:'النقل',p:'الدفع، الشحن، الاستضافة، المستشارون — بحد أدنى وللغرض.'},
    {h:'الأساس القانوني',p:'وسائل إلكترونية؛ العقد، المصلحة المشروعة، الموافقة، الالتزام القانوني.'},
    {h:'الحقوق',ul:['حقوق المادة 11 من KVKK','مسارات التقدّم بالشكاوى','سحب الموافقة']}
  ]},
  de:{ title:'KVKK-Hinweis', intro:'Information gemäß Gesetz Nr. 6698.', sections:[
    {h:'Verantwortlicher',p:`${SellerLegalName()} — ${TaxBlockTR()} — Maskierte Adresse: ${MaskedAddress()} — WhatsApp ${ContactWhatsApp()}`},
    {h:'Zwecke',ul:['Mitgliedschaft/Verifizierung','Bestellung/Lieferung/Zahlung','Support & Streitfälle','Sicherheit/Betrugsprävention','Gesetzliche Pflichten']},
    {h:'Übermittlungen',p:'Zahlungsdienste, Versand, Hosting, Rechtsberatung — minimal & zweckgebunden.'},
    {h:'Rechtsgrundlage',p:'Elektronisch; Vertrag, berechtigtes Interesse, Einwilligung, gesetzliche Pflicht.'},
    {h:'Ihre Rechte',ul:['Rechte gem. Art. 11 KVKK','Antrags-/Beschwerdewege','Widerruf der Einwilligung']}
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
