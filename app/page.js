import { getSql } from "../lib/db";
import ContactForm from "./contact-form";

export const dynamic = "force-dynamic";

const fallbackProjects = [
  { id: 1, title: "Projeto de exemplo", description: "Conecta o banco (DATABASE_URL) que seus projetos aparecem aqui!", url: null, tags: ["Next.js"] },
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

const skills = ["Design", "Criatividade", "Café", "Detalhes", "Ideias malucas"];

export default async function Home() {
  const projects = await getProjects();
  return (
    <main>
      <nav className="nav">
        <span className="logo">Meow<b>!</b></span>
        <div>
          <a href="#sobre">Sobre</a>
          <a href="#projetos">Projetos</a>
          <a href="#contato">Contato</a>
        </div>
      </nav>

      <section className="hero">
        <span className="sticker">Oi, prazer! 👋</span>
        <h1>
          <span>PORT</span>
          <span className="alt">FOLIO</span>
        </h1>
        <p className="lead">
          Eu sou <strong>Seu Nome</strong> e faço coisas legais. Chega mais, olha meus trabalhos e bora conversar!
        </p>
        <div className="cta">
          <a className="btn" href="#projetos">Ver projetos</a>
          <a className="btn ghost" href="#contato">Falar comigo</a>
        </div>
        <div className="marquee" aria-hidden="true">
          <div>{Array.from({ length: 2 }).map((_, i) => <span key={i}>★ DESIGN ★ IDEIAS ★ CAFÉ ★ CRIATIVIDADE ★ DESIGN ★ IDEIAS ★ CAFÉ ★ CRIATIVIDADE </span>)}</div>
        </div>
      </section>

      <section id="sobre" className="about">
        <h2>Um pouquinho<br />sobre mim</h2>
        <div className="card pink">
          <p>
            Aqui vai a sua bio, num tom de conversa de amiga: de onde você vem, o que ama fazer
            e o que te deixa animada. Pode ter piada, tá? 😄
          </p>
          <div className="tags">{skills.map((s) => <span key={s}>{s}</span>)}</div>
        </div>
      </section>

      <section id="projetos">
        <h2>Meus projetos</h2>
        <div className="grid">
          {projects.map((p, i) => (
            <article key={p.id} className={`card ${i % 2 ? "teal" : "white"}`}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="tags">{p.tags?.map((t) => <span key={t}>{t}</span>)}</div>
              {p.url && <a className="btn small" href={p.url} target="_blank" rel="noreferrer">Dar uma olhada →</a>}
            </article>
          ))}
        </div>
      </section>

      <section id="contato" className="contact">
        <h2>Bora<br />conversar?</h2>
        <p className="lead">Manda um oi! Eu respondo com carinho (e rápido, prometo).</p>
        <ContactForm />
      </section>

      <footer>Feito com 💗 por Seu Nome · {new Date().getFullYear()}</footer>
    </main>
  );
}
