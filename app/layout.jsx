// app/legal/layout.jsx
'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const SUP = ['tr','en','ar','de'];

function useLang() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLang] = useState('tr');

  // URL > cookie > default
  useEffect(() => {
    const q = (sp.get('lang') || '').toLowerCase();
    if (SUP.includes(q)) {
      setLang(q);
      document.cookie = `lang=${q}; path=/; max-age=${60*60*24*365}`;
    } else {
      // URL yoksa cookie deneyelim (middleware genelde ekleyecek ama yine de)
      const ck = (document.cookie || '').split(';').map(s=>s.trim()).find(s=>s.startsWith('lang='));
      const cv = ck ? ck.split('=')[1] : '';
      const val = SUP.includes(cv) ? cv : 'tr';
      setLang(val);
      const params = new URLSearchParams(sp.toString());
      params.set('lang', val);
      router.replace(`${pathname}?${params.toString()}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp, pathname]);

  const set = (next) => {
    const val = SUP.includes(next) ? next : 'tr';
    const params = new URLSearchParams(sp.toString());
    params.set('lang', val);
    document.cookie = `lang=${val}; path=/; max-age=${60*60*24*365}`;
    router.replace(`${pathname}?${params.toString()}`);
    setLang(val);
  };

  return { lang, setLang: set };
}

function TopBar() {
  const { lang, setLang } = useLang();
  const router = useRouter();

  return (
    <header style={{
      position:'sticky', top:0, zIndex:50, display:'flex', alignItems:'center', gap:8,
      padding:'10px 14px', backdropFilter:'blur(10px)',
      background:'rgba(255,255,255,.86)', borderBottom:'1px solid rgba(0,0,0,.08)'
    }}>
      <div style={{display:'flex', alignItems:'center', gap:10, fontWeight:800}}>
        <img src="/assets/images/logo.png" width={28} height={28} style={{borderRadius:8}} alt="logo"/>
        <span>Üreten Eller</span>
      </div>
      <div style={{flex:1}}/>
      <nav style={{display:'flex', gap:8, alignItems:'center'}}>
        <button onClick={()=>router.push('/?lang='+lang)} style={btn}>🏠 <span>Home</span></button>
        <div style={{display:'flex', alignItems:'center', gap:6, border:'1px solid #e5e7eb', background:'#fff', borderRadius:12, padding:'4px 8px'}}>
          <span>🌐</span>
          <select
            aria-label="Language"
            value={lang}
            onChange={e=>setLang(e.target.value)}
            style={{border:'none', background:'transparent', fontWeight:700, cursor:'pointer'}}
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
            <option value="ar">العربية</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </nav>
    </header>
  );
}

const btn = {
  border:'1px solid #e5e7eb',
  background:'#fff',
  color:'#111827',
  borderRadius:12,
  padding:'8px 12px',
  fontWeight:700,
  cursor:'pointer'
};

export default function LegalLayout({ children }) {
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
        .card{max-width:1100px; margin:12px auto; background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:14px}
        .links{display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin:18px auto 28px; max-width:1100px}
        .links a{border:1px solid #e5e7eb; background:#fff; color:#111827; border-radius:999px; padding:8px 12px; font-weight:700; text-decoration:none}
      `}</style>

      <TopBar/>

      {/* CSR-bailout kullanan sayfa parçaları için Suspense şart */}
      <Suspense fallback={<div className="card">Loading…</div>}>
        {children}
      </Suspense>
    </div>
  );
}
