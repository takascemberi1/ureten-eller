// pages/api/reviews/add.js
// YORUM & PUAN EKLEME (DEMO)
// - Sadece MÜŞTERİ rolü yorum/puan bırakabilir.
// - Şart: ilgili sipariş bu müşteriye ait olmalı ve "delivered" ya da "released" durumda olmalı.
// - Kural: bir müşteri aynı satıcıya SADECE 1 kez yorum/puan bırakabilir (sipariş fark etmez).
// - Küfür/hakaret/uygunsuz içerik engellenir (admin'in yönetebileceği kara liste desteği).
// Not: Gerçekte moderasyon + anti-spam + hız limiti + denetim kayıtları da eklenir.

import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { byId, upsert, readAll, writeAll } from "../../lib/store.js";

const ORDERS = "orders";
const REVIEWS = "reviews";
const STATS = "seller_stats"; // satıcı başına ortalama/adet cache

function clampRating(n) {
  const x = Number(n);
  if (!Number.isFinite(x)) return null;
  if (x < 1 || x > 5) return null;
  return Math.round(x); // 1..5 tam sayı
}

function sanitizeText(s = "") {
  // basit temizleme: html etiket kırp, boşlukları sadele
  const noTags = String(s).replace(/[<>]/g, "");
  return noTags.replace(/\s+/g, " ").trim().slice(0, 2000); // 2000 char limit
}

function hasProfanity(text) {
  if (!text) return false;

  // Admin tarafından yönetilebilir kara liste:
  // (Yoksa boş gelebilir; o zaman minimal fallback devreye girer)
  const adminList = readAll("banned_words"); // ["kelime1","kelime2",...]
  const list = Array.isArray(adminList) && adminList.length
    ? adminList
    : [
        // Fallback — genel etiketler; ayrıntılı listeyi admin tarafında "banned_words" ile yönetin
        "küfür", "hakaret", "ırkçı", "nefret", "terör", "şiddet"
      ];

  const lower = text.toLowerCase();
  return list.some((w) => typeof w === "string" && w && lower.includes(w.toLowerCase()));
}

function recomputeStats(sellerId) {
  const all = readAll(REVIEWS) || [];
  const mine = all.filter((r) => r && r.sellerId === sellerId);
  const count = mine.length;
  const avg =
    count === 0
      ? 0
      : Number(
          (mine.reduce((a, b) => a + (Number(b.rating) || 0), 0) / count).toFixed(2)
        );
  // stats kaydı güncelle
  const stats = readAll(STATS) || [];
  const idx = stats.findIndex((x) => x && x.sellerId === sellerId);
  const rec = { sellerId, avg, count, updatedAt: new Date().toISOString() };
  if (idx >= 0) {
    stats[idx] = { ...(stats[idx] || {}), ...rec };
  } else {
    stats.push(rec);
  }
  writeAll(STATS, stats);
  return { avg, count };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ ok: false, error: "unauthorized" });

  // Kullanıcı rolü (Clerk metadata)
  let role = "";
  try {
    const user = await clerkClient.users.getUser(userId);
    role =
      (user?.publicMetadata && user.publicMetadata.role) ||
      (user?.unsafeMetadata && user.unsafeMetadata.role) ||
      "";
  } catch {
    // sessiz geç
  }
  if (role !== "customer") {
    return res.status(403).json({ ok: false, error: "only_customers_can_review" });
  }

  // Body
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
  const orderId = String(body.orderId || "").trim();
  const sellerId = String(body.sellerId || "").trim();
  const rating = clampRating(body.rating);
  const rawText = String(body.text || "");
  const text = sanitizeText(rawText);

  if (!orderId || !sellerId || !rating) {
    return res.status(400).json({ ok: false, error: "missing_fields" });
  }
  if (hasProfanity(text)) {
    return res.status(400).json({ ok: false, error: "profanity_detected" });
  }

  // Siparişi doğrula
  const order = byId(ORDERS, orderId);
  if (!order) return res.status(404).json({ ok: false, error: "order_not_found" });

  // Sipariş gerçekten bu müşteriye mi ait?
  if (order.customerId !== userId) {
    return res.status(403).json({ ok: false, error: "not_your_order" });
  }
  // Satıcı eşleşmeli
  if (order.sellerId !== sellerId) {
    return res.status(409).json({ ok: false, error: "seller_mismatch" });
  }
  // Teslim şartı (ya teslim edildi, ya da para çözülmüş)
  if (!["delivered", "released"].includes(order.status)) {
    return res.status(409).json({ ok: false, error: "not_delivered_yet" });
  }

  // Daha önce bu satıcıya bu müşteri yorum bırakmış mı? (global tek hakkı)
  const reviews = readAll(REVIEWS) || [];
  const already = reviews.find(
    (r) => r && r.customerId === userId && r.sellerId === sellerId
  );
  if (already) {
    return res.status(409).json({ ok: false, error: "already_reviewed_this_seller" });
  }

  // Kaydet
  const now = new Date().toISOString();
  const review = upsert(REVIEWS, {
    orderId,
    sellerId,
    customerId: userId,
    rating,
    text,
    createdAt: now,
    updatedAt: now,
    // Basit moderasyon bayrakları
    flags: {
      approved: true, // moderasyon eklerseniz önce false başlayıp admin panelinde onaylanır
      reported: false,
    },
  });

  // Ortalama & adet hesapla (satıcı için)
  const aggregates = recomputeStats(sellerId);

  return res.status(201).json({
    ok: true,
    review,
    aggregates, // { avg, count }
    message: "review_added",
  });
}
