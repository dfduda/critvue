const BG = "#3B2A22";
const PINK = "#F2BFCB";
const PERI = "#A9C4E6";
const MUSTARD = "#F2BFCB";
const CREAM = "#F7EFE4";

const star = "M0 -14 C2 -3 3 -2 14 0 C3 2 2 3 0 14 C-2 3 -3 2 -14 0 C-3 -2 -2 -3 0 -14Z";

export function SparkleIcon({ fill = MUSTARD, className = "" }) {
  return (
    <svg className={className} viewBox="-16 -16 32 32" aria-hidden="true">
      <path d={star} fill={fill} />
    </svg>
  );
}

/* faixas onduladas do fundo da capa, como relevo de mapa */
export function Waves() {
  const lines = Array.from({ length: 22 }, (_, i) => {
    const y0 = -20 + i * 30;
    const d = Array.from({ length: 61 }, (_, k) => {
      const x = -20 + k * 14;
      const y = y0 + 16 * Math.sin(x / 95 + i * 0.45) + 9 * Math.sin(x / 41 + i * 1.3);
      return `${k ? "L" : "M"}${x} ${y.toFixed(1)}`;
    }).join(" ");
    return <path key={i} d={d} />;
  });
  return (
    <svg className="waves" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round">{lines}</g>
    </svg>
  );
}

/* disco de vinil: sulcos giram, o brilho fica parado como luz de verdade */
export function Vinyl({ labelSrc }) {
  return (
    <div className="vinyl" aria-hidden="true">
      <div className="disc">
        <div className={`label${labelSrc ? " has-img" : ""}`} style={labelSrc ? { backgroundImage: `url(${labelSrc})` } : undefined}>
          {!labelSrc && <><p className="lbl-top"><small>lado A</small><b>Maria<br />Eduarda</b></p><span>portfólio · vol. 01</span></>}
        </div>
        <i className="hole" />
      </div>
      <div className="sheen" />
    </div>
  );
}

const GOLD = "#E3B26A";
const GOLD_DARK = "#A8732F";
const BLUE = "#A9C4E6";

const ring = (rx, ry, n, amp, steps = 240) => Array.from({ length: steps }, (_, i) => {
  const t = (i / steps) * Math.PI * 2;
  const k = 1 + (amp / Math.min(rx, ry)) * Math.cos(n * t);
  return `${i ? "L" : "M"}${(200 + rx * k * Math.cos(t)).toFixed(1)} ${(250 + ry * k * Math.sin(t)).toFixed(1)}`;
}).join(" ") + "Z";

function Bow({ x, y, r }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`} stroke={GOLD_DARK} strokeWidth="2" strokeLinejoin="round" fill={GOLD}>
      <path d="M0 0 C-8 -14 -24 -12 -22 0 C-24 12 -8 14 0 0Z" />
      <path d="M0 0 C8 -14 24 -12 22 0 C24 12 8 14 0 0Z" />
      <path d="M-3 2 L-10 18 L-5 15 L-3 20Z M3 2 L10 18 L5 15 L3 20Z" />
      <circle r="5" />
    </g>
  );
}

/* moldura barroca com laços, explosão de cores e brilhos dentro */
export function OrnateFrame({ photo }) {
  const wedges = Array.from({ length: 16 }, (_, i) => {
    const a0 = (i / 16) * Math.PI * 2, a1 = ((i + 1) / 16) * Math.PI * 2;
    return { d: `M200 250 L${200 + 400 * Math.cos(a0)} ${250 + 400 * Math.sin(a0)} L${200 + 400 * Math.cos(a1)} ${250 + 400 * Math.sin(a1)}Z`, fill: i % 2 ? PINK : BLUE, a0 };
  });
  const bows = Array.from({ length: 8 }, (_, i) => {
    const t = (i / 8) * Math.PI * 2 + Math.PI / 8;
    return { x: 200 + 166 * Math.cos(t), y: 250 + 214 * Math.sin(t), r: (t * 180) / Math.PI + 90 };
  });
  return (
    <svg className="ornate" viewBox="0 0 400 500" role="img" aria-label="Moldura dourada com a foto da Maria Eduarda">
      <defs>
        <clipPath id="opening"><ellipse cx="200" cy="250" rx="132" ry="180" /></clipPath>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F6D395" /><stop offset=".5" stopColor={GOLD} /><stop offset="1" stopColor={GOLD_DARK} />
        </linearGradient>
      </defs>
      <path d={ring(188, 238, 18, 7)} fill="url(#gold)" stroke={GOLD_DARK} strokeWidth="3" />
      <path d={ring(168, 218, 36, 2.5)} fill="none" stroke={GOLD_DARK} strokeWidth="2" opacity=".6" />
      <ellipse cx="200" cy="250" rx="142" ry="190" fill={GOLD_DARK} />
      <g clipPath="url(#opening)">
        {photo
          ? <image href={photo.src ?? photo} x={photo.x ?? 68} y={photo.y ?? 70} width={photo.w ?? 264} height={photo.h ?? 360} preserveAspectRatio="xMidYMid slice" />
          : <>
              {wedges.map((w, i) => <path key={i} d={w.d} fill={w.fill} />)}
              <g stroke={CREAM} strokeWidth="2.5" strokeDasharray="7 9" strokeLinecap="round" opacity=".85">
                {wedges.map((w, i) => <path key={i} d={`M${200 + 40 * Math.cos(w.a0)} ${250 + 40 * Math.sin(w.a0)} L${200 + 220 * Math.cos(w.a0)} ${250 + 220 * Math.sin(w.a0)}`} />)}
              </g>
              <g fill={CREAM}>
                <path d={star} transform="translate(272 150) scale(1.1)" />
                <path d={star} transform="translate(126 330) scale(.7)" />
                <path d={star} transform="translate(286 360) scale(.55)" />
                <path d={star} transform="translate(140 140) scale(.5)" />
              </g>
              <g fontFamily="Unbounded, sans-serif" fontWeight="800" textAnchor="middle" fill={BG}>
                <rect x="118" y="226" width="164" height="48" rx="24" fill={CREAM} />
                <text x="200" y="256" fontSize="15">sua foto aqui</text>
              </g>
            </>}
      </g>
      <ellipse cx="200" cy="250" rx="132" ry="180" fill="none" stroke={GOLD_DARK} strokeWidth="4" />
      <ellipse cx="200" cy="250" rx="138" ry="186" fill="none" stroke="#F6D395" strokeWidth="3" />
      {bows.map((b, i) => <Bow key={i} {...b} />)}
      <Bow x={200} y={18} r={0} />
    </svg>
  );
}

export function PartyHat() {
  return (
    <svg className="hat" viewBox="0 0 80 100" aria-hidden="true">
      <g stroke={BG} strokeWidth="3" strokeLinejoin="round">
        <path d="M40 14 L70 88 Q40 98 10 88Z" fill={PERI} />
        <circle cx="34" cy="46" r="5" fill={CREAM} />
        <circle cx="50" cy="66" r="5" fill={CREAM} />
        <circle cx="28" cy="78" r="5" fill={CREAM} />
        <circle cx="40" cy="12" r="9" fill={PINK} />
      </g>
    </svg>
  );
}
