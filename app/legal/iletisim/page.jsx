// app/legal/iletisim/page.jsx
export default function Page({ searchParams }) {
  const lang = ["tr","en","ar"].includes(searchParams?.lang) ? searchParams.lang : "tr";
  const T = {
    tr:{title:"İletişim",body:`Bize ulaşın:
• E-posta: uretenellertr@gmail.com
• WhatsApp: 05057279143
• Adres (genel): İstanbul, Türkiye

Destek taleplerinde e-posta önceliklidir.`},
    en:{title:"Contact",body:`Reach us:
• Email: uretenellertr@gmail.com
• WhatsApp: 05057279143
• Address (general): Istanbul, Türkiye

Email is preferred for support.`},
    ar:{title:"اتصال",body:`تواصل معنا:
• البريد: uretenellertr@gmail.com
• واتساب: 05057279143
• العنوان (عام): إسطنبول، تركيا

يُفضَّل البريد للدعم.`}
  }[lang];
  return (<article><h1 style={{fontSize:28,marginBottom:12}}>{T.title}</h1><pre style={{whiteSpace:"pre-wrap",font:"inherit",color:"#334155"}}>{T.body}</pre></article>);
}
