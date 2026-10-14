import BriefingForm from "./briefing-form";

export const metadata = {
  title: "Briefing de projeto · Maria Eduarda",
  description: "Conte sobre o seu projeto em cerca de 10 minutos.",
  robots: { index: false, follow: false },
};

export default function BriefingPage() {
  return (
    <div className="bfx">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />
      <div className="bfx-wrap">
        <p className="bfx-kicker">Branding &amp; front-end</p>
        <h1 className="bfx-title">BRIEF</h1>
        <div className="bfx-meta">
          <p><b>DESIGNER:</b> Maria Eduarda</p>
          <p><b>TEMPO:</b> cerca de 10 minutos</p>
        </div>
        <p className="bfx-lead">Quanto mais detalhes, melhor a proposta. O que você não souber, deixe em branco e a gente resolve na conversa.</p>
        <BriefingForm />
        <p className="bfx-foot">eduardadias.online</p>
      </div>
    </div>
  );
}
