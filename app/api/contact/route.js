import { getSql } from "../../../lib/db";

export async function POST(request) {
  const sql = getSql();
  if (!sql) return Response.json({ error: "Banco não configurado" }, { status: 503 });

  let data;
  try { data = await request.json(); } catch { return Response.json({ error: "JSON inválido" }, { status: 400 }); }
  const name = String(data.name ?? "").trim().slice(0, 100);
  const email = String(data.email ?? "").trim().slice(0, 200);
  const message = String(data.message ?? "").trim().slice(0, 2000);
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message) {
    return Response.json({ error: "Dados inválidos" }, { status: 400 });
  }
  try {
    await sql`INSERT INTO messages (name, email, message) VALUES (${name}, ${email}, ${message})`;
  } catch {
    return Response.json({ error: "Erro ao salvar" }, { status: 500 });
  }
  return Response.json({ ok: true });
}
