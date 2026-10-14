"use client";
import { useState } from "react";
import posthog from "posthog-js";
import { briefingSections } from "../../lib/briefing.mjs";
import { WHATSAPP_NUMBER } from "../../lib/contact.mjs";

export default function BriefingForm() {
  const [status, setStatus] = useState("idle");
  const [name, setName] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const { name: n, contact, ...answers } = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("sending");
    try {
      const res = await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n, contact, answers }),
      });
      if (!res.ok) throw new Error();
      posthog.capture?.("briefing_submitted");
      setName(String(n));
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    const text = `Oi, Maria Eduarda! Aqui é ${name}. Acabei de preencher o briefing.`;
    return (
      <div className="bfx-card bfx-done">
        <p className="bfx-check" aria-hidden="true">✓</p>
        <h2>Briefing recebido</h2>
        <p>Obrigada, {name}. Vou ler com atenção e retorno com a proposta em breve.</p>
        <a className="bfx-btn" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer">Avisar no WhatsApp</a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bfx-form">
      <section className="bfx-card">
        <header><span className="bfx-num">00</span><h2>Seus dados</h2></header>
        <div className="bfx-grid">
          <label>Nome<input name="name" required maxLength={100} autoComplete="name" /></label>
          <label>WhatsApp ou e-mail<input name="contact" required maxLength={200} autoComplete="email" /></label>
        </div>
      </section>

      {briefingSections.map((s, i) => (
        <section key={s.title} className="bfx-card">
          <header><span className="bfx-num">{String(i + 1).padStart(2, "0")}</span><h2>{s.title}</h2></header>
          <div className="bfx-fields">
            {s.fields.map((f) => (
              <label key={f.id}>
                <span>{f.label}{f.required && <b aria-label="obrigatório"> *</b>}</span>
                {f.hint && <small>{f.hint}</small>}
                {f.short
                  ? <input name={f.id} maxLength={200} />
                  : <textarea name={f.id} rows={3} maxLength={2000} required={f.required} />}
              </label>
            ))}
          </div>
        </section>
      ))}

      <div className="bfx-submit">
        <button className="bfx-btn" disabled={status === "sending"}>{status === "sending" ? "Enviando…" : "Enviar briefing"}</button>
        <p>Suas respostas vão direto para mim e ficam confidenciais.</p>
        {status === "error" && <p className="bfx-error">Não consegui enviar. Tente novamente ou me chame no WhatsApp.</p>}
      </div>
    </form>
  );
}
