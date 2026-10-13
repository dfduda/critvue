import { getSql } from "../lib/db";
import ContactForm from "./contact-form";

export const dynamic = "force-dynamic";

const fallbackProjects = [
  { id: 1, title: "Projeto de exemplo", description: "Configure o DATABASE_URL do Neon para listar seus projetos aqui.", url: null, tags: ["Next.js"] },
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

export default async function Home() {
  const projects = await getProjects();
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Olá, eu sou</p>
        <h1>Seu Nome</h1>
        <p className="lead">Sua profissão — uma frase curta sobre o que você faz.</p>
        <a className="btn" href="#contato">Fale comigo</a>
      </section>

      <section id="sobre">
        <h2>Sobre mim</h2>
        <p>Escreva aqui sua bio: formação, experiência e o que você busca.</p>
      </section>

      <section id="projetos">
        <h2>Projetos</h2>
        <div className="grid">
          {projects.map((p) => (
            <article key={p.id} className="card">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="tags">{p.tags?.map((t) => <span key={t}>{t}</span>)}</div>
              {p.url && <a href={p.url} target="_blank" rel="noreferrer">Ver projeto →</a>}
            </article>
          ))}
        </div>
      </section>

      <section id="contato">
        <h2>Contato</h2>
        <ContactForm />
      </section>

      <footer>© {new Date().getFullYear()} Seu Nome</footer>
    </main>
  );
}
