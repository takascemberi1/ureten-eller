// app/layout.jsx
"use client";
import { ClerkProvider, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useLang } from "../components/LanguageProvider";

/**
 * Dikkat: Bu dosya mevcut LanguageProvider'ını kullanır.
 * Header metinleri için lokal kısa çeviri tablosu ekledim
 * — böylece 4 dili bozmadan çalışır.
 */

function HeaderNav() {
  const { user } = useUser();
  const { lang, t } = useLang(); // senin i18n hook'unu kullanıyoruz
  const role = user?.publicMetadata?.role || "customer";

  // Header'da kullanacağımız ek metinler (LanguageProvider'da olmayabilir),
  // burada her dil için açıkça veriyoruz — mevcut i18n'i bozmaz.
  const LABELS = {
    tr: { postAd: "İlan Ver", portal: "Portal", logout: "Çıkış", login: t.signIn || "Giriş", register: t.signUp || "Kayıt" },
    en: { postAd: "Post Ad", portal: "Portal", logout: "Sign out", login: t.signIn || "Sign In", register: t.signUp || "Sign Up" },
    ar: { postAd: "إضافة إعلان", portal: "البوابة", logout: "تسجيل الخروج", login: t.signIn || "تسجيل الدخول", register: t.signUp || "إنشاء حساب" },
    de: { postAd: "Anzeige erstellen", portal: "Portal", logout: "Abmelden", login: t.signIn || "Anmelden", register: t.signUp || "Registrieren" },
  };
  const L = LABELS[lang] || LABELS.tr;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link
        href="/"
        style={{ fontWeight: 800, textDecoration: "none", color: "#111827" }}
      >
        {t.brand || "Üreten Eller"}
      </Link>

      <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {/* Sadece Üreten El (seller) “İlan Ver” görebilir */}
        {role === "seller" && (
          <Link
            href="/ads/new"
            style={{
              padding: "8px 12px",
              borderRadius: 12,
              background: "#111827",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            {L.postAd}
          </Link>
        )}

        {/* Giriş / Kayıt (oturum açılmamışsa) */}
        <SignedOut>
          <Link href="/login?role=customer" style={{ textDecoration: "none", color: "#111827" }}>
            {L.login}
          </Link>
          <Link href="/register?role=customer" style={{ textDecoration: "none", color: "#111827" }}>
            {L.register}
          </Link>
        </SignedOut>

        {/* Oturum açıkken portal + çıkış */}
        <SignedIn>
          <Link
            href={role === "seller" ? "/portal/seller" : "/portal/customer"}
            style={{ textDecoration: "none", color: "#111827" }}
          >
            {L.portal}
          </Link>

          <Link href="/sign-out" style={{ textDecoration: "none", color: "#111827" }}>
            {L.logout}
          </Link>
        </SignedIn>
      </nav>
    </header>
  );
}

export default function RootLayout({ children }) {
  // ClerkProvider için publishableKey zaten pages/_app.jsx içinde ayarlı — burada da global davranış için boş bırakıyorum.
  return (
    <ClerkProvider>
      <html lang="tr">
        <body style={{ margin: 0 }}>
          <HeaderNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
