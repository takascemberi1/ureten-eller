"use client";

// Kök URL (/) gelince home.html'e gönder
export const metadata = { title: "Üreten Eller" };

export default function LandingRedirect(){
  if (typeof window !== "undefined") {
    window.location.replace("/home.html");
  }
  // JS kapalıysa da çalışsın
  return <noscript><meta httpEquiv="refresh" content="0; url=/home.html" /></noscript>;
}
