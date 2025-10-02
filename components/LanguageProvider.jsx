import { trTR, enUS, arSA, deDE } from "@clerk/localizations";
// components/LanguageProvider.jsx
"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { SUPPORTED, LOCALE_LABELS, STR } from "../lib/i18n";

const ClerkLocales = { tr: trTR, en: enUS, ar: arSA, de: deDE };

const LangCtx = createContext({ lang: "tr", setLang: () => {}, t: STR.tr });

export function useLang() { return useContext(LangCtx); }

function SyncWithClerk({ lang, setLang }) {
  const { user, isSignedIn } = useUser();
  useEffect(() => {
    // Load from Clerk (signed-in) or localStorage (guest)
    const saved = isSignedIn ? (user?.publicMetadata?.lang) : (localStorage.getItem("lang") || "tr");
    if (saved && SUPPORTED.includes(saved) && saved !== lang) setLang(saved);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  useEffect(() => {
    // Persist to Clerk or localStorage
    if (isSignedIn && user) {
      if (user.publicMetadata?.lang !== lang) user.update({ publicMetadata: { lang } }).catch(()=>{});
    } else {
      localStorage.setItem("lang", lang);
    }
  }, [lang, isSignedIn, user]);

  return null;
}

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState("tr");
  const t = useMemo(() => STR[lang] || STR.tr, [lang]);
  const loc = ClerkLocales[lang] || trTR;

  return (
    <ClerkProvider localization={loc}>
      <LangCtx.Provider value={{ lang, setLang, t }}>
        <SyncWithClerk lang={lang} setLang={setLang} />
        {/* Floating dropdown shown on every page */}
        <div style={{
          position:"fixed", top:12, right:12, zIndex:50,
          background:"rgba(255,255,255,.85)", border:"1px solid #e5e7eb",
          borderRadius:12, padding:"6px 10px", backdropFilter:"blur(8px)"
        }}>
          <LangSelect />
        </div>
        {children}
      </LangCtx.Provider>
    </ClerkProvider>
  );
}

function LangSelect() {
  const { lang, setLang } = useLang();
  return (
    <select
      aria-label="Dil"
      value={SUPPORTED.includes(lang) ? lang : "tr"}
      onChange={(e)=>setLang(e.target.value)}
      style={{border:"none", background:"transparent", fontWeight:600, cursor:"pointer"}}
    >
      {SUPPORTED.map(k => <option key={k} value={k}>{LOCALE_LABELS[k]}</option>)}
    </select>
  );
}
