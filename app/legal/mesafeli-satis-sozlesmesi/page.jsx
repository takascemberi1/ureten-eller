// app/legal/mesafeli-satis-sozlesmesi/page.jsx
export default function Page({ searchParams }) {
  const lang = ["tr","en","ar"].includes(searchParams?.lang) ? searchParams.lang : "tr";
  const T = {
    tr:{title:"Mesafeli Satış Sözleşmesi (Örnek)",body:`Taraflar: Sağlayıcı ve Kullanıcı.
Konu: Platform üzerinden sunulan dijital hizmetler.
Ödeme & Teslim: Dijital erişim/üyelik anında başlar.
Cayma Hakkı: Mevzuat kapsamındaki istisnalar saklıdır.
Uyuşmazlık: İstanbul mahkemeleri yetkilidir.
Not: Örnek metindir; özel durumlar için hukukçuya danışınız.

İletişim:
• E-posta: uretenellertr@gmail.com
• WhatsApp: 05057279143`},
    en:{title:"Distance Sales Agreement (Sample)",body:`Parties: Provider & User.
Subject: Digital services via the platform.
Payment & Delivery: Access/membership starts immediately.
Right of Withdrawal: Subject to statutory exceptions.
Disputes: Istanbul courts.
Note: Sample text; consult a lawyer for your case.

Contact:
• Email: uretenellertr@gmail.com
• WhatsApp: 05057279143`},
    ar:{title:"اتفاقية البيع عن بُعد (نموذج)",body:`الأطراف: المزوّد والمستخدم.
الموضوع: خدمات رقمية عبر المنصّة.
الدفع والتسليم: يبدأ الوصول/العضوية فورًا.
حق الانسحاب: وفق الاستثناءات القانونية.
النزاعات: محاكم إسطنبول.
ملاحظة: نص نموذجي؛ يُستحسن استشارة محامٍ.

التواصل:
• البريد: uretenellertr@gmail.com
• واتساب: 05057279143`}
  }[lang];
  return (<article><h1 style={{fontSize:28,marginBottom:12}}>{T.title}</h1><pre style={{whiteSpace:"pre-wrap",font:"inherit",color:"#334155"}}>{T.body}</pre></article>);
}
