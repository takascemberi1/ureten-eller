export const metadata = {
  title: "Üreten Eller",
  description: "Üreten Eller pazar yeri"
};

import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body style={{background:"#f8fafc", minHeight:"100vh", margin:0}}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
