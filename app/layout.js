import "./globals.css";

export const metadata = {
  title: "Meu Portfólio",
  description: "Portfólio pessoal – projetos, sobre mim e contato.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
