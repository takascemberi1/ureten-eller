// pages/api/pay/mock/checkout.js
// DEMO "ödeme başlat": order -> paid, escrow.held=true
// Not: Prod'da gerçek PSP (PayTR/iyzico) ödeme sayfasına yönlendirilir.

import { byId, upsert } from "../../../../lib/store.js";

function toNum(x, d = 0) {
  const n = Number(x);
  return Number.isFinite(n) ? n : d;
}
function now() { return new Date().toISOString(); }
function newId() { return "ord_" + Date.now(); }

function timelinePush(order, type, payload = {}) {
  const tl = (order.meta?.timeline) || [];
  tl.push({ type, at: now(), ...payload });
  order.meta = { ...(order.meta || {}), timeline: tl };
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const {
      orderId,
      customerId = "",
      sellerId = "",
      amount = 0,
      currency = "TRY",
      items = [],
      simulate = "success" // "fail" gönderirsen ödeme başarısız simüle olur
    } = body;

    if (!customerId || !sellerId) {
      return res.status(400).json({ ok: false, error: "customerId_and_sellerId_required" });
    }

    const id = String(orderId || newId());
    let order = byId("orders", id);

    if (!order) {
      order = {
        id,
        customerId: String(customerId),
        sellerId: String(sellerId),
        items: Array.isArray(items) ? items : [],
        amount: toNum(amount),
        currency: String(currency || "TRY"),
        status: "created",
        escrow: { provider: "mock", held: false, paymentId: "" },
        createdAt: now(),
        updatedAt: now(),
        meta: { timeline: [] }
      };
      timelinePush(order, "checkout_started");
    }

    if (simulate === "fail") {
      timelinePush(order, "payment_failed");
      order.updatedAt = now();
      upsert("orders", order);
      return res.status(402).json({ ok: false, error: "payment_failed_demo", order });
    }

    // Ödeme başarılı simülasyonu
    order.status = "paid";
    order.escrow = { provider: "mock", held: true, paymentId: "pay_" + Date.now() };
    order.updatedAt = now();
    timelinePush(order, "payment_succeeded", { provider: "mock" });

    const saved = upsert("orders", order);

    // Normalde PSP yönlendirme linki dönerdik; demoda sipariş sayfasına gönderiyoruz.
    return res.status(200).json({
      ok: true,
      order: saved,
      redirectUrl: `/orders/${saved.id}`
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "checkout_failed" });
  }
}
