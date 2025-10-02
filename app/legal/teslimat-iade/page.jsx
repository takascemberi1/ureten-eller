// app/legal/teslimat-iade/page.jsx
export default function Page({ searchParams }) {
  const lang = ["tr","en","ar"].includes(searchParams?.lang) ? searchParams.lang : "tr";
  const T = {
    tr:{title:"Teslimat & İade Politikası",body:`Hizmet doğası gereği dijitaldir; fiziksel teslimat yoktur.
İade: Yasal çerçeve ve kullanım durumuna göre değerlendirilir.

İletişim:
• E-posta: uretenellertr@gmail.com
• WhatsApp: 05057279143`},
    en:{title:"Delivery & Returns",body:`Services are digital; no physical delivery.
Returns: Assessed under applicable law and actual usage.

Contact:
• Email: uretenellertr@gmail.com
• WhatsApp: 05057279143`},
    ar:{title:"التسليم والإرجاع",body:`الخدمات رقمية ولا يوجد تسليم مادي.
الإرجاع: وفق القانون والحالة الفعلية.

التواصل:
• البريد: uretenellertr@gmail.com
• واتساب: 05057279143`}
  }[lang];
  return (<article><h1 style={{fontSize:28,marginBottom:12}}>{T.title}</h1><pre style={{whiteSpace:"pre-wrap",font:"inherit",color:"#334155"}}>{T.body}</pre></article>);
}
