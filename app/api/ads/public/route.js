export async function GET(request) {
  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get('limit') || '20', 10);

  // Ortam değişkenlerinden ya da boş dizi
  let featured = [];
  let latest = [];
  try { featured = JSON.parse(process.env.FEATURED_ADS || '[]'); } catch {}
  try { latest   = JSON.parse(process.env.ADS || '[]'); } catch {}

  // Hiç ilan yoksa demo veri
  if (!Array.isArray(latest) || latest.length === 0) {
    latest = [
      { id:"demo-1", title:"Demo İlan 1", cat:"Örnek", price:"₺100", img:"" },
      { id:"demo-2", title:"Demo İlan 2", cat:"Örnek", price:"₺150", img:"" },
      { id:"demo-3", title:"Demo İlan 3", cat:"Örnek", price:"₺200", img:"" }
    ];
  }

  const body = {
    items: latest.slice(0, limit),
    featured,
    latest
  };

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
