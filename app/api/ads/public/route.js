// app/api/ads/public/route.js
import { NextResponse } from "next/server";

/** Ensure this endpoint is never statically cached */
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * In-memory store (no fake numbers/data prefilled).
 * Starts empty; you can POST to add real ads.
 */
const store = {
  featured: [],
  latest: [],
};

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = clampInt(searchParams.get("limit"), 20, 1, 100);
    const cat = searchParams.get("cat") || "";

    // Filter (optional by category)
    let featured = store.featured;
    let latest = store.latest;
    if (cat) {
      featured = featured.filter((a) => (a.cat || "") === cat);
      latest = latest.filter((a) => (a.cat || "") === cat);
    }

    // Shape expected by frontend: { items, featured, latest }
    const latestLimited = latest.slice(0, limit);
    const payload = {
      featured,
      latest: latestLimited,
      items: latestLimited,
    };

    return NextResponse.json(payload, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Internal error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, cat = "", price = "", img = "", url = "", isFeatured = false } =
      body || {};

    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "title required" }, { status: 400 });
    }

    const ad = {
      id: Date.now().toString(36),
      title: title.trim(),
      cat,
      price,
      img,
      url,
      createdAt: new Date().toISOString(),
    };

    // Add to stores (newest first)
    store.latest.unshift(ad);
    if (isFeatured) store.featured.unshift(ad);

    return NextResponse.json({ ok: true, ad }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Invalid JSON" },
      { status: 400 }
    );
  }
}

function clampInt(v, def, min, max) {
  const n = parseInt(v ?? def, 10);
  if (Number.isNaN(n)) return def;
  return Math.max(min, Math.min(max, n));
}
