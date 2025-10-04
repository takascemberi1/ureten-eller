'use client'

/**
 * app/layout.jsx — Global Layout (fix: useSearchParams sadece Suspense içinde)
 * - Dil seçici (TR/EN/AR/DE)
 * - URL ?lang ↔ localStorage senkron
 * - <html dir/lang> otomatik (AR = rtl)
 * - Mevcut query parametreleri korunur
 * - useSearchParams kullanan her şey <Suspense> içinde
 */

import { useEffect, useMemo, Suspense } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const SUP = ['tr', 'en', 'ar', 'de']

/* ---------- Hook ---------- */
function useLangFromUrl() {
  const sp = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // URL > localStorage > 'tr'
  const lang = useMemo(() => {
    const urlL = (sp.get('lang') || '').toLowerCase()
    if (SUP.includes(urlL)) return urlL
    if (typeof window !== 'undefined') {
      const ls = (window.localStorage?.getItem('lang') || '').toLowerCase()
      if (SUP.includes(ls)) return ls
    }
    return 'tr'
  }, [sp])

  // <html lang/dir>
  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  // URL'de lang yoksa ekle; diğer query'leri koru
  useEffect(() => {
    const urlL = (sp.get('lang') || '').toLowerCase()
    if (!SUP.includes(urlL)) {
      const params = new URLSearchParams(sp.toString())
      params.set('lang', lang)
      router.replace(`${pathname}?${params.toString()}`)
    }
    try { window.localStorage.setItem('lang', lang) } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  return lang
}

/* ---------- Suspense içinde çalışan boot bileşeni ---------- */
function LangBoot() {
  useLangFromUrl()
  return null
}

/* ---------- Dil seçici (Suspense içinde render edilecek) ---------- */
function LangSelect() {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()
  const lang = useLangFromUrl()

  function onChange(e) {
    const val = (e.target.value || 'tr').toLowerCase()
    const params = new URLSearchParams(sp.toString())
    params.set('lang', val)
    try { window.localStorage.setItem('lang', val) } catch {}
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span role="img" aria-label="language">🌐</span>
      <select
        value={lang}
        onChange={onChange}
        aria-label="Language"
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: 10,
          padding: '6px 10px',
          background: '#fff',
          fontWeight: 700,
        }}
      >
        <option value="tr">Türkçe</option>
        <option value="en">English</option>
        <option value="ar">العربية</option>
        <option value="de">Deutsch</option>
      </select>
    </label>
  )
}

/* ---------- Root Layout ---------- */
export default function RootLayout({ children }) {
  // DİKKAT: Artık burada hook çağrısı yok!
  // useSearchParams kullanan her şey Suspense içine taşındı.

  return (
    <html>
      <body
        style={{
          margin: 0,
          fontFamily:
            'system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial,sans-serif',
          color: '#0f172a',
          background: '#fff',
        }}
      >
        {/* Lang senkronizasyonu (URL/localStorage/html dir) */}
        <Suspense fallback={null}>
          <LangBoot />
        </Suspense>

        <header style={bar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
              src="/assets/images/logo.png"
              alt="logo"
              width={28}
              height={28}
              style={{ borderRadius: 8 }}
            />
            <strong>Üreten Eller</strong>
          </div>
          <div style={{ flex: 1 }} />
          <Suspense fallback={null}>
            <LangSelect />
          </Suspense>
        </header>

        <main style={{ minHeight: 'calc(100dvh - 56px)', padding: '12px' }}>
          {children}
        </main>

        <footer style={foot}>
          <small>© {new Date().getFullYear()} Üreten Eller</small>
        </footer>
      </body>
    </html>
  )
}

const bar = {
  position: 'sticky',
  top: 0,
  zIndex: 40,
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 12px',
  borderBottom: '1px solid #e5e7eb',
  background: 'rgba(255,255,255,.92)',
  backdropFilter: 'blur(8px)',
}

const foot = {
  borderTop: '1px solid #e5e7eb',
  padding: '10px 12px',
  background: '#fff',
}

// İsteğe bağlı: tamamını client’ta tutmak istersen açabilirsin
// export const dynamic = 'force-dynamic'
