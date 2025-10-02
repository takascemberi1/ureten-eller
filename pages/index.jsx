export default function Home() {
  return (
    <main style={wrap}>
      <header style={head}>
        <img src="/assets/images/logo.png" alt="Üreten Eller" width={56} height={56} />
        <div>
          <h1 style={h1}>Üreten Ellere Hoş Geldiniz</h1>
          <p style={lead}>Kadın odaklı, sade ve güvenli giriş.</p>
        </div>
      </header>

      <section style={grid}>
        <a href="/login?role=seller" style={card("#fde7f3", "#e9d5ff")}>
          <h2 style={title}>Üreten El Portalı</h2>
          <p style={text}>İlan ver, ürün/hizmetlerini yönet.</p>
          <button style={btnDark}>Portala Gir</button>
        </a>

        <a href="/login?role=customer" style={card("#e0f2fe", "#e6fffb")}>
          <h2 style={title}>Müşteri Portalı</h2>
          <p style={text}>Ürün/hizmet ara, sipariş ver.</p>
          <button style={btnDark}>Portala Gir</button>
        </a>
      </section>

      <p style={tip}>Butona tıklayınca önce giriş/kayıt ekranı açılır.</p>
    </main>
  );
}

/* ---- styles ---- */
const wrap = {
  maxWidth: 960, margin: "0 auto", padding: "24px",
  fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif",
};
const head = { display: "flex", alignItems: "center", gap: 12, marginBottom: 24 };
const h1 = { margin: "0 0 6px", fontSize: 28 };
const lead = { margin: 0, color: "#64748b" };
const grid = {
  display: "grid", gap: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
};
const card = (c1, c2) => ({
  display: "grid", gap: 10, textDecoration: "none", padding: 18, borderRadius: 18,
  background: `linear-gradient(135deg, ${c1}, ${c2})`,
  border: "1px solid #e5e7eb", color: "#111",
});
const title = { margin: "4px 0 0", fontSize: 22 };
const text = { margin: "0 0 8px", color: "#475569" };
const btnDark = {
  padding: "10px 14px", borderRadius: 999, background: "#111827",
  color: "#fff", border: "none", width: "fit-content", cursor: "pointer",
};
const tip = { marginTop: 16, color: "#64748b" };
