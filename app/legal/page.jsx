// app/legal/page.jsx  — SERVER COMPONENT (no "use client")

import { redirect } from 'next/navigation'

const SUP = ['tr','en','ar','de']

export const dynamic = 'force-dynamic' // statik üretimi kapat, istek anında çalışsın

export default function LegalIndexPage({ searchParams }) {
  const q = searchParams || {}
  const langQ = typeof q.lang === 'string' ? q.lang.toLowerCase() : ''
  const lang = SUP.includes(langQ) ? langQ : 'tr'

  // /legal açılınca /legal/gizlilik?lang=... adresine yönlendir
  redirect(`/legal/gizlilik?lang=${encodeURIComponent(lang)}`)
}
