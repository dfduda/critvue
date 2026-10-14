"use client";

export default function PickPackage({ name, className = "", children }) {
  function onClick(e) {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("pick-package", { detail: name }));
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  }
  return <a href="#contato" className={className} onClick={onClick}>{children}</a>;
}
