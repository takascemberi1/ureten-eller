// app/not-found.jsx  -- Server Component
export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <html lang="tr">
      <body style={{fontFamily:'system-ui, Arial', padding:'40px'}}>
        <h1>Sayfa bulunamadı</h1>
        <p>Aradığınız sayfa taşınmış veya kaldırılmış olabilir.</p>
        <a href="/">Ana sayfaya dön</a>
      </body>
    </html>
  );
}
