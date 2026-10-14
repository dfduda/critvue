import BriefingForm from "./briefing-form";

export const metadata = {
  title: "Briefing · Maria Eduarda",
  description: "Conte sobre o seu projeto em cerca de 10 minutos.",
  robots: { index: false, follow: false },
};

export default function BriefingPage() {
  return (
    <main className="wrap bf-page">
      <p className="tag fill idx">Briefing</p>
      <h1 className="bf-title">Conte sobre o seu projeto</h1>
      <p className="bf-intro">Leva uns 10 minutos. Responda do seu jeito, em poucas linhas. Não existe resposta certa: o que você não souber, deixe em branco e a gente resolve na conversa.</p>
      <BriefingForm />
    </main>
  );
}
