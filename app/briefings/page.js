import { getSql } from "../../lib/db";
import { briefingSections } from "../../lib/briefing.mjs";

export const dynamic = "force-dynamic";
export const metadata = { title: "Respostas · Briefing", robots: { index: false, follow: false } };

export default async function Answers({ searchParams }) {
  const { key } = await searchParams;
  const secret = process.env.BRIEFING_ADMIN_KEY;
  if (!secret || key !== secret) {
    return <main className="wrap bf-page"><p className="bf-intro">Página restrita.</p></main>;
  }
  const sql = getSql();
  const rows = sql ? await sql`SELECT id, name, contact, answers, created_at FROM briefings ORDER BY created_at DESC LIMIT 100` : [];

  return (
    <main className="wrap bf-page">
      <h1 className="bf-title">Respostas dos briefings</h1>
      {rows.length === 0 && <p className="bf-intro">Nenhuma resposta ainda.</p>}
      {rows.map((r) => (
        <article key={r.id} className="bf-card">
          <h2>{r.name}</h2>
          <p className="bf-meta">{r.contact} · {new Date(r.created_at).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p>
          {briefingSections.map((s) => {
            const filled = s.fields.filter((f) => r.answers?.[f.id]);
            if (!filled.length) return null;
            return (
              <section key={s.title}>
                <h3>{s.title}</h3>
                {filled.map((f) => <p key={f.id}><b>{f.label}</b><br />{r.answers[f.id]}</p>)}
              </section>
            );
          })}
        </article>
      ))}
    </main>
  );
}
