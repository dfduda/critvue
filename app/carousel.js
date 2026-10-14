"use client";
import { useRef } from "react";

export default function Carousel({ label, children }) {
  const track = useRef(null);
  const go = (dir) => {
    const el = track.current;
    const card = el?.firstElementChild;
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: "smooth" });
  };
  return (
    <div className="carousel">
      <div className="car-track" ref={track} role="region" aria-label={label} tabIndex={0}>{children}</div>
      <div className="car-nav">
        <button type="button" onClick={() => go(-1)} aria-label="Projeto anterior">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Próximo projeto">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}
