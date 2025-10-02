"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSignIn } from "@clerk/nextjs";

const strongPw = (pw) => /^(?=.*[A-Z]).{8,}$/.test(pw);

export default function ForgotPasswordPage() {
  const { signIn, isLoaded } = useSignIn();
  const { push } = useRouter();

  const [step, setStep] = useState("request"); // 'request' | 'verify'
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [loading, setLoading] = useState(false);

  async function onRequest(e) {
    e.preventDefault();
    if (!isLoaded) return;
    setErr(""); setOk(""); setLoading(true);
    try {
      await signIn.create({ identifier: email });
      await signIn.prepareFirstFactor({ strategy: "reset_password_email_code" });
      setOk("E-posta gönderildi. Gelen 6 haneli kodu girin.");
      setStep("verify");
    } catch (e) {
      setErr(e?.errors?.[0]?.message || "E-posta bulunamadı veya işlem yapılamadı.");
    } finally { setLoading(false); }
  }

  async function onVerify(e) {
    e.preventDefault();
    if (!isLoaded) return;
    setErr(""); setOk(""); setLoading(true);
    try {
      if (newPw !== newPw2) { setErr("Şifreler eşleşmiyor."); setLoading(false); return; }
      if (!strongPw(newPw)) { setErr("Şifre en az 8 karakter ve 1 büyük harf içermeli."); setLoading(false); return; }

      const r = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPw,
      });

      if (r.status === "complete") {
        setOk("Şifre yenilendi. Giriş sayfasına yönlendiriliyorsunuz…");
        setTimeout(()=>push("/login"), 800);
      } else {
        setErr("Doğrulama başarısız. Kodu ve şifreyi kontrol edin.");
      }
    } catch (e) {
      setErr(e?.errors?.[0]?.message || "Kod hatalı veya süresi geçti.");
    } finally { setLoading(false); }
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <h1 style={{margin:"0 0 8px"}}>Şifremi Unuttum</h1>
        <p style={{margin:"0 0 12px", color:"#64748b"}}>E-posta ile sıfırlayın.</p>

        {step === "request" && (
          <form onSubmit={onRequest} style={styles.form}>
            <label style={styles.lab}>
              <span>E-posta</span>
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="email@ornek.com" style={styles.input}/>
            </label>
            {err && <div style={styles.err}>{err}</div>}
            {ok && <div style={styles.ok}>{ok}</div>}
            <button disabled={loading} type="submit" style={styles.primary}>{loading ? "…" : "Kod Gönder"}</button>
            <div style={styles.row}>
              <a href="/login" style={styles.link}>Girişe dön</a>
            </div>
          </form>
        )}

        {step === "verify" && (
          <form onSubmit={onVerify} style={styles.form}>
            <label style={styles.lab}>
              <span>Doğrulama Kodu</span>
              <input inputMode="numeric" pattern="[0-9]*" maxLength={6} required
                     value={code} onChange={e=>setCode(e.target.value)} placeholder="6 haneli kod" style={styles.input}/>
            </label>

            <label style={styles.lab}>
              <span>Yeni Şifre</span>
              <div style={styles.pwBox}>
                <input required type={showPw ? "text":"password"} value={newPw}
                       onChange={e=>setNewPw(e.target.value)} placeholder="En az 8, 1 büyük harf" style={{...styles.input, margin:0}}/>
                <button type="button" onClick={()=>setShowPw(s=>!s)} style={styles.eye} aria-label="toggle password">
                  {showPw? "🙈":"👁️"}
                </button>
              </div>
            </label>

            <label style={styles.lab}>
              <span>Yeni Şifre (tekrar)</span>
              <input required type="password" value={newPw2} onChange={e=>setNewPw2(e.target.value)} style={styles.input}/>
            </label>

            {err && <div style={styles.err}>{err}</div>}
            {ok && <div style={styles.ok}>{ok}</div>}

            <div style={styles.row}>
              <a href="/forgot" onClick={(e)=>{e.preventDefault(); setStep("request"); setErr(""); setOk("");}} style={styles.link}>Geri</a>
              <button disabled={loading} type="submit" style={styles.primary}>{loading ? "…" : "Şifreyi Yenile"}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrap:{minHeight:"100vh",display:"grid",placeItems:"center",background:"linear-gradient(120deg,#ff80ab,#a78bfa,#60a5fa,#34d399)",backgroundSize:"320% 320%",animation:"drift 16s ease-in-out infinite"},
  card:{width:"100%",maxWidth:520,background:"rgba(255,255,255,.86)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,.5)",borderRadius:22,padding:18,boxShadow:"0 20px 50px rgba(0,0,0,.12)"},
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

/* keyframes (inline style ile eklenemediği için global css'e eklemek istersen):
@keyframes drift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
*/
