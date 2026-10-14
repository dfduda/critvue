import BriefingForm from "./briefing-form";

export const metadata = {
  title: "Briefing de projeto · Maria Eduarda",
  description: "Conte sobre o seu projeto em cerca de 10 minutos.",
  robots: { index: false, follow: false },
};

export default function BriefingPage() {
  return (
    <div className="bfx">
      <div className="bfx-wrap">
        <p className="bfx-brand">Maria Eduarda <span>· Branding &amp; front-end</span></p>
        <h1>Briefing de projeto</h1>
        <p className="bfx-lead">Responda em cerca de 10 minutos. Quanto mais detalhes, melhor a proposta. O que você não souber, deixe em branco e a gente resolve na conversa.</p>
        <BriefingForm />
      </div>
    </div>
  );
}
