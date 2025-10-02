// app/legal/kvkk-aydinlatma/page.jsx
export default function Page({ searchParams }) {
  const lang = ["tr","en","ar"].includes(searchParams?.lang) ? searchParams.lang : "tr";
  const T = {
    tr:{title:"KVKK Aydınlatma Metni",body:`6698 sayılı KVKK uyarınca, veri sorumlusu olarak kimlik doğrulama ve hesap yönetimi süreçlerinde kişisel verilerinizi işleriz.
• Amaçlar: kayıt, giriş, güvenlik kontrolü, bildirimler.
• Hukuki sebepler: açık rıza, sözleşme, meşru menfaat.
• Aktarımlar: barındırma, e-posta, kimlik sağlayıcıları.
• Haklar (m.11): erişim, düzeltme, silme, itiraz.

Başvuru/iletişim:
• E-posta: uretenellertr@gmail.com
• WhatsApp: 05057279143`},
    en:{title:"Data Notice (KVKK)",body:`Under Turkish Law No. 6698 (KVKK), we process your personal data for authentication and account processes.
• Purposes: sign-up, sign-in, security checks, notifications.
• Legal grounds: consent, contract, legitimate interest.
• Transfers: hosting, email, identity providers.
• Rights (Art. 11): access, rectification, erasure, objection.

Applications/Contact:
• Email: uretenellertr@gmail.com
• WhatsApp: 05057279143`},
    ar:{title:"إشعار حماية البيانات (KVKK)",body:`بموجب القانون التركي 6698 نعالج بياناتك لعمليات التسجيل وتسجيل الدخول والأمان والإشعارات.
• الأغراض: التسجيل وتسجيل الدخول وفحوصات الأمان والإشعارات.
• الأسس القانونية: الموافقة والعقد والمصلحة المشروعة.
• النقل: الاستضافة والبريد ومزوّدو الهوية.
• الحقوق (مادة 11): الوصول والتصحيح والحذف والاعتراض.

الطلبات/التواصل:
• البريد: uretenellertr@gmail.com
• واتساب: 05057279143`}
  }[lang];
  return (<article><h1 style={{fontSize:28,marginBottom:12}}>{T.title}</h1><pre style={{whiteSpace:"pre-wrap",font:"inherit",color:"#334155"}}>{T.body}</pre></article>);
}
