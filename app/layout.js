import "./globals.css";

export const metadata = {
  title: "Meu Portfólio",
  description: "Oi! Esse é o meu cantinho: projetos, um pouco de mim e um jeito fácil de falar comigo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bowlby+One&family=Nunito:wght@600;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
