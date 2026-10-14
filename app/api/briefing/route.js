import { getSql } from "../../../lib/db";
import { briefingFieldIds } from "../../../lib/briefing.mjs";

export async function POST(request) {
  const sql = getSql();
  if (!sql) return Response.json({ error: "Banco não configurado" }, { status: 503 });

  let data;
  try { data = await request.json(); } catch { return Response.json({ error: "JSON inválido" }, { status: 400 }); }
  const name = String(data.name ?? "").trim().slice(0, 100);
  const contact = String(data.contact ?? "").trim().slice(0, 200);
  if (!name || !contact) return Response.json({ error: "Dados inválidos" }, { status: 400 });

  const answers = {};
  for (const id of briefingFieldIds) {
    const v = String(data.answers?.[id] ?? "").trim().slice(0, 2000);
    if (v) answers[id] = v;
  }
  if (!answers.precisa) return Response.json({ error: "Dados inválidos" }, { status: 400 });

  try {
    await sql`INSERT INTO briefings (name, contact, answers) VALUES (${name}, ${contact}, ${JSON.stringify(answers)}::jsonb)`;
  } catch {
    return Response.json({ error: "Erro ao salvar" }, { status: 500 });
  }
  return Response.json({ ok: true });
}
