import { getSql } from "../../lib/db";
import { briefingSections } from "../../lib/briefing.mjs";

export const dynamic = "force-dynamic";
export const metadata = { title: "Respostas · Briefing", robots: { index: false, follow: false } };

export default async function Answers({ searchParams }) {
  const { key } = await searchParams;
  const secret = process.env.BRIEFING_ADMIN_KEY;
  if (!secret || key !== secret) {
    return <div className="bfx"><div className="bfx-wrap"><p className="bfx-lead">Página restrita.</p></div></div>;
  }
  const sql = getSql();
  const rows = sql ? await sql`SELECT id, name, contact, answers, created_at FROM briefings ORDER BY created_at DESC LIMIT 500` : [];

  return (
    <div className="bfx">
      <div className="bfx-wide">
        <div className="bfx-bar">
          <h1>Respostas dos briefings <span>{rows.length}</span></h1>
          <a className="bfx-btn small" href={`/briefings/csv?key=${encodeURIComponent(key)}`}>Baixar planilha (CSV)</a>
        </div>
        {rows.length === 0 ? (
          <p className="bfx-lead">Nenhuma resposta ainda.</p>
        ) : (
          <div className="bfx-table-wrap">
            <table className="bfx-table">
              <thead>
                <tr>
                  <th colSpan={3} className="grp">Cliente</th>
                  {briefingSections.map((s) => <th key={s.title} colSpan={s.fields.length} className="grp">{s.title}</th>)}
                </tr>
                <tr>
                  <th className="stick">Data</th>
                  <th>Nome</th>
                  <th>Contato</th>
                  {briefingSections.flatMap((s) => s.fields.map((f) => <th key={f.id}>{f.label}</th>))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td className="stick">{new Date(r.created_at).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" })}</td>
                    <td><b>{r.name}</b></td>
                    <td>{r.contact}</td>
                    {briefingSections.flatMap((s) => s.fields.map((f) => <td key={f.id}>{r.answers?.[f.id] ?? ""}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
