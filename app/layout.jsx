import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="tr">
        <body style={{margin:0}}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
