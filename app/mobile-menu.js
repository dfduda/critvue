"use client";
import { useEffect, useRef, useState } from "react";

export default function MobileMenu({ links }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onClick = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("click", onClick); };
  }, [open]);

  return (
    <div className="mmenu" ref={ref}>
      <button className={`dots${open ? " on" : ""}`} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="mmenu-panel" onClick={() => setOpen(!open)}>
        <i /><i /><i /><i />
      </button>
      {open && (
        <nav id="mmenu-panel" className="mmenu-panel">
          {links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{label}</a>)}
        </nav>
      )}
    </div>
  );
}
