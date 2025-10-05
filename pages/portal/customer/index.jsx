// pages/portal/customer/index.jsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth, SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { useLang } from "../../../components/LanguageProvider";

export default function CustomerPortal() {
  const { t } = useLang(); // t is i18n object
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) router.replace("/login?role=customer");
  }, [isLoaded, isSignedIn, router]);

  const L = (key, fallback) => (t && t[key]) || fallback;

  return (
    <div style={{ maxWidth: 880, margin: "32px auto", padding: "16px" }}>
      <SignedOut>
        <p>Yönlendiriliyor…</p>
      </SignedOut>

      <SignedIn>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>
          {L("portalCustomer", "Müşteri Portalı")}
        </h1>

        <p style={{ color: "#475569", marginBottom: 16 }}>
          {L(
            "customerPortalWelcome",
            "Hoş geldiniz! Buradan sipariş verebilirsiniz."
          )}
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href="/"
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              background: "#111827",
              color: "#fff",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            {L("orderNow", "Sipariş Ver")}
          </a>

          <a
            href="/"
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              background: "#fff",
              color: "#111827",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            {L("home", "Ana Sayfa")}
          </a>

          <SignOutButton signOutOptions={{ redirectUrl: "/" }}>
            <button
              style={{
                padding: "12px 16px",
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                background: "#fff",
                color: "#111827",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {L("logout", "Çıkış")}
            </button>
          </SignOutButton>
        </div>
      </SignedIn>
    </div>
  );
}
