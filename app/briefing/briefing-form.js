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
      <div className="bf-done">
        <p className="bf-big">Recebi!</p>
        <p>Obrigada, {name}. Vou ler com carinho e te respondo com a proposta em breve.</p>
        <a className="send wa" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer">Avisar no WhatsApp</a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="form bf">
      <fieldset className="bf-sec">
        <legend>Quem é você</legend>
        <label>Seu nome<input name="name" required maxLength={100} /></label>
        <label>WhatsApp ou e-mail<input name="contact" required maxLength={200} /></label>
      </fieldset>

      {briefingSections.map((s, i) => (
        <fieldset key={s.title} className="bf-sec">
          <legend><span>{String(i + 1).padStart(2, "0")}</span> {s.title}</legend>
          {s.fields.map((f) => (
            <label key={f.id}>
              {f.label}{f.required && " *"}
              {f.hint && <small>{f.hint}</small>}
              {f.short
                ? <input name={f.id} maxLength={200} />
                : <textarea name={f.id} rows={3} maxLength={2000} required={f.required} />}
            </label>
          ))}
        </fieldset>
      ))}

      <button className="send wa" disabled={status === "sending"}>{status === "sending" ? "Enviando…" : "Enviar briefing"}</button>
      {status === "error" && <p className="ok">Não consegui enviar. Tente de novo ou me chame no WhatsApp.</p>}
    </form>
  );
}
