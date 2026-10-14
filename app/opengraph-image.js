import { ImageResponse } from "next/og";

export const alt = "Maria Eduarda · Branding e front-end";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#3B2A22", color: "#F7EFE4" }}>
        <div style={{ fontSize: 30, color: "#F2BFCB", letterSpacing: 4, textTransform: "uppercase" }}>Branding / Design system / Front-end</div>
        <div style={{ fontSize: 150, fontWeight: 800, lineHeight: 1, marginTop: 24 }}>Maria Eduarda</div>
        <div style={{ fontSize: 44, marginTop: 28, opacity: 0.8 }}>Do guia de marca ao site no ar.</div>
      </div>
    ),
    size,
  );
}
