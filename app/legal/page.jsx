'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

// Sadece client'ta çalışan küçük bileşen
function Redirector() {
  const router = useRouter()
  const sp = useSearchParams()

  useEffect(() => {
    // URL > localStorage > 'tr'
    let lang = sp?.get('lang') || 'tr'
    if (typeof window !== 'undefined') {
      const ls = localStorage.getItem('lang')
      if (!sp?.get('lang') && ls) lang = ls
      try { localStorage.setItem('lang', lang) } catch {}
    }

    // /legal/gizlilik?lang=...
    router.replace(`/legal/gizlilik?lang=${encodeURIComponent(lang)}`)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export default function LegalIndexRedirect() {
  // useSearchParams kullanan bileşeni Suspense içine alıyoruz
  return (
    <Suspense fallback={null}>
      <Redirector />
    </Suspense>
  )
}

// Bu sayfayı prerender/SSG etmeye çalışma; client'ta çalışsın
export const dynamic = 'force-dynamic'
export const revalidate = 0
