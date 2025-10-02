"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useSignIn } from "@clerk/nextjs";

/* ---------- i18n (localStorage 'lang') ---------- */
const SUPPORTED = ["tr","en","ar","de"];
const LOCALE_LABEL = { tr:"Türkçe", en:"English", ar:"العربية", de:"Deutsch" };

const STR = {
  tr: {
    title: "Şifremi Unuttum",
    subtitle: "E-posta ile sıfırlayın.",
    email: "E-posta",
    code: "Doğrulama Kodu",
    sendCode: "Kod Gönder",
    back: "Geri",
    reset: "Şifreyi Yenile",
    showPw: "Şifreyi göster",
    hidePw: "Şifreyi gizle",
    newPw: "Yeni Şifre",
    newPw2: "Yeni Şifre (tekrar)",
    emailSent: "E-posta gönderildi. Gelen 6 haneli kodu girin.",
    pwWeak: "Şifre en az 8 karakter ve 1 büyük harf içermeli.",
    pwMismatch: "Şifreler eşleşmiyor.",
    bad: "İşlem gerçekleştirilemedi. Bilgileri kontrol edin.",
    badCode: "Kod hatalı veya süresi geçti.",
    toLogin: "Girişe dön",
  },
  en: {
    title: "Forgot Password",
    subtitle: "Reset via email.",
    email: "Email",
    code: "Verification Code",
    sendCode: "Send Code",
    back: "Back",
    reset: "Reset Password",
    showPw: "Show password",
    hidePw: "Hide password",
    newPw: "New Password",
    newPw2: "New Password (again)",
    emailSent: "Email sent. Enter the 6-digit code.",
    pwWeak: "Password must be ≥8 chars and contain 1 uppercase.",
    pwMismatch: "Passwords do not match.",
    bad: "Could not process. Please check your info.",
    badCode: "Code invalid or expired.",
    toLogin: "Back to login",
  },
  ar: {
    title: "نسيت كلمة المرور",
    subtitle: "إعادة التعيين عبر البريد.",
    email: "البريد الإلكتروني",
    code: "رمز التحقق",
    sendCode: "إرسال الرمز",
    back: "رجوع",
    reset: "تعيين كلمة المرور",
    showPw: "إظهار كلمة المرور",
    hidePw: "إخفاء كلمة المرور",
    newPw: "كلمة المرور الجديدة",
    newPw2: "تأكيد كلمة المرور الجديدة",
    emailSent: "تم الإرسال. أدخِل الرمز المؤلف من 6 أرقام.",
    pwWeak: "كلمة المرور ≥8 أحرف وبها حرف كبير واحد.",
    pwMismatch: "كلمتا المرور غير متطابقتين.",
    bad: "تعذر التنفيذ. راجع البيانات.",
    badCode: "رمز غير صالح أو منتهي.",
    toLogin: "العودة لتسجيل الدخول",
  },
  de: {
    title: "Passwort vergessen",
    subtitle: "Per E-Mail zurücksetzen.",
    email: "E-Mail",
    code: "Verifizierungscode",
    sendCode: "Code senden",
    back: "Zurück",
    reset: "Passwort zurücksetzen",
    showPw: "Passwort zeigen",
    hidePw: "Passwort verbergen",
    newPw: "Neues Passwort",
    newPw2: "Neues Passwort (wiederholen)",
    emailSent: "E-Mail gesendet. 6-stelligen Code eingeben.",
    pwWeak: "Passwort ≥8 Zeichen und 1 Großbuchstabe.",
    pwMismatch: "Passwörter stimmen nicht überein.",
    bad: "Vorgang fehlgeschlagen. Bitte prüfen.",
    badCode: "Code ungültig oder abgelaufen.",
    toLogin: "Zur Anmeldung",
  },
};

function useLang(){
  const [lang, setLang] = useState("tr");
  useEffect(() => {
    const saved = typeof window!=="undefined" && localStorage.getItem("lang");
    setLang(SUPPORTED.includes(saved) ? saved : "tr");
  }, []);
  useEffect(() => {
    if (typeof window!=="undefined") {
      localStorage.setItem("lang", lang);
      try { document.documentElement.lang = lang; } catch {}
    }
  }, [lang]);
  const t = useMemo(()=> STR[lang] || STR.tr, [lang]);
  return { lang, setLang, t };
}

const strongPw = (pw) => /^(?=.*[A-Z]).{8,}$/.test(pw);

export default function ForgotPasswordPage(){
  const { signIn, isLoaded } = useSignIn();
  const { push } = useRouter();
  const { lang, setLang, t } = useLang();

  const [step, setStep] = useState("request"); // request | verify
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [loading, setLoading] = useState(false);

  async function onRequest(e){
    e.preventDefault();
    if (!isLoaded) return;
    setErr(""); setOk(""); setLoading(true);
    try{
      await signIn.create({ identifier: email });
      await signIn.prepareFirstFactor({ strategy: "reset_password_email_code" });
      setOk(t.emailSent);
      setStep("verify");
    }catch(e){
      setErr(t.bad);
    }finally{ setLoading(false); }
  }

  async function onVerify(e){
    e.preventDefault();
    if (!isLoaded) return;
    setErr(""); setOk(""); setLoading(true);
    try{
      if (newPw !== newPw2){ setErr(t.pwMismatch); setLoading(false); return; }
      if (!strongPw(newPw)){ setErr(t.pwWeak); setLoading(false); return; }
      const r = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPw,
      });
      if (r.status === "complete"){
        setOk("✓");
        setTimeout(()=>push("/login"), 600);
      } else {
        setErr(t.badCode);
      }
    }catch(e){
      setErr(t.badCode);
    }finally{ setLoading(false); }
  }

  return (
    <div style={S.wrap}>
      <div style={S.card}>
        {/* Dil seçimi */}
        <div style={S.langbox}>
          <select aria-label="Language" value={lang} onChange={(e)=>setLang(e.target.value)} style={S.select}>
            {SUPPORTED.map(k => <option key={k} value={k}>{LOCALE_LABEL[k]}</option>)}
          </select>
        </div>

        <h1 style={{margin:"0 0 6px"}}>{t.title}</h1>
        <p style={{margin:"0 0 12px", color:"#64748b"}}>{t.subtitle}</p>

        {step==="request" && (
          <form onSubmit={onRequest} style={S.form}>
            <label style={S.lab}>
              <span>{t.email}</span>
              <input type="email" required value={email}
                     onChange={e=>setEmail(e.target.value)}
                     placeholder="email@ornek.com" style={S.input}/>
            </label>
            {err && <div style={S.err}>{err}</div>}
            {ok && <div style={S.ok}>{ok}</div>}
            <button disabled={loading} type="submit" style={S.primary}>{loading ? "…" : t.sendCode}</button>
            <div style={S.row}>
              <a href="/login" style={S.link}>{t.toLogin}</a>
            </div>
          </form>
        )}

        {step==="verify" && (
          <form onSubmit={onVerify} style={S.form}>
            <label style={S.lab}>
              <span>{t.code}</span>
              <input inputMode="numeric" pattern="[0-9]*" maxLength={6} required
                     value={code} onChange={e=>setCode(e.target.value)}
                     placeholder="123456" style={S.input}/>
            </label>

            <label style={S.lab}>
              <span>{t.newPw}</span>
              <div style={S.pwBox}>
                <input required type={showPw?"text":"password"} value={newPw}
                       onChange={e=>setNewPw(e.target.value)}
                       placeholder="Aa123456" style={{...S.input, margin:0}}/>
                <button type="button" onClick={()=>setShowPw(s=>!s)} style={S.eye} aria-label="toggle password">
                  {showPw? "🙈":"👁️"}
                </button>
              </div>
            </label>

            <label style={S.lab}>
              <span>{t.newPw2}</span>
              <input required type="password" value={newPw2} onChange={e=>setNewPw2(e.target.value)} style={S.input}/>
            </label>

            {err && <div style={S.err}>{err}</div>}
            {ok && <div style={S.ok}>{ok}</div>}

            <div style={S.row}>
              <a href="/forgot" onClick={(e)=>{e.preventDefault(); setStep("request"); setErr(""); setOk("");}} style={S.link}>{t.back}</a>
              <button disabled={loading} type="submit" style={S.primary}>{loading ? "…" : t.reset}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const S = {
  wrap:{minHeight:"100vh",display:"grid",placeItems:"center",background:"linear-gradient(120deg,#ff80ab,#a78bfa,#60a5fa,#34d399)",backgroundSize:"320% 320%",animation:"drift 16s ease-in-out infinite"},
  card:{width:"100%",maxWidth:520,background:"rgba(255,255,255,.86)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,.5)",borderRadius:22,padding:18,boxShadow:"0 20px 50px rgba(0,0,0,.12)",position:"relative"},
  langbox:{position:"absolute",top:12,right:12,background:"rgba(255,255,255,.92)",border:"1px solid #e5e7eb",borderRadius:12,padding:"4px 8px"},
  select:{border:"none",background:"transparent",fontWeight:600,cursor:"pointer"},
  form:{display:"grid",gap:10,marginTop:8},
  lab:{display:"grid",gap:6},
  input:{padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:12,outline:"none"},
  pwBox:{display:"flex",alignItems:"center",gap:6},
  eye:{border:"1px solid #e5e7eb",background:"#f8fafc",padding:"8px 10px",borderRadius:10,cursor:"pointer"},
  primary:{padding:"12px 14px",borderRadius:999,border:"none",background:"#111827",color:"#fff",fontWeight:700,cursor:"pointer"},
  row:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4},
  link:{color:"#111827",textDecoration:"underline"},
  err:{background:"#fee2e2",border:"1px solid #fecaca",color:"#b91c1c",padding:8,borderRadius:10,fontSize:13},
  ok:{background:"#dcfce7",border:"1px solid #bbf7d0",color:"#166534",padding:8,borderRadius:10,fontSize:13},
};
