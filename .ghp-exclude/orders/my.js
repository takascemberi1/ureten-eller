// pages/api/orders/my.js
// Kullanıcının (alıcı veya satıcı) sipariş listesini döner.
// Clerk kimliğine göre filtreler. Demo depolama için lib/store.js kullanır.

import { getAuth } from "@clerk/nextjs/server";
import { readAll } from "../../lib/store.js";

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end("Method Not Allowed");
  }

  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ ok: false, error: "unauthorized" });

  // orders koleksiyonundaki tüm kayıtları al
  const all = readAll("orders");

  // Bu kullanıcı alıcıysa customerId eşleşir; satıcıysa sellerId eşleşir.
  // İki rolü de tek uçtan servis ediyoruz:
  const mine = all
    .filter(o => o && (o.customerId === userId || o.sellerId === userId))
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));

  // Hassas bir alan tutmuyorsak direkt dönebiliriz (kart bilgisi yok zaten).
  return res.status(200).json({ ok: true, orders: mine });
}
