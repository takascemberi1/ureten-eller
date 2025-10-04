// app/layout.jsx — SERVER COMPONENT
export const metadata = {
  title: 'Üreten Eller',
  description: 'El emeği ürünler pazaryeri'
}

export default function RootLayout({ children }) {
  const year = new Date().getFullYear()
  return (
    <html lang="tr">
      <body style={{margin:0,fontFamily:'system-ui, Segoe UI, Roboto, Inter, Arial, sans-serif',color:'#0f172a',background:'#f8fafc'}}>
        <header style={{padding:'10px 14px',background:'#fff',borderBottom:'1px solid #eee',position:'sticky',top:0,zIndex:10}}>
          <div style={{maxWidth:1100,margin:'0 auto',display:'flex',alignItems:'center',gap:10}}>
            <img src="/assets/images/logo.png" alt="logo" width="36" height="36" style={{borderRadius:8}}/>
            <strong>Üreten Eller</strong>
            <nav style={{marginLeft:'auto',display:'flex',gap:10}}>
              <a href="/">Ana Sayfa</a>
              <a href="/legal/gizlilik">Gizlilik</a>
              <a href="/legal/kullanim-sartlari">Kullanım</a>
              <a href="/legal/iletisim">İletişim</a>
            </nav>
          </div>
        </header>

        <main style={{minHeight:'70vh'}}>{children}</main>

        <footer style={{background:'#fff',borderTop:'1px solid #eee',padding:'16px 14px'}}>
          <div style={{maxWidth:1100,margin:'0 auto'}}>
            <div style={{display:'flex',flexWrap:'wrap',gap:10,marginBottom:8}}>
              <a href="/legal/gizlilik">Gizlilik</a>
              <a href="/legal/hakkimizda">Hakkımızda</a>
              <a href="/legal/iletisim">İletişim</a>
              <a href="/legal/kullanim-sartlari">Kullanım Şartları</a>
              <a href="/legal/kvkk-aydinlatma">KVKK Aydınlatma</a>
              <a href="/legal/mesafeli-satis-sozlesmesi">Mesafeli Satış</a>
              <a href="/legal/teslimat-iade">Teslimat & İade</a>
            </div>
            <div style={{fontSize:13,color:'#475569'}}>
              © {year} Üreten Eller • Tüm hakları saklıdır.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
