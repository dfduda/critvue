import { getSql } from "../../../lib/db";

// guarda cada contato enviado pelo formulário (a mensagem também segue por WhatsApp/e-mail)
export async function POST(request) {
  const sql = getSql();
  if (!sql) return Response.json({ error: "Banco não configurado" }, { status: 503 });

  let data;
  try { data = await request.json(); } catch { return Response.json({ error: "JSON inválido" }, { status: 400 }); }
  const name = String(data.name ?? "").trim().slice(0, 100);
  const pacote = String(data.pacote ?? "").trim().slice(0, 100) || null;
  const message = String(data.message ?? "").trim().slice(0, 2000);
  const via = data.via === "email" ? "email" : "whatsapp";
  if (!name || !message) return Response.json({ error: "Dados inválidos" }, { status: 400 });

  try {
    await sql`INSERT INTO leads (name, pacote, message, via) VALUES (${name}, ${pacote}, ${message}, ${via})`;
  } catch {
    return Response.json({ error: "Erro ao salvar" }, { status: 500 });
  }
  return Response.json({ ok: true });
}
