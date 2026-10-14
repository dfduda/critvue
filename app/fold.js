"use client";
import { useEffect, useState } from "react";

// aberto no desktop; no celular começa fechado pra encurtar a rolagem
export default function Fold({ summary, children, className = "" }) {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (window.matchMedia("(max-width: 760px)").matches) setOpen(false);
  }, []);
  return (
    <details className={`fold ${className}`} open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary>{summary}</summary>
      {children}
    </details>
  );
}
