export default function Page(){
  return (
    <main style={{maxWidth:880,margin:"40px auto",padding:"0 16px",fontFamily:"system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial"}}>
      <h1 style={{fontSize:28,marginBottom:12}}>Gizlilik</h1>
      <p style={{color:"#475569",lineHeight:1.6}}>
        Bu sayfa statik yayın için Pages Router altında oluşturuldu.
        İçeriği dilediğiniz zaman güncelleyebiliriz.
      </p>
      <a href="/"
         style={{display:"inline-block",marginTop:16,padding:"10px 14px",borderRadius:10,
                 background:"#111827",color:"#fff",textDecoration:"none",fontWeight:700}}>
        Ana sayfaya dön
      </a>
    </main>
  );
}
