'use client';

import { Suspense, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const SUP = ['tr','en','ar','de'];

function useLang() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLang] = useState('tr');

  useEffect(() => {
    const q = (sp.get('lang') || '').toLowerCase();
    if (SUP.includes(q)) {
      setLang(q);
      document.cookie = `lang=${q}; path=/; max-age=${60*60*24*365}`;
    } else {
      // URL’de yoksa cookie’den tamamla
      const ck = (document.cookie || '').split(';').map(s=>s.trim()).find(s=>s.startsWith('lang='));
      const cv = ck ? ck.split('=')[1] : '';
      const val = SUP.includes(cv) ? cv : 'tr';
      const params = new URLSearchParams(sp.toString());
      params.set('lang', val);
      router.replace(`${pathname}?${params.toString()}`);
      setLang(val);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp, pathname]);

  const change = (val) => {
    const v = SUP.includes(val) ? val : 'tr';
    const params = new URLSearchParams(sp.toString());
    params.set('lang', v);
    document.cookie = `lang=${v}; path=/; max-age=${60*60*24*365}`;
    router.replace(`${pathname}?${params.toString()}`);
    setLang(v);
  };

  return { lang, change };
}

export default function LegalLayout({ children }) {
  const { lang, change } = useLang();

  return (
    <div style={{
      minHeight:'100vh',
      background: `radial-gradient(1000px 700px at -10% -10%, rgba(255,255,255,.35), transparent 60%),
                   linear-gradient(120deg,#ff80ab,#a78bfa,#60a5fa,#34d399)`,
      backgroundSize:'320% 320%',
      animation:'drift 16s ease-in-out infinite'
    }}>
      <style>{`
        @keyframes drift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .top{position:sticky;top:0;z-index:50;display:flex;gap:8px;align-items:center;padding:10px 14px;background:rgba(255,255,255,.86);backdrop-filter:blur(10px);border-bottom:1px solid rgba(0,0,0,.08)}
        .grow{flex:1}
        .btn{border:1px solid #e5e7eb;background:#fff;border-radius:12px;padding:8px 12px;font-weight:700;cursor:pointer}
        .card{max-width:1100px;margin:12px auto;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:14px}
        .links{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:18px auto 28px;max-width:1100px}
        .links a{border:1px solid #e5e7eb;background:#fff;color:#111827;border-radius:999px;padding:8px 12px;font-weight:700;text-decoration:none}
      `}</style>

      <div className="top">
        <div style={{display:'flex',alignItems:'center',gap:10,fontWeight:800}}>
          <img src="/assets/images/logo.png" width={28} height={28} style={{borderRadius:8}} alt="logo"/>
          <span>Üreten Eller</span>
        </div>
        <div className="grow"/>
        <button className="btn" onClick={()=>location.href='/?lang='+lang}>🏠 <span>Home</span></button>
        <div style={{display:'flex',alignItems:'center',gap:6,border:'1px solid #e5e7eb',background:'#fff',borderRadius:12,padding:'4px 8px'}}>
          <span>🌐</span>
          <select aria-label="Language" value={lang} onChange={e=>change(e.target.value)} style={{border:'none',background:'transparent',fontWeight:700,cursor:'pointer'}}>
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
            <option value="ar">العربية</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </div>

      {/* useSearchParams kullanan çocuklar için Suspense şart */}
      <Suspense fallback={<div className="card">Loading…</div>}>
        {children}
      </Suspense>
    </div>
  );
}
