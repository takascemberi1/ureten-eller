// pages/api/orders/[id].js
// Sipariş detay + durum aksiyonları (DEMO). Prod'da DB & yetkilendirme şart.

import { byId, upsert, readAll, writeAll } from "../../../lib/store.js";

const NAME = "orders";
const ALLOWED = ["paid", "preparing", "shipped", "delivered", "released", "refunded", "canceled"];

function timelinePush(order, type, payload = {}) {
  const tl = (order.meta?.timeline) || [];
  tl.push({ type, at: new Date().toISOString(), ...payload });
  order.meta = { ...(order.meta || {}), timeline: tl };
}

function setStatus(order, status) {
  if (!ALLOWED.includes(status)) throw new Error("invalid_status");
  order.status = status;
  order.updatedAt = new Date().toISOString();
}

function ensure(order) {
  // meta/timeline garanti
  if (!order.meta) order.meta = {};
  if (!Array.isArray(order.meta.timeline)) order.meta.timeline = [];
  return order;
}

export default function handler(req, res) {
  const { method, query: { id } } = req;

  const current = byId(NAME, id);
  if (!current) {
    return res.status(404).json({ ok: false, error: "order_not_found" });
  }
  const order = ensure({ ...current });

  if (method === "GET") {
    return res.status(200).json({ ok: true, order });
  }

  if (method === "PATCH") {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
      const action = body.action;

      if (!action) return res.status(400).json({ ok: false, error: "action_required" });

      // İdempotent davranış: aynı statüye geçiş denirse sessizce OK dön.
      const same = (s) => order.status === s;

      switch (action) {
        case "markPreparing": {
          if (same("preparing") || order.status === "shipped" || order.status === "delivered" || order.status === "released") break;
          if (order.status !== "paid") return res.status(409).json({ ok: false, error: "flow_violation_paid_expected" });
          setStatus(order, "preparing");
          timelinePush(order, "preparing");
          break;
        }
        case "markShipped": {
          const trackingNo = String(body.trackingNo || "").trim();
          if (!trackingNo && order.status !== "shipped") {
            return res.status(400).json({ ok: false, error: "tracking_required" });
          }
          if (same("shipped")) break;
          if (order.status !== "preparing" && order.status !== "paid") {
            return res.status(409).json({ ok: false, error: "flow_violation_preparing_expected" });
          }
          order.trackingNo = trackingNo || order.trackingNo || "";
          setStatus(order, "shipped");
          timelinePush(order, "shipped", { trackingNo: order.trackingNo });
          break;
        }
        case "markDelivered": {
          if (same("delivered")) break;
          if (order.status !== "shipped") {
            return res.status(409).json({ ok: false, error: "flow_violation_shipped_expected" });
          }
          setStatus(order, "delivered");
          timelinePush(order, "delivered");
          break;
        }
        case "releasePayout": {
          if (same("released")) break;
          if (order.status !== "delivered") {
            return res.status(409).json({ ok: false, error: "flow_violation_delivered_expected" });
          }
          setStatus(order, "released");
          timelinePush(order, "released");
          break;
        }
        case "refund": {
          // Not: gerçek hayatta yalnızca uygun koşullarda ve ödeme sağlayıcı API/refund webhook ile
          if (same("refunded")) break;
          if (!["paid", "preparing", "shipped", "delivered"].includes(order.status)) {
            return res.status(409).json({ ok: false, error: "cannot_refund_in_this_state" });
          }
          setStatus(order, "refunded");
          timelinePush(order, "refunded", { reason: body.reason || "" });
          break;
        }
        case "cancel": {
          // Ödeme alınmış olsa bile, politikanıza göre "paid/preparing" aşamasında iptal mümkün olabilir.
          if (same("canceled")) break;
          if (!["paid", "preparing"].includes(order.status)) {
            return res.status(409).json({ ok: false, error: "cannot_cancel_in_this_state" });
          }
          setStatus(order, "canceled");
          timelinePush(order, "canceled", { reason: body.reason || "" });
          break;
        }
        default:
          return res.status(400).json({ ok: false, error: "unknown_action" });
      }

      const saved = upsert(NAME, order);
      return res.status(200).json({ ok: true, order: saved });
    } catch (e) {
      return res.status(500).json({ ok: false, error: "order_update_failed" });
    }
  }

  res.setHeader("Allow", ["GET", "PATCH"]);
  return res.status(405).end("Method Not Allowed");
}
