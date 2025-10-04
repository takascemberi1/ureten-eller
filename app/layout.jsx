export const metadata = {
  title: "Üreten Eller",
  description: "Üreten Eller pazar yeri"
};

export default function RootLayout({ children }) {
  const footerStyle = {
    background: "#0b0b0f",
    color: "#e5e7eb",
    marginTop: "32px",
  };
  const wrapStyle = { maxWidth: "1100px", margin: "0 auto", padding: "0 16px" };
  const gridStyle = {
    display: "grid",
    gap: "24px",
    padding: "28px 0",
    gridTemplateColumns: "repeat(3,1fr)"
  };
  const h4Style = { margin: "0 0 8px 0", color: "#fff" };
  const linkStyle = { display: "block", color: "#d1d5db", textDecoration: "none", margin: "6px 0" };
  const copyStyle = { borderTop: "1px solid #232329", padding: "12px 0", textAlign: "center" };

  return (
    <html lang="tr">
      <body style={{background:"#f8fafc", minHeight:"100vh", margin:0}}>
        {children}

        {/* Siyah mega-footer (tüm sayfalarda altta) */}
        <footer style={footerStyle}>
          <div style={wrapStyle}>
            <div style={gridStyle}>
              <section>
                <h4 style={h4Style}>Kurumsal</h4>
                <a href="/legal/hakkimizda" style={linkStyle}>Hakkımızda</a>
                <a href="/legal/iletisim" style={linkStyle}>İletişim</a>
                <a href="/legal/gizlilik" style={linkStyle}>Gizlilik</a>
                <a href="/legal/kvkk-aydinlatma" style={linkStyle}>KVKK Aydınlatma</a>
              </section>
              <section>
                <h4 style={h4Style}>Gizlilik &amp; Kullanım</h4>
                <a href="/legal/kullanim-sartlari" style={linkStyle}>Kullanım Şartları</a>
                <a href="/legal/mesafeli-satis-sozlesmesi" style={linkStyle}>Mesafeli Satış</a>
                <a href="/legal/teslimat-iade" style={linkStyle}>Teslimat &amp; İade</a>
                <a href="/legal/cerez-politikasi" style={linkStyle}>Çerez Politikası</a>
              </section>
              <section>
                <h4 style={h4Style}>Yardım</h4>
                <a href="/legal/topluluk-kurallari#yasakli-urunler" style={linkStyle}>Yasaklı Ürünler</a>
                <a href="/legal" style={linkStyle}>Tüm Legal</a>
                <a href="/" style={linkStyle}>Ana Sayfa</a>
              </section>
            </div>
            <div style={copyStyle}>© {new Date().getFullYear()} Üreten Eller</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
