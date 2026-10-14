"use client";
import { useEffect, useState } from "react";
import { WHATSAPP_NUMBER, EMAIL } from "../lib/contact.mjs";

const NOT_SURE = "Ainda não sei";

export default function ContactForm({ options = [] }) {
  const [status, setStatus] = useState("idle");
  const [pkg, setPkg] = useState("");

  useEffect(() => {
    const pick = (e) => setPkg(e.detail);
    window.addEventListener("pick-package", pick);
    return () => window.removeEventListener("pick-package", pick);
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    const via = e.nativeEvent.submitter?.value;
    const { name, message } = Object.fromEntries(new FormData(e.currentTarget));
    const pacote = pkg && pkg !== NOT_SURE ? pkg : "";
    const text = `Oi, Maria Eduarda! Aqui é ${name}.${pacote ? ` Tenho interesse no ${pacote}.` : ""}

${message}`;

    if (via === "whatsapp") {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      return setStatus("whatsapp");
    }
    const subject = pacote ? `Orçamento: ${pacote}` : "Contato pelo portfólio";
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    setStatus("email");
  }

  return (
    <form onSubmit={onSubmit} className="form">
      <input name="name" placeholder="Como você se chama?" required maxLength={100} />
      {options.length > 0 && (
        <fieldset className="pick-chips">
          <legend>Qual pacote?</legend>
          {[...options, { name: NOT_SURE, color: "cream", price: "me ajuda a escolher" }].map((o) => (
            <label key={o.name} className={`opt ${o.color}${pkg === o.name ? " on" : ""}`}>
              <input type="radio" name="pacote" value={o.name} checked={pkg === o.name} onChange={() => setPkg(o.name)} />
              <i className="dot" aria-hidden="true">{pkg === o.name ? "✓" : ""}</i>
              <span><b>{o.name}</b><small>{o.price}</small></span>
            </label>
          ))}
        </fieldset>
      )}
      <textarea name="message" placeholder="Conta pra mim o que você tá pensando..." required rows={5} maxLength={2000} />
      <div className="send-row">
        <button className="send wa" value="whatsapp">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z" /></svg>
          WhatsApp
        </button>
        <button className="send mail" value="email">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" d="M3 6h18v12H3zM3 6l9 7 9-7" /></svg>
          E-mail
        </button>
      </div>
      {status === "whatsapp" && <p className="ok">Abri o WhatsApp com sua mensagem, é só enviar!</p>}
      {status === "email" && <p className="ok">Abri seu e-mail com a mensagem pronta. Se não abriu, escreve pra <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>}
    </form>
  );
}
