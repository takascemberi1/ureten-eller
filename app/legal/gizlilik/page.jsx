// app/legal/gizlilik/page.jsx
export default function Page({ searchParams }) {
  const lang = ["tr","en","ar"].includes(searchParams?.lang) ? searchParams.lang : "tr";
  const T = {
    tr:{title:"Gizlilik Politikası",body:`Kişisel verileriniz yalnızca kimlik doğrulama ve hesap yönetimi amacıyla işlenir.
• Veriler: ad, e-posta, giriş kayıtları, oturum çerezleri.
• Hukuki dayanak: açık rıza ve sözleşmenin ifası.
• Saklama: hesabınız aktifken veya mevzuat gereği.
• Üçüncü taraflar: kimlik sağlayıcıları (ör. Google) ve barındırma.
• Haklar: erişim, düzeltme, silme, itiraz.

İletişim:
• E-posta: uretenellertr@gmail.com
• WhatsApp: 05057279143`},
    en:{title:"Privacy Policy",body:`We process your data only for authentication and account management.
• Data: name, email, sign-in logs, session cookies.
• Legal basis: consent and contract performance.
• Retention: while your account is active or required by law.
• Third parties: IdPs (e.g., Google) and hosting.
• Rights: access, rectify, erase, object.

Contact:
• Email: uretenellertr@gmail.com
• WhatsApp: 05057279143`},
    ar:{title:"سياسة الخصوصية",body:`نُعالج بياناتك فقط للمصادقة وإدارة الحساب.
• البيانات: الاسم، البريد، سجلات الدخول، وملفات تعريف الارتباط للجلسة.
• الأساس القانوني: الموافقة وأداء العقد.
• مدة الاحتفاظ: طالما أن الحساب فعّال أو بحسب القانون.
• أطراف ثالثة: مزودو الهوية (مثل Google) والاستضافة.
• الحقوق: الوصول والتصحيح والحذف والاعتراض.

التواصل:
• البريد: uretenellertr@gmail.com
• واتساب: 05057279143`}
  }[lang];
  return (<article><h1 style={{fontSize:28,marginBottom:12}}>{T.title}</h1><pre style={{whiteSpace:"pre-wrap",font:"inherit",color:"#334155"}}>{T.body}</pre></article>);
}
