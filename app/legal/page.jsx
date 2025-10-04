'use client'

// app/legal/page.jsx — /legal açıldığında /legal/gizlilik?lang=... adresine yönlendirir
// Lang önceliği: URL ?lang -> localStorage 'lang' -> 'tr'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LegalIndexRedirect(){
  const router = useRouter()
  const sp = useSearchParams()

  useEffect(() => {
    // URL'den lang al, yoksa localStorage, o da yoksa 'tr'
    let lang = sp.get('lang') || 'tr'
    if (typeof window !== 'undefined'){
      const ls = window.localStorage?.getItem('lang')
      if (!sp.get('lang') && ls) lang = ls
      // Son değeri localStorage'a da yazalım (tekilleştirme)
      try{ window.localStorage.setItem('lang', lang) }catch{}
    }
    // /legal/gizlilik'e yönlendir (replace: history kirletmesin)
    router.replace(`/legal/gizlilik?lang=${encodeURIComponent(lang)}`)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
