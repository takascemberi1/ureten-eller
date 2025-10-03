"use client";
import { useEffect, useMemo, useState } from "react";
import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";

/* ----------------------------- DİL AYARLARI ----------------------------- */
const SUPPORTED = ["tr", "en", "ar", "de"];
const LOCALE_LABEL = { tr: "Türkçe", en: "English", ar: "العربية", de: "Deutsch" };

const STR = {
  tr: {
    brand: "Üreten Eller",
    heroTitle: "Üreten Ellere Hoş Geldiniz",
    sellerPortal: "Üreten El Portalı",
    customerPortal: "Müşteri Portalı",
    needAuth: "Önce kayıt olmalısınız.",
    categories: "Kategorilerimiz",
    orderNow: "Sipariş Ver",
    postAd: "İlan Ver",
    listingsTitle: "Son İlanlar",
    inspect: "İncele",
  },
  en: {
    brand: "Ureten Eller",
    heroTitle: "Welcome to Ureten Eller",
    sellerPortal: "Maker Portal",
    customerPortal: "Customer Portal",
    needAuth: "Please sign up first.",
    categories: "Our Categories",
    orderNow: "Order Now",
    postAd: "Post Listing",
    listingsTitle: "Latest Listings",
    inspect: "View",
  },
  ar: {
    brand: "أُنتِج بالأيادي",
    heroTitle: "مرحبًا بكم في منصتنا",
    sellerPortal: "بوابة المُنتِجات",
    customerPortal: "بوابة العملاء",
    needAuth: "يرجى التسجيل أولًا.",
    categories: "تصنيفاتنا",
    orderNow: "اطلب الآن",
    postAd: "أنشئ إعلانًا",
    listingsTitle: "أحدث الإعلانات",
    inspect: "عرض",
  },
  de: {
    brand: "Ureten Eller",
    heroTitle: "Willkommen bei Ureten Eller",
    sellerPortal: "Portal für Anbieterinnen",
    customerPortal: "Kundenportal",
    needAuth: "Bitte zuerst registrieren.",
    categories: "Unsere Kategorien",
    orderNow: "Jetzt bestellen",
    postAd: "Anzeige erstellen",
    listingsTitle: "Neueste Inserate",
    inspect: "Ansehen",
  },
};

/* ----------------------------- 20+ MOTTO (RENKLİ) ----------------------------- */
const PHRASES = {
  tr: [
    { text: "Amacımız: ev hanımlarına bütçe katkısı sağlamak.", color: "#e11d48" },
    { text: "Kadın emeği değer bulsun.", color: "#c026d3" },
    { text: "El emeği ürünler adil fiyata.", color: "#7c3aed" },
    { text: "Mahalle lezzetleri kapınıza gelsin.", color: "#2563eb" },
    { text: "Usta ellerden taze üretim.", color: "#0ea5e9" },
    { text: "Her siparişte platform güvencesi.", color: "#14b8a6" },
    { text: "Küçük üreticiye büyük destek.", color: "#059669" },
    { text: "Şeffaf fiyat, net teslimat.", color: "#16a34a" },
    { text: "Güvenli ödeme, kolay iade.", color: "#65a30d" },
    { text: "Yerelden al, ekonomiye can ver.", color: "#ca8a04" },
    { text: "Emeğin karşılığı, müşteriye kazanç.", color: "#d97706" },
    { text: "Ev yapımı tatlar, el işi güzellikler.", color: "#ea580c" },
    { text: "Her kategoride özenli üretim.", color: "#f97316" },
    { text: "Siparişten teslimata kesintisiz takip.", color: "#f59e0b" },
    { text: "Güvenilir satıcı rozetleri.", color: "#eab308" },
    { text: "Topluluğumuzla daha güçlüyüz.", color: "#84cc16" },
    { text: "Sürdürülebilir üretime destek.", color: "#22c55e" },
    { text: "Adil ticaret, mutlu müşteri.", color: "#10b981" },
    { text: "El emeğine saygı, bütçeye dost fiyat.", color: "#06b6d4" },
    { text: "Kadınların emeğiyle büyüyoruz.", color: "#3b82f6" },
    { text: "Şehrinden taze üretim, güvenle alışveriş.", color: "#6366f1" },
    { text: "Kalite, özen ve şeffaflık.", color: "#8b5cf6" },
    { text: "İhtiyacın olan el emeği burada.", color: "#d946ef" },
    { text: "Uygun fiyat, güvenli süreç, mutlu son.", color: "#ec4899" },
  ],
  en: [
    { text: "Our aim: support household budgets of women.", color: "#e11d48" },
    { text: "Women’s labor should be valued.", color: "#c026d3" },
    { text: "Handmade products at fair prices.", color: "#7c3aed" },
    { text: "Neighborhood flavors to your door.", color: "#2563eb" },
    { text: "Fresh production from skilled hands.", color: "#0ea5e9" },
    { text: "Platform protection on every order.", color: "#14b8a6" },
    { text: "Big support for small producers.", color: "#059669" },
    { text: "Transparent pricing, clear delivery.", color: "#16a34a" },
    { text: "Secure payments, easy returns.", color: "#65a30d" },
    { text: "Buy local, boost the economy.", color: "#ca8a04" },
    { text: "Fair reward for labor, savings for customers.", color: "#d97706" },
    { text: "Homemade tastes, handcrafted beauty.", color: "#ea580c" },
    { text: "Careful production across categories.", color: "#f97316" },
    { text: "Seamless tracking from order to delivery.", color: "#f59e0b" },
    { text: "Trusted seller badges.", color: "#eab308" },
    { text: "Stronger together as a community.", color: "#84cc16" },
    { text: "Support sustainable production.", color: "#22c55e" },
    { text: "Fair trade, happy customers.", color: "#10b981" },
    { text: "Respect for craft, budget-friendly prices.", color: "#06b6d4" },
    { text: "We grow with women’s work.", color: "#3b82f6" },
    { text: "Fresh from your city, shop with confidence.", color: "#6366f1" },
    { text: "Quality, care and transparency.", color: "#8b5cf6" },
    { text: "The handmade you need is here.", color: "#d946ef" },
    { text: "Good price, safe process, happy ending.", color: "#ec4899" },
  ],
  ar: [
    { text: "هدفنا: دعم ميزانية ربّات البيوت.", color: "#e11d48" },
    { text: "قيمة عمل المرأة يجب أن تُكرَّم.", color: "#c026d3" },
    { text: "منتجات يدوية بأسعار عادلة.", color: "#7c3aed" },
    { text: "نَكهات الحي إلى بابك.", color: "#2563eb" },
    { text: "إنتاج طازج بأيادٍ ماهرة.", color: "#0ea5e9" },
    { text: "حماية المنصّة مع كل طلب.", color: "#14b8a6" },
    { text: "دعم كبير للمنتِجات الصُغرى.", color: "#059669" },
    { text: "أسعار شفافة وتسليم واضح.", color: "#16a34a" },
    { text: "دفع آمن وإرجاع سهل.", color: "#65a30d" },
    { text: "اشترِ محليًا وادعم الاقتصاد.", color: "#ca8a04" },
    { text: "أجر عادل للعمل وتوفير للعميل.", color: "#d97706" },
    { text: "مذاقات منزلية وجمال مصنوع يدويًا.", color: "#ea580c" },
    { text: "عناية في كل فئة إنتاج.", color: "#f97316" },
    { text: "تتبع سلس من الطلب حتى التسليم.", color: "#f59e0b" },
    { text: "شارات بائعات موثوقات.", color: "#eab308" },
    { text: "نقوى معًا كمجتمع.", color: "#84cc16" },
    { text: "ندعم الإنتاج المستدام.", color: "#22c55e" },
    { text: "تجارة عادلة وزبائن سعداء.", color: "#10b981" },
    { text: "احترام للحِرفة وأسعار مناسبة.", color: "#06b6d4" },
    { text: "ننمو بعمل النساء.", color: "#3b82f6" },
    { text: "طازج من مدينتك وتسوق بثقة.", color: "#6366f1" },
    { text: "جودة وعناية وشفافية.", color: "#8b5cf6" },
    { text: "كل ما تحتاجه من أعمال يدوية هنا.", color: "#d946ef" },
    { text: "سعر جيد، عملية آمنة، نهاية سعيدة.", color: "#ec4899" },
  ],
  de: [
    { text: "Ziel: Haushaltsbudgets von Frauen stärken.", color: "#e11d48" },
    { text: "Frauenarbeit soll wertgeschätzt werden.", color: "#c026d3" },
    { text: "Handgemachtes zum fairen Preis.", color: "#7c3aed" },
    { text: "Nachbarschafts-Geschmack bis vor die Tür.", color: "#2563eb" },
    { text: "Frische Produktion aus geübten Händen.", color: "#0ea5e9" },
    { text: "Plattformschutz bei jeder Bestellung.", color: "#14b8a6" },
    { text: "Große Unterstützung für kleine Anbieterinnen.", color: "#059669" },
    { text: "Transparente Preise, klare Lieferung.", color: "#16a34a" },
    { text: "Sichere Zahlung, einfache Rückgabe.", color: "#65a30d" },
    { text: "Kauf lokal – stärke die Wirtschaft.", color: "#ca8a04" },
    { text: "Faire Entlohnung, Kund:innen sparen.", color: "#d97706" },
    { text: "Hausgemachter Geschmack, liebevolle Handarbeit.", color: "#ea580c" },
    { text: "Sorgfalt in jeder Kategorie.", color: "#f97316" },
    { text: "Nahtloses Tracking von Bestellung bis Lieferung.", color: "#f59e0b" },
    { text: "Vertrauens-Abzeichen für Anbieterinnen.", color: "#eab308" },
    { text: "Gemeinsam als Community stärker.", color: "#84cc16" },
    { text: "Unterstütze nachhaltige Produktion.", color: "#22c55e" },
    { text: "Fairer Handel, glückliche Kund:innen.", color: "#10b981" },
    { text: "Respekt für Handwerk, faire Preise.", color: "#06b6d4" },
    { text: "Wir wachsen mit Frauenarbeit.", color: "#3b82f6" },
    { text: "Frisch aus deiner Stadt – sicher einkaufen.", color: "#6366f1" },
    { text: "Qualität, Sorgfalt und Transparenz.", color: "#8b5cf6" },
    { text: "Das Handgemachte, das du brauchst – hier.", color: "#d946ef" },
    { text: "Guter Preis, sicherer Ablauf, gutes Ende.", color: "#ec4899" },
  ],
};

/* ----------------------------- KATEGORİLER ----------------------------- */
const CATS = {
  tr: [
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
  ],
  en: [
    { icon:"🍲", title:"Meals", subs:["Home meals","Savory bakes","Soup","Olive oil dishes","Rice-pasta","Meat-chicken","Breakfast","Meze","Frozen","Kids meals","Diet/vegan/gf"] },
    { icon:"🎂", title:"Cakes & Sweets", subs:["Layer cake","Cupcake","Cookies","Syrupy","Milk desserts","Cheesecake","Diet sweets","Chocolate/candy","Birthday sets"] },
    { icon:"🫙", title:"Jam • Pickle • Sauce", subs:["Jam-marmalade","Molasses","Pickles","Tomato/pepper sauce","Hot sauce","Paste","Vinegar","Canned"] },
    { icon:"🌾", title:"Regional / Winter Prep", subs:["Noodles","Tarhana","Yufka","Manti","Dried veg/fruit","Paste","Vinegar","Canned"] },
    { icon:"🥗", title:"Diet / Vegan / Gluten-free", subs:["Fit bowls","Vegan meals","GF bakery","Sugar-free desserts","Keto items","Protein snacks"] },
    { icon:"💍", title:"Jewelry", subs:["Bracelet","Necklace","Earrings","Ring","Anklet","Brooch","Sets","Personalized","Macrame","Gemstones","Resin","Wire wrap"] },
    { icon:"👶", title:"Baby & Kids", subs:["Animal/baby figures","Rattle","Knit teether","Cloth toy/book","Montessori toy","Sets","Knit booties-hats","Baby blanket","Bib/burp cloth","Maternity set","Hair accessory","Handmade wear"] },
    { icon:"🧶", title:"Knitwear", subs:["Cardigan","Sweater","Scarf-hat","Poncho","Shawl","Socks","Baby set","Vest","Pillow/cover"] },
    { icon:"✂️", title:"Sewing / Tailor", subs:["Hemming/repair","Zipper change","Curtains","Bedding","Tablecloth","Custom sew","Costume"] },
    { icon:"🧵", title:"Macrame & Decor", subs:["Wall hanging","Plant hanger","Keychain","Pendant lamp","Table runner","Basket","Shelf/decor"] },
    { icon:"🏠", title:"Home Decor & Accessories", subs:["Felt crafts","Pillow","Door wreath","Tray decor","Frame","Dreamcatcher","Painting"] },
    { icon:"🕯️", title:"Candles & Scents", subs:["Soy/beeswax candles","Aroma stone","Room spray","Incense","Gel candle","Gift sets"] },
    { icon:"🧼", title:"Natural Soap & Cosmetics", subs:["Olive oil soap","Herbal soaps","Solid shampoo","Lip balm","Cream/salve","Bath salt","Lavender sachet"] },
    { icon:"🧸", title:"Amigurumi & Toys (decor)", subs:["Keychain","Magnet","Collectible figure","Decor doll/character","Named amigurumi"] },
  ],
  ar: [
    { icon:"🍲", title:"وجبات", subs:["بيتي","معجنات مالحة","شوربة","أكلات بزيت الزيتون","أرز/معكرونة","لحم/دجاج","فطور","مقبلات","مجمدة","وجبات أطفال","نباتي/خالٍ من الغلوتين"] },
    { icon:"🎂", title:"كعك وحلويات", subs:["كيك طبقات","كب كيك","بسكويت","حلويات بالقطر","حلويات ألبان","تشيز كيك","دايت","شوكولاتة/حلوى","طقم عيد ميلاد"] },
    { icon:"🫙", title:"مربى • مخلل • صوص", subs:["مربى","دبس","مخللات","صلصة طماطم/فلفل","حار","معجون","خل","معلبات"] },
    { icon:"🌾", title:"تراثي / مؤونة الشتاء", subs:["مكرونة منزلية","طرحنة","يوفكا","مانطي","مجففات","معجون","خل","معلبات"] },
    { icon:"🥗", title:"حمية / نباتي / خالٍ من الغلوتين", subs:["أطباق صحية","نباتي","مخبوزات GF","حلويات بدون سكر","كيتو","سناك بروتين"] },
    { icon:"💍", title:"إكسسوارات", subs:["أساور","قلائد","أقراط","خواتم","خلخال","بروش","أطقم","مخصص بالاسم","ماكرامه","أحجار","ريزن","سلك"] },
    { icon:"👶", title:"رضع وأطفال", subs:["مجسّمات","خشخيشة","عضّاضة تريكو","لعبة/كتاب قماشي","مونتيسوري","أطقم","حذاء/قبعة تريكو","بطانية","مريلة","طقم نفاس","اكسسوار شعر","ملابس يدوية"] },
    { icon:"🧶", title:"تريكو", subs:["جاكيت","بلوز","وشاح/قبعة","بونشو","شال","جوارب","طقم أطفال","صديري","وسادة/غطاء"] },
    { icon:"✂️", title:"خياطة/تفصيل", subs:["تقصير/تصليح","تغيير سحاب","ستائر","مفارش سرير","مفرش طاولة","تفصيل خاص","ملابس تنكرية"] },
    { icon:"🧵", title:"ماكرامه وديكور", subs:["تعليقة حائط","حامل نبات","ميدالية","إضاءة معلّقة","مفرش","سلة","رف/ديكور"] },
    { icon:"🏠", title:"ديكور المنزل", subs:["فيلت","وسادة","زينة باب","صينية مزخرفة","إطار","صائد أحلام","لوحة"] },
    { icon:"🕯️", title:"شموع وروائح", subs:["شموع صويا/نحل","حجر عطري","معطر غرف","بخور","شمعة جل","أطقم هدايا"] },
    { icon:"🧼", title:"صابون طبيعي وتجميلي", subs:["صابون زيت زيتون","أعشاب","شامبو صلب","بلسم شفاه","كريم/مرهم","ملح حمام","أكياس لافندر"] },
    { icon:"🧸", title:"أميجورومي وألعاب (ديكور)", subs:["ميدالية","مغناطيس","فيجور","دمية ديكور","أميجورومي بالاسم"] },
  ],
  de: [
    { icon:"🍲", title:"Speisen", subs:["Hausmannskost","Herzhafte Backwaren","Suppe","Olivenölgerichte","Reis/Pasta","Fleisch/Hähnchen","Frühstück","Meze","Tiefgekühlt","Kindermahlzeiten","Diät/Vegan/GF"] },
    { icon:"🎂", title:"Torten & Süßes", subs:["Sahnetorte","Cupcake","Kekse","Sirupgebäck","Milchdesserts","Käsekuchen","Diät-Desserts","Schoko/Bonbon","Geburtstags-Sets"] },
    { icon:"🫙", title:"Marmelade • Pickles • Soßen", subs:["Marmelade","Melasse","Eingelegtes","Tomaten/Pfeffersoße","Scharfsoße","Paste","Essig","Eingewecktes"] },
    { icon:"🌾", title:"Regional / Wintervorrat", subs:["Hausgem. Nudeln","Tarhana","Yufka","Manti","Getrocknetes","Paste","Essig","Vorrat"] },
    { icon:"🥗", title:"Diät / Vegan / Glutenfrei", subs:["Fit Bowls","Vegan","GF-Bäckerei","Zuckerfrei","Keto","Protein-Snacks"] },
    { icon:"💍", title:"Schmuck", subs:["Armband","Kette","Ohrringe","Ring","Fußkettchen","Brosche","Sets","Personalisiert","Makramee","Edelsteine","Harz","Draht"] },
    { icon:"👶", title:"Baby & Kinder", subs:["Figuren","Rassel","Beißring Strick","Stoffspielzeug/Buch","Montessori","Sets","Schühchen/Mützen","Babydecke","Lätzchen","Wochenbett-Set","Haar-Accessoire","Handgemachte Kleidung"] },
    { icon:"🧶", title:"Strickwaren", subs:["Cardigan","Pullover","Schal/Mütze","Poncho","Tuch","Socken","Baby-Set","Weste","Kissen/Decke"] },
    { icon:"✂️", title:"Nähen / Schneiderei", subs:["Saum/Reparatur","Reißverschluss","Gardinen","Bettwäsche","Tischdecke","Maßanfertigung","Kostüm"] },
    { icon:"🧵", title:"Makramee & Deko", subs:["Wandbehang","Pflanzenhänger","Schlüsselanh.","Pendelleuchte","Läufer","Korb","Regal/Deko"] },
    { icon:"🏠", title:"Wohndeko & Accessoires", subs:["Filzarbeiten","Kissen","Türkranz","Tablettdeko","Rahmen","Traumfänger","Bild"] },
    { icon:"🕯️", title:"Kerzen & Düfte", subs:["Soja/Bienenwachs","Duftstein","Raumspray","Weihrauch","Gelkerze","Geschenksets"] },
    { icon:"🧼", title:"Naturseife & Kosmetik", subs:["Olivenölseife","Kräuterseifen","Festes Shampoo","Lippenbalsam","Creme/Salbe","Badesalz","Lavendelsäckchen"] },
    { icon:"🧸", title:"Amigurumi & Spielzeug (Deko)", subs:["Schlüsselanh.","Magnet","Sammelfigur","Deko-Puppe","Amigurumi mit Name"] },
  ],
};

/* ----------------------------- DİL KANCASI ----------------------------- */
function useLang() {
  const [lang, setLang] = useState("tr");
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved && SUPPORTED.includes(saved)) setLang(saved);
  }, []);
  useEffect(() => { localStorage.setItem("lang", lang); }, [lang]);
  const t = useMemo(() => STR[lang] || STR.tr, [lang]);
  return { lang, setLang, t };
}

/* ----------------------------- SAYFA ----------------------------- */
export default function Home() {
  const { lang, setLang, t } = useLang();
  const { isSignedIn } = useAuth();
  const phrases = useMemo(() => PHRASES[lang] || PHRASES.tr, [lang]);
  const [i, setI] = useState(0);
  const current = phrases[i] || phrases[0];
  const accent = current?.color || "#111827";

  // 22 sn'de bir metin değişsin (yumuşak geçiş)
  useEffect(() => {
    const id = setInterval(() => setI(x => (x + 1) % phrases.length), 22000);
    return () => clearInterval(id);
  }, [phrases.length]);

  const go = (href) => { window.location.href = href; };
  const needAuth = (role) => {
    window.location.href = `/login?role=${role}&force=1`;
  };

  const cats = CATS[lang] || CATS.tr;

  // --- İlanlar: /api/ads/public'den çek
  const [ads, setAds] = useState([]);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`/api/ads/public?limit=20`);
        if (!res.ok) throw new Error("ads api");
        const data = await res.json();
        const items = data?.items || data?.latest || [];
        if (alive) setAds(items);
      } catch {
        try {
          const local = JSON.parse(localStorage.getItem("ads") || "[]");
          if (alive) setAds(local);
        } catch {}
      }
    })();
    return () => { alive = false; };
  }, []);

  const onInspect = (ad) => {
    const href = ad?.url || (ad?.id ? `/ad/${ad.id}` : "/");
    if (!isSignedIn) {
      alert(t.needAuth);
      window.location.href = `/login?role=customer&force=1&redirect=${encodeURIComponent(href)}`;
      return;
    }
    window.location.href = href;
  };

  return (
    <main className="wrap">
      {/* Dil seçimi */}
      <div className="langbox">
        <select aria-label="Language" value={lang} onChange={(e)=>setLang(e.target.value)}>
          {SUPPORTED.map(k => <option key={k} value={k}>{LOCALE_LABEL[k]}</option>)}
        </select>
      </div>

      <section className="hero" style={{ "--accent": accent }}>
        <img src="/assets/images/logo.png" alt={t.brand} width="96" height="96" className="logo"/>
        <h1 className="title">{t.brand}</h1>
        <h2 className="subtitle">{t.heroTitle}</h2>
        <p key={i} className="lead phrase">{current.text}</p>

        <div className="ctaRow">
          <SignedOut>
            <button className="btnPrimary" onClick={()=>needAuth("seller")}>{t.sellerPortal}</button>
            <button className="btnGhost"   onClick={()=>needAuth("customer")}>{t.customerPortal}</button>
          </SignedOut>
          <SignedIn>
            <button className="btnPrimary" onClick={()=>go("/portal/seller")}>{t.sellerPortal}</button>
            <button className="btnGhost"   onClick={()=>go("/portal/customer")}>{t.customerPortal}</button>
          </SignedIn>
        </div>
      </section>

      {/* İlanlar - kategori kartlarının ÜSTÜNDE */}
      <section className="ads">
        <h3>{t.listingsTitle || "Son İlanlar"}</h3>
        <div className="adsGrid">
          {(!ads || ads.length===0) && (
            <div className="adCard empty">{/* boş durumda zarif kutu */}
              <div className="adBody">{lang==="en"?"No listings yet.":"Henüz ilan yok."}</div>
            </div>
          )}
          {ads?.map((a, idx)=>(
            <article key={idx} className="adCard">
              <div className="adThumb">
                {a?.img ? <img src={a.img} alt={a?.title||"ad"} /> : <div className="ph" />}
              </div>
              <div className="adBody">
                <h4 className="adTitle">{a?.title || "İlan"}</h4>
                <div className="adMeta">
                  <span className="muted">{a?.cat || a?.category || ""}</span>
                  <b>{a?.price || ""}</b>
                </div>
                <div className="actionsRow">
                  <button className="mini dark" onClick={()=>onInspect(a)}>{t.inspect}</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cats">
        <h3>{t.categories}</h3>
        <div className="grid">
          {cats.map((c, idx)=>(
            <article key={idx} className="card hue" style={{"--i": idx}}>
              <div className="cardHead">
                <span className="icon" aria-hidden>{c.icon}</span>
                <h4>{c.title}</h4>
              </div>
              <div className="subsGrid">
                {c.subs.map((s, k)=>(<span key={k} className="chip">{s}</span>))}
              </div>
              <div className="actions">
                <SignedOut>
                  <button className="mini dark"  onClick={()=>needAuth("customer")}>{t.orderNow}</button>
                  <button className="mini ghost" onClick={()=>needAuth("seller")}>{t.postAd}</button>
                </SignedOut>
                <SignedIn>
                  <button className="mini dark"  onClick={()=>go("/portal/customer")}>{t.orderNow}</button>
                  <button className="mini ghost" onClick={()=>go("/portal/seller")}>{t.postAd}</button>
                </SignedIn>
              </div>
            </article>
          ))}
        </div>
      </section>

      <style jsx global>{`
        :root{
          --ink:#0f172a; --muted:#475569;
          --paperA: rgba(255,255,255,.86);
          --lineA: rgba(255,255,255,.45);
          --c1:#ff80ab; --c2:#a78bfa; --c3:#60a5fa; --c4:#34d399;
        }
        html,body{height:100%}
        body{
          margin:0; color:var(--ink);
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif;
          background:
            radial-gradient(1200px 800px at -10% -10%, rgba(255,255,255,.35), transparent 60%),
            linear-gradient(120deg, var(--c1), var(--c2), var(--c3), var(--c4));
          background-size: 320% 320%;
          animation: drift 16s ease-in-out infinite;
        }
        @keyframes drift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

        .wrap{max-width:1120px; margin:0 auto; padding:32px 20px;}

        /* --- Dil kutusu --- */
        .langbox{
          position:fixed; top:12px; right:12px; z-index:50;
          background:rgba(255,255,255,.9); border:1px solid #e5e7eb; border-radius:12px; padding:6px 10px; backdrop-filter:blur(8px);
        }
        .langbox select{ border:none; background:transparent; font-weight:600; cursor:pointer; }

        /* --- Hero --- */
        .hero{display:grid; place-items:center; text-align:center; gap:10px; padding:72px 0 34px;}
        .logo{filter: drop-shadow(0 10px 24px rgba(0,0,0,.18)); border-radius:20px}
        .title,.subtitle{transition: color .6s ease;}
        .title{margin:8px 0 0; font-size:48px; color: var(--accent);}
        .subtitle{margin:2px 0 6px; font-size:24px; color: var(--accent);}
        .lead{
          max-width:820px; margin:8px auto 18px; font-size:18px; color: var(--accent);
          transition: color .6s ease;
        }
        /* Motto metni için yumuşak fade+slide */
        .phrase{animation: fadeSlide .7s ease;}
        @keyframes fadeSlide{
          from{opacity:0; transform: translateY(6px)}
          to{opacity:1; transform: none}
        }

        .ctaRow{display:flex; gap:12px; flex-wrap:wrap; justify-content:center; margin-top:8px}
        .btnPrimary{
          padding:12px 18px; border-radius:999px; border:none; cursor:pointer;
          background:#111827; color:#fff; font-weight:600; box-shadow:0 8px 24px rgba(0,0,0,.15);
        }
        .btnGhost{
          padding:12px 18px; border-radius:999px; cursor:pointer; font-weight:600;
          background:var(--paperA); border:1px solid var(--lineA); color:#111827; backdrop-filter: blur(8px);
        }

        /* --- İlanlar --- */
        .ads h3{font-size:22px; margin:10px 0 12px; text-align:center;}
        .adsGrid{
          display:grid; gap:16px;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }
        .adCard{
          border-radius: 16px; overflow:hidden;
          background: #fff; border: 1px solid #e5e7eb;
          box-shadow: 0 6px 16px rgba(0,0,0,.06);
        }
        .adCard.empty{display:grid; place-items:center; padding:20px}
        .adThumb{background:#f1f5f9;}
        .adThumb img{display:block; width:100%; height:220px; object-fit:cover}
        .adBody{padding:12px}
        .adTitle{margin:0 0 6px; font-size:16px}
        .adMeta{display:flex; justify-content:space-between; color:var(--muted); font-size:13px}
        .actionsRow{display:flex; justify-content:flex-end; margin-top:10px}

        /* --- Kategoriler --- */
        .cats h3{font-size:22px; margin:30px 0 14px; text-align:center;}
        .grid{
          display:grid; gap:16px;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }
        .card{
          border-radius: 18px; padding:16px;
          background: var(--paperA); border: 1px solid var(--lineA);
          backdrop-filter: blur(8px);
          box-shadow: 0 12px 28px rgba(0,0,0,.08);
          transition: transform .2s ease, box-shadow .2s ease, filter .5s linear;
        }
        .card:hover{ transform: translateY(-4px); box-shadow:0 16px 36px rgba(0,0,0,.12); }
        /* Her karta farklı hue akışı */
        .hue{ animation: hue 12s linear infinite; }
        @keyframes hue{ from{ filter:hue-rotate(calc(var(--i)*12deg)); } to{ filter:hue-rotate(calc(var(--i)*12deg + 360deg)); } }

        .cardHead{display:flex; align-items:center; gap:10px; margin-bottom:8px}
        .icon{font-size:22px}
        h4{margin:0; font-size:18px}
        .subsGrid{ display:grid; gap:8px; grid-template-columns: repeat(3, minmax(0,1fr)); }
        .chip{
          display:block; text-align:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
          padding:8px 10px; border-radius:12px; font-size:12px;
          background: rgba(255,255,255,.92); border:1px solid #e5e7eb;
        }
        .actions{display:flex; gap:8px; justify-content:center; margin-top:12px}
        .mini{
          padding:9px 12px; border-radius:10px; border:1px solid #e5e7eb; background:#fff; cursor:pointer; font-weight:600;
        }
        .mini.dark{ background:#111827; color:#fff; border-color:#111827; }
        .mini.ghost{ background:#fff; color:#111827; }
      `}</style>
    </main>
  );
}
