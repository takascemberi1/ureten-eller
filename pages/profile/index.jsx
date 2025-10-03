"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/nextjs";

/** i18n (4 dil) */
const STR = {
  tr: {
    title: "Profil",
    sellerBadge: "Üreten El",
    customerBadge: "Müşteri",
    editAvatar: "Profil resmini değiştir",
    uploading: "Yükleniyor…",
    rate: "Yıldız ver",
    name: "Ad Soyad",
    email: "E-posta",
    city: "Şehir",
    live: "Yayındaki İlanlar",
    pending: "Onay Bekleyen İlanlar",
    expired: "Süresi Dolan İlanlar",
    empty: "Henüz ilan yok.",
    legal: {
      privacy: "Gizlilik",
      about: "Hakkımızda",
      contact: "İletişim",
      terms: "Kullanım Şartları",
      kvkk: "KVKK Aydınlatma",
      distance: "Mesafeli Satış Sözleşmesi",
      returns: "Teslimat & İade",
    },
  },
  en: {
    title: "Profile",
    sellerBadge: "Maker",
    customerBadge: "Customer",
    editAvatar: "Change avatar",
    uploading: "Uploading…",
    rate: "Rate",
    name: "Full Name",
    email: "Email",
    city: "City",
    live: "Live Listings",
    pending: "Pending Approval",
    expired: "Expired Listings",
    empty: "Nothing yet.",
    legal: {
      privacy: "Privacy",
      about: "About",
      contact: "Contact",
      terms: "Terms",
      kvkk: "KVKK Notice",
      distance: "Distance Sales Agreement",
      returns: "Shipping & Returns",
    },
  },
  ar: {
    title: "الملف الشخصي",
    sellerBadge: "منتِجة",
    customerBadge: "عميل",
    editAvatar: "تغيير الصورة",
    uploading: "جاري الرفع…",
    rate: "قيّم",
    name: "الاسم الكامل",
    email: "البريد",
    city: "المدينة",
    live: "إعلانات نشطة",
    pending: "بانتظار الموافقة",
    expired: "إعلانات منتهية",
    empty: "لا شيء بعد.",
    legal: {
      privacy: "الخصوصية",
      about: "من نحن",
      contact: "اتصال",
      terms: "الشروط",
      kvkk: "إشعار KVKK",
      distance: "اتفاقية البيع عن بعد",
      returns: "التسليم والإرجاع",
    },
  },
  de: {
    title: "Profil",
    sellerBadge: "Anbieterin",
    customerBadge: "Kund:in",
    editAvatar: "Avatar ändern",
    uploading: "Wird hochgeladen…",
    rate: "Bewerten",
    name: "Vollständiger Name",
    email: "E-Mail",
    city: "Stadt",
    live: "Aktive Inserate",
    pending: "Wartet auf Freigabe",
    expired: "Abgelaufene Inserate",
    empty: "Noch nichts da.",
    legal: {
      privacy: "Datenschutz",
      about: "Über uns",
      contact: "Kontakt",
      terms: "Nutzungsbedingungen",
      kvkk: "KVKK-Hinweis",
      distance: "Fernabsatzvertrag",
      returns: "Lieferung & Rückgabe",
    },
  },
};

function useLangPack() {
  let lang = "tr";
  if (typeof window !== "undefined") {
    lang = localStorage.getItem("lang") || document.documentElement.lang || "tr";
  }
  return STR[lang] || STR.tr;
}

export default function ProfilePage() {
  const t = useLangPack();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  // Rol
  const role = useMemo(() => {
    const m = user?.publicMetadata?.role;
    if (m === "seller" || m === "customer") return m;
    if (typeof window !== "undefined") {
      const r = localStorage.getItem("role");
      if (r === "seller" || r === "customer") return r;
    }
    return "customer";
  }, [user]);

  // Giriş yoksa login'e zorla
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      const r = role || "customer";
      router.replace(`/login?role=${r}&redirect=/profile`);
    }
  }, [isLoaded, isSignedIn, router, role]);

  // Yıldız puanı (avatar altında gösterilecek)
  const [rating, setRating] = useState(() => {
    if (typeof window === "undefined") return 0;
    return Number(localStorage.getItem("my_rating") || 0);
  });
  function saveRating(v) {
    setRating(v);
    if (typeof window !== "undefined") localStorage.setItem("my_rating", String(v));
  }

  // Avatar yükleme
  const [busy, setBusy] = useState(false);
  async function onAvatarChange(e) {
    const file = e.target?.files?.[0];
    if (!file || !user) return;
    try {
      setBusy(true);
      await user.setProfileImage({ file });
      await user.reload?.();
    } catch (err) {
      alert(err?.errors?.[0]?.message || String(err));
    } finally {
      setBusy(false);
    }
  }

  // Kullanıcı temel bilgileri (avatar yanına)
  const fullName = user?.publicMetadata?.full_name || user?.fullName || user?.firstName || "-";
  const city = user?.publicMetadata?.city || "-";
  const email = user?.primaryEmailAddress?.emailAddress || "-";

  // Satıcılar için ilan sekmeleri
  const [adTab, setAdTab] = useState("live"); // live | pending | expired
  const myAds = useMemo(() => {
    try {
      const raw = localStorage.getItem("my_ads");
      const arr = raw ? JSON.parse(raw) : [];
      return {
        live: arr.filter((x) => x.status === "live"),
        pending: arr.filter((x) => x.status === "pending"),
        expired: arr.filter((x) => x.status === "expired"),
      };
    } catch {
      return { live: [], pending: [], expired: [] };
    }
  }, [user?.id]);

  return (
    <div className="wrap">
      <SignedOut>
        <p style={{ padding: 16 }}>Yönlendiriliyor…</p>
      </SignedOut>

      <SignedIn>
        {/* HERO: Avatar solda + rating altında, bilgiler sağda */}
        <header className="hero">
          <div className="bg" />
          <div className="row">
            <div className="left">
              <img
                className="avatar"
                src={user?.imageUrl || "/assets/images/logo.png"}
                alt="avatar"
              />
              <label className="edit">
                {busy ? t.uploading : t.editAvatar}
                <input type="file" accept="image/*" onChange={onAvatarChange} disabled={busy} />
              </label>
              <div className="rating">
                <span className="rateLbl">{t.rate}:</span>
                <div className="stars" role="radiogroup" aria-label={t.rate}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      className={n <= rating ? "star on" : "star"}
                      onClick={() => saveRating(n)}
                      aria-label={`${t.rate} ${n}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="right">
              <div className="topline">
                <h1>{t.title}</h1>
                <span className={role === "seller" ? "badge seller" : "badge"}>
                  {role === "seller" ? t.sellerBadge : t.customerBadge}
                </span>
              </div>

              <div className="infoGrid">
                <div className="field">
                  <label>{t.name}</label>
                  <div className="val">{fullName}</div>
                </div>
                <div className="field">
                  <label>{t.email}</label>
                  <div className="val">{email}</div>
                </div>
                <div className="field">
                  <label>{t.city}</label>
                  <div className="val">{city}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* SELLER: ilan sekmeleri */}
        {role === "seller" && (
          <section className="container">
            <div className="tabs">
              <button className={adTab === "live" ? "tab active" : "tab"} onClick={() => setAdTab("live")}>
                {t.live}
              </button>
              <button className={adTab === "pending" ? "tab active" : "tab"} onClick={() => setAdTab("pending")}>
                {t.pending}
              </button>
              <button className={adTab === "expired" ? "tab active" : "tab"} onClick={() => setAdTab("expired")}>
                {t.expired}
              </button>
            </div>

            <AdsList items={myAds[adTab]} emptyText={t.empty} />
          </section>
        )}

        {/* Legal */}
        <footer className="legal">
          {Object.entries(t.legal).map(([key, label]) => {
            const hrefMap = {
              privacy: "/legal/gizlilik",
              about: "/legal/hakkimizda",
              contact: "/legal/iletisim",
              terms: "/legal/kullanim-sartlari",
              kvkk: "/legal/kvkk-aydinlatma",
              distance: "/legal/mesafeli-satis-sozlesmesi",
              returns: "/legal/teslimat-iade",
            };
            const href = hrefMap[key] || "/";
            return (
              <a key={key} href={href}>{label}</a>
            );
          })}
        </footer>
      </SignedIn>

      <style jsx>{`
        .wrap{min-height:100vh; background:
          radial-gradient(1200px 800px at -10% -10%, rgba(255,255,255,.35), transparent 60%),
          linear-gradient(120deg,#ff80ab,#a78bfa,#60a5fa,#34d399);
          background-size:320% 320%; animation:drift 16s ease-in-out infinite;}
        @keyframes drift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

        .hero{position:relative; padding:28px 16px}
        .hero .bg{position:absolute; inset:0; backdrop-filter: blur(10px); background:rgba(255,255,255,.68); border-bottom:1px solid rgba(255,255,255,.5)}
        .hero .row{position:relative; z-index:1; display:flex; gap:24px; align-items:flex-start; max-width:1040px; margin:0 auto}

        .left{display:grid; justify-items:center; gap:10px; width:160px}
        .avatar{width:120px; height:120px; border-radius:24px; object-fit:cover; box-shadow:0 10px 24px rgba(0,0,0,.18)}
        .edit{display:inline-block; font-size:13px; padding:8px 10px; border-radius:999px; border:1px solid #e5e7eb; background:#fff; cursor:pointer; font-weight:700}
        .edit input{display:none}
        .rating{display:grid; gap:6px; text-align:center}
        .rateLbl{font-size:12px; color:#334155}
        .stars{display:flex; gap:4px; justify-content:center}
        .star{border:none; background:transparent; font-size:20px; cursor:pointer; opacity:.5}
        .star.on{opacity:1}

        .right{flex:1; min-width:0}
        .topline{display:flex; align-items:center; gap:10px; margin-bottom:8px}
        .topline h1{margin:0; font-size:26px}
        .badge{display:inline-block; padding:6px 10px; border-radius:999px; border:1px solid #e5e7eb; background:#fff; font-weight:700}
        .badge.seller{background:#111827; color:#fff; border-color:#111827}

        .infoGrid{display:grid; gap:10px; grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
        .field label{display:block; font-size:12px; color:#475569}
        .val{border:1px solid #e5e7eb; background:#fff; border-radius:12px; padding:9px 12px}

        .container{max-width:1040px; margin:16px auto; padding:0 16px}
        .tabs{display:flex; gap:8px; background:rgba(255,255,255,.6); border:1px solid #e5e7eb; padding:6px; border-radius:12px; width:max-content}
        .tab{border:none; padding:8px 12px; border-radius:10px; cursor:pointer; font-weight:700; color:#111827; background:transparent}
        .tab.active{background:#111827; color:#fff}

        .list{margin-top:12px}
        .gridAds{display:grid; gap:10px; grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
        .ad{display:block; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden; background:#fff; color:inherit; text-decoration:none}
        .thumb{width:100%; aspect-ratio:4/3; background:#f1f5f9; background-size:cover; background-position:center}
        .meta{padding:10px}
        .ttl{font-weight:700; margin-bottom:6px}
        .row{display:flex; justify-content:space-between; color:#475569}
        .empty{padding:8px 10px; color:#475569; background:rgba(255,255,255,.86); border:1px solid rgba(255,255,255,.5); border-radius:12px; margin-top:10px}

        .legal{max-width:1040px; margin:20px auto 24px; padding:0 16px; display:flex; gap:10px; flex-wrap:wrap; justify-content:center}
        .legal a{border:1px solid #e5e7eb; background:#fff; color:#111827; border-radius:999px; padding:8px 12px; font-weight:600; text-decoration:none}
      `}</style>
    </div>
  );
}

function AdsList({ items, emptyText }) {
  if (!items?.length) return <div className="empty">{emptyText}</div>;
  return (
    <div className="list">
      <div className="gridAds">
        {items.map((a, i) => (
          <a key={i} className="ad" href={a.url || "#"} title={a.title}>
            <div className="thumb" style={{ backgroundImage: a.img ? `url(${a.img})` : undefined }} />
            <div className="meta">
              <div className="ttl">{a.title}</div>
              <div className="row">
                <span>{a.cat}</span>
                <b>{a.price}</b>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
