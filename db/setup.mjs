import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import { projects as seed } from "../lib/projects.mjs";

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
  for (const [i, { title, description, url, tags }] of seed.entries()) {
    await sql`INSERT INTO projects (title, description, url, tags, created_at)
      VALUES (${title}, ${description}, ${url}, ${tags}, now() - ${i} * interval '1 minute')`;
  }
}
console.log("Banco pronto.");
