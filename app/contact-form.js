"use client";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) { form.reset(); setStatus("ok"); } else setStatus("error");
  }

  return (
    <form onSubmit={onSubmit} className="form">
      <input name="name" placeholder="Nome" required maxLength={100} />
      <input name="email" type="email" placeholder="E-mail" required maxLength={200} />
      <textarea name="message" placeholder="Mensagem" required rows={5} maxLength={2000} />
      <button className="btn" disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : "Enviar"}
      </button>
      {status === "ok" && <p className="ok">Mensagem enviada. Obrigado!</p>}
      {status === "error" && <p className="err">Não foi possível enviar. Tente novamente.</p>}
    </form>
  );
}
