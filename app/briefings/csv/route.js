import { getSql } from "../../../lib/db";
import { briefingSections } from "../../../lib/briefing.mjs";

export const dynamic = "force-dynamic";

const cell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;

export async function GET(request) {
  const key = new URL(request.url).searchParams.get("key");
  const secret = process.env.BRIEFING_ADMIN_KEY;
  if (!secret || key !== secret) return new Response("Restrito", { status: 401 });

  const sql = getSql();
  const rows = sql ? await sql`SELECT name, contact, answers, created_at FROM briefings ORDER BY created_at DESC` : [];
  const fields = briefingSections.flatMap((s) => s.fields);
  const lines = [["Data", "Nome", "Contato", ...fields.map((f) => f.label)].map(cell).join(",")];
  for (const r of rows) {
    lines.push([r.created_at.toISOString?.() ?? r.created_at, r.name, r.contact, ...fields.map((f) => r.answers?.[f.id] ?? "")].map(cell).join(","));
  }
  return new Response("﻿" + lines.join("\r\n"), {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="briefings.csv"' },
  });
}
