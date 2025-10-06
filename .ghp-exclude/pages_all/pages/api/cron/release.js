// pages/api/cron/release.js
// DEMO: Teslimden >=24 saat geçtiyse ve itiraz/y iade yoksa "released" yapar.
// Güvenlik: CRON_SECRET varsa, ?secret=... ile eşleşmeli.
// Çalıştırma: 6 saatte bir Render/Vercel/Netlify cron ile tetikle.

import { readAll, upsert } from "../../../lib/store.js";

const HOURS = 24;

function now(){ return new Date().toISOString(); }
function ms(x){ return x.getTime(); }

function findDeliveredAt(order){
  const tl = (order.meta?.timeline) || [];
  // en son "delivered" kaydını bul
  for (let i = tl.length - 1; i >= 0; i--) {
    if (tl[i].type === "delivered" && tl[i].at) return new Date(tl[i].at);
  }
  // alan yoksa createdAt’a düş
  return order.deliveredAt ? new Date(order.deliveredAt) : (order.updatedAt ? new Date(order.updatedAt) : new Date());
}

export default function handler(req, res){
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", ["GET","POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  // Basit koruma
  const need = process.env.CRON_SECRET;
  const got = (req.query.secret || "").toString();
  if (need && got !== need) return res.status(401).json({ ok:false, error:"unauthorized" });

  try{
    const all = readAll("orders");
    const nowDt = new Date();
    const releasedIds = [];

    for (const order of all) {
      if (order.status !== "delivered") continue;
      if (order.meta?.disputeOpen) continue;
      if (order.escrow && order.escrow.held === false) continue; // zaten çözülmüş
      // iade/iptal değil
      if (["refunded","canceled"].includes(order.status)) continue;

      const deliveredAt = findDeliveredAt(order);
      const diffHrs = (ms(nowDt) - ms(deliveredAt)) / 36e5;

      if (diffHrs >= HOURS) {
        order.status = "released";
        order.escrow = { ...(order.escrow||{}), held: false };
        order.releasedAt = now();
        order.updatedAt = order.releasedAt;

        const tl = (order.meta?.timeline)||[];
        tl.push({ type:"auto_release", at: order.releasedAt, afterHours: HOURS });
        order.meta = { ...(order.meta||{}), timeline: tl };

        upsert("orders", order);
        releasedIds.push(order.id);
      }
    }

    return res.status(200).json({ ok:true, processed: releasedIds.length, releasedIds });
  }catch(e){
    return res.status(500).json({ ok:false, error:"cron_release_failed" });
  }
}
