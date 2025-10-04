'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth, useUser, SignedIn, SignedOut } from '@clerk/nextjs';

/* ===================== i18n ===================== */
const SUP = ['tr','en','ar','de'];
const LOCALE = { tr:'Türkçe', en:'English', ar:'العربية', de:'Deutsch' };
const STR = {
  tr:{
    title:'Profil', settings:'Ayarlar', save:'Kaydet', cancel:'Vazgeç', uploading:'Yükleniyor…', saved:'Kaydedildi', error:'Hata oluştu',
    fullName:'Ad Soyad', email:'E‑posta', province:'İl', district:'İlçe', city:'Şehir', username:'Kullanıcı adı',
    changePwd:'Şifreyi Değiştir', goSecurity:'Güvenlik Sayfasına Git',
    sellerTabs:{ live:'Yayındaki', pending:'Onay Bekleyen', expired:'Süresi Dolmuş' },
    noAds:'Henüz ilan yok.',
    kycHead:'Kimlik & Ödeme', kycStart:'KYC Başlat', bankIban:'IBAN / Ödeme Hesabı', ibanAdd:'IBAN Ekle', payoutInfo:'Ödeme bilgisi',
    premiumHead:'Premium Üyelik', premiumGo:'Premium Satın Al', premiumDesc:'Daha fazla ilan ve vitrin görünürlüğü.',
    storeReviews:'Mağaza Yorumları', reply:'Yanıtla', replySend:'Yanıtı Gönder',
    ordersHead:'Siparişlerim', view:'Görüntüle', track:'Kargo Takip', refund:'İade Talebi', reorder:'Tekrar Sipariş',
    writeReview:'Yorum Yaz', rating:'Puan', comment:'Yorum', submit:'Gönder', close:'Kapat',
    status:{ preparing:'Hazırlanıyor', shipped:'Kargoda', delivered:'Teslim edildi', returned:'İade' },
    bottom:{ home:'Ana Sayfa', messages:'Mesajlar', noti:'Bildirimler' },
    legal:{
      corp:'Kurumsal', about:'Hakkımızda', contact:'İletişim', privacy:'Gizlilik', kvkk:'KVKK Aydınlatma', privTerms:'Gizlilik & Kullanım',
      terms:'Kullanım Şartları', distance:'Mesafeli Satış', returns:'Teslimat & İade', cookie:'Çerez Politikası', help:'Yardım', banned:'Yasaklı Ürünler', home:'Ana Sayfa', copyright:'© 2025 Üreten Eller'
    }
  },
  en:{
    title:'Profile', settings:'Settings', save:'Save', cancel:'Cancel', uploading:'Uploading…', saved:'Saved', error:'Something went wrong',
    fullName:'Full Name', email:'Email', province:'Province', district:'District', city:'City', username:'Username',
    changePwd:'Change Password', goSecurity:'Open Security Page',
    sellerTabs:{ live:'Live', pending:'Pending', expired:'Expired' },
    noAds:'No listings.',
    kycHead:'Identity & Payments', kycStart:'Start KYC', bankIban:'IBAN / Payout Account', ibanAdd:'Add IBAN', payoutInfo:'Payout info',
    premiumHead:'Premium Membership', premiumGo:'Buy Premium', premiumDesc:'More listings and showcase visibility.',
    storeReviews:'Store Reviews', reply:'Reply', replySend:'Send Reply',
    ordersHead:'My Orders', view:'View', track:'Track', refund:'Refund', reorder:'Re‑order',
    writeReview:'Write Review', rating:'Rating', comment:'Comment', submit:'Submit', close:'Close',
    status:{ preparing:'Preparing', shipped:'Shipped', delivered:'Delivered', returned:'Returned' },
    bottom:{ home:'Home', messages:'Messages', noti:'Notifications' },
    legal:{
      corp:'Company', about:'About', contact:'Contact', privacy:'Privacy', kvkk:'KVKK Notice', privTerms:'Privacy & Terms',
      terms:'Terms of Use', distance:'Distance Sales', returns:'Shipping & Returns', cookie:'Cookie Policy', help:'Help', banned:'Banned Products', home:'Home', copyright:'© 2025 Ureten Eller'
    }
  },
  ar:{
    title:'الملف الشخصي', settings:'الإعدادات', save:'حفظ', cancel:'إلغاء', uploading:'جارٍ الرفع…', saved:'تم الحفظ', error:'حدث خطأ',
    fullName:'الاسم الكامل', email:'البريد', province:'الولاية', district:'الحي', city:'المدينة', username:'اسم المستخدم',
    changePwd:'تغيير كلمة المرور', goSecurity:'صفحة الأمان',
    sellerTabs:{ live:'منشور', pending:'بانتظار', expired:'منتهي' },
    noAds:'لا توجد إعلانات.',
    kycHead:'الهوية والمدفوعات', kycStart:'بدء التحقق', bankIban:'حساب IBAN', ibanAdd:'إضافة IBAN', payoutInfo:'معلومات الدفع',
    premiumHead:'عضوية بريميوم', premiumGo:'شراء بريميوم', premiumDesc:'إعلانات أكثر وظهور أعلى.',
    storeReviews:'تقيمات المتجر', reply:'رد', replySend:'إرسال الرد',
    ordersHead:'طلباتي', view:'عرض', track:'تتبع', refund:'إرجاع', reorder:'إعادة الطلب',
    writeReview:'اكتب مراجعة', rating:'تقييم', comment:'تعليق', submit:'إرسال', close:'إغلاق',
    status:{ preparing:'قيد التحضير', shipped:'بالشحن', delivered:'تم التسليم', returned:'مُعاد' },
    bottom:{ home:'الرئيسية', messages:'الرسائل', noti:'الإشعارات' },
    legal:{
      corp:'الشركة', about:'من نحن', contact:'اتصال', privacy:'الخصوصية', kvkk:'إشعار KVKK', privTerms:'الخصوصية والشروط',
      terms:'شروط الاستخدام', distance:'البيع عن بعد', returns:'التسليم والإرجاع', cookie:'سياسة الكوكيز', help:'مساعدة', banned:'منتجات محظورة', home:'الرئيسية', copyright:'© 2025 Ureten Eller'
    }
  },
  de:{
    title:'Profil', settings:'Einstellungen', save:'Speichern', cancel:'Abbrechen', uploading:'Lädt…', saved:'Gespeichert', error:'Fehler',
    fullName:'Name', email:'E‑Mail', province:'Bundesland', district:'Bezirk', city:'Stadt', username:'Benutzername',
    changePwd:'Passwort ändern', goSecurity:'Sicherheitsseite',
    sellerTabs:{ live:'Aktiv', pending:'Ausstehend', expired:'Abgelaufen' },
    noAds:'Keine Inserate.',
    kycHead:'Identität & Zahlungen', kycStart:'KYC starten', bankIban:'IBAN / Auszahlung', ibanAdd:'IBAN hinzufügen', payoutInfo:'Auszahlungsinfo',
    premiumHead:'Premium Mitgliedschaft', premiumGo:'Premium kaufen', premiumDesc:'Mehr Inserate & Sichtbarkeit.',
    storeReviews:'Shop‑Bewertungen', reply:'Antworten', replySend:'Antwort senden',
    ordersHead:'Meine Bestellungen', view:'Ansehen', track:'Sendung', refund:'Retoure', reorder:'Nochmal bestellen',
    writeReview:'Bewertung schreiben', rating:'Bewertung', comment:'Kommentar', submit:'Senden', close:'Schließen',
    status:{ preparing:'In Vorbereitung', shipped:'Unterwegs', delivered:'Zugestellt', returned:'Retoure' },
    bottom:{ home:'Start', messages:'Nachrichten', noti:'Benachr.' },
    legal:{
      corp:'Unternehmen', about:'Über uns', contact:'Kontakt', privacy:'Datenschutz', kvkk:'KVKK‑Hinweis', privTerms:'Datenschutz & Nutzg.',
      terms:'Nutzungsbedingungen', distance:'Fernabsatz', returns:'Lieferung & Rückgabe', cookie:'Cookie‑Richtlinie', help:'Hilfe', banned:'Verbotene Produkte', home:'Startseite', copyright:'© 2025 Ureten Eller'
    }
  }
};

function useLang(){
  const [lang,setLang]=useState('tr');
  useEffect(()=>{ try{ const s=localStorage.getItem('lang'); if(s&&SUP.includes(s)) setLang(s);}catch{} },[]);
  useEffect(()=>{ try{ localStorage.setItem('lang',lang); document.documentElement.lang=lang; document.documentElement.dir=(lang==='ar'?'rtl':'ltr'); }catch{} },[lang]);
  const t = useMemo(()=>STR[lang]||STR.tr,[lang]);
  return { t, lang, setLang };
}

/* ===================== PAGE ===================== */
export default function ProfilePage(){
  const { t, lang, setLang } = useLang();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();

  const [settingsOpen,setSettingsOpen]=useState(false);
  const [busy,setBusy]=useState(false);
  const [msg,setMsg]=useState('');

  // Role (kilitli)
  const [role,setRole]=useState(''); // 'seller' | 'customer'
  useEffect(()=>{
    if(!userLoaded||!user) return;
    const meta=(user.unsafeMetadata||user.publicMetadata)||{};
    const r = (meta.role==='seller'||meta.role==='customer')?meta.role:(typeof window!=='undefined'?localStorage.getItem('role')||'customer':'customer');
    setRole(r);
  },[userLoaded,user]);

  // Guard
  useEffect(()=>{ if(!isLoaded) return; if(!isSignedIn) router.replace('/login'); },[isLoaded,isSignedIn,router]);

  // Form
  const [form,setForm]=useState({ fullName:'', username:'', il:'', ilce:'', newPwd:'', newPwd2:'' });
  useEffect(()=>{
    if(!userLoaded||!user) return;
    const meta=(user.unsafeMetadata||user.publicMetadata)||{};
    const savedFull=(typeof window!=='undefined'?localStorage.getItem('full_name')||'':'');
    const savedIl=(typeof window!=='undefined'?localStorage.getItem('il')||'':'');
    const savedIlce=(typeof window!=='undefined'?localStorage.getItem('ilce')||'':'');
    const fn = savedFull || meta.full_name || [user.firstName,user.lastName].filter(Boolean).join(' ');
    setForm(f=>({...f, fullName:fn||'', username:user.username||'', il:savedIl||meta.il||'', ilce:savedIlce||meta.ilce||'', newPwd:'', newPwd2:'' }));
  },[userLoaded,user]);

  const cityStr = useMemo(()=>{
    if(form.il&&form.ilce) return `${form.il}/${form.ilce}`; return form.il||'';
  },[form.il,form.ilce]);

  async function saveSettings(e){
    e.preventDefault(); setBusy(true); setMsg('');
    try{
      const [firstName,...rest]=(form.fullName||'').trim().split(' ');
      const lastName=rest.join(' ');
      await user.update({ username: form.username||undefined, firstName: firstName||undefined, lastName: lastName||undefined, unsafeMetadata:{...((user.unsafeMetadata||user.publicMetadata)||{}), full_name:form.fullName, il:form.il||'', ilce:form.ilce||'', city:cityStr } });
      try{ localStorage.setItem('full_name',form.fullName||''); localStorage.setItem('il',form.il||''); localStorage.setItem('ilce',form.ilce||''); localStorage.setItem('city',cityStr);}catch{}
      if(form.newPwd||form.newPwd2){ if(form.newPwd!==form.newPwd2){ setMsg('Şifreler eşleşmiyor.'); setBusy(false); return; } window.open('/user/profile/security','_blank'); }
      setMsg(t.saved); setSettingsOpen(false);
    }catch(err){ console.error(err); setMsg(t.error);} finally{ setBusy(false); setTimeout(()=>setMsg(''),1200);} }

  // Seller: ilanlar
  const [ads,setAds]=useState({live:[],pending:[],expired:[]});
  useEffect(()=>{ if(role!=='seller') return; (async()=>{ try{ const res=await fetch('/api/ads/my'); if(res.ok){ const d=await res.json(); setAds({ live:d.live||[], pending:d.pending||[], expired:d.expired||[] }); return; } }catch{} try{ const stub=JSON.parse(localStorage.getItem('ads_my')||'{}'); setAds({ live:stub.live||[], pending:stub.pending||[], expired:stub.expired||[] }); }catch{} })(); },[role]);

  // Customer: siparişler
  const [orders,setOrders]=useState([]);
  useEffect(()=>{ if(role!=='customer') return; (async()=>{ try{ const r=await fetch('/api/orders/my?limit=50',{cache:'no-store'}); if(r.ok){ const d=await r.json(); setOrders(Array.isArray(d)?d:[]); return; } }catch{} try{ const stub=JSON.parse(localStorage.getItem('orders_my')||'[]'); setOrders(Array.isArray(stub)?stub:[]);}catch{} })(); },[role]);

  // Yorumlar (seller mağaza yorumları)
  const [storeReviews,setStoreReviews]=useState([]);
  useEffect(()=>{ if(role!=='seller') return; (async()=>{ try{ const r=await fetch('/api/reviews/store'); if(r.ok){ const d=await r.json(); setStoreReviews(Array.isArray(d)?d:[]); return; } }catch{} try{ const stub=JSON.parse(localStorage.getItem('reviews_store')||'[]'); setStoreReviews(Array.isArray(stub)?stub:[]);}catch{} })(); },[role]);

  // UI states
  const [tab,setTab]=useState('live'); // seller ilan sekmesi
  const [reviewOpen,setReviewOpen]=useState(false); // müşteri yorum sheet
  const [reviewForm,setReviewForm]=useState({ orderId:'', rating:5, text:'' });

  function openReviewFor(o){ setReviewForm({ orderId:o.id||o.orderId||'', rating:5, text:'' }); setReviewOpen(true); }
  async function submitReview(e){ e.preventDefault(); try{ const r=await fetch('/api/reviews/submit',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ orderId:reviewForm.orderId, rating:reviewForm.rating, text:reviewForm.text })}); if(r.ok){ alert(t.saved); setReviewOpen(false); setReviewForm({ orderId:'', rating:5, text:'' }); } else { alert(t.error); } }catch{ alert(t.error);} }

  function go(h){ router.push(h); }

  return (
    <div className="wrap">
      {/* Dil seçimi */}
      <div className="langbox">
        <select aria-label="Language" value={lang} onChange={(e)=>setLang(e.target.value)}>{SUP.map(k=>(<option key={k} value={k}>{LOCALE[k]}</option>))}</select>
      </div>

      <SignedOut><p style={{padding:'20px'}}>Yönlendiriliyor…</p></SignedOut>
      <SignedIn>
        {/* HEADER */}
        <section className="head">
          <div className="avatarBox">
            <div className="ring"><img src={user?.imageUrl||'/assets/images/logo.png'} alt="avatar"/></div>
            <label className="uploadBtn">
              {busy ? t.uploading : 'Foto Değiştir'}
              <input type="file" accept="image/*" onChange={async(e)=>{ const file=e.target.files?.[0]; if(!file) return; try{ setBusy(true); setMsg(t.uploading); await user.setProfileImage({ file }); setMsg(t.saved);}catch{ setMsg(t.error);} finally{ setBusy(false); setTimeout(()=>setMsg(''),1200);} }} disabled={busy}/>
            </label>
          </div>

          <div className="prim">
            <h1 className="ttl">{t.title}</h1>
            <div className="fldRow"><label>{t.fullName}</label><div className="val">{form.fullName||'—'}</div></div>
            <div className="fldRow"><label>{t.email}</label><div className="val">{user?.primaryEmailAddress?.emailAddress||'—'}</div></div>
            <div className="fldRow"><label>{t.city}</label><div className="val">{cityStr||'—'}</div></div>
            <div className="tags"><span className={role==='seller'?'tag dark':'tag'}>{role||'—'}</span></div>
            <div className="actions"><button className="btn" onClick={()=>setSettingsOpen(true)}>⚙️ {t.settings}</button></div>
            {msg && <div className="msg">{msg}</div>}
          </div>
        </section>

        {/* ROLE CONTENT */}
        {role==='seller' ? (
          <>
            {/* Seller Tabs */}
            <div className="tabs">{['live','pending','expired'].map(k=>(<button key={k} className={tab===k?'tab active':'tab'} onClick={()=>setTab(k)}>{t.sellerTabs[k]}</button>))}</div>

            <Card><h3>📦 {t.sellerTabs[tab]}</h3><AdList items={ads[tab]} emptyText={t.noAds}/></Card>

            <Card>
              <h3>🪪 {t.kycHead}</h3>
              <div className="row gap">
                <button className="btn dark" onClick={()=>go('/api/kyc/start')}>{t.kycStart}</button>
                <button className="btn" onClick={()=>go('/api/kyc/iban-start')}>{t.ibanAdd}</button>
                <button className="btn" onClick={()=>go('/portal/seller/payout')}>{t.payoutInfo}</button>
              </div>
            </Card>

            <Card>
              <h3>✨ {t.premiumHead}</h3>
              <p>{t.premiumDesc}</p>
              <button className="btn dark" onClick={()=>go('/api/billing/checkout?plan=premium')}>{t.premiumGo}</button>
            </Card>

            <Card>
              <h3>⭐ {t.storeReviews}</h3>
              <ReviewList items={storeReviews} emptyText={'Henüz yorum yok.'} onReply={(rev)=>{
                const reply=prompt('Yanıtınız:'); if(!reply) return; fetch('/api/reviews/reply',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ reviewId:rev.id, reply })});
              }}/>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <h3>🧾 {t.ordersHead}</h3>
              <OrderList items={orders} t={t} onWriteReview={openReviewFor}/>
            </Card>
          </>
        )}

        {/* Bottom action bar */}
        <nav className="bottombar">
          <div className="mini"><button className="iconbtn" onClick={()=>go('/home.html')}>🏠</button><span>{t.bottom.home}</span></div>
          <div className="mini"><button className="iconbtn" onClick={()=>go('/messages')}>💬</button><span>{t.bottom.messages}</span></div>
          <div className="mini"><button className="iconbtn" onClick={()=>go('/notifications')}>🔔</button><span>{t.bottom.noti}</span></div>
        </nav>

        {/* SETTINGS SHEET */}
        {settingsOpen && (
          <div className="sheet" role="dialog" aria-modal="true">
            <div className="sheetCard">
              <div className="sheetHead"><strong>⚙️ {t.settings}</strong><button className="btn ghost" onClick={()=>setSettingsOpen(false)}>✕</button></div>
              <form className="grid" onSubmit={saveSettings}>
                <label className="lab"><span>{t.fullName}</span><input value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})}/></label>
                <label className="lab"><span>{t.username}</span><input value={form.username} onChange={e=>setForm({...form,username:e.target.value})}/></label>
                <label className="lab"><span>{t.province}</span><input value={form.il} onChange={e=>setForm({...form,il:e.target.value})}/></label>
                <label className="lab"><span>{t.district}</span><input value={form.ilce} onChange={e=>setForm({...form,ilce:e.target.value})}/></label>
                <div className="sep"/>
                <div className="lab"><strong>🔒 {t.changePwd}</strong></div>
                <label className="lab"><span>Yeni şifre</span><input type="password" value={form.newPwd} onChange={e=>setForm({...form,newPwd:e.target.value})}/></label>
                <label className="lab"><span>Yeni şifre (tekrar)</span><input type="password" value={form.newPwd2} onChange={e=>setForm({...form,newPwd2:e.target.value})}/></label>
                <a className="link" href="/user/profile/security" target="_blank" rel="noreferrer">➡️ {t.goSecurity}</a>
                <div className="row end"><button type="button" className="btn ghost" onClick={()=>setSettingsOpen(false)}>{t.cancel}</button><button className="btn dark" disabled={busy}>{busy?'…':t.save}</button></div>
              </form>
            </div>
          </div>
        )}

        {/* CUSTOMER REVIEW SHEET */}
        {reviewOpen && (
          <div className="sheet" role="dialog" aria-modal="true">
            <div className="sheetCard">
              <div className="sheetHead"><strong>⭐ {t.writeReview}</strong><button className="btn ghost" onClick={()=>setReviewOpen(false)}>✕</button></div>
              <form className="grid" onSubmit={submitReview}>
                <label className="lab"><span>{t.rating}</span>
                  <select value={reviewForm.rating} onChange={e=>setReviewForm({...reviewForm, rating:Number(e.target.value)})}>
                    {[5,4,3,2,1].map(v=>(<option key={v} value={v}>{v}</option>))}
                  </select>
                </label>
                <label className="lab"><span>{t.comment}</span><textarea rows={5} value={reviewForm.text} onChange={e=>setReviewForm({...reviewForm, text:e.target.value})}/></label>
                <div className="row end"><button type="button" className="btn ghost" onClick={()=>setReviewOpen(false)}>{t.close}</button><button className="btn dark">{t.submit}</button></div>
              </form>
            </div>
          </div>
        )}

        {/* FULL‑BLEED LEGAL BLACK PANEL */}
        <footer className="legalBlack">
          <div className="legalRow">
            <a href="/legal/hakkimizda">{t.legal.about}</a>
            <a href="/legal/iletisim">{t.legal.contact}</a>
            <a href="/legal/gizlilik">{t.legal.privacy}</a>
            <a href="/legal/kvkk-aydinlatma">{t.legal.kvkk}</a>
            <a href="/legal/kullanim-sartlari">{t.legal.terms}</a>
            <a href="/legal/mesafeli-satis-sozlesmesi">{t.legal.distance}</a>
            <a href="/legal/teslimat-iade">{t.legal.returns}</a>
            <a href="/legal/cerez-politikasi">{t.legal.cookie}</a>
            <a href="/legal">{t.legal.corp}</a>
            <a href="/">{t.legal.home}</a>
            <span className="copy">{t.legal.copyright}</span>
          </div>
        </footer>
      </SignedIn>

      {/* STYLES */}
      <style jsx>{`
        .wrap{min-height:100vh; padding:16px 14px 120px;}
        .langbox{position:fixed; top:12px; right:12px; z-index:60; background:rgba(255,255,255,.95); border:1px solid #e5e7eb; border-radius:12px; padding:6px 10px; backdrop-filter:blur(8px)}
        .langbox select{border:none; background:transparent; font-weight:700; cursor:pointer}

        .head{max-width:1040px; margin:14px auto; display:grid; gap:14px; grid-template-columns:200px 1fr; background:rgba(255,255,255,.9); border:1px solid #e5e7eb; border-radius:18px; padding:14px}
        @media (max-width:760px){ .head{grid-template-columns:1fr} }
        .avatarBox{display:grid; gap:10px; justify-items:center}
        .ring{padding:6px; border-radius:999px; background:conic-gradient(from 0deg,#ff80ab,#a78bfa,#60a5fa,#34d399,#ff80ab)}
        .ring img{display:block; width:128px; height:128px; object-fit:cover; border-radius:999px; background:#f1f5f9}
        .uploadBtn{font-weight:700; border:1px solid #e5e7eb; background:#fff; padding:8px 12px; border-radius:12px; cursor:pointer}
        .uploadBtn input{display:none}
        .prim .ttl{margin:0 0 8px; font-size:26px}
        .fldRow{display:grid; grid-template-columns:160px 1fr; gap:8px; align-items:center}
        .fldRow label{font-weight:700; color:#111827}
        .val{padding:8px 12px; border-radius:12px; background:#fff; border:1px solid #e5e7eb}
        .tags{margin-top:8px}
        .tag{display:inline-block; padding:6px 10px; border-radius:999px; border:1px solid #e5e7eb; font-weight:800;}
        .tag.dark{background:#111827; color:#fff; border-color:#111827}
        .actions{margin-top:10px}
        .btn{border:1px solid #e5e7eb; background:#fff; color:#111827; border-radius:12px; padding:9px 12px; font-weight:800; cursor:pointer}
        .btn.dark{background:#111827; color:#fff; border-color:#111827}
        .btn.ghost{background:#fff}
        .row{display:flex; gap:10px;}
        .row.end{justify-content:flex-end}
        .gap{gap:10px}
        .msg{margin-top:8px; font-size:13px; background:#f1f5f9; border:1px solid #e5e7eb; padding:6px 10px; border-radius:10px; width:max-content}

        .tabs{max-width:1040px; margin:10px auto; display:flex; gap:8px; background:rgba(255,255,255,.8); border:1px solid #e5e7eb; padding:6px; border-radius:14px}
        .tab{border:none; padding:10px 14px; border-radius:12px; font-weight:800; cursor:pointer}
        .tab.active{background:#111827; color:#fff}

        .card{max-width:1040px; margin:12px auto; background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:14px}
        .ads{display:grid; gap:10px; grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
        .ad{border:1px solid #e5e7eb; border-radius:14px; overflow:hidden; background:#fff}
        .thumb{width:100%; aspect-ratio:4/3; background:#f1f5f9}
        .body{padding:10px}
        .title{margin:0 0 6px; font-size:14px; font-weight:800}

        .bottombar{position:fixed; left:0; right:0; bottom:0; z-index:40; display:flex; justify-content:space-around; gap:8px; padding:10px; background:rgba(255,255,255,.96); border-top:1px solid #e5e7eb; backdrop-filter:blur(10px)}
        .iconbtn{width:44px; height:44px; border:1px solid #e5e7eb; background:#fff; border-radius:12px; cursor:pointer}
        .mini{display:grid; place-items:center; gap:4px; font-size:12px}

        .sheet{position:fixed; inset:0; background:rgba(0,0,0,.35); display:grid; place-items:end center; padding:20px; z-index:60}
        .sheetCard{width:100%; max-width:640px; background:#fff; border:1px solid #e5e7eb; border-radius:16px; overflow:hidden}
        .sheetHead{display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-bottom:1px solid #e5e7eb}
        .grid{display:grid; gap:10px; padding:12px}
        .lab{display:grid; gap:6px}
        input, textarea, select{padding:9px 12px; border:1px solid #e5e7eb; border-radius:12px; font-size:14px; outline:none}

        .legalBlack{margin-top:18px; background:#0b0b0f; color:#fff; width:100vw; margin-left:calc(50% - 50vw);}
        .legalRow{max-width:1200px; margin:0 auto; padding:14px 16px; display:flex; flex-wrap:wrap; gap:10px; align-items:center; justify-content:center}
        .legalBlack a{color:#fff; text-decoration:none; padding:6px 10px; border:1px solid rgba(255,255,255,.2); border-radius:999px}
        .legalBlack .copy{opacity:.8; margin-left:6px}
      `}</style>
    </div>
  );
}

/* ===================== Small UI helpers ===================== */
function Card({children}){ return <section className="card">{children}</section>; }

function AdList({ items, emptyText }){
  if(!items || !items.length){ return <div className="card"><p>{emptyText}</p></div>; }
  return (
    <div className="ads">
      {items.map((a,idx)=>(
        <a key={idx} className="ad" href={a.url||'#'}>
          <div className="thumb" style={a.img?{backgroundImage:`url(${a.img})`,backgroundSize:'cover',backgroundPosition:'center'}:undefined}/>
          <div className="body">
            <h4 className="title">{a.title||'İlan'}</h4>
            <div style={{display:'flex',justifyContent:'space-between',color:'#475569',fontSize:13}}>
              <span>{a.cat||''}</span><b>{a.price||''}</b>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

function OrderList({ items, t, onWriteReview }){
  if(!items || !items.length){ return <p style={{padding:'8px 4px', color:'#475569'}}>{'Henüz sipariş yok.'}</p>; }
  return (
    <div className="orders">
      {items.map((o,idx)=>{
        const status=o.status||'preparing';
        const delivered=status==='delivered';
        return (
          <div key={idx} className="order">
            <div className="oHead">
              <div className="oTitle">{o.title||'Ürün'}</div>
              <div className={`pill ${status}`}>{t.status[status]||status}</div>
            </div>
            <div className="oMeta">
              <b>{o.price||''}</b>
              <span>#{o.code||o.id||''}</span>
              <span>{o.date||''}</span>
            </div>
            <div className="oActions">
              <button className="btn" onClick={()=>location.href=(o.url||'#')}>{t.view}</button>
              {status==='shipped' && <button className="btn" onClick={()=>location.href=(o.trackUrl||'#')}>{t.track}</button>}
              {delivered && <button className="btn" onClick={()=>onWriteReview(o)}>{t.writeReview}</button>}
              <button className="btn ghost" onClick={()=>location.href=(o.refundUrl||'/support/refund')}>{t.refund}</button>
              {delivered && <button className="btn dark" onClick={()=>location.href=(o.reorderUrl||'#')}>{t.reorder}</button>}
            </div>
            <style jsx>{`
              .order{border:1px solid #e5e7eb; border-radius:14px; padding:12px; margin:8px 0; background:#fff}
              .oHead{display:flex; justify-content:space-between; align-items:center}
              .oTitle{font-weight:800}
              .pill{padding:6px 10px; border-radius:999px; font-size:12px; border:1px solid #e5e7eb}
              .pill.preparing{background:#fff7ed}
              .pill.shipped{background:#eff6ff}
              .pill.delivered{background:#ecfdf5}
              .pill.returned{background:#fef2f2}
              .oMeta{display:flex; gap:10px; color:#475569; font-size:13px; margin:6px 0}
              .oActions{display:flex; gap:8px; flex-wrap:wrap}
            `}</style>
          </div>
        );
      })}
    </div>
  );
}

function ReviewList({ items, emptyText, onReply }){
  if(!items || !items.length){ return <p style={{padding:'8px 4px', color:'#475569'}}>{emptyText}</p>; }
  return (
    <div className="reviews">
      {items.map((r,idx)=>(
        <div key={idx} className="rev">
          <div className="row" style={{justifyContent:'space-between'}}>
            <b>{'★'.repeat(r.rating||5)}{'☆'.repeat(Math.max(0,5-(r.rating||5)))}</b>
            <span style={{color:'#475569',fontSize:12}}>{r.date||''}</span>
          </div>
          <p style={{margin:'6px 0'}}>{r.text||''}</p>
          <div className="row"><button className="btn ghost" onClick={()=>onReply(r)}>Yanıtla</button></div>
          <style jsx>{`
            .rev{border:1px solid #e5e7eb; border-radius:12px; padding:10px; margin:8px 0; background:#fff}
          `}</style>
        </div>
      ))}
    </div>
  );
}
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth, useUser, SignedIn, SignedOut } from '@clerk/nextjs';

/* ===================== i18n ===================== */
const SUP = ['tr','en','ar','de'];
const LOCALE = { tr:'Türkçe', en:'English', ar:'العربية', de:'Deutsch' };
const STR = {
  tr:{
    title:'Profil', settings:'Ayarlar', save:'Kaydet', cancel:'Vazgeç', uploading:'Yükleniyor…', saved:'Kaydedildi', error:'Hata oluştu',
    fullName:'Ad Soyad', email:'E‑posta', province:'İl', district:'İlçe', city:'Şehir', username:'Kullanıcı adı',
    changePwd:'Şifreyi Değiştir', goSecurity:'Güvenlik Sayfasına Git',
    sellerTabs:{ live:'Yayındaki', pending:'Onay Bekleyen', expired:'Süresi Dolmuş' },
    noAds:'Henüz ilan yok.',
    kycHead:'Kimlik & Ödeme', kycStart:'KYC Başlat', bankIban:'IBAN / Ödeme Hesabı', ibanAdd:'IBAN Ekle', payoutInfo:'Ödeme bilgisi',
    premiumHead:'Premium Üyelik', premiumGo:'Premium Satın Al', premiumDesc:'Daha fazla ilan ve vitrin görünürlüğü.',
    storeReviews:'Mağaza Yorumları', reply:'Yanıtla', replySend:'Yanıtı Gönder',
    ordersHead:'Siparişlerim', view:'Görüntüle', track:'Kargo Takip', refund:'İade Talebi', reorder:'Tekrar Sipariş',
    writeReview:'Yorum Yaz', rating:'Puan', comment:'Yorum', submit:'Gönder', close:'Kapat',
    status:{ preparing:'Hazırlanıyor', shipped:'Kargoda', delivered:'Teslim edildi', returned:'İade' },
    bottom:{ home:'Ana Sayfa', messages:'Mesajlar', noti:'Bildirimler' },
    legal:{
      corp:'Kurumsal', about:'Hakkımızda', contact:'İletişim', privacy:'Gizlilik', kvkk:'KVKK Aydınlatma', privTerms:'Gizlilik & Kullanım',
      terms:'Kullanım Şartları', distance:'Mesafeli Satış', returns:'Teslimat & İade', cookie:'Çerez Politikası', help:'Yardım', banned:'Yasaklı Ürünler', home:'Ana Sayfa', copyright:'© 2025 Üreten Eller'
    }
  },
  en:{
    title:'Profile', settings:'Settings', save:'Save', cancel:'Cancel', uploading:'Uploading…', saved:'Saved', error:'Something went wrong',
    fullName:'Full Name', email:'Email', province:'Province', district:'District', city:'City', username:'Username',
    changePwd:'Change Password', goSecurity:'Open Security Page',
    sellerTabs:{ live:'Live', pending:'Pending', expired:'Expired' },
    noAds:'No listings.',
    kycHead:'Identity & Payments', kycStart:'Start KYC', bankIban:'IBAN / Payout Account', ibanAdd:'Add IBAN', payoutInfo:'Payout info',
    premiumHead:'Premium Membership', premiumGo:'Buy Premium', premiumDesc:'More listings and showcase visibility.',
    storeReviews:'Store Reviews', reply:'Reply', replySend:'Send Reply',
    ordersHead:'My Orders', view:'View', track:'Track', refund:'Refund', reorder:'Re‑order',
    writeReview:'Write Review', rating:'Rating', comment:'Comment', submit:'Submit', close:'Close',
    status:{ preparing:'Preparing', shipped:'Shipped', delivered:'Delivered', returned:'Returned' },
    bottom:{ home:'Home', messages:'Messages', noti:'Notifications' },
    legal:{
      corp:'Company', about:'About', contact:'Contact', privacy:'Privacy', kvkk:'KVKK Notice', privTerms:'Privacy & Terms',
      terms:'Terms of Use', distance:'Distance Sales', returns:'Shipping & Returns', cookie:'Cookie Policy', help:'Help', banned:'Banned Products', home:'Home', copyright:'© 2025 Ureten Eller'
    }
  },
  ar:{
    title:'الملف الشخصي', settings:'الإعدادات', save:'حفظ', cancel:'إلغاء', uploading:'جارٍ الرفع…', saved:'تم الحفظ', error:'حدث خطأ',
    fullName:'الاسم الكامل', email:'البريد', province:'الولاية', district:'الحي', city:'المدينة', username:'اسم المستخدم',
    changePwd:'تغيير كلمة المرور', goSecurity:'صفحة الأمان',
    sellerTabs:{ live:'منشور', pending:'بانتظار', expired:'منتهي' },
    noAds:'لا توجد إعلانات.',
    kycHead:'الهوية والمدفوعات', kycStart:'بدء التحقق', bankIban:'حساب IBAN', ibanAdd:'إضافة IBAN', payoutInfo:'معلومات الدفع',
    premiumHead:'عضوية بريميوم', premiumGo:'شراء بريميوم', premiumDesc:'إعلانات أكثر وظهور أعلى.',
    storeReviews:'تقيمات المتجر', reply:'رد', replySend:'إرسال الرد',
    ordersHead:'طلباتي', view:'عرض', track:'تتبع', refund:'إرجاع', reorder:'إعادة الطلب',
    writeReview:'اكتب مراجعة', rating:'تقييم', comment:'تعليق', submit:'إرسال', close:'إغلاق',
    status:{ preparing:'قيد التحضير', shipped:'بالشحن', delivered:'تم التسليم', returned:'مُعاد' },
    bottom:{ home:'الرئيسية', messages:'الرسائل', noti:'الإشعارات' },
    legal:{
      corp:'الشركة', about:'من نحن', contact:'اتصال', privacy:'الخصوصية', kvkk:'إشعار KVKK', privTerms:'الخصوصية والشروط',
      terms:'شروط الاستخدام', distance:'البيع عن بعد', returns:'التسليم والإرجاع', cookie:'سياسة الكوكيز', help:'مساعدة', banned:'منتجات محظورة', home:'الرئيسية', copyright:'© 2025 Ureten Eller'
    }
  },
  de:{
    title:'Profil', settings:'Einstellungen', save:'Speichern', cancel:'Abbrechen', uploading:'Lädt…', saved:'Gespeichert', error:'Fehler',
    fullName:'Name', email:'E‑Mail', province:'Bundesland', district:'Bezirk', city:'Stadt', username:'Benutzername',
    changePwd:'Passwort ändern', goSecurity:'Sicherheitsseite',
    sellerTabs:{ live:'Aktiv', pending:'Ausstehend', expired:'Abgelaufen' },
    noAds:'Keine Inserate.',
    kycHead:'Identität & Zahlungen', kycStart:'KYC starten', bankIban:'IBAN / Auszahlung', ibanAdd:'IBAN hinzufügen', payoutInfo:'Auszahlungsinfo',
    premiumHead:'Premium Mitgliedschaft', premiumGo:'Premium kaufen', premiumDesc:'Mehr Inserate & Sichtbarkeit.',
    storeReviews:'Shop‑Bewertungen', reply:'Antworten', replySend:'Antwort senden',
    ordersHead:'Meine Bestellungen', view:'Ansehen', track:'Sendung', refund:'Retoure', reorder:'Nochmal bestellen',
    writeReview:'Bewertung schreiben', rating:'Bewertung', comment:'Kommentar', submit:'Senden', close:'Schließen',
    status:{ preparing:'In Vorbereitung', shipped:'Unterwegs', delivered:'Zugestellt', returned:'Retoure' },
    bottom:{ home:'Start', messages:'Nachrichten', noti:'Benachr.' },
    legal:{
      corp:'Unternehmen', about:'Über uns', contact:'Kontakt', privacy:'Datenschutz', kvkk:'KVKK‑Hinweis', privTerms:'Datenschutz & Nutzg.',
      terms:'Nutzungsbedingungen', distance:'Fernabsatz', returns:'Lieferung & Rückgabe', cookie:'Cookie‑Richtlinie', help:'Hilfe', banned:'Verbotene Produkte', home:'Startseite', copyright:'© 2025 Ureten Eller'
    }
  }
};

function useLang(){
  const [lang,setLang]=useState('tr');
  useEffect(()=>{ try{ const s=localStorage.getItem('lang'); if(s&&SUP.includes(s)) setLang(s);}catch{} },[]);
  useEffect(()=>{ try{ localStorage.setItem('lang',lang); document.documentElement.lang=lang; document.documentElement.dir=(lang==='ar'?'rtl':'ltr'); }catch{} },[lang]);
  const t = useMemo(()=>STR[lang]||STR.tr,[lang]);
  return { t, lang, setLang };
}

/* ===================== PAGE ===================== */
export default function ProfilePage(){
  const { t, lang, setLang } = useLang();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();

  const [settingsOpen,setSettingsOpen]=useState(false);
  const [busy,setBusy]=useState(false);
  const [msg,setMsg]=useState('');

  // Role (kilitli)
  const [role,setRole]=useState(''); // 'seller' | 'customer'
  useEffect(()=>{
    if(!userLoaded||!user) return;
    const meta=(user.unsafeMetadata||user.publicMetadata)||{};
    const r = (meta.role==='seller'||meta.role==='customer')?meta.role:(typeof window!=='undefined'?localStorage.getItem('role')||'customer':'customer');
    setRole(r);
  },[userLoaded,user]);

  // Guard
  useEffect(()=>{ if(!isLoaded) return; if(!isSignedIn) router.replace('/login'); },[isLoaded,isSignedIn,router]);

  // Form
  const [form,setForm]=useState({ fullName:'', username:'', il:'', ilce:'', newPwd:'', newPwd2:'' });
  useEffect(()=>{
    if(!userLoaded||!user) return;
    const meta=(user.unsafeMetadata||user.publicMetadata)||{};
    const savedFull=(typeof window!=='undefined'?localStorage.getItem('full_name')||'':'');
    const savedIl=(typeof window!=='undefined'?localStorage.getItem('il')||'':'');
    const savedIlce=(typeof window!=='undefined'?localStorage.getItem('ilce')||'':'');
    const fn = savedFull || meta.full_name || [user.firstName,user.lastName].filter(Boolean).join(' ');
    setForm(f=>({...f, fullName:fn||'', username:user.username||'', il:savedIl||meta.il||'', ilce:savedIlce||meta.ilce||'', newPwd:'', newPwd2:'' }));
  },[userLoaded,user]);

  const cityStr = useMemo(()=>{
    if(form.il&&form.ilce) return `${form.il}/${form.ilce}`; return form.il||'';
  },[form.il,form.ilce]);

  async function saveSettings(e){
    e.preventDefault(); setBusy(true); setMsg('');
    try{
      const [firstName,...rest]=(form.fullName||'').trim().split(' ');
      const lastName=rest.join(' ');
      await user.update({ username: form.username||undefined, firstName: firstName||undefined, lastName: lastName||undefined, unsafeMetadata:{...((user.unsafeMetadata||user.publicMetadata)||{}), full_name:form.fullName, il:form.il||'', ilce:form.ilce||'', city:cityStr } });
      try{ localStorage.setItem('full_name',form.fullName||''); localStorage.setItem('il',form.il||''); localStorage.setItem('ilce',form.ilce||''); localStorage.setItem('city',cityStr);}catch{}
      if(form.newPwd||form.newPwd2){ if(form.newPwd!==form.newPwd2){ setMsg('Şifreler eşleşmiyor.'); setBusy(false); return; } window.open('/user/profile/security','_blank'); }
      setMsg(t.saved); setSettingsOpen(false);
    }catch(err){ console.error(err); setMsg(t.error);} finally{ setBusy(false); setTimeout(()=>setMsg(''),1200);} }

  // Seller: ilanlar
  const [ads,setAds]=useState({live:[],pending:[],expired:[]});
  useEffect(()=>{ if(role!=='seller') return; (async()=>{ try{ const res=await fetch('/api/ads/my'); if(res.ok){ const d=await res.json(); setAds({ live:d.live||[], pending:d.pending||[], expired:d.expired||[] }); return; } }catch{} try{ const stub=JSON.parse(localStorage.getItem('ads_my')||'{}'); setAds({ live:stub.live||[], pending:stub.pending||[], expired:stub.expired||[] }); }catch{} })(); },[role]);

  // Customer: siparişler
  const [orders,setOrders]=useState([]);
  useEffect(()=>{ if(role!=='customer') return; (async()=>{ try{ const r=await fetch('/api/orders/my?limit=50',{cache:'no-store'}); if(r.ok){ const d=await r.json(); setOrders(Array.isArray(d)?d:[]); return; } }catch{} try{ const stub=JSON.parse(localStorage.getItem('orders_my')||'[]'); setOrders(Array.isArray(stub)?stub:[]);}catch{} })(); },[role]);

  // Yorumlar (seller mağaza yorumları)
  const [storeReviews,setStoreReviews]=useState([]);
  useEffect(()=>{ if(role!=='seller') return; (async()=>{ try{ const r=await fetch('/api/reviews/store'); if(r.ok){ const d=await r.json(); setStoreReviews(Array.isArray(d)?d:[]); return; } }catch{} try{ const stub=JSON.parse(localStorage.getItem('reviews_store')||'[]'); setStoreReviews(Array.isArray(stub)?stub:[]);}catch{} })(); },[role]);

  // UI states
  const [tab,setTab]=useState('live'); // seller ilan sekmesi
  const [reviewOpen,setReviewOpen]=useState(false); // müşteri yorum sheet
  const [reviewForm,setReviewForm]=useState({ orderId:'', rating:5, text:'' });

  function openReviewFor(o){ setReviewForm({ orderId:o.id||o.orderId||'', rating:5, text:'' }); setReviewOpen(true); }
  async function submitReview(e){ e.preventDefault(); try{ const r=await fetch('/api/reviews/submit',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ orderId:reviewForm.orderId, rating:reviewForm.rating, text:reviewForm.text })}); if(r.ok){ alert(t.saved); setReviewOpen(false); setReviewForm({ orderId:'', rating:5, text:'' }); } else { alert(t.error); } }catch{ alert(t.error);} }

  function go(h){ router.push(h); }

  return (
    <div className="wrap">
      {/* Dil seçimi */}
      <div className="langbox">
        <select aria-label="Language" value={lang} onChange={(e)=>setLang(e.target.value)}>{SUP.map(k=>(<option key={k} value={k}>{LOCALE[k]}</option>))}</select>
      </div>

      <SignedOut><p style={{padding:'20px'}}>Yönlendiriliyor…</p></SignedOut>
      <SignedIn>
        {/* HEADER */}
        <section className="head">
          <div className="avatarBox">
            <div className="ring"><img src={user?.imageUrl||'/assets/images/logo.png'} alt="avatar"/></div>
            <label className="uploadBtn">
              {busy ? t.uploading : 'Foto Değiştir'}
              <input type="file" accept="image/*" onChange={async(e)=>{ const file=e.target.files?.[0]; if(!file) return; try{ setBusy(true); setMsg(t.uploading); await user.setProfileImage({ file }); setMsg(t.saved);}catch{ setMsg(t.error);} finally{ setBusy(false); setTimeout(()=>setMsg(''),1200);} }} disabled={busy}/>
            </label>
          </div>

          <div className="prim">
            <h1 className="ttl">{t.title}</h1>
            <div className="fldRow"><label>{t.fullName}</label><div className="val">{form.fullName||'—'}</div></div>
            <div className="fldRow"><label>{t.email}</label><div className="val">{user?.primaryEmailAddress?.emailAddress||'—'}</div></div>
            <div className="fldRow"><label>{t.city}</label><div className="val">{cityStr||'—'}</div></div>
            <div className="tags"><span className={role==='seller'?'tag dark':'tag'}>{role||'—'}</span></div>
            <div className="actions"><button className="btn" onClick={()=>setSettingsOpen(true)}>⚙️ {t.settings}</button></div>
            {msg && <div className="msg">{msg}</div>}
          </div>
        </section>

        {/* ROLE CONTENT */}
        {role==='seller' ? (
          <>
            {/* Seller Tabs */}
            <div className="tabs">{['live','pending','expired'].map(k=>(<button key={k} className={tab===k?'tab active':'tab'} onClick={()=>setTab(k)}>{t.sellerTabs[k]}</button>))}</div>

            <Card><h3>📦 {t.sellerTabs[tab]}</h3><AdList items={ads[tab]} emptyText={t.noAds}/></Card>

            <Card>
              <h3>🪪 {t.kycHead}</h3>
              <div className="row gap">
                <button className="btn dark" onClick={()=>go('/api/kyc/start')}>{t.kycStart}</button>
                <button className="btn" onClick={()=>go('/api/kyc/iban-start')}>{t.ibanAdd}</button>
                <button className="btn" onClick={()=>go('/portal/seller/payout')}>{t.payoutInfo}</button>
              </div>
            </Card>

            <Card>
              <h3>✨ {t.premiumHead}</h3>
              <p>{t.premiumDesc}</p>
              <button className="btn dark" onClick={()=>go('/api/billing/checkout?plan=premium')}>{t.premiumGo}</button>
            </Card>

            <Card>
              <h3>⭐ {t.storeReviews}</h3>
              <ReviewList items={storeReviews} emptyText={'Henüz yorum yok.'} onReply={(rev)=>{
                const reply=prompt('Yanıtınız:'); if(!reply) return; fetch('/api/reviews/reply',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ reviewId:rev.id, reply })});
              }}/>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <h3>🧾 {t.ordersHead}</h3>
              <OrderList items={orders} t={t} onWriteReview={openReviewFor}/>
            </Card>
          </>
        )}

        {/* Bottom action bar */}
        <nav className="bottombar">
          <div className="mini"><button className="iconbtn" onClick={()=>go('/home.html')}>🏠</button><span>{t.bottom.home}</span></div>
          <div className="mini"><button className="iconbtn" onClick={()=>go('/messages')}>💬</button><span>{t.bottom.messages}</span></div>
          <div className="mini"><button className="iconbtn" onClick={()=>go('/notifications')}>🔔</button><span>{t.bottom.noti}</span></div>
        </nav>

        {/* SETTINGS SHEET */}
        {settingsOpen && (
          <div className="sheet" role="dialog" aria-modal="true">
            <div className="sheetCard">
              <div className="sheetHead"><strong>⚙️ {t.settings}</strong><button className="btn ghost" onClick={()=>setSettingsOpen(false)}>✕</button></div>
              <form className="grid" onSubmit={saveSettings}>
                <label className="lab"><span>{t.fullName}</span><input value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})}/></label>
                <label className="lab"><span>{t.username}</span><input value={form.username} onChange={e=>setForm({...form,username:e.target.value})}/></label>
                <label className="lab"><span>{t.province}</span><input value={form.il} onChange={e=>setForm({...form,il:e.target.value})}/></label>
                <label className="lab"><span>{t.district}</span><input value={form.ilce} onChange={e=>setForm({...form,ilce:e.target.value})}/></label>
                <div className="sep"/>
                <div className="lab"><strong>🔒 {t.changePwd}</strong></div>
                <label className="lab"><span>Yeni şifre</span><input type="password" value={form.newPwd} onChange={e=>setForm({...form,newPwd:e.target.value})}/></label>
                <label className="lab"><span>Yeni şifre (tekrar)</span><input type="password" value={form.newPwd2} onChange={e=>setForm({...form,newPwd2:e.target.value})}/></label>
                <a className="link" href="/user/profile/security" target="_blank" rel="noreferrer">➡️ {t.goSecurity}</a>
                <div className="row end"><button type="button" className="btn ghost" onClick={()=>setSettingsOpen(false)}>{t.cancel}</button><button className="btn dark" disabled={busy}>{busy?'…':t.save}</button></div>
              </form>
            </div>
          </div>
        )}

        {/* CUSTOMER REVIEW SHEET */}
        {reviewOpen && (
          <div className="sheet" role="dialog" aria-modal="true">
            <div className="sheetCard">
              <div className="sheetHead"><strong>⭐ {t.writeReview}</strong><button className="btn ghost" onClick={()=>setReviewOpen(false)}>✕</button></div>
              <form className="grid" onSubmit={submitReview}>
                <label className="lab"><span>{t.rating}</span>
                  <select value={reviewForm.rating} onChange={e=>setReviewForm({...reviewForm, rating:Number(e.target.value)})}>
                    {[5,4,3,2,1].map(v=>(<option key={v} value={v}>{v}</option>))}
                  </select>
                </label>
                <label className="lab"><span>{t.comment}</span><textarea rows={5} value={reviewForm.text} onChange={e=>setReviewForm({...reviewForm, text:e.target.value})}/></label>
                <div className="row end"><button type="button" className="btn ghost" onClick={()=>setReviewOpen(false)}>{t.close}</button><button className="btn dark">{t.submit}</button></div>
              </form>
            </div>
          </div>
        )}

        {/* FULL‑BLEED LEGAL BLACK PANEL */}
        <footer className="legalBlack">
          <div className="legalRow">
            <a href="/legal/hakkimizda">{t.legal.about}</a>
            <a href="/legal/iletisim">{t.legal.contact}</a>
            <a href="/legal/gizlilik">{t.legal.privacy}</a>
            <a href="/legal/kvkk-aydinlatma">{t.legal.kvkk}</a>
            <a href="/legal/kullanim-sartlari">{t.legal.terms}</a>
            <a href="/legal/mesafeli-satis-sozlesmesi">{t.legal.distance}</a>
            <a href="/legal/teslimat-iade">{t.legal.returns}</a>
            <a href="/legal/cerez-politikasi">{t.legal.cookie}</a>
            <a href="/legal">{t.legal.corp}</a>
            <a href="/">{t.legal.home}</a>
            <span className="copy">{t.legal.copyright}</span>
          </div>
        </footer>
      </SignedIn>

      {/* STYLES */}
      <style jsx>{`
        .wrap{min-height:100vh; padding:16px 14px 120px;}
        .langbox{position:fixed; top:12px; right:12px; z-index:60; background:rgba(255,255,255,.95); border:1px solid #e5e7eb; border-radius:12px; padding:6px 10px; backdrop-filter:blur(8px)}
        .langbox select{border:none; background:transparent; font-weight:700; cursor:pointer}

        .head{max-width:1040px; margin:14px auto; display:grid; gap:14px; grid-template-columns:200px 1fr; background:rgba(255,255,255,.9); border:1px solid #e5e7eb; border-radius:18px; padding:14px}
        @media (max-width:760px){ .head{grid-template-columns:1fr} }
        .avatarBox{display:grid; gap:10px; justify-items:center}
        .ring{padding:6px; border-radius:999px; background:conic-gradient(from 0deg,#ff80ab,#a78bfa,#60a5fa,#34d399,#ff80ab)}
        .ring img{display:block; width:128px; height:128px; object-fit:cover; border-radius:999px; background:#f1f5f9}
        .uploadBtn{font-weight:700; border:1px solid #e5e7eb; background:#fff; padding:8px 12px; border-radius:12px; cursor:pointer}
        .uploadBtn input{display:none}
        .prim .ttl{margin:0 0 8px; font-size:26px}
        .fldRow{display:grid; grid-template-columns:160px 1fr; gap:8px; align-items:center}
        .fldRow label{font-weight:700; color:#111827}
        .val{padding:8px 12px; border-radius:12px; background:#fff; border:1px solid #e5e7eb}
        .tags{margin-top:8px}
        .tag{display:inline-block; padding:6px 10px; border-radius:999px; border:1px solid #e5e7eb; font-weight:800;}
        .tag.dark{background:#111827; color:#fff; border-color:#111827}
        .actions{margin-top:10px}
        .btn{border:1px solid #e5e7eb; background:#fff; color:#111827; border-radius:12px; padding:9px 12px; font-weight:800; cursor:pointer}
        .btn.dark{background:#111827; color:#fff; border-color:#111827}
        .btn.ghost{background:#fff}
        .row{display:flex; gap:10px;}
        .row.end{justify-content:flex-end}
        .gap{gap:10px}
        .msg{margin-top:8px; font-size:13px; background:#f1f5f9; border:1px solid #e5e7eb; padding:6px 10px; border-radius:10px; width:max-content}

        .tabs{max-width:1040px; margin:10px auto; display:flex; gap:8px; background:rgba(255,255,255,.8); border:1px solid #e5e7eb; padding:6px; border-radius:14px}
        .tab{border:none; padding:10px 14px; border-radius:12px; font-weight:800; cursor:pointer}
        .tab.active{background:#111827; color:#fff}

        .card{max-width:1040px; margin:12px auto; background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:14px}
        .ads{display:grid; gap:10px; grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
        .ad{border:1px solid #e5e7eb; border-radius:14px; overflow:hidden; background:#fff}
        .thumb{width:100%; aspect-ratio:4/3; background:#f1f5f9}
        .body{padding:10px}
        .title{margin:0 0 6px; font-size:14px; font-weight:800}

        .bottombar{position:fixed; left:0; right:0; bottom:0; z-index:40; display:flex; justify-content:space-around; gap:8px; padding:10px; background:rgba(255,255,255,.96); border-top:1px solid #e5e7eb; backdrop-filter:blur(10px)}
        .iconbtn{width:44px; height:44px; border:1px solid #e5e7eb; background:#fff; border-radius:12px; cursor:pointer}
        .mini{display:grid; place-items:center; gap:4px; font-size:12px}

        .sheet{position:fixed; inset:0; background:rgba(0,0,0,.35); display:grid; place-items:end center; padding:20px; z-index:60}
        .sheetCard{width:100%; max-width:640px; background:#fff; border:1px solid #e5e7eb; border-radius:16px; overflow:hidden}
        .sheetHead{display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-bottom:1px solid #e5e7eb}
        .grid{display:grid; gap:10px; padding:12px}
        .lab{display:grid; gap:6px}
        input, textarea, select{padding:9px 12px; border:1px solid #e5e7eb; border-radius:12px; font-size:14px; outline:none}

        .legalBlack{margin-top:18px; background:#0b0b0f; color:#fff; width:100vw; margin-left:calc(50% - 50vw);}
        .legalRow{max-width:1200px; margin:0 auto; padding:14px 16px; display:flex; flex-wrap:wrap; gap:10px; align-items:center; justify-content:center}
        .legalBlack a{color:#fff; text-decoration:none; padding:6px 10px; border:1px solid rgba(255,255,255,.2); border-radius:999px}
        .legalBlack .copy{opacity:.8; margin-left:6px}
      `}</style>
    </div>
  );
}

/* ===================== Small UI helpers ===================== */
function Card({children}){ return <section className="card">{children}</section>; }

function AdList({ items, emptyText }){
  if(!items || !items.length){ return <div className="card"><p>{emptyText}</p></div>; }
  return (
    <div className="ads">
      {items.map((a,idx)=>(
        <a key={idx} className="ad" href={a.url||'#'}>
          <div className="thumb" style={a.img?{backgroundImage:`url(${a.img})`,backgroundSize:'cover',backgroundPosition:'center'}:undefined}/>
          <div className="body">
            <h4 className="title">{a.title||'İlan'}</h4>
            <div style={{display:'flex',justifyContent:'space-between',color:'#475569',fontSize:13}}>
              <span>{a.cat||''}</span><b>{a.price||''}</b>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

function OrderList({ items, t, onWriteReview }){
  if(!items || !items.length){ return <p style={{padding:'8px 4px', color:'#475569'}}>{'Henüz sipariş yok.'}</p>; }
  return (
    <div className="orders">
      {items.map((o,idx)=>{
        const status=o.status||'preparing';
        const delivered=status==='delivered';
        return (
          <div key={idx} className="order">
            <div className="oHead">
              <div className="oTitle">{o.title||'Ürün'}</div>
              <div className={`pill ${status}`}>{t.status[status]||status}</div>
            </div>
            <div className="oMeta">
              <b>{o.price||''}</b>
              <span>#{o.code||o.id||''}</span>
              <span>{o.date||''}</span>
            </div>
            <div className="oActions">
              <button className="btn" onClick={()=>location.href=(o.url||'#')}>{t.view}</button>
              {status==='shipped' && <button className="btn" onClick={()=>location.href=(o.trackUrl||'#')}>{t.track}</button>}
              {delivered && <button className="btn" onClick={()=>onWriteReview(o)}>{t.writeReview}</button>}
              <button className="btn ghost" onClick={()=>location.href=(o.refundUrl||'/support/refund')}>{t.refund}</button>
              {delivered && <button className="btn dark" onClick={()=>location.href=(o.reorderUrl||'#')}>{t.reorder}</button>}
            </div>
            <style jsx>{`
              .order{border:1px solid #e5e7eb; border-radius:14px; padding:12px; margin:8px 0; background:#fff}
              .oHead{display:flex; justify-content:space-between; align-items:center}
              .oTitle{font-weight:800}
              .pill{padding:6px 10px; border-radius:999px; font-size:12px; border:1px solid #e5e7eb}
              .pill.preparing{background:#fff7ed}
              .pill.shipped{background:#eff6ff}
              .pill.delivered{background:#ecfdf5}
              .pill.returned{background:#fef2f2}
              .oMeta{display:flex; gap:10px; color:#475569; font-size:13px; margin:6px 0}
              .oActions{display:flex; gap:8px; flex-wrap:wrap}
            `}</style>
          </div>
        );
      })}
    </div>
  );
}

function ReviewList({ items, emptyText, onReply }){
  if(!items || !items.length){ return <p style={{padding:'8px 4px', color:'#475569'}}>{emptyText}</p>; }
  return (
    <div className="reviews">
      {items.map((r,idx)=>(
        <div key={idx} className="rev">
          <div className="row" style={{justifyContent:'space-between'}}>
            <b>{'★'.repeat(r.rating||5)}{'☆'.repeat(Math.max(0,5-(r.rating||5)))}</b>
            <span style={{color:'#475569',fontSize:12}}>{r.date||''}</span>
          </div>
          <p style={{margin:'6px 0'}}>{r.text||''}</p>
          <div className="row"><button className="btn ghost" onClick={()=>onReply(r)}>Yanıtla</button></div>
          <style jsx>{`
            .rev{border:1px solid #e5e7eb; border-radius:12px; padding:10px; margin:8px 0; background:#fff}
          `}</style>
        </div>
      ))}
    </div>
  );
}
