// components/LanguageProvider.jsx
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { trTR, enUS, arSA, deDE } from "@clerk/localizations";
import { SUPPORTED, LOCALE_LABELS, STR } from "../lib/i18n";

const LangCtx = createContext({
  lang: "tr",
  setLang: () => {},
  t: STR.tr,
  SUPPORTED,
  LOCALE_LABELS,
});

export function useLang() {
  return useContext(LangCtx);
}

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState("tr");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (saved && SUPPORTED.includes(saved)) setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
      try { document.documentElement.lang = lang; } catch {}
    }
  }, [lang]);

  const t = useMemo(() => STR[lang] || STR.tr, [lang]);

  const value = useMemo(() => ({ lang, setLang, t, SUPPORTED, LOCALE_LABELS }), [lang, t]);

  const CLERK_LOC = { tr: trTR, en: enUS, ar: arSA, de: deDE };
  const localization = CLERK_LOC[lang] || trTR;

  return (
    <ClerkProvider localization={localization}>
      <LangCtx.Provider value={value}>{children}</LangCtx.Provider>
    </ClerkProvider>
  );
}
