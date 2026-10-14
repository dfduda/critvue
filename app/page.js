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
        <nav className="topbar mono">
          <span>ONE STAGE · ONE NIGHT ✦</span>
          <div>
            <a href="#sobre">SOBRE</a>
            <a href="#projetos">PROJETOS</a>
            <a href="#contato">CONTATO</a>
          </div>
        </nav>
        <div className="title">
          <p className="mono kicker">SEU NOME · DESIGNER DE OUTRO PLANETA</p>
          <h1>PORT<span>FOLIO</span></h1>
          <p className="deco">UM PALCO. UMA NOITE. UM PORTFÓLIO.</p>
          <div className="cta">
            <a className="btn" href="#projetos">Ver projetos</a>
            <a className="btn alt" href="#contato">Falar comigo</a>
          </div>
          <div className="badge" aria-hidden="true"><span className="mono">ABERTO</span><b>{new Date().getFullYear()}</b><span className="mono">ENTRADA LIVRE</span></div>
        </div>
        <div className="tents" aria-hidden="true">
          <i className="tent t1" /><i className="tent t2" /><i className="tent t3" />
        </div>
        <div className="floor" aria-hidden="true" />
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
              <article key={p.id} className="card ticket">
                <div className="stub mono"><span>ADMIT ONE</span><b>{num(i + 1)}</b></div>
                <div className="main">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="tags mono">{p.tags?.map((t) => <span key={t} className={t === "Conceito" ? "concept" : ""}>{t}</span>)}</div>
                  {p.url && <a className="mono link" href={p.url} target="_blank" rel="noreferrer">VER PROJETO ↗</a>}
                </div>
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
