// app/legal/page.jsx — Server Component
import { redirect } from 'next/navigation';

const SUP = ['tr','en','ar','de'];

export const dynamic = 'force-dynamic';

export default function LegalIndexPage({ searchParams }) {
  const q = searchParams || {};
  const langQ = typeof q.lang === 'string' ? q.lang.toLowerCase() : '';
  const lang = SUP.includes(langQ) ? langQ : 'tr';
  redirect(`/legal/gizlilik?lang=${encodeURIComponent(lang)}`);
}
