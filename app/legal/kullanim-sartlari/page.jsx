// app/legal/kullanim-sartlari/page.jsx
export default function Page({ searchParams }) {
  const lang = ["tr","en","ar"].includes(searchParams?.lang) ? searchParams.lang : "tr";
  const T = {
    tr:{title:"Kullanım Şartları",body:`Hizmetleri kullanarak bu şartları kabul etmiş sayılırsınız.
• Hesap: Doğru bilgi vermek ve hesabınızı korumak sizin sorumluluğunuzdadır.
• Yasak kullanım: Hukuka aykırı faaliyet yasaktır.
• Fikri mülkiyet: İçerikler ilgili sahiplerine aittir.
• Sona erdirme: İhlalde erişim sonlandırılabilir.
• Değişiklik: Şartlar güncellenebilir.

Sorular için:
• E-posta: uretenellertr@gmail.com
• WhatsApp: 05057279143`},
    en:{title:"Terms of Use",body:`By using the services, you agree to these terms.
• Account: Provide accurate info and keep it secure.
• Prohibited: No unlawful activities.
• IP: Content belongs to respective owners.
• Termination: Access may be revoked on violations.
• Changes: Terms may be updated.

Questions:
• Email: uretenellertr@gmail.com
• WhatsApp: 05057279143`},
    ar:{title:"شروط الاستخدام",body:`باستخدامك للخدمات، فإنك توافق على هذه الشروط.
• الحساب: تقديم معلومات صحيحة وحماية الحساب مسؤوليتك.
• المحظورات: لا أنشطة غير قانونية.
• الملكية الفكرية: الحقوق لأصحابها.
• الإنهاء: قد يُوقف الوصول عند المخالفة.
• التغييرات: قد يتم تحديث الشروط.

الاستفسارات:
• البريد: uretenellertr@gmail.com
• واتساب: 05057279143`}
  }[lang];
  return (<article><h1 style={{fontSize:28,marginBottom:12}}>{T.title}</h1><pre style={{whiteSpace:"pre-wrap",font:"inherit",color:"#334155"}}>{T.body}</pre></article>);
}
