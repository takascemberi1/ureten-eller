"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/nextjs";

/** Basit i18n */
const STR = {
  tr: {
    title: "Profil",
    sellerBadge: "Üreten El",
    customerBadge: "Müşteri",
    editAvatar: "Profil resmini değiştir",
    upload: "Yükle",
    name: "Ad Soyad",
    email: "E-posta",
    city: "Şehir",
    save: "Kaydet",
    profileTab: "Profil",
    listingsTab: "İlanlar",
    live: "Yayındaki İlanlar",
    pending: "Onay Bekleyen İlanlar",
    expired: "Süresi Dolan İlanlar",
    empty: "Henüz içerik yok.",
    rate: "Yıldız ver",
    message: "Mesaj Gönder",
    logout: "Çıkış",
    uploading: "Yükleniyor…",
  },
  en: {
    title: "Profile",
    sellerBadge: "Maker",
    customerBadge: "Customer",
    editAvatar: "Change avatar",
    upload: "Upload",
    name: "Full Name",
    email: "Email",
    city: "City",
    save: "Save",
    profileTab: "Profile",
    listingsTab: "Listings",
    live: "Live Listings",
    pending: "Pending Approval",
    expired: "Expired Listings",
    empty: "Nothing yet.",
    rate: "Rate",
    message: "Send Message",
    logout: "Logout",
    uploading: "Uploading…",
  },
  ar: {
    title: "الملف الشخصي",
    sellerBadge: "منتِجة",
    customerBadge: "عميل",
    editAvatar: "تغيير الصورة",
    upload: "رفع",
    name: "الاسم الكامل",
    email: "البريد",
    city: "المدينة",
    save: "حفظ",
    profileTab: "الملف",
    listingsTab: "الإعلانات",
    live: "إعلانات نشطة",
    pending: "بانتظار الموافقة",
    expired: "منتهية الصلاحية",
    empty: "لا شيء بعد.",
    rate: "قيّم",
    message: "أرسل رسالة",
    logout: "خروج",
    uploading: "جاري الرفع…",
  },
  de: {
    title: "Profil",
    sellerBadge: "Anbieterin",
    customerBadge: "Kund:in",
    editAvatar: "Avatar ändern",
    upload: "Hochladen",
    name: "Vollständiger Name",
    email: "E-Mail",
    city: "Stadt",
    save: "Speichern",
    profileTab: "Profil",
    listingsTab: "Inserate",
    live: "Aktive Inserate",
    pending: "Wartet auf Freigabe",
    expired: "Abgelaufene Inserate",
    empty: "Noch nichts da.",
    rate: "Bewerten",
    message: "Nachricht senden",
    logout: "Abmelden",
    uploading: "Wird hochgeladen…",
  },
};

function useLangPick() {
  const lang =
    (typeof window !== "undefined" && localStorage.getItem("lang")) ||
    (typeof document !== "undefined" && document.documentElement.lang) ||
    "tr";
  return STR[lang] || STR.tr;
}

export default function ProfilePage() {
  const t = useLangPick();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  // Sekme: "profil" / "ilanlar" (ilanlar yalnızca seller için görünür)
  const [tab, setTab] = useState("profil");

  // Avatar yükleme durumu
  const [busy, setBusy] = useState(false);

  // Giriş şartı: değilse login'e yolla (role ipucu için localStorage kullan)
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      const role =
        (typeof window !== "undefined" && localStorage.getItem("role")) ||
        "customer";
      router.replace(`/login?role=${role}&redirect=/profile`);
    }
  }, [isLoaded, isSignedIn, router]);

  // Kullanıcı rolü (Clerk publicMetadata veya localStorage)
  const role = useMemo(() => {
    const metaRole = user?.publicMetadata?.role;
    if (metaRole === "seller" || metaRole === "customer") return metaRole;
    if (typeof window !== "undefined") {
      const r = localStorage.getItem("role");
      if (r === "seller" || r === "customer") return r;
    }
    return "customer";
  }, [user]);

  // Basit ilan veri kaynağı (API beklemeden boş-doluluk göstermek için localStorage)
  const myAds = useMemo(() => {
    try {
      const raw = localStorage.getItem("my_ads");
      const arr = raw ? JSON.parse(raw) : [];
      const live = arr.filter((x) => x.status === "live");
      const pending = arr.filter((x) => x.status === "pending");
      const expired = arr.filter((x) => x.status === "expired");
      return { live, pending, expired };
    } catch {
      return { live: [], pending: [], expired: [] };
    }
  }, []);

  async function onAvatarChange(e) {
    const file = e.target?.files?.[0];
    if (!file || !user) return;
    try {
      setBusy(true);
      // Clerk: profil foto yükleme (resmi Clerk'e gönderir)
      await user.setProfileImage({ file });
      await user.reload?.();
    } catch (err) {
      alert(err?.errors?.[0]?.message || String(err));
    } finally {
      setBusy(false);
    }
  }

  function CustomerView() {
    const fullName =
      user?.publicMetadata?.full_name || user?.fullName || user?.firstName || "";
    const city = user?.publicMetadata?.city || "";
    const email = user?.primaryEmailAddress?.emailAddress || "";
    const [rating, setRating] = useState(
      Number(localStorage.getItem("my_rating") || 0)
    );

    function sendMessage() {
      // gerçek mesaj sayfasına yönlendirme: alıcı = kullanıcı id
      router.push(`/messages?to=${encodeURIComponent(user?.id || "")}`);
    }
    function saveRating(v) {
      setRating(v);
      localStorage.setItem("my_rating", String(v));
      alert("Teşekkürler! ⭐");
    }

    return (
      <div className="card">
        <h3>{t.profileTab}</h3>
        <div className="grid">
          <div className="field">
            <label>{t.name}</label>
            <div className="val">{fullName || "-"}</div>
          </div>
          <div className="field">
            <label>{t.email}</label>
            <div className="val">{email || "-"}</div>
          </div>
          <div className="field">
            <label>{t.city}</label>
            <div className="val">{city || "-"}</div>
          </div>
        </div>

        <div className="actions">
          <button className="primary" onClick={sendMessage}>
            💬 {t.message}
          </button>
          <div className="rating">
            <span>{t.rate}:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className={n <= rating ? "star on" : "star"}
                onClick={() => saveRating(n)}
                aria-label={`rate ${n}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function SellerView() {
    return (
      <>
        {/* Sekme başlıkları */}
        <div className="tabs">
          <button
            className={tab === "profil" ? "tab active" : "tab"}
            onClick={() => setTab("profil")}
          >
            {t.profileTab}
          </button>
          <button
            className={tab === "ilanlar" ? "tab active" : "tab"}
            onClick={() => setTab("ilanlar")}
          >
            {t.listingsTab}
          </button>
        </div>

        {tab === "profil" && <CustomerView />}

        {tab === "ilanlar" && (
          <div className="lists">
            <Section title={t.live} items={myAds.live} />
            <Section title={t.pending} items={myAds.pending} />
            <Section title={t.expired} items={myAds.expired} />
          </div>
        )}
      </>
    );
  }

  function Section({ title, items }) {
    return (
      <div className="card">
        <h3>{title}</h3>
        {!items?.length ? (
          <div className="empty">{t.empty}</div>
        ) : (
          <div className="ads">
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
        )}
      </div>
    );
  }

  return (
    <div className="wrap">
      <SignedOut>
        <p>Yönlendiriliyor…</p>
      </SignedOut>

      <SignedIn>
        {/* Kapak */}
        <header className="hero">
          <div className="bg" />
          <div className="row">
            <div className="avatar">
              <img
                src={user?.imageUrl || "/assets/images/logo.png"}
                alt="avatar"
              />
              <label className="edit">
                {busy ? t.uploading : t.editAvatar}
                <input
                  type="file"
                  accept="image/*"
                  onChange={onAvatarChange}
                  disabled={busy}
                />
              </label>
            </div>
            <div className="info">
              <h1>{t.title}</h1>
              <div className="badges">
                <span className={role === "seller" ? "badge seller" : "badge"}>
                  {role === "seller" ? t.sellerBadge : t.customerBadge}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* İçerik */}
        <main className="container">
          {role === "seller" ? <SellerView /> : <CustomerView />}
        </main>
      </SignedIn>

      <style jsx>{`
        .wrap{min-height:100vh; background:
          radial-gradient(1200px 800px at -10% -10%, rgba(255,255,255,.35), transparent 60%),
          linear-gradient(120deg,#ff80ab,#a78bfa,#60a5fa,#34d399);
          background-size:320% 320%; animation:drift 16s ease-in-out infinite;}
        @keyframes drift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

        .hero{position:relative; padding:28px 16px}
        .hero .bg{position:absolute; inset:0; backdrop-filter: blur(10px); background:rgba(255,255,255,.68); border-bottom:1px solid rgba(255,255,255,.5)}
        .hero .row{position:relative; z-index:1; display:flex; gap:16px; align-items:center; max-width:980px; margin:0 auto}
        .avatar{display:grid; gap:8px; align-items:start}
        .avatar img{width:84px; height:84px; border-radius:20px; object-fit:cover; box-shadow:0 10px 24px rgba(0,0,0,.18)}
        .edit{display:inline-block; font-size:13px; padding:8px 10px; border-radius:999px; border:1px solid #e5e7eb; background:#fff; cursor:pointer; font-weight:700}
        .edit input{display:none}
        .info h1{margin:0 0 6px; font-size:26px}
        .badge{display:inline-block; padding:6px 10px; border-radius:999px; border:1px solid #e5e7eb; background:#fff; font-weight:700}
        .badge.seller{background:#111827; color:#fff; border-color:#111827}

        .container{max-width:980px; margin:16px auto; padding:0 16px; display:grid; gap:12px}

        .tabs{display:flex; gap:8px; background:rgba(255,255,255,.6); border:1px solid #e5e7eb; padding:6px; border-radius:12px; width:max-content}
        .tab{border:none; padding:8px 12px; border-radius:10px; cursor:pointer; font-weight:700; color:#111827;}
        .tab.active{background:#111827; color:#fff}

        .card{background:rgba(255,255,255,.86); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,.5); border-radius:16px; padding:14px}
        .grid{display:grid; gap:10px; grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
        .field label{display:block; font-size:12px; color:#475569}
        .val{border:1px solid #e5e7eb; background:#fff; border-radius:12px; padding:9px 12px}

        .actions{margin-top:12px; display:flex; gap:10px; align-items:center; flex-wrap:wrap}
        .primary{padding:10px 14px; border-radius:999px; border:none; background:#111827; color:#fff; font-weight:700; cursor:pointer}

        .rating{display:flex; align-items:center; gap:6px}
        .star{border:none; background:transparent; font-size:20px; cursor:pointer; opacity:.5}
        .star.on{opacity:1}

        .ads{display:grid; gap:10px; grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
        .ad{display:block; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden; background:#fff; color:inherit; text-decoration:none}
        .thumb{width:100%; aspect-ratio:4/3; background:#f1f5f9; background-size:cover; background-position:center}
        .meta{padding:10px}
        .ttl{font-weight:700; margin-bottom:6px}
        .row{display:flex; justify-content:space-between; color:#475569}
        .empty{padding:8px 10px; color:#475569}
      `}</style>
    </div>
  );
}
