import { getSql } from "../lib/db";
import ContactForm from "./contact-form";

export const dynamic = "force-dynamic";

const fallbackProjects = [
  { id: 1, title: "Projeto de exemplo", description: "Conecte o banco (DATABASE_URL) e seus projetos aparecem aqui.", url: null, tags: ["Next.js"] },
];

async function getProjects() {
  const sql = getSql();
  if (!sql) return fallbackProjects;
  try {
    return await sql`SELECT id, title, description, url, tags FROM projects ORDER BY created_at DESC`;
  } catch {
    return fallbackProjects;
  }
}

const num = (n) => String(n).padStart(2, "0");

export default async function Home() {
  const projects = await getProjects();
  return (
    <main>
      <header className="hero">
        <div className="art">
          <svg viewBox="0 0 1200 560" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
            <g strokeLinejoin="round" strokeWidth="10">
              <path className="s-accent" d="M0 0H360V60H420V120H480V180H420V240H0Z" />
              <path className="s-lilac" d="M760 240V160H1000V100H1060V40H1120V0H1200V240Z" />
              <path className="s-cream" d="M0 330H220V390H280V450H220V510H0Z" />
              <path className="s-cream" d="M320 560V440H380V380H440V320H500V260H560V200H620V260H680V320H740V380H800V440H860V560Z" />
            </g>
          </svg>
          <p className="tl mono">SELECTED<br />WORK</p>
        </div>

        <div className="foot">
          <div className="title">
            <p className="mono">SEU NOME · SUA PROFISSÃO · {new Date().getFullYear()}</p>
            <h1>PORT<br />FOLIO</h1>
          </div>
          <div className="side mono">
            <nav>
              <a href="#sobre">SOBRE</a>
              <a href="#projetos">PROJETOS</a>
              <a href="#contato">CONTATO</a>
            </nav>
            <p>ig:@seuinstagram<br />seuemail@email.com</p>
          </div>
        </div>
      </header>

      <div className="wrap">
        <section id="sobre">
          <p className="idx mono">(01)</p>
          <h2>Oi, que bom<br />te ver por aqui.</h2>
          <div className="boxes">
            <div className="box"><span className="mono">01</span><p>Escreva aqui quem você é, de onde vem e o que ama fazer.</p></div>
            <div className="box lit"><span className="mono">02</span><p>Conte o que te move e como você gosta de trabalhar com as pessoas.</p></div>
            <div className="box"><span className="mono">03</span><p>Diga no que você é boa e que tipo de projeto quer fazer agora.</p></div>
          </div>
        </section>

        <section id="projetos">
          <p className="idx mono">(02)</p>
          <h2>Alguns<br />trabalhos.</h2>
          <div className="grid">
            {projects.map((p, i) => (
              <article key={p.id} className="card">
                <span className="mono">{num(i + 1)}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="tags mono">{p.tags?.map((t) => <span key={t}>{t}</span>)}</div>
                {p.url && <a className="mono link" href={p.url} target="_blank" rel="noreferrer">VER PROJETO ↗</a>}
              </article>
            ))}
          </div>
        </section>

        <section id="contato">
          <p className="idx mono">(03)</p>
          <h2>Vamos<br />conversar?</h2>
          <p className="sub">Manda um oi, conta sua ideia. Eu respondo com carinho.</p>
          <ContactForm />
        </section>

        <footer className="mono">© {new Date().getFullYear()} SEU NOME</footer>
      </div>
    </main>
  );
}
