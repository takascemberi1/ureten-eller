// middleware.js  (Clerk + lang redirect together)
import { NextResponse } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';

const SUP = ['tr','en','ar','de'];

export default clerkMiddleware((auth, req) => {
  const url = req.nextUrl;
  const pathname = url.pathname || '/';
  const hasLang = url.searchParams.has('lang');

  // cookie -> lang
  const ck = req.cookies.get('lang')?.value?.toLowerCase() || '';
  const lang = SUP.includes(ck) ? ck : 'tr';

  // /legal ve altları: lang yoksa ekle
  if (pathname.startsWith('/legal') && !hasLang) {
    url.searchParams.set('lang', lang);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // static & assetleri hariç tut
    '/((?!_next/static|_next/image|favicon.ico|assets|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};
