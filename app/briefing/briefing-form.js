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
      <div className="bfx-sec">
        <h2 className="bfx-label">Briefing recebido</h2>
        <div className="bfx-box bfx-done">
          <p>Obrigada, {name}. Vou ler com atenção e retorno com a proposta em breve.</p>
          <a className="bfx-btn" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer">Avisar no WhatsApp</a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bfx-form">
      <section className="bfx-sec">
        <h2 className="bfx-label">Seus dados</h2>
        <div className="bfx-box bfx-grid">
          <label><span>Nome</span><input name="name" required maxLength={100} autoComplete="name" /></label>
          <label><span>WhatsApp ou e-mail</span><input name="contact" required maxLength={200} autoComplete="email" /></label>
        </div>
      </section>

      {briefingSections.map((s, i) => (
        <section key={s.title} className="bfx-sec">
          <h2 className="bfx-label"><em>{String(i + 1).padStart(2, "0")}</em> {s.title}</h2>
          <div className="bfx-box">
            {s.fields.map((f) => (
              <label key={f.id} className="bfx-field">
                <span>{f.label}{f.required && " *"}</span>
                {f.hint && <small>{f.hint}</small>}
                {f.short
                  ? <input name={f.id} maxLength={200} />
                  : <textarea name={f.id} rows={2} maxLength={2000} required={f.required} />}
              </label>
            ))}
          </div>
        </section>
      ))}

      <div className="bfx-submit">
        <button className="bfx-btn" disabled={status === "sending"}>{status === "sending" ? "Enviando…" : "Enviar briefing"}</button>
        {status === "error" && <p className="bfx-error">Não consegui enviar. Tente novamente ou me chame no WhatsApp.</p>}
      </div>
    </form>
  );
}
