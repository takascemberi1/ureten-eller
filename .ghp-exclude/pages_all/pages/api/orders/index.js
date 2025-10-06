// pages/api/orders/index.js
// Basit sipariş listesi/ekleme (DEMO). Prod'da veritabanı + webhook tetiklemeli.

import { readAll, upsert } from "../../../lib/store.js";

const NAME = "orders";

// Yardımcılar
function genCode(seed) {
  return "#UE-" + String(seed || Date.now()).slice(-6);
}
function ensureOrderShape(o) {
  return {
    id: o.id,
    code: o.code || genCode(o.id),
    customerId: o.customerId,          // alıcı
    sellerId: o.sellerId,              // satıcı
    title: o.title || "",
    price: Number(o.price) || 0,       // TRY
    currency: o.currency || "TRY",
    status: o.status || "paid",        // paid -> preparing -> shipped -> delivered -> released / refunded / canceled
    trackingNo: o.trackingNo || "",
    createdAt: o.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    meta: o.meta || {},
  };
}

export default function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    // /api/orders?role=seller|customer&uid=<userId>&limit=50
    const { role, uid, sellerId, customerId, limit } = req.query;
    const list = readAll(NAME);
    let out = list;

    const u = uid || req.headers["x-user-id"]; // Clerk yoksa test için header/param
    if (role === "seller" || sellerId) {
      const sid = sellerId || u;
      out = out.filter((x) => x.sellerId === sid);
    } else if (role === "customer" || customerId) {
      const cid = customerId || u;
      out = out.filter((x) => x.customerId === cid);
    }

    const n = Number(limit) || 50;
    return res.status(200).json(out.slice(-n).reverse());
  }

  if (method === "POST") {
    // DEMO: Sipariş oluştur (gerçekte ödeme webhook'u yapar)
    try {
      const body =
        typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
      if (!body.customerId || !body.sellerId) {
        return res
          .status(400)
          .json({ ok: false, error: "customerId ve sellerId gerekli" });
      }
      const now = Date.now();
      const item = ensureOrderShape({
        id: String(now),
        code: genCode(now),
        customerId: body.customerId,
        sellerId: body.sellerId,
        title: body.title || "Sipariş",
        price: Number(body.price) || 0,
        currency: body.currency || "TRY",
        status: body.status || "paid",
        createdAt: new Date().toISOString(),
        meta: body.meta || {},
      });
      upsert(NAME, item);
      return res.status(201).json({ ok: true, order: item });
    } catch (e) {
      return res.status(500).json({ ok: false, error: "order_create_failed" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end("Method Not Allowed");
}
