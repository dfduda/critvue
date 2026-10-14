"use client";
import { useEffect, useState } from "react";

const fmt = (iso) =>
  new Date(iso).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" });

export default function BriefingsList({ rows, sections }) {
  const [openId, setOpenId] = useState(null);
  const current = rows.find((r) => r.id === openId);

  useEffect(() => {
    if (!current) return;
    const onKey = (e) => e.key === "Escape" && setOpenId(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [current]);

  return (
    <>
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
                <td>{fmt(r.created_at)}</td>
                <td><b>{r.name}</b></td>
                <td>{r.answers?.projeto ?? "—"}</td>
                <td>{r.answers?.precisa ?? "—"}</td>
                <td>{r.contact}</td>
                <td><button type="button" className="bfx-btn small" onClick={() => setOpenId(r.id)}>Abrir</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {current && (
        <div className="bfx-overlay" onClick={(e) => e.target === e.currentTarget && setOpenId(null)}>
          <div className="bfx-modal" role="dialog" aria-modal="true" aria-label={`Briefing de ${current.name}`}>
            <div className="bfx-modal-head">
              <div>
                <p className="bfx-kicker">{current.answers?.projeto || "Briefing de projeto"}</p>
                <h2>{current.name}</h2>
                <p className="bfx-modal-sub">{current.contact} · {fmt(current.created_at)}</p>
              </div>
              <button type="button" className="bfx-close" onClick={() => setOpenId(null)} aria-label="Fechar">×</button>
            </div>
            <div className="bfx-modal-body">
              {sections.map((s, i) => (
                <section key={s.title} className="bfx-sec">
                  <h3 className="bfx-label"><em>{String(i + 1).padStart(2, "0")}</em> {s.title}</h3>
                  <div className="bfx-box">
                    {s.fields.map((f) => (
                      <div key={f.id} className="bfx-field bfx-read">
                        <span>{f.label}</span>
                        <p>{current.answers?.[f.id] || <i>não respondido</i>}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
