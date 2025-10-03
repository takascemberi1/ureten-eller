// app/layout.jsx
"use client";
import { ClerkProvider, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";

function HeaderNav() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role || "customer"; // default müşteri

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
        Üreten Eller
      </Link>

      <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {/* Sadece Üreten El “İlan Ver” görebilir */}
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
            İlan Ver
          </Link>
        )}

        {/* Giriş / Çıkış linkleri */}
        <SignedOut>
          <Link
            href="/login?role=customer"
            style={{ textDecoration: "none", color: "#111827" }}
          >
            Giriş
          </Link>
          <Link
            href="/register?role=customer"
            style={{ textDecoration: "none", color: "#111827" }}
          >
            Kayıt
          </Link>
        </SignedOut>

        <SignedIn>
          {role === "seller" ? (
            <Link
              href="/portal/seller"
              style={{ textDecoration: "none", color: "#111827" }}
            >
              Portal
            </Link>
          ) : (
            <Link
              href="/portal/customer"
              style={{ textDecoration: "none", color: "#111827" }}
            >
              Portal
            </Link>
          )}
          <Link
            href="/sign-out"
            style={{ textDecoration: "none", color: "#111827" }}
          >
            Çıkış
          </Link>
        </SignedIn>
      </nav>
    </header>
  );
}

export default function RootLayout({ children }) {
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
