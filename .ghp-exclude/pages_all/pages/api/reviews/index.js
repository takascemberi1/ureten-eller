// pages/api/reviews/index.js
// Yorumlar API (DEMO). Not: Prod'da DB + gerçek yetkilendirme/müdahale gerektirir.

import { readAll, upsert } from "../../../lib/store.js";

const REV = "reviews";
const ORD = "orders";

// yardımcılar
function genId() {
  return String(Date.now());
}
function clampRating(n) {
  const x = Math.round(Number(n));
  return Math.min(5, Math.max(1, x || 0));
}
function sanitizeText(s) {
  const t = String(s || "").trim();
  return t.slice(0, 2000);
}

export default function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    // /api/reviews?sellerId=...&customerId=...&orderId=...&all=1&limit=20
    const { sellerId, customerId, orderId, limit, all } = req.query;
    const onlyPublished = all === "1" ? false : true;

    let list = readAll(REV);

    if (sellerId) list = list.filter((r) => r.sellerId === String(sellerId));
    if (customerId) list = list.filter((r) => r.customerId === String(customerId));
    if (orderId) list = list.filter((r) => r.orderId === String(orderId));
    if (onlyPublished) list = list.filter((r) => r.status === "published");

    const n = Number(limit) || 20;
    return res.status(200).json(list.slice(-n).reverse());
  }

  if (method === "POST") {
    // Yorum oluştur: yalnızca "delivered" veya "released" siparişten sonra.
    try {
      const body =
        typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
      const { orderId, rating, text, photos } = body || {};
      const customerId = String(body.customerId || req.headers["x-user-id"] || "");
      const sellerId = String(body.sellerId || "");

      if (!orderId || !customerId || !sellerId) {
        return res.status(400).json({ ok: false, error: "orderId, customerId, sellerId gerekli" });
      }

      // sipariş doğrulama
      const orders = readAll(ORD);
      const ord = orders.find((o) => String(o.id) === String(orderId));
      if (!ord) return res.status(404).json({ ok: false, error: "order_not_found" });
      if (String(ord.customerId) !== customerId || String(ord.sellerId) !== sellerId) {
        return res.status(403).json({ ok: false, error: "order_party_mismatch" });
      }
      if (!["delivered", "released"].includes(ord.status)) {
        return res.status(409).json({ ok: false, error: "order_not_eligible_for_review" });
      }

      // aynı siparişe ikinci yorum engeli
      const existing = readAll(REV).find(
        (r) => String(r.orderId) === String(orderId) && String(r.customerId) === customerId
      );
      if (existing) {
        return res.status(409).json({ ok: false, error: "already_reviewed" });
      }

      const rv = {
        id: genId(),
        orderId: String(orderId),
        sellerId,
        customerId,
        rating: clampRating(rating),
        text: sanitizeText(text),
        photos: Array.isArray(photos) ? photos.slice(0, 5).map(String) : [],
        status: "pending", // moderasyon; admin onaylayınca "published"
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        meta: {
          ua: req.headers["user-agent"] || "",
          ip: (req.headers["x-forwarded-for"] || "").toString().split(",")[0] || req.socket?.remoteAddress || "",
        },
      };

      upsert(REV, rv);
      return res.status(201).json({ ok: true, review: rv });
    } catch (e) {
      return res.status(500).json({ ok: false, error: "review_create_failed" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end("Method Not Allowed");
}
