"use client";
export default function KycNotice({ lang = "tr" }) {
  const TXT = {
    tr: { text: "⚠️ Güvenlik: Bu alandaki bilgiler yalnızca hesap sahibi ve sistem tarafından saklanır. Vitrine/diğer kullanıcılara gösterilmez ve üçüncü kişilerle paylaşılmaz.", link:"KVKK Aydınlatma" },
    en: { text: "⚠️ Security: These details are stored only by the account owner and the system. They are not shown publicly or shared with third parties.", link:"KVKK Notice" },
    ar: { text: "⚠️ الأمان: هذه البيانات محفوظة لدى صاحب الحساب والنظام فقط. لا تُعرض للعامة ولا تُشارك مع أطراف ثالثة.", link:"إشعار KVKK" },
    de: { text: "⚠️ Sicherheit: Diese Angaben werden ausschließlich vom Kontoinhaber und dem System gespeichert. Sie werden nicht öffentlich angezeigt oder mit Dritten geteilt.", link:"KVKK-Hinweis" }
  };
  const t = TXT[lang] || TXT.tr;
  return (
    <div style={{margin:"8px 0 10px", padding:"10px 12px", border:"1px solid #e5e7eb", borderRadius:"10px", background:"#f8fafc", fontSize:13, lineHeight:1.5}}>
      <span>{t.text} </span>
      <a href="/legal/kvkk-aydinlatma" style={{fontWeight:700, color:"#111827", textDecoration:"none"}}>{t.link}</a>
    </div>
  );
}
