(function(){
  const SUPPORTED = ["tr","en","ar","de"];
  const STR = {
    tr: {
      brand:"Üreten Eller",
      welcome:"Üreten Ellere Hoş Geldiniz",
      subtitle:"Sade ve güvenli giriş",
      postAd:"İlan Ver (Üreten El)",
      mottos:[
        { t:"Amacımız: ev hanımlarına bütçe katkısı sağlamak.", c:"#e11d48" },
        { t:"El emeği ürünler adil fiyata.", c:"#7c3aed" },
        { t:"Şeffaf fiyat, net teslimat.", c:"#16a34a" },
        { t:"Güvenli ödeme, kolay iade.", c:"#65a30d" },
        { t:"Toplulukla güçleniyoruz.", c:"#22c55e" },
        { t:"Adil ticaret, mutlu müşteri.", c:"#10b981" },
        { t:"Kalite, özen ve şeffaflık.", c:"#8b5cf6" },
        { t:"İhtiyacın olan el emeği burada.", c:"#d946ef" },
      ]
    },
    en: {
      brand:"Ureten Eller",
      welcome:"Welcome to Ureten Eller",
      subtitle:"Simple and secure access",
      postAd:"Post Ad (Maker)",
      mottos:[
        { t:"Handmade at fair prices.", c:"#7c3aed" },
        { t:"Transparent pricing, clear delivery.", c:"#16a34a" },
        { t:"Secure payments, easy returns.", c:"#65a30d" },
        { t:"Fair trade, happy customers.", c:"#10b981" },
      ]
    },
    ar: {
      brand:"أُنتِج بالأيادي",
      welcome:"مرحبًا بكم",
      subtitle:"دخول بسيط وآمن",
      postAd:"أنشئ إعلان (للمنتِجة)",
      mottos:[
        { t:"منتجات يدوية بأسعار عادلة.", c:"#7c3aed" },
        { t:"أسعار شفافة وتسليم واضح.", c:"#16a34a" },
        { t:"دفع آمن وإرجاع سهل.", c:"#65a30d" },
        { t:"تجارة عادلة وزبائن سعداء.", c:"#10b981" },
      ]
    },
    de: {
      brand:"Ureten Eller",
      welcome:"Willkommen bei Ureten Eller",
      subtitle:"Einfacher und sicherer Zugang",
      postAd:"Anzeige erstellen (Anbieterin)",
      mottos:[
        { t:"Handgemachtes zum fairen Preis.", c:"#7c3aed" },
        { t:"Transparente Preise, klare Lieferung.", c:"#16a34a" },
        { t:"Sichere Zahlung, einfache Rückgabe.", c:"#65a30d" },
        { t:"Fairer Handel, zufriedene Kund:innen.", c:"#10b981" },
      ]
    }
  };

  const qs = (s)=>document.querySelector(s);
  const elBrand  = qs("#brand");
  const elWelcome= qs("#welcome");
  const elSub    = qs("#subtitle");
  const elMotto  = qs("#motto");
  const elBtn    = qs("#postAdBtn");
  const sel      = qs("#langSelect");

  function loadLang(){
    const saved = localStorage.getItem("lang");
    return (saved && SUPPORTED.includes(saved)) ? saved : "tr";
  }
  function saveLang(l){ localStorage.setItem("lang", l); }

  function applyLang(l){
    const L = STR[l] || STR.tr;
    document.documentElement.lang = l;
    document.documentElement.dir = (l === "ar") ? "rtl" : "ltr";
    elBrand.textContent = L.brand;
    elWelcome.textContent = L.welcome;
    elSub.textContent = L.subtitle;
    elBtn.textContent = L.postAd;
    // set first motto immediately
    const m = L.mottos[0];
    elMotto.textContent = m.t;
    elMotto.style.color = m.c;
  }

  // cycle mottos every 22s
  let idx = 0, timer = null;
  function startCycle(){
    clearInterval(timer);
    timer = setInterval(()=>{
      const l = sel.value;
      const arr = (STR[l]||STR.tr).mottos;
      idx = (idx+1) % arr.length;
      elMotto.textContent = arr[idx].t;
      elMotto.style.color = arr[idx].c;
    }, 22000);
  }

  // init
  const current = loadLang();
  sel.value = current;
  applyLang(current);
  startCycle();

  sel.addEventListener("change", ()=>{
    saveLang(sel.value);
    applyLang(sel.value);
    startCycle();
  });

  // Only Üreten El → go to login with seller role
  elBtn.addEventListener("click", ()=>{
    window.location.href = "/login?role=seller";
  });
})();
