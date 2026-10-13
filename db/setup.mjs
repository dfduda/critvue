import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";

if (!process.env.DATABASE_URL) {
  console.error("Defina DATABASE_URL (ex.: DATABASE_URL=... npm run db:setup)");
  process.exit(1);
}
const sql = neon(process.env.DATABASE_URL);
const statements = readFileSync(new URL("./schema.sql", import.meta.url), "utf8")
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);
for (const s of statements) await sql.query(s);

const [{ count }] = await sql`SELECT count(*)::int AS count FROM projects`;
if (count === 0) {
  const seed = [
    ["Landing page · Simple Dealers", "Landing page da Simple Dealers, pensada para apresentar a marca e levar o visitante para o contato.", "https://simpledealers.com.br/", ["Landing page", "Web design"]],
    ["Landing page · IKIZY", "Landing page da IKIZY, o sistema de gestão para negócios de beleza: agenda, clientes e financeiro em um só lugar.", "https://ikizy.com", ["Landing page", "Web design"]],
    ["Branding guidelines · Simple Dealers", "Guia de marca da Simple Dealers: logo, cores, tipografia e regras de uso.", null, ["Branding", "Guidelines"]],
    ["Landing page · Café Brisa", "Landing page fictícia para uma cafeteria de bairro. Projeto conceito.", null, ["Landing page", "Conceito"]],
    ["Landing page · Studio Alma", "Landing page fictícia para um estúdio de bem-estar. Projeto conceito.", null, ["Landing page", "Conceito"]],
    ["Rebranding · Mundo Verde", "Estudo de rebranding da Mundo Verde, feito por conta própria e sem vínculo com a marca.", null, ["Rebranding", "Conceito"]],
  ];
  for (const [i, [title, description, url, tags]] of seed.entries()) {
    await sql`INSERT INTO projects (title, description, url, tags, created_at)
      VALUES (${title}, ${description}, ${url}, ${tags}, now() - ${i} * interval '1 minute')`;
  }
}
console.log("Banco pronto.");
