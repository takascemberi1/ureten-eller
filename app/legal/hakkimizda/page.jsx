// app/legal/hakkimizda/page.jsx
export default function Page({ searchParams }) {
  const lang = ["tr","en","ar"].includes(searchParams?.lang) ? searchParams.lang : "tr";
  const T = {
    tr:{title:"Hakkımızda",body:`Bu site; güvenli kayıt/giriş ve çok dilli yasal dokümanlar için temel bir iskele sunar.
Misyon: basit, hızlı, güvenli kimlik doğrulama.
Diller: Türkçe • İngilizce • Arapça.
İletişim için İletişim sayfasına bakınız.`},
    en:{title:"About",body:`This site provides a minimal scaffold for secure auth and multilingual legal pages.
Mission: simple, fast, secure authentication.
Languages: Turkish • English • Arabic.
See Contact page to reach us.`},
    ar:{title:"من نحن",body:`يوفّر هذا الموقع هيكلًا بسيطًا لمصادقة آمنة وصفحات قانونية متعددة اللغات.
المهمة: مصادقة بسيطة وسريعة وآمنة.
اللغات: التركية • الإنجليزية • العربية.
راجِع صفحة الاتصال للتواصل.`}
  }[lang];
  return (<article><h1 style={{fontSize:28,marginBottom:12}}>{T.title}</h1><pre style={{whiteSpace:"pre-wrap",font:"inherit",color:"#334155"}}>{T.body}</pre></article>);
}
