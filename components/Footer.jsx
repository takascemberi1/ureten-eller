"use client";
import { useEffect, useState, useMemo } from "react";

const SUP = ["tr","en","ar","de"];

const T = {
  tr: {
    sections: { corp:"Kurumsal", priv:"Gizlilik & Kullanım", help:"Yardım" },
    links: {
      about:"Hakkımızda", contact:"İletişim", privacy:"Gizlilik", kvkk:"KVKK Aydınlatma",
      terms:"Kullanım Şartları", distance:"Mesafeli Satış", returns:"Teslimat & İade", cookies:"Çerez Politikası",
      banned:"Yasaklı Ürünler", allLegal:"Tüm Legal", home:"Ana Sayfa"
    },
    copyright:"© {Y} Üreten Eller",
  },
  en: {
    sections: { corp:"Company", priv:"Privacy & Terms", help:"Help" },
    links: {
      about:"About", contact:"Contact", privacy:"Privacy", kvkk:"KVKK Notice",
      terms:"Terms of Use", distance:"Distance Sales", returns:"Shipping & Returns", cookies:"Cookie Policy",
      banned:"Prohibited Items", allLegal:"All Legal", home:"Home"
    },
    copyright:"© {Y} Ureten Eller",
  },
  ar: {
    sections: { corp:"الشركة", priv:"الخصوصية والشروط", help:"المساعدة" },
    links: {
      about:"من نحن", contact:"اتصال", privacy:"الخصوصية", kvkk:"إشعار KVKK",
      terms:"شروط الاستخدام", distance:"البيع عن بُعد", returns:"التسليم والإرجاع", cookies:"سياسة الكوكيز",
      banned:"المنتجات المحظورة", allLegal:"كل السياسات", home:"الرئيسية"
    },
    copyright:"© {Y} أُنتِج بالأيادي",
  },
  de: {
    sections: { corp:"Unternehmen", priv:"Datenschutz & AGB", help:"Hilfe" },
    links: {
      about:"Über uns", contact:"Kontakt", privacy:"Datenschutz", kvkk:"KVKK-Hinweis",
      terms:"Nutzungsbedingungen", distance:"Fernabsatz", returns:"Lieferung & Rückgabe", cookies:"Cookie-Richtlinie",
      banned:"Verbotene Artikel", allLegal:"Alle Rechtstexte", home:"Startseite"
    },
    copyright:"© {Y} Ureten Eller",
  }
};

export default function Footer(){
  const [lang,setLang]=useState("tr");
  useEffect(()=>{ try{
    const s=localStorage.getItem("lang"); if(s&&SUP.includes(s)) setLang(s);
  }catch{} },[]);
  const t = useMemo(()=>T[lang]||T.tr,[lang]);
  const dir = lang==="ar" ? "rtl" : "ltr";
  const Y = new Date().getFullYear();

  const footerStyle = { background:"#0b0b0f", color:"#e5e7eb", marginTop:"32px" };
  const wrapStyle = { maxWidth:"1100px", margin:"0 auto", padding:"0 16px" };
  const gridStyle = { display:"grid", gap:"24px", padding:"28px 0", gridTemplateColumns:"repeat(3,1fr)" };
  const h4Style = { margin:"0 0 8px 0", color:"#fff" };
  const linkStyle = { display:"block", color:"#d1d5db", textDecoration:"none", margin:"6px 0" };
  const copyStyle = { borderTop:"1px solid #232329", padding:"12px 0", textAlign:"center" };

  return (
    <footer style={footerStyle} dir={dir}>
      <div style={wrapStyle}>
        <div style={gridStyle}>
          <section>
            <h4 style={h4Style}>{t.sections.corp}</h4>
            <a href="/legal/hakkimizda" style={linkStyle}>{t.links.about}</a>
            <a href="/legal/iletisim" style={linkStyle}>{t.links.contact}</a>
            <a href="/legal/gizlilik" style={linkStyle}>{t.links.privacy}</a>
            <a href="/legal/kvkk-aydinlatma" style={linkStyle}>{t.links.kvkk}</a>
          </section>
          <section>
            <h4 style={h4Style}>{t.sections.priv}</h4>
            <a href="/legal/kullanim-sartlari" style={linkStyle}>{t.links.terms}</a>
            <a href="/legal/mesafeli-satis-sozlesmesi" style={linkStyle}>{t.links.distance}</a>
            <a href="/legal/teslimat-iade" style={linkStyle}>{t.links.returns}</a>
            <a href="/legal/cerez-politikasi" style={linkStyle}>{t.links.cookies}</a>
          </section>
          <section>
            <h4 style={h4Style}>{t.sections.help}</h4>
            <a href="/legal/topluluk-kurallari#yasakli-urunler" style={linkStyle}>{t.links.banned}</a>
            <a href="/legal" style={linkStyle}>{t.links.allLegal}</a>
            <a href="/" style={linkStyle}>{t.links.home}</a>
          </section>
        </div>
        <div style={copyStyle}>{t.copyright.replace("{Y}", String(Y))}</div>
      </div>
    </footer>
  );
}
