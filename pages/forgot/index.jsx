"use client";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";

export default function ForgotPage(){
  const { signIn, isLoaded } = useSignIn();
  const [step,setStep]=useState("start"); // start | code
  const [email,setEmail]=useState("");
  const [code,setCode]=useState("");
  const [password,setPassword]=useState("");
  const [err,setErr]=useState("");
  const [ok,setOk]=useState("");

  async function sendCode(e){
    e.preventDefault(); if(!isLoaded) return;
    setErr(""); setOk("");
    try{
      await signIn.create({ strategy:"reset_password_email_code", identifier: email });
      setStep("code"); setOk("Doğrulama kodu e-posta adresine gönderildi.");
    }catch(e){ setErr(e?.errors?.[0]?.message || String(e)); }
  }
  async function resetPwd(e){
    e.preventDefault(); if(!isLoaded) return;
    setErr(""); setOk("");
    try{
      const r = await signIn.attemptFirstFactor({
        strategy:"reset_password_email_code",
        code, password
      });
      if(r.status==="complete"){ setOk("Şifre güncellendi. Giriş sayfasına dönebilirsiniz."); }
      else{ setErr("İşlem tamamlanamadı."); }
    }catch(e){ setErr(e?.errors?.[0]?.message || String(e)); }
  }

  return (
    <main style={{maxWidth:420,margin:"24px auto",padding:"16px"}}>
      <h1>Şifremi unuttum</h1>

      {step==="start" && (
        <form onSubmit={sendCode} style={{display:"grid",gap:10}}>
          <label style={{display:"grid",gap:6}}>
            <span>E-posta</span>
            <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email@ornek.com"/>
          </label>
          {err && <div style={{background:"#fee2e2",border:"1px solid #fecaca",padding:8,borderRadius:8}}>{err}</div>}
          {ok && <div style={{background:"#e2fbe8",border:"1px solid #abefc6",padding:8,borderRadius:8}}>{ok}</div>}
          <button type="submit" style={{padding:"10px 12px",borderRadius:999,border:"none",background:"#111827",color:"#fff",fontWeight:700}}>Kodu Gönder</button>
        </form>
      )}

      {step==="code" && (
        <form onSubmit={resetPwd} style={{display:"grid",gap:10}}>
          <label style={{display:"grid",gap:6}}>
            <span>Doğrulama Kodu</span>
            <input inputMode="numeric" pattern="[0-9]*" maxLength={6} value={code} onChange={e=>setCode(e.target.value)}/>
          </label>
          <label style={{display:"grid",gap:6}}>
            <span>Yeni Şifre</span>
            <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="En az 8, 1 büyük harf"/>
          </label>
          {err && <div style={{background:"#fee2e2",border:"1px solid #fecaca",padding:8,borderRadius:8}}>{err}</div>}
          {ok && <div style={{background:"#e2fbe8",border:"1px solid #abefc6",padding:8,borderRadius:8}}>{ok}</div>}
          <div style={{display:"flex",gap:8}}>
            <a href="/login" style={{padding:"10px 12px",borderRadius:999,border:"1px solid #e5e7eb",textDecoration:"none"}}>Geri</a>
            <button type="submit" style={{padding:"10px 12px",borderRadius:999,border:"none",background:"#111827",color:"#fff",fontWeight:700}}>Şifreyi Sıfırla</button>
          </div>
        </form>
      )}
    </main>
  );
}
