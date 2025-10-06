// pages/api/pay/webhook.js
// DEMO webhook: ödeme/iadeler/uyuşmazlıkları işaretler.
// Güvenlik: WEBHOOK_SECRET varsa, header x-webhook-secret ile eşleşmeli.

import { byId, upsert, readAll, writeAll } from "../../../lib/store.js";

const EVENTS = "webhook_events";

function now(){ return new Date().toISOString(); }
function timelinePush(order, type, payload = {}) {
  const tl = (order.meta?.timeline) || [];
  tl.push({ type, at: now(), ...payload });
  order.meta = { ...(order.meta || {}), timeline: tl };
}

export default function handler(req, res){
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  // Basit imza kontrolü: env varsa kontrol et, yoksa geç.
  const need = process.env.WEBHOOK_SECRET;
  const got = (req.headers["x-webhook-secret"] || req.query.secret || "").toString();
  if (need && got !== need) return res.status(401).json({ ok:false, error:"unauthorized" });

  try{
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const { id: evtId, type, orderId, paymentId } = body;

    if (!type || !orderId) return res.status(400).json({ ok:false, error:"type_and_orderId_required" });

    // idempotency: aynı event ikinci kez işlenmesin
    const seen = readAll(EVENTS);
    if (evtId && seen.find(e => e.id === evtId)) {
      return res.status(200).json({ ok:true, dedup:true });
    }

    const order = byId("orders", String(orderId));
    if (!order) return res.status(404).json({ ok:false, error:"order_not_found" });

    switch (String(type)) {
      case "payment_succeeded":
        order.status = order.status === "paid" ? "paid" : "paid";
        order.escrow = { ...(order.escrow||{}), provider: order.escrow?.provider || "mock", held: true, paymentId: paymentId || order.escrow?.paymentId || "" };
        timelinePush(order, "webhook_payment_succeeded", { paymentId: order.escrow.paymentId });
        break;

      case "refund_succeeded":
        order.status = "refunded";
        order.escrow = { ...(order.escrow||{}), held: false };
        timelinePush(order, "webhook_refund_succeeded");
        break;

      case "dispute_opened":
        order.meta = { ...(order.meta||{}), disputeOpen: true };
        timelinePush(order, "webhook_dispute_opened");
        break;

      case "dispute_closed":
        order.meta = { ...(order.meta||{}), disputeOpen: false };
        timelinePush(order, "webhook_dispute_closed");
        break;

      default:
        return res.status(400).json({ ok:false, error:"unknown_type" });
    }

    order.updatedAt = now();
    const saved = upsert("orders", order);

    // event log’a yaz
    if (evtId) {
      seen.push({ id: evtId, type, orderId: saved.id, at: now() });
      writeAll(EVENTS, seen);
    }

    return res.status(200).json({ ok:true, order:saved });
  }catch(e){
    return res.status(500).json({ ok:false, error:"webhook_process_failed" });
  }
}
