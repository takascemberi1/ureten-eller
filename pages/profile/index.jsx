"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAuth, useUser, SignedIn, SignedOut } from "@clerk/nextjs";

/* --- i18n (TR varsayılan) --- */
const SUP = ["tr","en","ar","de"];
const STR = {
  tr:{ title:"Profil", fullName:"Ad Soyad", email:"E-posta", il:"İl", ilce:"İlçe", settings:"Ayarlar",
    save:"Kaydet", cancel:"Vazgeç", changePwd:"Şifreyi Değiştir", goSecurity:"Güvenlik Sayfasına Git",
    rating:"Yıldız ver", sellerTabs:{ live:"Yayındaki", pending:"Onay Bekleyen", expired:"Süresi Dolu" },
    noAds:"Henüz ilan yok.", legal:{ privacy:"Gizlilik", about:"Hakkımızda", contact:"İletişim", terms:"Kullanım Şartları", kvkk:"KVKK Aydınlatma", distance:"Mesafeli Satış Sözleşmesi", returns:"Teslimat & İade" },
    bottom:{ home:"Ana Sayfa", messages:"Mesajlar", noti:"Bildirimler" },
    upload:"Resmi Değiştir", uploading:"Yükleniyor…", saved:"Kaydedildi", error:"Bir hata oluştu",
    pwdNew:"Yeni şifre", pwdNew2:"Yeni şifre (tekrar)", mismatch:"Şifreler eşleşmiyor."
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
  useEffect(()=>{
    if (typeof window !== "undefined") {
      const s=localStorage.getItem("lang");
      if(s&&SUP.includes(s)) setLang(s);
    }
  },[]);
  const t = useMemo(()=>STR[lang]||STR.tr,[lang]); return {t,lang,setLang};
}

/* --- Sayfa --- */
export default function ProfilePage(){
  const { t } = useLang();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();

  const firstLoad = useRef(true);

  const [role,setRole]=useState("customer"); 
  const [rating,setRating]=useState(0);
  const [settingsOpen,setSettingsOpen]=useState(false);
  const [busy,setBusy]=useState(false);
  const [msg,setMsg]=useState("");
  const [form,setForm]=useState({ fullName:"", username:"", il:"", ilce:"", newPwd:"", newPwd2:"" });
  const [tab,setTab]=useState("live");
  const [ads,setAds]=useState({ live:[], pending:[], expired:[] });

  useEffect(()=>{
    if(!isLoaded) return;
    if(!isSignedIn) router.replace("/login");
  },[isLoaded,isSignedIn,router]);

  useEffect(()=>{
    if(!userLoaded || !user || !firstLoad.current) return;

    const meta = (user.unsafeMetadata||user.publicMetadata)||{};
    let savedFull="", savedIl="", savedIlce="", savedCity="";
    if (typeof window !== "undefined") {
      savedFull = localStorage.getItem("full_name")||"";
      savedIl = localStorage.getItem("il") || "";
      savedIlce = localStorage.getItem("ilce") || "";
      savedCity = localStorage.getItem("city") || "";
    }

    const r = (meta.role==="seller"||meta.role==="customer")?meta.role:(
      typeof window !== "undefined" ? localStorage.getItem("role")||"customer" : "customer"
    );
    setRole(r);

    const fn = savedFull || meta.full_name || [user.firstName,user.lastName].filter(Boolean).join(" ");
    const il = savedIl || meta.il || "";
    const ilce = savedIlce || meta.ilce || "";
    const computedCity = savedCity || (il && ilce ? `${il}/${ilce}` : il || "");

    setForm(f=>({...f, fullName: fn || "", username: user.username || "", il, ilce, newPwd:"", newPwd2:""}));

    if (typeof window !== "undefined" && computedCity) localStorage.setItem("city", computedCity);

    if (typeof window !== "undefined") {
      const savedRating = Number(localStorage.getItem("my_rating")||0);
      setRating(Number.isFinite(savedRating)?savedRating:0);
    }

    preloadAds(r);
    firstLoad.current = true;
  },[userLoaded,user]);

  async function preloadAds(r){
    try{
      if (typeof window !== "undefined") {
        const stub = JSON.parse(localStorage.getItem("ads_my")||"{}");
        setAds({ live: stub.live||[], pending: stub.pending||[], expired: stub.expired||[] });
      }
    }catch{}
    try{
      const res = await fetch("/api/ads/my");
      if(res.ok){
        const data = await res.json();
        setAds({ live: data.live||[], pending: data.pending||[], expired: data.expired||[] });
      }
    }catch{}
  }

  function computedCity(){
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("city") || "";
      if(saved) return saved;
    }
    if(form.il && form.ilce) return `${form.il}/${form.ilce}`;
    return form.il || "";
  }

  function starClick(i){
    const val = i+1;
    setRating(val);
    if (typeof window !== "undefined") localStorage.setItem("my_rating",String(val));
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

    const cityStr = (form.il && form.ilce) ? `${form.il}/${form.ilce}` : (form.il || "");

    try{
      const [firstName,...rest] = (form.fullName||"").trim().split(" ");
      const lastName = rest.join(" ");
      await user.update({
        username: form.username || undefined,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        unsafeMetadata:{ ...((user.unsafeMetadata||user.publicMetadata)||{}), full_name: form.fullName, il: form.il || "", ilce: form.ilce || "", city: cityStr, role }
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("full_name", form.fullName||"");
        localStorage.setItem("il", form.il||"");
        localStorage.setItem("ilce", form.ilce||"");
        localStorage.setItem("city", cityStr);
      }

      if(form.newPwd || form.newPwd2){
        if(form.newPwd !== form.newPwd2){
          setMsg(t.mismatch); setBusy(false); return;
        }
        window.open("/user/profile/security","_blank");
      }

      setMsg(t.saved);
      setSettingsOpen(false);
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
        {/* ... JSX senin dosyanda olduğu gibi (hiç değiştirmedim) ... */}
      </SignedIn>
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
