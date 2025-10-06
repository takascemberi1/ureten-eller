// pages/api/reviews/[id].js
// Yorum detay + moderasyon + satıcı yanıtı (DEMO).
// Not: Prod'da gerçek kimlik/yetki kontrolü zorunlu (JWT/Clerk middleware).

import { byId, upsert, readAll, writeAll } from "../../../lib/store.js";

const REV = "reviews";

function isAdmin(req) {
  return (req.headers["x-role"] || "").toString().toLowerCase() === "admin";
}
function uid(req) {
  return (req.headers["x-user-id"] || "").toString();
}
function sanitizeText(s, max = 2000) {
  return String(s || "").trim().slice(0, max);
}
function clampRating(n) {
  const x = Math.round(Number(n));
  return Math.min(5, Math.max(1, x || 0));
}

function ensure(rv) {
  rv.meta = rv.meta || {};
  if (!Array.isArray(rv.meta.timeline)) rv.meta.timeline = [];
  return rv;
}

export default function handler(req, res) {
  const { method, query: { id } } = req;

  const current = byId(REV, id);
  if (!current) return res.status(404).json({ ok: false, error: "review_not_found" });

  const review = ensure({ ...current });
  const me = uid(req);

  if (method === "GET") {
    return res.status(200).json({ ok: true, review });
  }

  if (method === "PATCH") {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
      const action = String(body.action || "");
      if (!action) return res.status(400).json({ ok: false, error: "action_required" });

      switch (action) {
        case "publish": {
          // Admin onayı ile yayına al
          if (!isAdmin(req)) return res.status(403).json({ ok: false, error: "forbidden" });
          review.status = "published";
          review.updatedAt = new Date().toISOString();
          review.meta.timeline.push({ type: "publish", by: "admin", at: review.updatedAt });
          break;
        }

        case "reject": {
          // Admin reddi (örn. hakaret, spam vs.)
          if (!isAdmin(req)) return res.status(403).json({ ok: false, error: "forbidden" });
          review.status = "rejected";
          review.updatedAt = new Date().toISOString();
          review.meta.rejectReason = sanitizeText(body.reason || "", 300);
          review.meta.timeline.push({ type: "reject", reason: review.meta.rejectReason, by: "admin", at: review.updatedAt });
          break;
        }

        case "edit": {
          // Yorum sahibi düzenleyebilir (metin/foto/rating)
          if (me !== String(review.customerId)) return res.status(403).json({ ok: false, error: "only_owner_can_edit" });

          if (body.text !== undefined) review.text = sanitizeText(body.text);
          if (body.rating !== undefined) review.rating = clampRating(body.rating);
          if (Array.isArray(body.photos)) {
            review.photos = body.photos.slice(0, 5).map(String);
          }
          review.updatedAt = new Date().toISOString();
          review.meta.timeline.push({ type: "edit", by: review.customerId, at: review.updatedAt });
          // Edit sonrası tekrar moderasyona düşürmek istersen:
          // review.status = "pending";
          break;
        }

        case "reply": {
          // Satıcı cevabı (tek yanıt alanı)
          const isSeller = me && me === String(review.sellerId);
          const sellerId = String(body.sellerId || "");
          if (!isSeller && sellerId !== String(review.sellerId)) {
            return res.status(403).json({ ok: false, error: "only_seller_can_reply" });
          }
          const replyText = sanitizeText(body.text || "", 1200);
          if (!replyText) return res.status(400).json({ ok: false, error: "reply_text_required" });

          review.reply = {
            sellerId: String(review.sellerId),
            text: replyText,
            at: new Date().toISOString(),
          };
          review.updatedAt = review.reply.at;
          review.meta.timeline.push({ type: "reply", by: "seller", at: review.updatedAt });
          break;
        }

        case "delete": {
          // Sert silme yerine işaretleme — sadece admin
          if (!isAdmin(req)) return res.status(403).json({ ok: false, error: "forbidden" });
          review.status = "deleted";
          review.updatedAt = new Date().toISOString();
          review.meta.timeline.push({ type: "delete", by: "admin", at: review.updatedAt });
          break;
        }

        case "report": {
          // Herkes şikayet edebilir (kötüye kullanım)
          const reason = sanitizeText(body.reason || "", 300);
          const reporter = me || "anon";
          const reports = Array.isArray(review.meta.reports) ? review.meta.reports : [];
          reports.push({ by: reporter, reason, at: new Date().toISOString() });
          review.meta.reports = reports;
          review.updatedAt = new Date().toISOString();
          review.meta.timeline.push({ type: "report", by: reporter, at: review.updatedAt });
          break;
        }

        default:
          return res.status(400).json({ ok: false, error: "unknown_action" });
      }

      const saved = upsert(REV, review);
      return res.status(200).json({ ok: true, review: saved });
    } catch (e) {
      return res.status(500).json({ ok: false, error: "review_update_failed" });
    }
  }

  res.setHeader("Allow", ["GET", "PATCH"]);
  return res.status(405).end("Method Not Allowed");
}
