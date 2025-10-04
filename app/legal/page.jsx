'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LegalIndexRedirect() {
  const router = useRouter()
  const sp = useSearchParams()

  useEffect(() => {
    let lang = sp?.get('lang') || 'tr'
    if (typeof window !== 'undefined') {
      const ls = localStorage.getItem('lang')
      if (!sp?.get('lang') && ls) lang = ls
      try { localStorage.setItem('lang', lang) } catch {}
    }
    router.replace(`/legal/gizlilik?lang=${encodeURIComponent(lang)}`)
  }, [router, sp])

  return null
}

// build sırasında SSR yapma, client’te çalıştır:
export const dynamic = 'force-dynamic'
