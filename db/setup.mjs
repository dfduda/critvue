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
  await sql`INSERT INTO projects (title, description, url, tags) VALUES
    ('Projeto de exemplo 1', 'Descrição do seu primeiro projeto.', 'https://github.com/dfduda', ARRAY['Next.js','Neon']),
    ('Projeto de exemplo 2', 'Descrição do seu segundo projeto.', NULL, ARRAY['React','TypeScript'])`;
}
console.log("Banco pronto.");
