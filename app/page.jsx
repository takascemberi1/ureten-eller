import { redirect } from "next/navigation";

// / isteğini SSR'da doğrudan /home.html'e yönlendir
export const metadata = { title: "Üreten Eller" };

export default function RootPage() {
  redirect("/home.html");
  return null;
}
