import { getSql } from "../../lib/db";
import { briefingSections } from "../../lib/briefing.mjs";
import BriefingsList from "./briefings-list";

export const dynamic = "force-dynamic";
export const metadata = { title: "Respostas · Briefing", robots: { index: false, follow: false } };

export default async function Answers({ searchParams }) {
  const { key } = await searchParams;
  const secret = process.env.BRIEFING_ADMIN_KEY;
  if (!secret || key !== secret) {
    return <div className="bfx"><div className="bfx-wrap"><p className="bfx-lead">Página restrita.</p></div></div>;
  }
  const sql = getSql();
  const data = sql ? await sql`SELECT id, name, contact, answers, created_at FROM briefings ORDER BY created_at DESC LIMIT 500` : [];
  const rows = data.map((r) => ({ ...r, created_at: new Date(r.created_at).toISOString() }));

  return (
    <div className="bfx">
      <div className="bfx-wide">
        <div className="bfx-bar">
          <div className="bfx-bar-title">
            <h1>Briefings recebidos</h1>
            <b className="bfx-count">{rows.length}</b>
          </div>
          <a className="bfx-btn small" href={`/briefings/csv?key=${encodeURIComponent(key)}`}>Baixar planilha (CSV)</a>
        </div>

        {rows.length === 0
          ? <p className="bfx-lead">Nenhuma resposta ainda.</p>
          : <BriefingsList rows={rows} sections={briefingSections} />}
      </div>
    </div>
  );
}
