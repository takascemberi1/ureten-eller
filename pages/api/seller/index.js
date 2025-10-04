// pages/api/seller/index.js
// Satıcı mağaza profili + IBAN değişim akışı (DEMO).
// Not: Gerçekte Clerk/JWT ile kimlik ve rol kontrolü zorunlu.

import { readAll, upsert, byId, writeAll } from "../../../lib/store.js";

const NAME = "sellers";

function uid(req) {
  return (req.headers["x-user-id"] || "").toString();
}
function isAdmin(req) {
  return (req.headers["x-role"] || "").toString().toLowerCase() === "admin";
}
function now() {
  return new Date().toISOString();
}

function sanitize(s, lim = 500) {
  return String(s || "").trim().slice(0, lim);
}

function pubView(s) {
  // Herkese açık alanlar
  return {
    id: s.id,
    displayName: s.displayName || "",
    slug: s.slug || "",
    bio: s.bio || "",
    avatar: s.avatar || "",
    cover: s.cover || "",
    badges: Array.isArray(s.badges) ? s.badges : [],
    ratingAvg: Number(s.ratingAvg || 0),
    ratingCount: Number(s.ratingCount || 0),
    createdAt: s.createdAt,
    updatedAt: s.updatedAt,
  };
}

function ensureSeller(id) {
  const all = readAll(NAME);
  let s = all.find((x) => String(x.id) === String(id));
  if (!s) {
    s = {
      id: String(id),
      displayName: "",
      slug: "",
      bio: "",
      avatar: "",
      cover: "",
      badges: [],
      ratingAvg: 0,
      ratingCount: 0,
      // Ödeme tarafı (özel)
      kycStatus: "pending", // pending | approved | rejected
      kyc: {
        type: "individual", // individual | company
        tcknOrVkn: "",
        nameSurnameOrTitle: "",
        taxOffice: "",
        taxNo: "",
        address: "",
        iban: "",
      },
      pendingIban: null, // { iban, requestedAt }
      createdAt: now(),
      updatedAt: now(),
      meta: {},
    };
    upsert(NAME, s);
  }
  return s;
}

export default function handler(req, res) {
  const { method, query } = req;

  if (method === "GET") {
    // /api/seller?id=...&public=1  |  /api/seller?me=1
    const me = query.me === "1";
    const publicOnly = query.public === "1";
    const id = me ? uid(req) : (query.id || "").toString();

    if (!id) return res.status(400).json({ ok: false, error: "id_or_me_required" });

    const s = ensureSeller(id);
    if (publicOnly) return res.status(200).json({ ok: true, seller: pubView(s) });

    // Kendi profiline bakıyorsa özel alanları da ver
    const isSelf = uid(req) && String(uid(req)) === String(id);
    if (!isSelf && !isAdmin(req)) {
      // Başkasının özel bilgileri gösterilmez
      return res.status(200).json({ ok: true, seller: pubView(s) });
    }
    return res.status(200).json({ ok: true, seller: s });
  }

  if (method === "PATCH") {
    // Aksiyonlar:
    // - updateProfile: mağaza adı/bio/görseller/rozetler
    // - requestIbanChange: IBAN değişimi talebi (onay bekler)
    // - approveIbanChange: ADMIN onayı
    // - setKyc: KYC alanlarını güncelle (admin veya ilk kurulumda satıcı)
    try {
      const body =
        typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
      const action = String(body.action || "");
      if (!action) return res.status(400).json({ ok: false, error: "action_required" });

      const id = String(body.id || uid(req) || "");
      if (!id) return res.status(400).json({ ok: false, error: "id_required" });

      const s = ensureSeller(id);

      switch (action) {
        case "updateProfile": {
          const isSelf = uid(req) && String(uid(req)) === String(id);
          if (!isSelf && !isAdmin(req)) return res.status(403).json({ ok: false, error: "forbidden" });

          s.displayName = sanitize(body.displayName, 100) || s.displayName || "";
          s.slug = sanitize(body.slug || s.slug, 120).toLowerCase().replace(/\s+/g, "-");
          s.bio = sanitize(body.bio, 800);
          if (body.avatar !== undefined) s.avatar = String(body.avatar || "");
          if (body.cover !== undefined) s.cover = String(body.cover || "");
          if (Array.isArray(body.badges)) s.badges = body.badges.slice(0, 12).map(String);
          s.updatedAt = now();
          break;
        }

        case "requestIbanChange": {
          const isSelf = uid(req) && String(uid(req)) === String(id);
          if (!isSelf) return res.status(403).json({ ok: false, error: "forbidden" });

          const newIban = sanitize(body.iban || "", 50).replace(/\s+/g, "");
          if (!/^TR\d{24}$/.test(newIban.toUpperCase()))
            return res.status(400).json({ ok: false, error: "invalid_iban" });

          s.pendingIban = { iban: newIban, requestedAt: now() };
          s.updatedAt = now();
          break;
        }

        case "approveIbanChange": {
          if (!isAdmin(req)) return res.status(403).json({ ok: false, error: "admin_only" });
          if (!s.pendingIban) return res.status(409).json({ ok: false, error: "no_pending_iban" });

          s.kyc = { ...(s.kyc || {}), iban: s.pendingIban.iban };
          s.pendingIban = null;
          s.updatedAt = now();
          break;
        }

        case "setKyc": {
          // İlk başvuru: satıcı doldurur; onay/reddetme: admin
          const isSelf = uid(req) && String(uid(req)) === String(id);
          const allow = isSelf || isAdmin(req);
          if (!allow) return res.status(403).json({ ok: false, error: "forbidden" });

          const k = s.kyc || {};
          if (body.kyc?.type) k.type = body.kyc.type === "company" ? "company" : "individual";
          if (body.kyc?.tcknOrVkn) k.tcknOrVkn = sanitize(body.kyc.tcknOrVkn, 20);
          if (body.kyc?.nameSurnameOrTitle) k.nameSurnameOrTitle = sanitize(body.kyc.nameSurnameOrTitle, 160);
          if (body.kyc?.taxOffice) k.taxOffice = sanitize(body.kyc.taxOffice, 100);
          if (body.kyc?.taxNo) k.taxNo = sanitize(body.kyc.taxNo, 30);
          if (body.kyc?.address) k.address = sanitize(body.kyc.address, 400);
          if (body.kyc?.iban) {
            const v = sanitize(body.kyc.iban, 50).replace(/\s+/g, "");
            if (!/^TR\d{24}$/.test(v.toUpperCase()))
              return res.status(400).json({ ok: false, error: "invalid_iban" });
            k.iban = v;
          }
          s.kyc = k;

          if (typeof body.kycStatus === "string") {
            // admin kycStatus değiştirebilir
            if (!isAdmin(req)) return res.status(403).json({ ok: false, error: "admin_only" });
            const st = body.kycStatus;
            if (!["pending", "approved", "rejected"].includes(st)) {
              return res.status(400).json({ ok: false, error: "invalid_kyc_status" });
            }
            s.kycStatus = st;
          }
          s.updatedAt = now();
          break;
        }

        default:
          return res.status(400).json({ ok: false, error: "unknown_action" });
      }

      const saved = upsert(NAME, s);
      return res.status(200).json({ ok: true, seller: saved });
    } catch (e) {
      return res.status(500).json({ ok: false, error: "seller_update_failed" });
    }
  }

  res.setHeader("Allow", ["GET", "PATCH"]);
  return res.status(405).end("Method Not Allowed");
}
