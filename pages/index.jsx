import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  const go = (href) => { window.location.href = href; };
  const needAuth = (role) => {
    alert("Önce kayıt olmalısınız.");
    window.location.href = `/login?role=${role}`;
  };

  const CATS = [
    { icon:"🍲", title:"Yemekler", subs:["Ev yemekleri","Börek-çörek","Çorba","Zeytinyağlı","Pilav-makarna","Et-tavuk","Kahvaltılık","Meze","Dondurulmuş","Çocuk öğünleri","Diyet/vegan/gf"] },
    { icon:"🎂", title:"Pasta & Tatlı", subs:["Yaş pasta","Kek-cupcake","Kurabiye","Şerbetli","Sütlü","Cheesecake","Diyet tatlı","Çikolata/şekerleme","Doğum günü setleri"] },
    { icon:"🫙", title:"Reçel • Turşu • Sos", subs:["Reçel-marmelat","Pekmez","Turşu","Domates/biber sos","Acı sos","Salça","Sirke","Konserve"] },
    { icon:"🌾", title:"Yöresel / Kışlık", subs:["Erişte","Tarhana","Yufka","Mantı","Kurutulmuş sebze-meyve","Salça","Sirke","Konserve"] },
    { icon:"🥗", title:"Diyet / Vegan / Glutensiz", subs:["Fit tabaklar","Vegan yemekler","GF unlu mamuller","Şekersiz tatlı","Keto ürün","Protein atıştırmalık"] },
    { icon:"💍", title:"Takı", subs:["Bileklik","Kolye","Küpe","Yüzük","Halhal","Broş","Setler","İsimli/kişiye özel","Makrome","Doğal taş","Reçine","Tel sarma"] },
    { icon:"👶", title:"Bebek & Çocuk", subs:["Hayvan/bebek figürleri","Çıngırak","Diş kaşıyıcı örgü","Bez oyuncak/kitap","Montessori oyuncak","Setler","Örgü patik-bere","Bebek battaniyesi","Önlük-ağız bezi","Lohusa seti","Saç aksesuarı","El emeği kıyafet"] },
    { icon:"🧶", title:"Örgü / Triko", subs:["Hırka","Kazak","Atkı-bere","Panço","Şal","Çorap","Bebek takımı","Yelek","Kırlent-örtü"] },
    { icon:"✂️", title:"Dikiş / Terzilik", subs:["Paça/onarım","Fermuar değişimi","Perde dikişi","Nevresim-yastık","Masa örtüsü","Özel dikim","Kostüm"] },
    { icon:"🧵", title:"Makrome & Dekor", subs:["Duvar süsü","Saksı askısı","Anahtarlık","Avize","Amerikan servis/runner","Sepet","Raf/duvar dekoru"] },
    { icon:"🏠", title:"Ev Dekor & Aksesuar", subs:["Keçe işleri","Kırlent","Kapı süsü","Tepsi süsleme","Çerçeve","Rüya kapanı","Tablo"] },
    { icon:"🕯️", title:"Mum & Kokulu Ürünler", subs:["Soya/balmumu mum","Kokulu taş","Oda spreyi","Tütsü","Jel mum","Hediye seti"] },
    { icon:"🧼", title:"Doğal Sabun & Kozmetik", subs:["Zeytinyağlı sabun","Bitkisel sabunlar","Katı şampuan","Dudak balmı","Krem/merhem","Banyo tuzu","Lavanta kesesi"] },
    { icon:"🧸", title:"Amigurumi & Oyuncak (dekoratif)", subs:["Anahtarlık","Magnet","Koleksiyon figürü","Dekor bebek/karakter","İsimli amigurumi"] },
  ];

  return (
    <main className="wrap">
      <section className="hero">
        <img src="/assets/images/logo.png" alt="Üreten Eller" width="72" height="72" className="logo"/>
        <h1>Üreten Eller</h1>
        <h2>Üreten Ellere Hoş Geldiniz</h2>
        <p className="lead">
          Amacımız: <strong>ev hanımlarına bütçe katkısı</strong> sağlamak ve
          müşterilere <strong>uygun fiyatlı</strong> ürünlere erişim imkânı sunmak.
        </p>

        <div className="ctaRow">
          {/* Üreten El */}
          <SignedOut>
            <button className="btnPrimary" onClick={()=>needAuth("seller")}>
              Üreten El Portalı
            </button>
          </SignedOut>
          <SignedIn>
            <button className="btnPrimary" onClick={()=>go("/portal/seller")}>
              Üreten El Portalı
            </button>
          </SignedIn>

          {/* Müşteri */}
          <SignedOut>
            <button className="btnGhost" onClick={()=>needAuth("customer")}>
              Müşteri Portalı
            </button>
          </SignedOut>
          <SignedIn>
            <button className="btnGhost" onClick={()=>go("/portal/customer")}>
              Müşteri Portalı
            </button>
          </SignedIn>
        </div>
      </section>

      <section className="cats">
        <h3>Kategorilerimiz</h3>
        <div className="grid">
          {CATS.map((c, i)=>(
            <article key={i} className="card">
              <div className="cardHead">
                <span className="icon" aria-hidden>{c.icon}</span>
                <h4>{c.title}</h4>
              </div>
              <ul className="subs">
                {c.subs.map((s, k)=>(<li key={k}>{s}</li>))}
              </ul>
              <div className="cardActions">
                <SignedOut>
                  <button className="mini" onClick={()=>needAuth("customer")}>Sipariş Ver</button>
                  <button className="mini" onClick={()=>needAuth("seller")}>İlan Ver</button>
                </SignedOut>
                <SignedIn>
                  <button className="mini" onClick={()=>go("/portal/customer")}>Sipariş Ver</button>
                  <button className="mini" onClick={()=>go("/portal/seller")}>İlan Ver</button>
                </SignedIn>
              </div>
            </article>
          ))}
        </div>
      </section>

      <style jsx global>{`
        :root{
          --ink:#0f172a; --muted:#475569;
          --paper: rgba(255,255,255,.82);
          --line: rgba(255,255,255,.5);
          --c1:#ff80ab; --c2:#a78bfa; --c3:#60a5fa; --c4:#34d399;
        }
        html,body{height:100%}
        body{
          margin:0; color:var(--ink);
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif;
          background:
            radial-gradient(1200px 800px at -10% -10%, rgba(255,255,255,.35), transparent 60%),
            linear-gradient(120deg, var(--c1), var(--c2), var(--c3), var(--c4));
          background-size: 300% 300%;
          animation: drift 16s ease-in-out infinite;
        }
        @keyframes drift{
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
        }
        .wrap{max-width:1100px; margin:0 auto; padding:32px 20px;}
        .hero{display:grid; place-items:center; text-align:center; gap:10px; padding:60px 0 30px;}
        .logo{filter: drop-shadow(0 8px 20px rgba(0,0,0,.15)); border-radius:20px}
        h1{margin:8px 0 0; font-size:42px; letter-spacing:.3px}
        h2{margin:2px 0 4px; font-size:24px; color:#1f2937}
        .lead{max-width:760px; color:var(--muted); margin:0 auto 18px; font-size:16px}
        .ctaRow{display:flex; gap:12px; flex-wrap:wrap; justify-content:center; margin-top:8px}
        .btnPrimary{
          padding:12px 18px; border-radius:999px; border:none; cursor:pointer;
          background:#111827; color:#fff; font-weight:600; box-shadow:0 8px 24px rgba(0,0,0,.15);
        }
        .btnGhost{
          padding:12px 18px; border-radius:999px; cursor:pointer; font-weight:600;
          background:var(--paper); border:1px solid var(--line); color:#111827; backdrop-filter: blur(8px);
        }

        .cats h3{font-size:22px; margin:26px 0 14px;}
        .grid{
          display:grid; gap:14px;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }
        .card{
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: 18px;
          padding:16px;
          backdrop-filter: blur(8px);
          box-shadow: 0 12px 28px rgba(0,0,0,.08);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .card:hover{ transform: translateY(-4px); box-shadow:0 16px 36px rgba(0,0,0,.12); }
        .cardHead{display:flex; align-items:center; gap:10px; margin-bottom:8px}
        .icon{font-size:22px}
        h4{margin:0; font-size:18px}
        .subs{
          display:flex; flex-wrap:wrap; gap:8px; list-style:none; padding:0; margin:10px 0 12px;
        }
        .subs li{
          padding:6px 10px; border-radius:999px; font-size:12px;
          background: rgba(255,255,255,.9); border:1px solid #e5e7eb;
        }
        .cardActions{display:flex; gap:8px; flex-wrap:wrap}
        .mini{
          padding:8px 10px; border-radius:10px; border:1px solid #e5e7eb; background:#fff; cursor:pointer;
        }

        /* kadın ağırlıklı, pastel dokunuş: kart kenarlığı ve vurgu */
        .card:nth-child(3n+1){ border-color:#fbcfe8; }
        .card:nth-child(3n+2){ border-color:#e9d5ff; }
        .card:nth-child(3n+3){ border-color:#bae6fd; }
      `}</style>
    </main>
  );
}
