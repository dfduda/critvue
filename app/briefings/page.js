import { getSql } from "../../lib/db";

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
          <div className="bfx-bar-title">
            <h1>Briefings recebidos</h1>
            <b className="bfx-count">{rows.length}</b>
          </div>
          <a className="bfx-btn small" href={`/briefings/csv?key=${encodeURIComponent(key)}`}>Baixar planilha (CSV)</a>
        </div>

        {rows.length === 0 ? (
          <p className="bfx-lead">Nenhuma resposta ainda.</p>
        ) : (
          <div className="bfx-table-wrap">
            <table className="bfx-table bfx-list">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Contratante</th>
                  <th>Marca</th>
                  <th>O que ele quer</th>
                  <th>Contato</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td>{new Date(r.created_at).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" })}</td>
                    <td><b>{r.name}</b></td>
                    <td>{r.answers?.projeto ?? "—"}</td>
                    <td>{r.answers?.precisa ?? "—"}</td>
                    <td>{r.contact}</td>
                    <td><a className="bfx-btn small" href={`/briefings/${r.id}?key=${encodeURIComponent(key)}`}>Abrir</a></td>
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
