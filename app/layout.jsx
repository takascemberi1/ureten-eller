'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function Redirector() {
  const router = useRouter()
  const sp = useSearchParams()

  useEffect(() => {
    let lang = sp.get('lang') || 'tr'
    if (typeof window !== 'undefined') {
      const ls = window.localStorage?.getItem('lang')
      if (!sp.get('lang') && ls) lang = ls
      try { window.localStorage.setItem('lang', lang) } catch {}
    }
    router.replace(`/legal/gizlilik?lang=${encodeURIComponent(lang)}`)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export default function LegalIndexRedirect() {
  return (
    <Suspense fallback={null}>
      <Redirector />
    </Suspense>
  )
}

// (İstersen statik üretimi kapatmak için aşağıyı da ekleyebilirsin)
// export const dynamic = 'force-dynamic'
