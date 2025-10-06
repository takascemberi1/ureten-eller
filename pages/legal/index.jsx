export default function LegalIndex(){
  const links = [
    ["hakkimizda","Hakkımızda"],
    ["iletisim","İletişim"],
    ["gizlilik","Gizlilik"],
    ["kvkk-aydinlatma","KVKK Aydınlatma"],
    ["kullanim-sartlari","Kullanım Şartları"],
    ["mesafeli-satis-sozlesmesi","Mesafeli Satış Sözleşmesi"],
    ["teslimat-iade","Teslimat & İade"],
    ["cerez-politikasi","Çerez Politikası"],
    ["topluluk-kurallari","Topluluk Kuralları"],
  ];
  return (
    <main style={{maxWidth:880,margin:"40px auto",padding:"0 16px",fontFamily:"system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial"}}>
      <h1 style={{fontSize:28,marginBottom:12}}>Kurumsal</h1>
      <ul style={{lineHeight:1.9}}>
        {links.map(([slug,label])=>(
          <li key={slug}><a href={`/legal/${slug}`} style={{color:"#0f172a"}}>{label}</a></li>
        ))}
      </ul>
      <a href="/"
         style={{display:"inline-block",marginTop:16,padding:"10px 14px",borderRadius:10,
                 background:"#111827",color:"#fff",textDecoration:"none",fontWeight:700}}>
        Ana sayfaya dön
      </a>
    </main>
  );
}
