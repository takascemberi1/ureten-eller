// pages/_app.jsx
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider publishableKey={pk}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Üreten Eller</title>
      </Head>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
