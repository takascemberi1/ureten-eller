// pages/api/wallet/my.js
// CÜZDAN ÖZETİ (DEMO)
// - Satıcı için: blokede (escrowHeld), çekilebilir (withdrawable), ödenen (paidOut)
// - Müşteri için: hepsi 0 döner (cüzdan mantığı satıcıya ait)
// Not: Gerçekte bu rakamlar PSP/webhook/payout kayıtlarıyla tutulur.

import { getAuth } from "@clerk/nextjs/server";
import { readAll } from "../../../lib/store.js";

function sum(arr) {
  return Number(
    (arr || [])
      .map((x) => Number(x || 0))
      .filter((n) => Number.isFinite(n))
      .reduce((a, b) => a + b, 0)
      .toFixed(2)
  );
}

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end("Method Not Allowed");
  }

  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ ok: false, error: "unauthorized" });

  // Demo veri kaynakları
  const orders = readAll("orders");   // /api/pay/mock/checkout ve /api/orders üzerinden oluşuyor
  const payouts = readAll("payouts"); // ödemeye çıkılan kayıtlar (opsiyonel; yoksa boş gelir)

  // Bu kullanıcının SATICI olduğu siparişler
  const mySellerOrders = (orders || []).filter((o) => o && o.sellerId === userId);

  // Blokede (escrowHeld): ödeme alındı ama henüz satıcıya çözülmedi
  // paid / preparing / shipped / delivered (released değil), dispute/refund yok
  const escrowHeld = sum(
    mySellerOrders
      .filter((o) => {
        if (!o) return false;
        const st = o.status;
        const escrow = o.escrow || {};
        const hasDispute = Boolean(o.dispute && o.dispute.open);
        const refunded = st === "refunded";
        const canceled = st === "canceled";
        const eligibleState = ["paid", "preparing", "shipped", "delivered"].includes(st);
        return escrow.held === true && eligibleState && !hasDispute && !refunded && !canceled;
      })
      .map((o) => o.amount)
  );

  // Çekilebilir (withdrawable): released olan ama henüz payout yapılmamış tutarlar
  const releasedSum = sum(
    mySellerOrders
      .filter((o) => o && o.status === "released")
      .map((o) => o.amount)
  );

  // Bu satıcıya yapılmış payout toplamı
  const myPayouts = (payouts || []).filter((p) => p && p.sellerId === userId);
  const paidOut = sum(myPayouts.map((p) => p.amount));

  const withdrawable = Math.max(0, Number((releasedSum - paidOut).toFixed(2)));

  // Son 10 payout kaydı (demo)
  const lastPayouts = myPayouts
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
    .slice(0, 10);

  return res.status(200).json({
    ok: true,
    wallet: {
      currency: "TRY",
      escrowHeld,
      withdrawable,
      paidOut,
      lastPayouts,
    },
    meta: {
      ordersReleasedCount: mySellerOrders.filter((o) => o && o.status === "released").length,
      ordersEscrowCount: mySellerOrders.filter(
        (o) =>
          o &&
          o.escrow?.held === true &&
          ["paid", "preparing", "shipped", "delivered"].includes(o.status)
      ).length,
    },
  });
}
