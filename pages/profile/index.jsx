"use client";
import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useAuth, useUser, SignedIn, SignedOut } from "@clerk/nextjs";

/* ---------------- i18n ---------------- */
const SUPPORTED = ["tr","en","ar","de"];
const STR = {
  tr: {
    title: "Profil",
    fullName: "Ad Soyad",
    email: "E-posta",
    city: "Şehir",
    cityPlaceholder: "- şehir yaz ...",
    settings: "Ayarlar",
    username: "Kullanıcı adı",
    password: "Şifre değiştir",
    newPassword: "Yeni şifre",
    confirmPassword: "Şifre (tekrar)",
    save: "Kaydet",
    cancel: "İptal",
    uploadPhoto: "Fotoğraf yükle",
    giveStars: "Yıldız ver:",
    tabs: { live: "Yayındaki İlanlar", pending: "Onay Bekleyen", expired: "Süresi Dolu" },
    sendMsg: "Mesaj Gönder",
    home: "Anasayfa", messages: "Mesajlar", notifications: "Bildirimler",
    legal: {
      privacy: "Gizlilik", about: "Hakkımızda", contact: "İletişim",
      terms: "Kullanım Şartları", kvkk: "KVKK Aydınlatma",
      distance: "Mesafeli Satış Sözleşmesi", returns: "Teslimat & İade"
    },
    toast: {
      saved: "Kaydedildi",
      pwChanged: "Şifre değiştirildi (demo)",
      pwMismatch: "Şifreler eşleşmiyor",
    }
  },
  en: {
    title: "Profile",
    fullName: "Full Name",
    email: "Email",
    city: "City",
    cityPlaceholder: "- add city ...",
    settings: "Settings",
    username: "Username",
    password: "Change Password",
    newPassword: "New password",
    confirmPassword: "Confirm password",
    save: "Save",
    cancel: "Cancel",
    uploadPhoto: "Upload photo",
    giveStars: "Rate:",
    tabs: { live: "Live Listings", pending: "Pending", expired: "Expired" },
    sendMsg: "Send Message",
    home: "Home", messages: "Messages", notifications: "Notifications",
    legal: {
      privacy: "Privacy", about: "About", contact: "Contact",
      terms: "Terms", kvkk: "KVKK Notice",
      distance: "Distance Sales Agreement", returns: "Shipping & Returns"
    },
    toast: { saved: "Saved", pwChanged: "Password changed (demo)", pwMismatch: "Passwords do not match" }
  },
  ar: {
    title: "الملف الشخصي",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    city: "المدينة",
    cityPlaceholder: "- اكتب المدينة ...",
    settings: "الإعدادات",
    username: "اسم المستخدم",
    password: "تغيير كلمة المرور",
    newPassword: "كلمة مرور جديدة",
    confirmPassword: "تأكيد كلمة المرور",
    save: "حفظ",
    cancel: "إلغاء",
    uploadPhoto: "رفع صورة",
    giveStars: "قيّم:",
    tabs: { live: "إعلانات نشِطة", pending: "بانتظار الموافقة", expired: "منتهية" },
    sendMsg: "أرسل رسالة",
    home: "الرئيسية", messages: "الرسائل", notifications: "الإشعارات",
    legal: {
      privacy: "الخصوصية", about: "من نحن", contact: "اتصال",
      terms: "الشروط", kvkk: "إشعار KVKK",
      distance: "اتفاقية البيع عن بعد", returns: "التسليم والإرجاع"
    },
    toast: { saved: "تم الحفظ", pwChanged: "تم تغيير كلمة المرور (تجريبي)", pwMismatch: "كلمتا المرور غير متطابقتين" }
  },
  de: {
    title: "Profil",
    fullName: "Name",
    email: "E‑Mail",
    city: "Stadt",
    cityPlaceholder: "- Stadt eintragen ...",
    settings: "Einstellungen",
    username: "Benutzername",
    password: "Passwort ändern",
    newPassword: "Neues Passwort",
    confirmPassword: "Passwort (Wdh.)",
    save: "Speichern",
    cancel: "Abbrechen",
    uploadPhoto: "Foto hochladen",
    giveStars: "Bewerten:",
    tabs: { live: "Aktive Anzeigen", pending: "Ausstehend", expired: "Abgelaufen" },
    sendMsg: "Nachricht senden",
    home: "Startseite", messages: "Nachrichten", notifications: "Benachr.",
    legal: {
      privacy: "Datenschutz", about: "Über uns", contact: "Kontakt",
      terms: "Nutzungsbedingungen", kvkk: "KVKK‑Hinweis",
      distance: "Fernabsatzvertrag", returns: "Lieferung & Rückgabe"
    },
    toast: { saved: "Gespeichert", pwChanged: "Passwort geändert (Demo)", pwMismatch: "Passwörter stimmen nicht überein" }
  }
};

function useLang(){
  const [lang,setLang] = useState("tr");
  useEffect(()=>{ const s = localStorage.getItem("lang"); if(s && SUPPORTED.includes(s)) setLang(s); },[]);
  useEffect(()=>{ document.documentElement.lang = lang; document.documentElement.dir = (lang==='ar')?'rtl':'ltr'; },[lang]);
  const t = useMemo(()=> STR[lang] || STR.tr, [lang]);
  return {lang,setLang,t};
}

/* ---------------- Page ---------------- */
export default function ProfilePage(){
  const { t, lang, setLang } = useLang();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  // redirect if signedout
  useEffect(()=>{ if(!isLoaded) return; if(!isSignedIn) router.replace("/login?role=customer"); },[isLoaded,isSignedIn,router]);

  // role & data (local fallbacks)
  const role = (user?.publicMetadata?.role || localStorage.getItem('role') || 'customer');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [city,setCity] = useState('');
  const [username,setUsername] = useState('');

  useEffect(()=>{
    const nm = user? (user.fullName || `${user.firstName||''} ${user.lastName||''}`.trim()) : (localStorage.getItem('full_name')||'ozkan koç');
    const em = user?.primaryEmailAddress?.emailAddress || localStorage.getItem('email') || 'ozkank603@gmail.com';
    const ct = (user?.publicMetadata?.city || localStorage.getItem('city') || '').toString();
    const un = user?.username || localStorage.getItem('username') || '';
    setName(nm || 'ozkan koç'); setEmail(em || 'ozkank603@gmail.com'); setCity(ct); setUsername(un);
  },[user]);

  // avatar (local preview only)
  const [avatar,setAvatar] = useState('');
  const fileRef = useRef(null);
  useEffect(()=>{ const a = localStorage.getItem('avatar_data'); if(a) setAvatar(a); },[]);
  function onPickAvatar(){ fileRef.current?.click(); }
  function onFile(e){ const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=()=>{ const b=r.result; setAvatar(b); try{localStorage.setItem('avatar_data', b);}catch{} }; r.readAsDataURL(f); }

  // stars
  const [stars,setStars] = useState(()=> Number(localStorage.getItem('profile_stars')||0));
  function setStarCount(n){ setStars(n); try{localStorage.setItem('profile_stars', String(n));}catch{} }

  // settings panel
  const [open,setOpen] = useState(false);
  const [pw1,setPw1] = useState('');
  const [pw2,setPw2] = useState('');
  const [toast,setToast] = useState('');
  function saveSettings(){
    if(pw1 || pw2){ if(pw1 !== pw2){ setToast(t.toast.pwMismatch); return; } setToast(t.toast.pwChanged); }
    try{ localStorage.setItem('city', city||''); localStorage.setItem('username', username||''); }catch{}
    setOpen(false); setToast(t.toast.saved);
    setTimeout(()=> setToast(''), 1600);
  }

  // listing tabs for sellers
  const [tab,setTab] = useState('live');

  return (
    <div className="wrap">
      <SignedOut><p style={{padding:16}}>Yönlendiriliyor…</p></SignedOut>
      <SignedIn>
        <header className="topbar">
          <div className="brand" onClick={()=>router.push('/')}> 
            <img src="/assets/images/logo.png" width="32" height="32" alt="logo" />
            <strong>Üreten Eller</strong>
          </div>
          <div className="grow"/>
          <div className="lang">
            <span>🌐</span>
            <select value={lang} onChange={e=>setLang(e.target.value)} aria-label="Language">
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </header>

        <main className="page">
          {/* Card */}
          <section className="card prof">
            <div className="avatarCol">
              <div className="avatar" onClick={onPickAvatar} title={t.uploadPhoto}>
                {avatar ? <img src={avatar} alt="avatar"/> : <span>{(name||'?').slice(0,1).toUpperCase()}</span>}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hide" onChange={onFile}/>
              <button className="small" onClick={onPickAvatar}>{t.uploadPhoto}</button>
              <div className="stars">
                <span className="label">{t.giveStars}</span>
                {[1,2,3,4,5].map(n=> (
                  <button key={n} className={n<=stars? 'star on':'star'} onClick={()=>setStarCount(n)} aria-label={`star-${n}`}>★</button>
                ))}
              </div>
            </div>

            <div className="infoCol">
              <div className="headRow">
                <h1>{t.title}</h1>
                <button className="settings" onClick={()=>setOpen(true)}>{t.settings} ⚙️</button>
              </div>

              <div className="grid2">
                <label className="field"><span>{t.fullName}</span><input value={name} readOnly/></label>
                <label className="field"><span>{t.email}</span><input value={email} readOnly/></label>
              </div>
              <div className="grid1">
                <label className="field"><span>{t.city}</span><input value={city||''} placeholder={t.cityPlaceholder} onChange={e=>setCity(e.target.value)} /></label>
              </div>

              <div className="actions">
                <button className="ghost" onClick={()=>router.push('/messages')}>{t.sendMsg} 💬</button>
              </div>
            </div>
          </section>

          {/* Seller-only tabs */}
          {role === 'seller' && (
            <section className="card tabsCard">
              <div className="tabs">
                {(['live','pending','expired']).map(k=> (
                  <button key={k} className={tab===k? 'tab active':'tab'} onClick={()=>setTab(k)}>
                    {k==='live'? t.tabs.live : k==='pending'? t.tabs.pending : t.tabs.expired}
                  </button>
                ))}
              </div>
              <div className="tabBody">
                <p className="muted">{tab==='live' && 'Henüz ilan yok.'}
                  {tab==='pending' && 'İlk ilanını gönder, onay beklesin.'}
                  {tab==='expired' && 'Süresi dolan ilan bulunmuyor.'}
                </p>
              </div>
            </section>
          )}

          {/* Legal links */}
          <section className="legal">
            {Object.entries(t.legal).map(([k,label])=> (
              <a key={k} href={
                k==='privacy'? '/legal/gizlilik' :
                k==='about'? '/legal/hakkimizda' :
                k==='contact'? '/legal/iletisim' :
                k==='terms'? '/legal/kullanim-sartlari' :
                k==='kvkk'? '/legal/kvkk-aydinlatma' :
                k==='distance'? '/legal/mesafeli-satis-sozlesmesi' :
                '/legal/teslimat-iade'
              }>{label}</a>
            ))}
          </section>
        </main>

        {/* Bottom bar */}
        <footer className="bottombar">
          <div className="mini"><button onClick={()=>router.push('/')} className="iconbtn">🏠</button><span>{t.home}</span></div>
          <div className="mini"><button onClick={()=>router.push('/messages')} className="iconbtn">💬</button><span>{t.messages}</span></div>
          <div className="mini"><button onClick={()=>router.push('/notifications')} className="iconbtn">🔔</button><span>{t.notifications}</span></div>
        </footer>

        {/* Settings modal */}
        {open && (
          <div className="modal" role="dialog" aria-modal="true">
            <div className="sheet">
              <div className="sheetHead">
                <strong>{t.settings}</strong>
                <button className="iconbtn" onClick={()=>setOpen(false)}>✕</button>
              </div>

              <div className="sheetBody">
                <div className="grid2">
                  <label className="field"><span>{t.username}</span><input value={username} onChange={e=>setUsername(e.target.value)} placeholder="kullanici_adi"/></label>
                  <label className="field"><span>{t.city}</span><input value={city||''} onChange={e=>setCity(e.target.value)} placeholder="İl / İlçe"/></label>
                </div>
                <div className="grid2">
                  <label className="field"><span>{t.newPassword}</span><input type="password" value={pw1} onChange={e=>setPw1(e.target.value)} placeholder="••••••••"/></label>
                  <label className="field"><span>{t.confirmPassword}</span><input type="password" value={pw2} onChange={e=>setPw2(e.target.value)} placeholder="••••••••"/></label>
                </div>
              </div>

              {toast && <div className="toast">{toast}</div>}

              <div className="sheetFoot">
                <button className="ghost" onClick={()=>setOpen(false)}>{t.cancel}</button>
                <button className="primary" onClick={saveSettings}>{t.save}</button>
              </div>
            </div>
          </div>
        )}
      </SignedIn>

      <style jsx>{`
        :global(html), :global(body){min-height:100%}
        .wrap{min-height:100vh; background:
          radial-gradient(1200px 800px at -10% -10%, rgba(255,255,255,.35), transparent 60%),
          linear-gradient(120deg,#ff80ab,#a78bfa,#60a5fa,#34d399);
          background-size:320% 320%; animation:drift 16s ease-in-out infinite; color:#0f172a;
        }
        @keyframes drift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .topbar{position:sticky; top:0; z-index:20; display:flex; align-items:center; gap:10px; padding:10px 14px; backdrop-filter:blur(10px); background:rgba(255,255,255,.86); border-bottom:1px solid rgba(255,255,255,.45)}
        .brand{display:flex; align-items:center; gap:10px; cursor:pointer}
        .grow{flex:1}
        .lang{display:flex; align-items:center; gap:6px; padding:4px 8px; border:1px solid #e5e7eb; background:#fff; border-radius:12px}
        .lang select{border:none; background:transparent; font-weight:700; cursor:pointer}

        .page{max-width:980px; margin:12px auto 96px; padding:12px}
        .card{background:rgba(255,255,255,.86); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,.5); border-radius:22px; padding:16px; box-shadow:0 20px 50px rgba(0,0,0,.12)}
        .prof{display:grid; grid-template-columns:220px 1fr; gap:16px}
        @media (max-width:720px){ .prof{grid-template-columns:1fr} }

        .avatarCol{display:grid; gap:10px; justify-items:center}
        .avatar{width:160px; height:160px; border-radius:24px; background:#111827; color:#fff; display:grid; place-items:center; font-size:62px; font-weight:800; cursor:pointer; overflow:hidden}
        .avatar img{width:100%; height:100%; object-fit:cover}
        .small{padding:8px 12px; border-radius:12px; border:1px solid #e5e7eb; background:#fff; font-weight:700; cursor:pointer}
        .stars{display:flex; align-items:center; gap:4px}
        .stars .label{margin-right:6px; color:#111827; font-weight:700}
        .star{border:none; background:transparent; font-size:22px; cursor:pointer; opacity:.5}
        .star.on{opacity:1}

        .infoCol{display:grid; gap:10px}
        .headRow{display:flex; align-items:center; justify-content:space-between}
        h1{margin:0; font-size:22px}
        .settings{padding:10px 12px; border-radius:12px; border:1px solid #e5e7eb; background:#fff; font-weight:700; cursor:pointer}
        .grid2{display:grid; gap:10px; grid-template-columns:1fr 1fr}
        .grid1{display:grid; gap:10px; grid-template-columns:1fr}
        @media (max-width:560px){ .grid2{grid-template-columns:1fr} }
        .field{display:grid; gap:6px}
        .field input{padding:10px 12px; border:1px solid #e5e7eb; border-radius:12px; outline:none; font-size:14px}
        .field input:focus{box-shadow:0 0 0 3px rgba(99,102,241,.25); border-color:#6366f1}
        .actions{display:flex; gap:8px}
        .ghost{padding:12px 14px; border-radius:999px; border:1px solid #e5e7eb; background:#fff; font-weight:700; cursor:pointer}

        .tabsCard{margin-top:12px}
        .tabs{display:flex; gap:8px; background:rgba(255,255,255,.6); border:1px solid #e5e7eb; padding:6px; border-radius:12px; width:max-content}
        .tab{border:none; padding:8px 12px; border-radius:10px; cursor:pointer; font-weight:700; color:#111827}
        .tab.active{background:#111827; color:#fff}
        .tabBody{padding:10px 4px}
        .muted{color:#475569}

        .legal{display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin:14px auto 0}
        .legal a{border:1px solid #e5e7eb; background:#fff; color:#111827; border-radius:999px; padding:8px 12px; font-weight:600; text-decoration:none}

        .bottombar{position:fixed; left:0; right:0; bottom:0; z-index:40; display:flex; justify-content:space-around; gap:8px; padding:10px; background:rgba(255,255,255,.86); border-top:1px solid rgba(255,255,255,.45); backdrop-filter:blur(10px)}
        .iconbtn{position:relative; display:inline-grid; place-items:center; width:42px; height:42px; border-radius:12px; border:1px solid #e5e7eb; background:#fff; cursor:pointer}
        .mini{display:grid; place-items:center; gap:4px; font-size:12px}

        .modal{position:fixed; inset:0; background:rgba(0,0,0,.35); display:grid; place-items:center; z-index:60}
        .sheet{width:min(680px,calc(100% - 24px)); background:#fff; border-radius:18px; border:1px solid #e5e7eb; box-shadow:0 20px 60px rgba(0,0,0,.25); overflow:hidden}
        .sheetHead{display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-bottom:1px solid #e5e7eb}
        .sheetBody{padding:12px; display:grid; gap:10px}
        .sheetFoot{display:flex; justify-content:flex-end; gap:8px; padding:12px; border-top:1px solid #e5e7eb}
        .primary{padding:12px 14px; border-radius:999px; border:none; background:#111827; color:#fff; font-weight:700; cursor:pointer}
        .toast{margin:0 12px 8px; background:#ecfeff; border:1px solid #a5f3fc; color:#155e75; padding:8px 10px; border-radius:10px; font-size:13px}
        .hide{display:none !important}
      `}</style>
    </div>
  );
}
