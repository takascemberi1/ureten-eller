// app/legal/layout.jsx — Tüm yasal sayfalara ortak çatı
// Not: Bu segment bir "layout" olduğu için yalnızca bu klasör altındaki sayfaları sarar.
// Root layout (app/layout.jsx) zaten <html>/<body> içerdiğinden burada sadece kapsayıcı döndürüyoruz.

export default function LegalLayout({ children }) {
  return (
    <div style={styles.shell}>
      <header style={styles.header}>
        <div style={styles.container}>
          <a href="/" style={styles.brand}>Üreten Eller</a>
          <div style={{flex:1}} />
          <LangLinks />
        </div>
      </header>

      {/* Üst menü (hızlı erişim) */}
      <nav style={styles.topnav}>
        <div style={styles.container}>
          <a href="/legal/hakkimizda" className="l">Hakkımızda</a>
          <a href="/legal/iletisim" className="l">İletişim</a>
          <a href="/legal/gizlilik" className="l">Gizlilik</a>
          <a href="/legal/kvkk-aydinlatma" className="l">KVKK</a>
          <a href="/legal/kullanim-sartlari" className="l">Kullanım Şartları</a>
          <a href="/legal/mesafeli-satis-sozlesmesi" className="l">Mesafeli Satış</a>
          <a href="/legal/teslimat-iade" className="l">Teslimat & İade</a>
        </div>
      </nav>

      <main style={styles.main}>
        <div style={styles.container}>{children}</div>
      </main>

      {/* Alt panel — Amazon/Sahibinden tarzı bölmeli footer (yalnız mevcut sayfalara link veriyoruz) */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.grid}>
            <section>
              <h4 style={styles.h4}>Kurumsal</h4>
              <ul style={styles.ul}>
                <li><a href="/legal/hakkimizda">Hakkımızda</a></li>
                <li><a href="/legal/iletisim">İletişim</a></li>
                <li><a href="/legal/kullanim-sartlari">Kullanım Şartları</a></li>
                <li><a href="/legal/gizlilik">Gizlilik Politikası</a></li>
              </ul>
            </section>
            <section>
              <h4 style={styles.h4}>Güven & Haklar</h4>
              <ul style={styles.ul}>
                <li><a href="/legal/kvkk-aydinlatma">KVKK Aydınlatma</a></li>
                <li><a href="/legal/mesafeli-satis-sozlesmesi">Mesafeli Satış Sözleşmesi</a></li>
                <li><a href="/legal/teslimat-iade">Teslimat & İade</a></li>
                <li><a href="/legal/gizlilik#cookies">Çerezler</a></li>
              </ul>
            </section>
            <section>
              <h4 style={styles.h4}>Yardım</h4>
              <ul style={styles.ul}>
                <li><a href="/legal/iletisim#destek">Müşteri Hizmetleri</a></li>
                <li><a href="/legal/teslimat-iade#iade">İade / Uyuşmazlık</a></li>
                <li><a href="/legal/teslimat-iade#kargo">Kargo Takibi</a></li>
              </ul>
            </section>
            <section>
              <h4 style={styles.h4}>Diller</h4>
              <ul style={styles.ul}>
                <li><a href="?lang=tr">Türkçe</a></li>
                <li><a href="?lang=en">English</a></li>
                <li><a href="?lang=ar">العربية</a></li>
                <li><a href="?lang=de">Deutsch</a></li>
              </ul>
            </section>
          </div>

          <div style={styles.hr} />

          <div style={styles.bottomRow}>
            <div style={{display:'flex',alignItems:'center',gap:12,flexWrap:'wrap'}}>
              {/* İstersen /public içine payments.png koyup buraya çekebiliriz */}
              <img src="/assets/payments.png" alt="Ödeme kartları" height={22} style={{opacity:.9}}/>
              <small style={{opacity:.8}}>© {new Date().getFullYear()} Üreten Eller • Tüm hakları saklıdır.</small>
            </div>
            <LangLinks compact/>
          </div>
        </div>
      </footer>

      <style>{css}
      </style>
    </div>
  );
}

// Basit dil linkleri (query-string tabanlı). Bu bileşen interaktif değil, client'a gerek yok.
function LangLinks({ compact }){
  const base = typeof window !== 'undefined' ? window.location.pathname : '/legal';
  const mk = (code, label)=> `${base}?lang=${code}`;
  return (
    <div style={compact? styles.langCompact : styles.lang}>
      <a href={mk('tr','Türkçe')}>TR</a>
      <a href={mk('en','English')}>EN</a>
      <a href={mk('ar','العربية')}>AR</a>
      <a href={mk('de','Deutsch')}>DE</a>
    </div>
  );
}

// --- Stil ---
const styles = {
  shell:{background:'#fff',color:'#0f172a'},
  container:{maxWidth:1100,margin:'0 auto',padding:'12px 14px'},
  header:{position:'sticky',top:0,zIndex:30,backdropFilter:'blur(8px)',background:'rgba(255,255,255,.9)',borderBottom:'1px solid #e5e7eb'},
  brand:{textDecoration:'none',fontWeight:800,color:'#111827'},
  topnav:{borderBottom:'1px solid #e5e7eb',background:'#f8fafc'},
  main:{minHeight:'60vh'},
  footer:{borderTop:'1px solid #e5e7eb',background:'#fff'},
  grid:{display:'grid',gap:16,gridTemplateColumns:'repeat(4,minmax(0,1fr))'},
  h4:{margin:'8px 0',fontSize:15},
  ul:{listStyle:'none',padding:0,margin:0,display:'grid',gap:6},
  hr:{height:1,background:'#e5e7eb',margin:'12px 0'},
  bottomRow:{display:'flex',alignItems:'center',justifyContent:'space-between',gap:10,flexWrap:'wrap'},
  lang:{display:'flex',gap:8,alignItems:'center'},
  langCompact:{display:'flex',gap:6,alignItems:'center',opacity:.85}
};

const css = `
  a { color:#111827; text-decoration:none; }
  .l { color:#111827; text-decoration:none; border:1px solid #e5e7eb; padding:6px 10px; border-radius:999px; font-weight:700; }
  .l:hover { background:#111827; color:#fff; border-color:#111827; }
  footer a { opacity:.9 }
  @media (max-width: 900px){
    .grid { grid-template-columns: repeat(2,minmax(0,1fr)) !important }
  }
  @media (max-width: 560px){
    .grid { grid-template-columns: 1fr !important }
  }
`;
