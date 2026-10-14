import { notFound } from "next/navigation";
import { getSql } from "../../../lib/db";
import { briefingSections } from "../../../lib/briefing.mjs";

export const dynamic = "force-dynamic";
export const metadata = { title: "Briefing · Maria Eduarda", robots: { index: false, follow: false } };

export default async function BriefingDetail({ params, searchParams }) {
  const [{ id }, { key }] = await Promise.all([params, searchParams]);
  const secret = process.env.BRIEFING_ADMIN_KEY;
  if (!secret || key !== secret) {
    return <div className="bfx"><div className="bfx-wrap"><p className="bfx-lead">Página restrita.</p></div></div>;
  }
  const num = Number(id);
  const sql = getSql();
  if (!sql || !Number.isInteger(num)) notFound();
  const [r] = await sql`SELECT id, name, contact, answers, created_at FROM briefings WHERE id = ${num}`;
  if (!r) notFound();

  return (
    <div className="bfx">
      <div className="bfx-wrap">
        <a className="bfx-back" href={`/briefings?key=${encodeURIComponent(key)}`}>← Voltar para a lista</a>
        <p className="bfx-kicker">{r.answers?.projeto || "Briefing de projeto"}</p>
        <p className="bfx-title">BRIEF</p>
        <div className="bfx-meta">
          <p><b>Contratante:</b> {r.name}</p>
          <p><b>Contato:</b> {r.contact}</p>
          <p><b>Recebido:</b> {new Date(r.created_at).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" })}</p>
        </div>

        <div className="bfx-form" style={{ marginTop: 28 }}>
          {briefingSections.map((s, i) => (
            <section key={s.title} className="bfx-sec">
              <h2 className="bfx-label"><em>{String(i + 1).padStart(2, "0")}</em> {s.title}</h2>
              <div className="bfx-box">
                {s.fields.map((f) => (
                  <div key={f.id} className="bfx-field bfx-read">
                    <span>{f.label}</span>
                    <p>{r.answers?.[f.id] || <i>não respondido</i>}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
