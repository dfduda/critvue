import "./globals.css";
import { SITE_URL } from "../lib/contact.mjs";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Maria Eduarda · Branding e front-end",
  description: "Branding, design system e front-end: do guia de marca ao site no ar. Veja projetos, pacotes com preço e peça seu orçamento.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Maria Eduarda · Branding e front-end",
    description: "Do guia de marca ao site no ar. Projetos, pacotes com preço e orçamento rápido.",
    type: "website",
    locale: "pt_BR",
    siteName: "Maria Eduarda",
  },
  twitter: { card: "summary_large_image", title: "Maria Eduarda · Branding e front-end" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700;800&family=Instrument+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/devicon.min.css" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
