"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAuth, useUser, SignedIn, SignedOut } from "@clerk/nextjs";

/* --- i18n (TR varsayılan) --- */
const SUP = ["tr","en","ar","de"];
const STR = {
  tr: {
    title:"Profil",
    fullName:"Ad Soyad",
    email:"E-posta",
    il:"İl",
    ilce:"İlçe",
    settings:"Ayarlar",
    save:"Kaydet",
    cancel:"Vazgeç",
    changePwd:"Şifreyi Değiştir",
    goSecurity:"Güvenlik Sayfasına Git",
    rating:"Yıldız ver",
    sellerTabs:{ live:"Yayındaki", pending:"Onay Bekleyen", expired:"Süresi Dolu" },
    noAds:"Henüz ilan yok.",
    legal:{ privacy:"Gizlilik", about:"Hakkımızda", contact:"İletişim", terms:"Kullanım Şartları", kvkk:"KVKK Aydınlatma", distance:"Mesafeli Satış Sözleşmesi", returns:"Teslimat & İade" },
    bottom:{ home:"Ana Sayfa", messages:"Mesajlar", noti:"Bildirimler" },
    upload:"Resmi Değiştir",
    uploading:"Yükleniyor…",
    saved:"Kaydedildi",
    error:"Bir hata oluştu",
    pwdNew:"Yeni şifre",
    pwdNew2:"Yeni şifre (tekrar)",
    mismatch:"Şifreler eşleşmiyor."
  },
  en:{ title:"Profile", fullName:"Full Name", email:"Email", il:"Province", ilce:"District", settings:"Settings",
    save:"Save", cancel:"Cancel", changePwd:"Change Password", goSecurity:"Open Security Page",
    rating:"Rate", sellerTabs:{ live:"Live", pending:"Pending", expired:"Expired" }, noAds:"No listings.",
    legal:{ privacy:"Privacy", about:"About", contact:"Contact", terms:"Terms", kvkk:"KVKK Notice", distance:"Distance Sales", returns:"Shipping & Returns" },
    bottom:{ home:"Home", messages:"Messages", noti:"Notifications" },
    upload:"Change Photo", uploading:"Uploading…", saved:"Saved", error:"Something went wrong", pwdNew:"New password", pwdNew2:"Repeat password", mismatch:"Passwords do not match."
  },
  ar:{ title:"الملف الشخصي", fullName:"الاسم الكامل", email:"البريد", il:"الولاية", ilce:"الحي", settings:"إعدادات",
    save:"حفظ", cancel:"إلغاء", changePwd:"تغيير كلمة المرور", goSecurity:"صفحة الأمان",
    rating:"قيّم", sellerTabs:{ live:"منشور", pending:"بانتظار", expired:"منتهي" }, noAds:"لا توجد إعلانات.",
    legal:{ privacy:"الخصوصية", about:"من نحن", contact:"اتصال", terms:"الشروط", kvkk:"إشعار KVKK", distance:"البيع عن بعد", returns:"التسليم والإرجاع" },
    bottom:{ home:"الرئيسية", messages:"الرسائل", noti:"الإشعارات" },
    upload:"تغيير الصورة", uploading:"جارٍ الرفع…", saved:"تم الحفظ", error:"حدث خطأ", pwdNew:"كلمة مرور جديدة", pwdNew2:"تأكيد كلمة المرور", mismatch:"كلمتا المرور غير متطابقتين."
  },
  de:{ title:"Profil", fullName:"Name", email:"E-Mail", il:"Bundesland", ilce:"Bezirk", settings:"Einstellungen",
    save:"Speichern", cancel:"Abbrechen", changePwd:"Passwort ändern", goSecurity:"Sicherheitsseite",
    rating:"Bewerten", sellerTabs:{ live:"Aktiv", pending:"Ausstehend", expired:"Abgelaufen" }, noAds:"Keine Inserate.",
    legal:{ privacy:"Datenschutz", about:"Über uns", contact:"Kontakt", terms:"Nutzungsbedingungen", kvkk:"KVKK-Hinweis", distance:"Fernabsatz", returns:"Lieferung & Rückgabe" },
    bottom:{ home:"Startseite", messages:"Nachrichten", noti:"Benachr." },
    upload:"Foto ändern", uploading:"Lädt…", saved:"Gespeichert", error:"Fehler aufgetreten", pwdNew:"Neues Passwort", pwdNew2:"Passwort wiederholen", mismatch:"Passwörter stimmen nicht überein."
  }
};
function useLang(){
  const [lang,setLang]=useState("tr");
  useEffect(()=>{ const s=localStorage.getItem("lang"); if(s&&SUP.includes(s)) setLang(s);},[]);
  const t = useMemo(()=>STR[lang]||STR.tr,[lang]); return {t,lang,setLang};
}

/* --- Sayfa --- */
export default function ProfilePage(){
  const { t } = useLang();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();

  const firstLoad = useRef(true);

  // rol & form
  const [role,setRole]=useState("customer"); // seller | customer
  const [rating,setRating]=useState(0);
  const [settingsOpen,setSettingsOpen]=useState(false);
  const [busy,setBusy]=useState(false);
  const [msg,setMsg]=useState("");
  const [form,setForm]=useState({
    fullName:"",
    username:"",
    il:"",
    ilce:"",
    newPwd:"",
    newPwd2:""
  });
  const [tab,setTab]=useState("live");
  const [ads,setAds]=useState({ live:[], pending:[], expired:[] });

  // Guard
  useEffect(()=>{
    if(!isLoaded) return;
    if(!isSignedIn) router.replace("/login");
  },[isLoaded,isSignedIn,router]);

  // Load user + yerel kalıcılık (F5 sonrası silinme olmasın)
  useEffect(()=>{
    if(!userLoaded || !user || !firstLoad.current) return;

    const meta = (user.unsafeMetadata||user.publicMetadata)||{};
    const savedFull = localStorage.getItem("full_name");
    const savedIl = localStorage.getItem("il") || "";
    const savedIlce = localStorage.getItem("ilce") || "";
    const savedCity = localStorage.getItem("city") || "";

    const r = (meta.role==="seller"||meta.role==="customer")?meta.role:(localStorage.getItem("role")||"customer");
    setRole(r);

    const fn = savedFull || meta.full_name || [user.firstName,user.lastName].filter(Boolean).join(" ");
    const il = savedIl || meta.il || "";
    const ilce = savedIlce || meta.ilce || "";
    const computedCity = savedCity || (il && ilce ? `${il}/${ilce}` : il || "");

    setForm(f=>({
      ...f,
      fullName: fn || "",
      username: user.username || "",
      il, ilce,
      newPwd:"", newPwd2:""
    }));

    // City ekranı için localStorage’a kalsın
    if(computedCity) localStorage.setItem("city", computedCity);

    const savedRating = Number(localStorage.getItem("my_rating")||0);
    setRating(Number.isFinite(savedRating)?savedRating:0);

    preloadAds(r);
    firstLoad.current = true; // kalsın ama bir daha overwrite etmesin
  },[userLoaded,user]);

  async function preloadAds(r){
    try{
      const stub = JSON.parse(localStorage.getItem("ads_my")||"{}");
      setAds({
        live: stub.live||[],
        pending: stub.pending||[],
        expired: stub.expired||[]
      });
    }catch{}
    try{
      const res = await fetch("/api/ads/my");
      if(res.ok){
        const data = await res.json();
        setAds({
          live: data.live||[],
          pending: data.pending||[],
          expired: data.expired||[]
        });
      }
    }catch{}
  }

  function computedCity(){
    const saved = localStorage.getItem("city") || "";
    if(saved) return saved;
    if(form.il && form.ilce) return `${form.il}/${form.ilce}`;
    return form.il || "";
  }

  function starClick(i){
    const val = i+1;
    setRating(val);
    localStorage.setItem("my_rating",String(val));
  }

  async function onAvatarChange(e){
    const file = e.target.files?.[0];
    if(!file) return;
    try{
      setBusy(true); setMsg(t.uploading);
      await user.setProfileImage({ file });
      setMsg(t.saved);
    }catch(err){
      console.error(err); setMsg(t.error);
    }finally{ setBusy(false); setTimeout(()=>setMsg(""),1200); }
  }

  async function saveSettings(e){
    e.preventDefault();
    setBusy(true); setMsg("");

    // City’yi tek yerden türet ve kalıcı yap
    const cityStr = (form.il && form.ilce) ? `${form.il}/${form.ilce}` : (form.il || "");

    try{
      // Clerk profil güncelle
      const [firstName,...rest] = (form.fullName||"").trim().split(" ");
      const lastName = rest.join(" ");
      await user.update({
        username: form.username || undefined,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        unsafeMetadata:{
          ...((user.unsafeMetadata||user.publicMetadata)||{}),
          full_name: form.fullName,
          il: form.il || "",
          ilce: form.ilce || "",
          city: cityStr,
          role
        }
      });

      // Yerelde tut
      localStorage.setItem("full_name", form.fullName||"");
      localStorage.setItem("il", form.il||"");
      localStorage.setItem("ilce", form.ilce||"");
      localStorage.setItem("city", cityStr);

      // Şifre girildiyse sadece yönlendir (SDK ile direkt değiştirmeyelim)
      if(form.newPwd || form.newPwd2){
        if(form.newPwd !== form.newPwd2){
          setMsg(t.mismatch); setBusy(false); return;
        }
        window.open("/user/profile/security","_blank");
      }

      setMsg(t.saved);
      setSettingsOpen(false); // <-- Kaydet’ten sonra panel kapanır
    }catch(err){
      console.error(err);
      setMsg(t.error);
    }finally{
      setBusy(false); setTimeout(()=>setMsg(""),1200);
    }
  }

  return (
    <div className="wrap">
      <SignedOut><p>Yönlendiriliyor…</p></SignedOut>
      <SignedIn>
        {/* Header */}
        <div className="head">
          <div className="avatarBox">
            <div className="ring">
              <img src={user?.imageUrl||"/assets/images/logo.png"} alt="avatar" />
            </div>
            <label className="uploadBtn">
              {busy ? t.uploading : t.upload}
              <input type="file" accept="image/*" onChange={onAvatarChange} disabled={busy}/>
            </label>
            <div className="rating">
              <span>{t.rating}: </span>
              {[0,1,2,3,4].map(i=>(
                <button key={i} className={i<rating?"star on":"star"} onClick={()=>starClick(i)} aria-label={`star-${i+1}`}>★</button>
              ))}
            </div>
          </div>

          <div className="prim">
            <h1 className="ttl">{t.title}</h1>
            <div className="fldRow">
              <label>{t.fullName}</label>
              <div className="val">{form.fullName || "—"}</div>
            </div>
            <div className="fldRow">
              <label>{t.email}</label>
              <div className="val">{user?.primaryEmailAddress?.emailAddress || "—"}</div>
            </div>
            <div className="fldRow">
              <label>Şehir</label>
              <div className="val">{computedCity() || "—"}</div>
            </div>
            <div className="actions">
              <button className="btn" onClick={()=>setSettingsOpen(true)}>⚙️ {t.settings}</button>
            </div>
            {msg && <div className="msg">{msg}</div>}
          </div>
        </div>

        {/* Üreten El sekmeleri */}
        {role==="seller" && (
          <div className="tabs">
            {["live","pending","expired"].map(k=>(
              <button key={k} className={tab===k?"tab active":"tab"} onClick={()=>setTab(k)}>
                {t.sellerTabs[k]}
              </button>
            ))}
          </div>
        )}

        {/* İçerik */}
        {role==="seller" ? (
          <AdList items={ads[tab]} emptyText={t.noAds} />
        ) : (
          <div className="card">
            <h3>📬 Mesaj Gönder</h3>
            <textarea className="txt" placeholder="Mesajınız…"></textarea>
            <div><button className="btn dark">Gönder</button></div>
          </div>
        )}

        {/* Legal — en altta */}
        <div className="legal">
          <a href="/legal/gizlilik">{t.legal.privacy}</a>
          <a href="/legal/hakkimizda">{t.legal.about}</a>
          <a href="/legal/iletisim">{t.legal.contact}</a>
          <a href="/legal/kullanim-sartlari">{t.legal.terms}</a>
          <a href="/legal/kvkk-aydinlatma">{t.legal.kvkk}</a>
          <a href="/legal/mesafeli-satis-sozlesmesi">{t.legal.distance}</a>
          <a href="/legal/teslimat-iade">{t.legal.returns}</a>
        </div>

        {/* Alt bar */}
        <footer className="bottombar">
          <div className="mini"><button className="iconbtn" onClick={()=>router.push("/home.html")}>🏠</button><span>{t.bottom.home}</span></div>
          <div className="mini"><button className="iconbtn" onClick={()=>router.push("/messages")}>💬</button><span>{t.bottom.messages}</span></div>
          <div className="mini"><button className="iconbtn" onClick={()=>router.push("/notifications")}>🔔</button><span>{t.bottom.noti}</span></div>
        </footer>

        {/* Ayarlar Paneli (CITY input kaldırıldı — yalnızca İl/İlçe) */}
        {settingsOpen && (
          <div className="sheet" role="dialog" aria-modal="true">
            <div className="sheetCard">
              <div className="sheetHead">
                <strong>⚙️ {t.settings}</strong>
                <button className="btn ghost" onClick={()=>setSettingsOpen(false)}>✕</button>
              </div>
              <form onSubmit={saveSettings} className="grid">
                <label className="lab">
                  <span>{t.fullName}</span>
                  <input value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})}/>
                </label>
                <label className="lab">
                  <span>Kullanıcı adı</span>
                  <input value={form.username} onChange={e=>setForm({...form, username:e.target.value})}/>
                </label>
                <label className="lab">
                  <span>{t.il}</span>
                  <input value={form.il} onChange={e=>setForm({...form, il:e.target.value})}/>
                </label>
                <label className="lab">
                  <span>{t.ilce}</span>
                  <input value={form.ilce} onChange={e=>setForm({...form, ilce:e.target.value})}/>
                </label>

                <div className="sep"/>
                <div className="lab"><strong>🔒 {t.changePwd}</strong></div>
                <label className="lab">
                  <span>{t.pwdNew}</span>
                  <input type="password" value={form.newPwd} onChange={e=>setForm({...form, newPwd:e.target.value})} />
                </label>
                <label className="lab">
                  <span>{t.pwdNew2}</span>
                  <input type="password" value={form.newPwd2} onChange={e=>setForm({...form, newPwd2:e.target.value})} />
                </label>
                <a className="link" href="/user/profile/security" target="_blank" rel="noreferrer">➡️ {t.goSecurity}</a>

                <div className="row">
                  <button type="button" className="btn ghost" onClick={()=>setSettingsOpen(false)}>{t.cancel}</button>
                  <button className="btn dark" disabled={busy}>{busy?"…":t.save}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </SignedIn>

      <style jsx>{`
        .wrap{min-height:100vh; padding:16px 14px 96px; background:
          radial-gradient(1000px 700px at -10% -10%, rgba(255,255,255,.35), transparent 60%),
          linear-gradient(120deg,#ff80ab,#a78bfa,#60a5fa,#34d399);
          background-size:320% 320%; animation:drift 16s ease-in-out infinite;}
        @keyframes drift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

        .head{max-width:980px; margin:10px auto; display:grid; gap:14px; grid-template-columns:180px 1fr;
          background:rgba(255,255,255,.86); border:1px solid rgba(255,255,255,.5); border-radius:18px; padding:14px; backdrop-filter:blur(10px)}
        @media (max-width:720px){ .head{grid-template-columns:1fr} }

        .avatarBox{display:grid; gap:10px; justify-items:center}
        .ring{padding:6px; border-radius:999px; background:conic-gradient(from 0deg, #ff80ab, #a78bfa, #60a5fa, #34d399, #ff80ab)}
        .ring img{display:block; width:120px; height:120px; object-fit:cover; border-radius:999px; background:#f1f5f9}
        .uploadBtn{font-weight:700; border:1px solid #e5e7eb; background:#fff; padding:8px 12px; border-radius:12px; cursor:pointer}
        .uploadBtn input{display:none}

        .rating{display:flex; align-items:center; gap:6px; font-weight:700}
        .star{border:none; background:transparent; font-size:20px; cursor:pointer; opacity:.35}
        .star.on{opacity:1}

        .prim .ttl{margin:0 0 6px; font-size:24px}
        .fldRow{display:grid; grid-template-columns:160px 1fr; gap:8px; align-items:center}
        .fldRow label{font-weight:700; color:#111827}
        .val{padding:8px 12px; border-radius:12px; background:#fff; border:1px solid #e5e7eb}
        .actions{margin-top:10px}
        .btn{border:1px solid #e5e7eb; background:#fff; color:#111827; border-radius:12px; padding:9px 12px; font-weight:800; cursor:pointer}
        .btn.dark{background:#111827; color:#fff; border-color:#111827}
        .btn.ghost{background:#fff}

        .msg{margin-top:8px; font-size:13px; background:#f1f5f9; border:1px solid #e5e7eb; padding:6px 10px; border-radius:10px; width:max-content}

        .tabs{max-width:980px; margin:10px auto; display:flex; gap:8px; background:rgba(255,255,255,.72); border:1px solid #e5e7eb; padding:6px; border-radius:14px}
        .tab{border:none; padding:10px 14px; border-radius:12px; font-weight:800; cursor:pointer}
        .tab.active{background:#111827; color:#fff}

        .card{max-width:980px; margin:10px auto; background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:14px}
        .ads{display:grid; gap:10px; grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
        .ad{border:1px solid #e5e7eb; border-radius:14px; overflow:hidden; background:#fff}
        .thumb{width:100%; aspect-ratio:4/3; background:#f1f5f9}
        .body{padding:10px}
        .title{margin:0 0 6px; font-size:14px; font-weight:800}

        .legal{max-width:980px; margin:16px auto 96px; display:flex; gap:10px; flex-wrap:wrap; justify-content:center}
        .legal a{border:1px solid #e5e7eb; background:#fff; color:#111827; border-radius:999px; padding:8px 12px; font-weight:700; text-decoration:none}

        .bottombar{position:fixed; left:0; right:0; bottom:0; z-index:20; display:flex; justify-content:space-around; gap:8px; padding:10px;
          background:rgba(255,255,255,.92); border-top:1px solid #e5e7eb; backdrop-filter:blur(10px)}
        .iconbtn{width:42px; height:42px; border:1px solid #e5e7eb; background:#fff; border-radius:12px; cursor:pointer}
        .mini{display:grid; place-items:center; gap:4px; font-size:12px}

        /* settings sheet */
        .sheet{position:fixed; inset:0; background:rgba(0,0,0,.35); display:grid; place-items:end center; padding:20px; z-index:50}
        .sheetCard{width:100%; max-width:640px; background:#fff; border:1px solid #e5e7eb; border-radius:16px; overflow:hidden}
        .sheetHead{display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-bottom:1px solid #e5e7eb}
        .grid{display:grid; gap:10px; padding:12px}
        .lab{display:grid; gap:6px}
        input, textarea{padding:9px 12px; border:1px solid #e5e7eb; border-radius:12px; font-size:14px; outline:none}
        .txt{min-height:120px}
        .row{display:flex; gap:10px; justify-content:flex-end}
        .sep{height:1px; background:#e5e7eb; margin:4px 0}
        .link{font-weight:800; text-decoration:none; color:#111827}
      `}</style>
    </div>
  );
}

/* --- küçük alt bileşen: ilan listesi --- */
function AdList({ items, emptyText }){
  if(!items || !items.length){
    return <div className="card"><p>{emptyText}</p></div>;
  }
  return (
    <div className="card">
      <div className="ads">
        {items.map((a,idx)=>(
          <a key={idx} className="ad" href={a.url||"#"}>
            <div className="thumb" style={a.img?{backgroundImage:`url(${a.img})`,backgroundSize:"cover",backgroundPosition:"center"}:undefined}/>
            <div className="body">
              <h4 className="title">{a.title||"İlan"}</h4>
              <div style={{display:"flex",justifyContent:"space-between",color:"#475569",fontSize:13}}>
                <span>{a.cat||""}</span><b>{a.price||""}</b>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
