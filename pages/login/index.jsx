"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useAuth, useSignIn, useSignUp } from "@clerk/nextjs";

/* ------------------------------------------------------------------
   LANGUAGE (TR / EN / AR / DE) — persists in localStorage
------------------------------------------------------------------ */
const SUPPORTED = ["tr", "en", "ar", "de"];
const LOCALE_LABEL = { tr: "Türkçe", en: "English", ar: "العربية", de: "Deutsch" };

const STR = {
  tr: {
    brand: "Üreten Eller",
    welcome: "Üreten Ellere Hoş Geldiniz",
    subtitle: "Sade ve güvenli giriş",
    signIn: "Giriş Yap",
    signUp: "Kayıt Ol",
    useEmail: "E-posta kullan",
    usePhone: "Telefon kullan",
    email: "E-posta",
    phone: "Telefon",
    username: "Kullanıcı adı",
    fullName: "Ad Soyad",
    city: "Şehir",
    password: "Şifre",
    confirmPassword: "Şifre (tekrar)",
    forgot: "Şifremi unuttum",
    or: "veya",
    google: "Google ile devam et",
    facebook: "Facebook ile devam et",
    agree: "Aşağıdakileri okudum ve kabul ediyorum:",
    kvkk: "KVKK Aydınlatma",
    privacy: "Gizlilik",
    terms: "Kullanım Şartları",
    signupCta: "Hesap oluştur",
    signinCta: "Giriş yap",
    needAuth: "Önce kayıt olmalısınız.",
    haveAcc: "Zaten hesabın var mı?",
    noAcc: "Hesabın yok mu?",
    verifyTitleEmail: "E-posta doğrulama",
    verifyTitlePhone: "SMS doğrulama",
    codeHelpEmail: "E-postana gelen 6 haneli kodu gir.",
    codeHelpPhone: "Telefonuna gelen 6 haneli kodu gir.",
    code: "Doğrulama Kodu",
    back: "Geri",
    verify: "Doğrula",
    secured: "Clerk güvencesi ile",
    required: "Lütfen tüm zorunlu alanları doldur.",
    mismatch: "Şifreler eşleşmiyor.",
    weakpw: "Şifre en az 8 karakter ve 1 büyük harf içermelidir.",
    badcreds: "E-posta veya şifre hatalı.",
    roleTitle: "Hangi portal?",
    roleSeller: "Üreten El",
    roleCustomer: "Müşteri",
  },
  en: {
    brand: "Ureten Eller",
    welcome: "Welcome to Ureten Eller",
    subtitle: "Simple and secure access",
    signIn: "Sign In",
    signUp: "Sign Up",
    useEmail: "Use email",
    usePhone: "Use phone",
    email: "Email",
    phone: "Phone",
    username: "Username",
    fullName: "Full name",
    city: "City",
    password: "Password",
    confirmPassword: "Confirm password",
    forgot: "Forgot password",
    or: "or",
    google: "Continue with Google",
    facebook: "Continue with Facebook",
    agree: "I have read and accept:",
    kvkk: "KVKK Notice",
    privacy: "Privacy",
    terms: "Terms",
    signupCta: "Create account",
    signinCta: "Sign in",
    needAuth: "Please sign up first.",
    haveAcc: "Already have an account?",
    noAcc: "Don't have an account?",
    verifyTitleEmail: "Email verification",
    verifyTitlePhone: "SMS verification",
    codeHelpEmail: "Enter the 6-digit code sent to your email.",
    codeHelpPhone: "Enter the 6-digit code sent to your phone.",
    code: "Verification Code",
    back: "Back",
    verify: "Verify",
    secured: "Secured by Clerk",
    required: "Please fill all required fields.",
    mismatch: "Passwords do not match.",
    weakpw: "Password must be ≥8 chars and contain 1 uppercase.",
    badcreds: "Email or password is incorrect.",
    roleTitle: "Choose a portal",
    roleSeller: "Maker",
    roleCustomer: "Customer",
  },
  ar: {
    brand: "أُنتِج بالأيادي",
    welcome: "مرحبًا بكم",
    subtitle: "دخول بسيط وآمن",
    signIn: "تسجيل الدخول",
    signUp: "إنشاء حساب",
    useEmail: "استخدام البريد",
    usePhone: "استخدام الهاتف",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    username: "اسم المستخدم",
    fullName: "الاسم الكامل",
    city: "المدينة",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    forgot: "نسيت كلمة المرور",
    or: "أو",
    google: "المتابعة مع Google",
    facebook: "المتابعة مع Facebook",
    agree: "أوافق بعد القراءة:",
    kvkk: "إشعار KVKK",
    privacy: "الخصوصية",
    terms: "الشروط",
    signupCta: "إنشاء حساب",
    signinCta: "دخول",
    needAuth: "يرجى التسجيل أولًا.",
    haveAcc: "هل لديك حساب؟",
    noAcc: "لا تملك حسابًا؟",
    verifyTitleEmail: "التحقق عبر البريد",
    verifyTitlePhone: "التحقق عبر الرسائل",
    codeHelpEmail: "أدخل الرمز المؤلف من 6 أرقام من البريد.",
    codeHelpPhone: "أدخل الرمز المؤلف من 6 أرقام من الرسالة.",
    code: "رمز التحقق",
    back: "رجوع",
    verify: "تحقق",
    secured: "محمي بواسطة Clerk",
    required: "يرجى ملء جميع الحقول المطلوبة.",
    mismatch: "كلمتا المرور غير متطابقتين.",
    weakpw: "كلمة المرور ≥8 أحرف وبها حرف كبير واحد على الأقل.",
    badcreds: "البريد أو كلمة المرور غير صحيح.",
    roleTitle: "أي بوابة؟",
    roleSeller: "منتِجة",
    roleCustomer: "عميل",
  },
  de: {
    brand: "Ureten Eller",
    welcome: "Willkommen bei Ureten Eller",
    subtitle: "Einfacher und sicherer Zugang",
    signIn: "Anmelden",
    signUp: "Registrieren",
    useEmail: "E-Mail verwenden",
    usePhone: "Telefon verwenden",
    email: "E-Mail",
    phone: "Telefon",
    username: "Benutzername",
    fullName: "Vollständiger Name",
    city: "Stadt",
    password: "Passwort",
    confirmPassword: "Passwort bestätigen",
    forgot: "Passwort vergessen",
    or: "oder",
    google: "Mit Google fortfahren",
    facebook: "Mit Facebook fortfahren",
    agree: "Gelesen & akzeptiert:",
    kvkk: "KVKK-Hinweis",
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
    signupCta: "Konto erstellen",
    signinCta: "Anmelden",
    needAuth: "Bitte zuerst registrieren.",
    haveAcc: "Bereits ein Konto?",
    noAcc: "Noch kein Konto?",
    verifyTitleEmail: "E-Mail-Verifizierung",
    verifyTitlePhone: "SMS-Verifizierung",
    codeHelpEmail: "Sechsstelligen Code aus der E-Mail eingeben.",
    codeHelpPhone: "Sechsstelligen Code per SMS eingeben.",
    code: "Verifizierungscode",
    back: "Zurück",
    verify: "Verifizieren",
    secured: "Geschützt durch Clerk",
    required: "Bitte alle Pflichtfelder ausfüllen.",
    mismatch: "Passwörter stimmen nicht überein.",
    weakpw: "Passwort ≥8 Zeichen und 1 Großbuchstabe.",
    badcreds: "E-Mail oder Passwort falsch.",
    roleTitle: "Welches Portal?",
    roleSeller: "Anbieterin",
    roleCustomer: "Kund:in",
  },
};

function useLang() {
  const [lang, setLang] = useState("tr");
  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("lang");
    if (saved && SUPPORTED.includes(saved)) setLang(saved);
    else setLang("tr"); // TR varsayılan
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
      try { document.documentElement.lang = lang; } catch {}
    }
  }, [lang]);
  const t = useMemo(() => STR[lang] || STR.tr, [lang]);
  return { lang, setLang, t };
}

const HOME_PATH = "/home.html"; // public/home.html

/* ------------------------------------------------------------------
   PAGE — Email-only Sign-in, Email/Phone Sign-up
------------------------------------------------------------------ */
export default function LoginRegister() {
  const { lang, setLang, t } = useLang();
  const { isSignedIn } = useAuth();
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded, setActive } = useSignUp();
  const { query, push } = useRouter();

  // role from query (?role=seller|customer); default customer
  const role = (query.role === "seller" || query.role === "customer") ? query.role : "customer";

  const [mode, setMode] = useState("signin"); // 'signin' | 'signup'
  const [usePhone, setUsePhone] = useState(false);

  // shared fields
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  // signup extra
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [confirm, setConfirm] = useState("");
  const [consent, setConsent] = useState(false);

  // verification step
  const [step, setStep] = useState("form"); // 'form' | 'verify-email' | 'verify-phone'
  const [code, setCode] = useState("");

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // redirect if already signed in
  useEffect(() => { if (isSignedIn) push(role === "seller" ? "/portal/seller" : "/portal/customer"); }, [isSignedIn, push, role]);

  const strongPw = (pw) => /^(?=.*[A-Z]).{8,}$/.test(pw);

  /* --------------------------- OAUTH --------------------------- */
  async function oauth(strategy) {
    try {
      if (!signInLoaded) return;
      await signIn.authenticateWithRedirect({
        strategy, // 'oauth_google' | 'oauth_facebook'
        redirectUrl: "/login",
        redirectUrlComplete: HOME_PATH,
      });
    } catch (e) {
      setErr(e?.errors?.[0]?.message || String(e));
    }
  }

  /* --------------------------- SIGN IN (EMAIL ONLY) --------------------------- */
  async function onSignIn(e) {
    e.preventDefault();
    if (!signInLoaded) return;
    setErr(""); setLoading(true);
    try {
      const res = await signIn.create({ identifier: email, password });
      if (res.status === "complete") {
        await push(HOME_PATH);
      } else if (res.status === "needs_first_factor") {
        await signIn.prepareFirstFactor({ strategy: "email_code" });
        setStep("verify-email");
      } else {
        setErr(t.badcreds);
      }
    } catch (e) {
      setErr(t.badcreds);
    } finally { setLoading(false); }
  }

  async function onSignInVerify(e) {
    e.preventDefault();
    if (!signInLoaded) return;
    setErr(""); setLoading(true);
    try {
      const r = await signIn.attemptFirstFactor({ strategy: "email_code", code });
      if (r.status === "complete") push(HOME_PATH);
      else setErr(t.badcreds);
    } catch (e) {
      setErr(t.badcreds);
    } finally { setLoading(false); }
  }

  /* --------------------------- SIGN UP --------------------------- */
  async function onSignUp(e) {
    e.preventDefault();
    if (!signUpLoaded) return;
    setErr("");
    if (!consent || (!usePhone && !email) || (usePhone && !phone) || !password || !confirm || !fullName || !username || !city) {
      setErr(t.required); return;
    }
    if (password !== confirm) { setErr(t.mismatch); return; }
    if (!strongPw(password)) { setErr(t.weakpw); return; }

    setLoading(true);
    try {
      const [firstName, ...rest] = fullName.trim().split(" ");
      const lastName = rest.join(" ") || "";

      const payload = {
        password,
        username, // sadece profilde gösterilecek
        firstName,
        lastName,
        publicMetadata: { role, lang, city, full_name: fullName },
      };
      if (usePhone) payload.phoneNumber = phone; else payload.emailAddress = email;

      await signUp.create(payload);

      if (usePhone) {
        await signUp.preparePhoneNumberVerification({ strategy: "phone_code" });
        setStep("verify-phone");
      } else {
        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
        setStep("verify-email");
      }
    } catch (e) {
      setErr(e?.errors?.[0]?.message || String(e));
    } finally { setLoading(false); }
  }

  async function onSignUpVerify(e) {
    e.preventDefault();
    if (!signUpLoaded) return;
    setErr(""); setLoading(true);
    try {
      if (step === "verify-email") {
        const r = await signUp.attemptEmailAddressVerification({ code });
        if (r.status === "complete") { await setActive({ session: r.createdSessionId }); push(HOME_PATH); }
      } else if (step === "verify-phone") {
        const r = await signUp.attemptPhoneNumberVerification({ code });
        if (r.status === "complete") { await setActive({ session: r.createdSessionId }); push(HOME_PATH); }
      }
    } catch (e) {
      setErr(e?.errors?.[0]?.message || String(e));
    } finally { setLoading(false); }
  }

  /* --------------------------- UI --------------------------- */
  return (
    <div className="authWrap">
      <div className="bgAnim"/>

      {/* Language Dropdown */}
      <div className="langbox">
        <select aria-label="Language" value={lang} onChange={(e)=>setLang(e.target.value)}>
          {SUPPORTED.map(k => <option key={k} value={k}>{LOCALE_LABEL[k]}</option>)}
        </select>
      </div>

      <main className="card">
        <header className="head">
          <img src="/assets/images/logo.png" width="40" height="40" alt="logo"/>
          <div className="titles">
            <h1>{t.brand}</h1>
            <p className="sub">{t.subtitle}</p>
          </div>
        </header>

        {/* Role hint (from query) */}
        <div className="roleHint" aria-live="polite">
          <small>{t.roleTitle}: <strong>{role === 'seller' ? t.roleSeller : t.roleCustomer}</strong></small>
        </div>

        {/* Mode Tabs */}
        <div className="tabs">
          <button className={mode==='signin'? 'tab active':'tab'} onClick={()=>{setStep('form'); setMode('signin')}}>{t.signIn}</button>
          <button className={mode==='signup'? 'tab active':'tab'} onClick={()=>{setStep('form'); setMode('signup')}}>{t.signUp}</button>
        </div>

        {/* FORM: SIGN IN — E-POSTA/ŞİFRE */}
        {mode === 'signin' && step === 'form' && (
          <form onSubmit={onSignIn} className="form">
            <label className="lab">
              <span>{t.email}</span>
              <input required type="email" value={email}
                     onChange={e=>setEmail(e.target.value)}
                     placeholder="email@ornek.com" />
            </label>

            <label className="lab pw">
              <span>{t.password}</span>
              <div className="pwBox">
                <input required type={showPw? 'text':'password'} value={password}
                       onChange={e=>setPassword(e.target.value)} />
                <button type="button" className="eye"
                        onClick={()=>setShowPw(s=>!s)}
                        aria-label="toggle password">{showPw? '🙈':'👁️'}</button>
              </div>
            </label>

            {err && <div className="err">{err}</div>}
            <button disabled={loading} className="primary" type="submit">
              {loading? '…' : t.signinCta}
            </button>

            <div className="footRow">
              <a href="/forgot" className="muted">{t.forgot}</a>
              <small className="muted">{t.secured}</small>
            </div>

            <div className="divider"><span>{t.or}</span></div>
            <div className="oauth">
              <button type="button" className="oauthBtn" onClick={()=>oauth('oauth_google')}>🟢 {t.google}</button>
              <button type="button" className="oauthBtn" onClick={()=>oauth('oauth_facebook')}>🔵 {t.facebook}</button>
            </div>
          </form>
        )}

        {/* FORM: SIGN UP — TOGGLE SADECE BURADA */}
        {mode === 'signup' && step === 'form' && (
          <form onSubmit={onSignUp} className="form">
            <div className="toggleRow">
              <button type="button"
                className={!usePhone? 'miniToggle active':'miniToggle'}
                onClick={()=>setUsePhone(false)}>{t.useEmail}</button>
              <button type="button"
                className={usePhone? 'miniToggle active':'miniToggle'}
                onClick={()=>setUsePhone(true)}>{t.usePhone}</button>
            </div>

            <div className="grid2">
              <label className="lab">
                <span>{t.fullName}</span>
                <input required value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Ad Soyad" />
              </label>
              <label className="lab">
                <span>{t.username}</span>
                <input required value={username} onChange={e=>setUsername(e.target.value)} placeholder="kullanici_adi" />
              </label>
            </div>

            <div className="grid2">
              {!usePhone ? (
                <label className="lab">
                  <span>{t.email}</span>
                  <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email@ornek.com" />
                </label>
              ) : (
                <label className="lab">
                  <span>{t.phone}</span>
                  <input required type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+90…" />
                </label>
              )}

              <label className="lab">
                <span>{t.city}</span>
                <input required value={city} onChange={e=>setCity(e.target.value)} placeholder="İl / İlçe" />
              </label>
            </div>

            <div className="grid2">
              <label className="lab">
                <span>{t.password}</span>
                <div className="pwBox">
                  <input required type={showPw? 'text':'password'} value={password}
                         onChange={e=>setPassword(e.target.value)}
                         placeholder="En az 8, 1 büyük harf" />
                  <button type="button" className="eye"
                          onClick={()=>setShowPw(s=>!s)}
                          aria-label="toggle password">{showPw? '🙈':'👁️'}</button>
                </div>
              </label>
              <label className="lab">
                <span>{t.confirmPassword}</span>
                <input required type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} />
              </label>
            </div>

            <label className="chk">
              <input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} />
              <span>
                {t.agree} <a href="/legal/kvkk-aydinlatma" target="_blank" rel="noreferrer">{t.kvkk}</a>,
                <a href="/legal/gizlilik" target="_blank" rel="noreferrer"> {t.privacy}</a>,
                <a href="/legal/kullanim-sartlari" target="_blank" rel="noreferrer"> {t.terms}</a>
              </span>
            </label>

            {err && <div className="err">{err}</div>}
            <button disabled={loading} className="primary" type="submit">{loading? '…' : t.signupCta}</button>

            <div className="divider"><span>{t.or}</span></div>
            <div className="oauth">
              <button type="button" className="oauthBtn" onClick={()=>oauth('oauth_google')}>🟢 {t.google}</button>
              <button type="button" className="oauthBtn" onClick={()=>oauth('oauth_facebook')}>🔵 {t.facebook}</button>
            </div>
          </form>
        )}

        {/* VERIFY STEP */}
        {step !== 'form' && (
          <form onSubmit={mode==='signup' ? onSignUpVerify : onSignInVerify} className="form">
            <h2 className="vtitle">{step==='verify-email' ? t.verifyTitleEmail : t.verifyTitlePhone}</h2>
            <p className="sub">{step==='verify-email' ? t.codeHelpEmail : t.codeHelpPhone}</p>
            <label className="lab">
              <span>{t.code}</span>
              <input inputMode="numeric" pattern="[0-9]*" maxLength={6} value={code} onChange={e=>setCode(e.target.value)} />
            </label>
            {err && <div className="err">{err}</div>}
            <div className="row">
              <button type="button" className="ghost" onClick={()=>{ setStep('form'); setCode(''); }}>{t.back}</button>
              <button disabled={loading} className="primary" type="submit">{loading? '…' : t.verify}</button>
            </div>
          </form>
        )}
      </main>

      <style jsx>{`
        .authWrap{min-height:100vh; display:grid; place-items:center; position:relative; overflow:hidden;}
        .bgAnim{position:absolute; inset:0; background:
          radial-gradient(900px 600px at -10% -10%, rgba(255,255,255,.35), transparent 60%),
          linear-gradient(120deg,#ff80ab,#a78bfa,#60a5fa,#34d399);
          background-size:320% 320%; animation:drift 16s ease-in-out infinite;}
        @keyframes drift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

        .langbox{position:fixed; top:14px; right:14px; z-index:5; background:rgba(255,255,255,.92); border:1px solid #e5e7eb; border-radius:12px; padding:6px 10px; backdrop-filter:blur(8px)}
        .langbox select{border:none; background:transparent; font-weight:600; cursor:pointer}

        .card{position:relative; z-index:1; width:100%; max-width:520px; background:rgba(255,255,255,.86); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,.5); border-radius:22px; padding:18px 18px 16px; box-shadow:0 20px 50px rgba(0,0,0,.12)}
        .head{display:flex; gap:10px; align-items:center; margin-bottom:8px}
        .titles h1{margin:0; font-size:22px}
        .sub{margin:2px 0 0; color:#475569}

        .roleHint{display:flex; justify-content:center; margin:6px 0 0; color:#64748b}

        .tabs{display:flex; gap:8px; background:rgba(255,255,255,.6); border:1px solid #e5e7eb; padding:6px; border-radius:12px; width:max-content; margin:10px auto}
        .tab{border:none; padding:8px 12px; border-radius:10px; cursor:pointer; font-weight:700; color:#111827;}
        .tab.active{background:#111827; color:#fff}

        .toggleRow{display:flex; gap:8px; justify-content:center; margin:8px 0 4px}
        .miniToggle{border:1px solid #e5e7eb; background:#fff; padding:6px 10px; border-radius:999px; cursor:pointer; font-weight:600}
        .miniToggle.active{background:#111827; color:#fff; border-color:#111827}

        .form{display:grid; gap:10px; margin-top:10px}
        .grid2{display:grid; gap:10px; grid-template-columns:1fr 1fr}
        @media (max-width:560px){ .grid2{grid-template-columns:1fr} }
        .lab{display:grid; gap:6px}
        .pw .pwBox{display:flex; align-items:center; gap:6px}
        input{padding:9px 12px; border:1px solid #e5e7eb; border-radius:12px; outline:none; font-size:14px}
        input:focus{box-shadow:0 0 0 3px rgba(99,102,241,.25); border-color:#6366f1}
        .eye{border:none; background:#f8fafc; border:1px solid #e5e7eb; padding:8px 10px; border-radius:10px; cursor:pointer}

        .chk{display:flex; gap:8px; font-size:13px; align-items:flex-start}
        .chk input{margin-top:4px}

        .err{background:#fee2e2; border:1px solid #fecaca; color:#b91c1c; padding:8px; border-radius:10px; font-size:13px}
        .primary{padding:12px 14px; border-radius:999px; border:none; background:#111827; color:#fff; font-weight:700; cursor:pointer}
        .ghost{padding:12px 14px; border-radius:999px; border:1px solid #e5e7eb; background:#fff; font-weight:700; cursor:pointer}

        .footRow{display:flex; align-items:center; justify-content:space-between}
        .muted{color:#94a3b8}

        .divider{display:flex; align-items:center; gap:8px; margin:6px 0}
        .divider:before, .divider:after{content:""; height:1px; flex:1; background:#e5e7eb}
        .oauth{display:grid; gap:8px}
        .oauthBtn{padding:10px 12px; border-radius:12px; border:1px solid #e5e7eb; background:#fff; cursor:pointer; font-weight:700; text-align:center}

        .vtitle{margin:6px 0 4px; font-size:18px}
        .row{display:flex; gap:8px}
      `}</style>
    </div>
  );
}
