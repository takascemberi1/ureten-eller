// pages/api/reviews/list.js
// YORUM LİSTELEME (DEMO)
// - Public: yalnızca onaylı (approved) yorumları döner.
// - Satıcı (kendi mağazası) veya Admin: onaysızları da görebilir.
// - Ortalama puan ve toplam adet döner (public ortalama = sadece approved).
// - Basit sayfalama: ?sellerId=...&limit=20&offset=0
// - Eğer istek yapan müşteri ise, kendi yorumu (varsa) ayrı alan olarak döner.

import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { readAll, writeAll } from "../../../lib/store.js";

const REVIEWS = "reviews";
const STATS = "seller_stats";

function toInt(v, def) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n >= 0 ? n : def;
}

function roleOf(user) {
  // Clerk metadata -> role
  const pub = user?.publicMetadata?.role;
  const unsafe = user?.unsafeMetadata?.role;
  return (pub || unsafe || "").toString();
}

function isAdmin(user) {
  // İstersen admin bayrağını burada değiştir
  return Boolean(
    user?.publicMetadata?.isAdmin === true || user?.unsafeMetadata?.isAdmin === true
  );
}

function recomputePublicStats(sellerId) {
  const all = readAll(REVIEWS) || [];
  const ok = all.filter((r) => r && r.sellerId === sellerId && r?.flags?.approved);
  const count = ok.length;
  const avg = count
    ? Number((ok.reduce((a, b) => a + (Number(b.rating) || 0), 0) / count).toFixed(2))
    : 0;

  // stats cache (public görünüm için)
  const stats = readAll(STATS) || [];
  const idx = stats.findIndex((x) => x && x.sellerId === sellerId);
  const rec = { sellerId, avg, count, updatedAt: new Date().toISOString() };
  if (idx >= 0) stats[idx] = { ...(stats[idx] || {}), ...rec };
  else stats.push(rec);
  writeAll(STATS, stats);

  return { avg, count };
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end("Method Not Allowed");
  }

  const sellerId = String(req.query.sellerId || "").trim();
  if (!sellerId) {
    return res.status(400).json({ ok: false, error: "sellerId_required" });
  }

  const limit = toInt(req.query.limit, 20);
  const offset = toInt(req.query.offset, 0);

  // İstek sahibi
  const { userId } = getAuth(req);
  let me = null;
  if (userId) {
    try {
      me = await clerkClient.users.getUser(userId);
    } catch {
      me = null;
    }
  }

  // Görünürlük:
  // - public: sadece approved
  // - satıcı (kendi id'si) veya admin: tüm yorumlar
  const all = readAll(REVIEWS) || [];
  const mineViewAll = (me && (isAdmin(me) || me.id === sellerId)) ? true : false;

  let list = all.filter((r) => r && r.sellerId === sellerId);
  if (!mineViewAll) {
    list = list.filter((r) => r?.flags?.approved);
  }

  // Sıralama: yeni → eski
  list.sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));

  // Sayfalama
  const total = list.length;
  const slice = list.slice(offset, offset + limit).map((r) => ({
    id: r.id,
    rating: r.rating,
    text: r.text,
    createdAt: r.createdAt,
    // public gizlilik: müşteri kimliğini açmıyoruz
    customer: {
      idMasked: r.customerId ? r.customerId.replace(/.(?=.{4})/g, "•") : "",
    },
    flags: mineViewAll ? (r.flags || {}) : undefined, // sadece satıcı/admin görür
    orderId: mineViewAll ? r.orderId : undefined,     // sadece satıcı/admin görür
  }));

  // Ortalama & adet (public metrik)
  const aggregates = recomputePublicStats(sellerId);

  // İstek yapan müşteri ise kendi yorumunu ayrıca döndür (varsa)
  let myReview = null;
  if (me && roleOf(me) === "customer") {
    const r = all.find((x) => x && x.customerId === me.id && x.sellerId === sellerId);
    if (r) {
      myReview = {
        id: r.id,
        rating: r.rating,
        text: r.text,
        createdAt: r.createdAt,
        approved: Boolean(r?.flags?.approved),
      };
    }
  }

  return res.status(200).json({
    ok: true,
    sellerId,
    aggregates,         // { avg, count } (approved’a göre)
    total,              // filtrelenmiş toplam
    limit,
    offset,
    items: slice,       // paginated yorumlar
    myReview,           // sadece müşteri için (varsa)
    canSeeAll: mineViewAll, // satıcı/admin true olur
  });
}
