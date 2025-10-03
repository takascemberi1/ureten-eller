// pages/api/ads/public.js
export default function handler(req, res) {
  const limit = parseInt(req.query.limit || '20', 10);
  // Demo/sahte sayı yok: boş dizi döndürüyoruz (ön yüzde localStorage varsa zaten onu kullanıyorsun)
  res.status(200).json({ items: [], latest: [], featured: [], limit });
}
