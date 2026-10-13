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
      <input name="name" placeholder="Como você se chama?" required maxLength={100} />
      <input name="email" type="email" placeholder="Seu melhor e-mail" required maxLength={200} />
      <textarea name="message" placeholder="Conta pra mim o que você tá pensando..." required rows={5} maxLength={2000} />
      <button className="btn" disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : "Mandar mensagem 🚀"}
      </button>
      {status === "ok" && <p className="ok">Oba, chegou! Já já eu te respondo 💗</p>}
      {status === "error" && <p className="err">Ops, deu ruim! Tenta de novo rapidinho?</p>}
    </form>
  );
}
