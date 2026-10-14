import { getSql } from "../lib/db";
import ContactForm from "./contact-form";

export const revalidate = 3600;

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
      <div className="collar" aria-hidden="true" />
      <header className="hero">
        <div className="rays" aria-hidden="true" />
        <nav className="topbar mono">
          <span>FROM OUTER SPACE ✦</span>
          <div>
            <a href="#sobre">SOBRE</a>
            <a href="#projetos">PROJETOS</a>
            <a href="#contato">CONTATO</a>
          </div>
        </nav>
        <div className="title">
          <p className="mono kicker">SEU NOME · DESIGNER DE OUTRO PLANETA · {new Date().getFullYear()}</p>
          <h1>Port<br />folio</h1>
          <p className="lead">Cheguei do espaço com muitas ideias e nenhum plano de ir embora. Dá uma olhada nos meus trabalhos.</p>
          <div className="cta">
            <a className="btn" href="#projetos">Ver projetos</a>
            <a className="btn alt" href="#contato">Falar comigo</a>
          </div>
        </div>
      </header>

      <div className="tape" aria-hidden="true">
        <div>{Array.from({ length: 2 }).map((_, i) => <span key={i}>★ DESIGN FROM OUTER SPACE ★ IDEIAS ★ BRANDING ★ LANDING PAGES ★ DESIGN FROM OUTER SPACE ★ IDEIAS ★ BRANDING ★ LANDING PAGES </span>)}</div>
      </div>

      <div className="wrap">
        <section id="sobre">
          <p className="idx mono">(01)</p>
          <h2>Oi, que bom<br />te ver por aqui.</h2>
          <div className="about">
            <article className="license">
              <header>PORTFOLIO LICENSE</header>
              <div className="body">
                <div className="photo mono">SUA<br />FOTO</div>
                <div>
                  <p className="name">Seu Nome</p>
                  <p className="mono">PROFISSÃO: SUA PROFISSÃO</p>
                  <p className="mono">NASCEU EM: ONTEM</p>
                  <p className="sign">Seu Nome</p>
                </div>
              </div>
              <footer className="mono">CERTIFICADA PARA CRIAR</footer>
            </article>
            <div className="boxes">
              <div className="box"><span className="mono">01</span><p>Escreva aqui quem você é, de onde vem e o que ama fazer.</p></div>
              <div className="box lit"><span className="mono">02</span><p>Conte o que te move e como você gosta de trabalhar com as pessoas.</p></div>
              <div className="box"><span className="mono">03</span><p>Diga no que você é boa e que tipo de projeto quer fazer agora.</p></div>
            </div>
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
                <div className="tags mono">{p.tags?.map((t) => <span key={t} className={t === "Conceito" ? "concept" : ""}>{t}</span>)}</div>
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

        <footer className="mono site-foot">© {new Date().getFullYear()} SEU NOME</footer>
      </div>
    </main>
  );
}
