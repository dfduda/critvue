import { getSql } from "../lib/db";
import ContactForm from "./contact-form";
import { projects as projectList } from "../lib/projects.mjs";
import { packages, included, extras, maintenance, steps, payment, brl } from "../lib/packages.mjs";
import PickPackage from "./pick-package";
import MobileMenu from "./mobile-menu";
import Fold from "./fold";
import Carousel from "./carousel";
import { EMAIL, WHATSAPP_NUMBER, LINKEDIN } from "../lib/contact.mjs";
import { SparkleIcon, Waves, Vinyl, OrnateFrame } from "./doodles";

export const revalidate = 3600;

// arte do selo do disco: coloque a imagem em /public e troque por "/selo.png"
const LABEL_IMAGE = null;
// projetos conceito ficam guardados; troque para true quando quiser mostrar de novo
const SHOW_CONCEPTS = true;
// sua foto na moldura: coloque em /public e troque por "/foto.jpg"
// x/y/w/h posicionam a foto dentro do oval (centralizando o rosto)
const PHOTO = { src: "/foto.webp", x: -157, y: 36, w: 564, h: 469 };

const navLinks = [["#sobre", "Sobre"], ["#projetos", "Tracklist"], ["#pacotes", "Pacotes"], ["#contato", "Contato"], [LINKEDIN, "LinkedIn"]];

const tools = [
  { group: "Design", color: "pink", items: [["Photoshop", "photoshop-plain"], ["Illustrator", "illustrator-plain"], ["Figma", "figma-plain"]] },
  { group: "Front-end", color: "blue", items: [["HTML", "html5-plain"], ["CSS", "css3-plain"], ["JavaScript", "javascript-plain"], ["React", "react-original"]] },
  { group: "Back-end", color: "oat", items: [["PHP", "php-plain"], ["SQL", "mysql-plain"], ["Git", "git-plain"]] },
];

const about = [
  { title: "Quem sou", text: "Maria Eduarda, designer de branding e desenvolvedora front-end." },
  { title: "O que faço", text: "Branding, design system e front-end: do guia de marca ao site no ar." },
  { title: "Onde já atuei", text: "Criei a IKIZY do zero, da marca ao produto. Na Simple Dealers, sou front-end e cuido do design system." },
  { title: "Como trabalho", text: "Começo pelo briefing e mostro tudo no Figma antes de escrever código." },
];

const fallbackProjects = projectList.map((p, i) => ({ id: i + 1, ...p }));

async function getProjects() {
  const sql = getSql();
  if (!sql) return fallbackProjects;
  try {
    return await sql`SELECT id, title, description, url, tags FROM projects ORDER BY created_at DESC`;
  } catch {
    return fallbackProjects;
  }
}

function Sleeve({ children, className = "" }) {
  return (
    <div className={`sleeve ${className}`}>
      <div className="sleeve-inner">
        <Waves />
        <i className="plus tl" /><i className="plus tr" /><i className="plus bl" /><i className="plus br" />
        {children}
        <p className="xxx" aria-hidden="true">✕ ✕ ✕</p>
      </div>
    </div>
  );
}

export default async function Home() {
  const projects = (await getProjects()).filter((p) => SHOW_CONCEPTS || !p.tags?.includes("Conceito"));
  const year = new Date().getFullYear();
  const half = projects.length > 4 ? Math.ceil(projects.length / 2) : projects.length;
  const sides = [["A", projects.slice(0, half)], ["B", projects.slice(half)]].filter(([, list]) => list.length);

  return (
    <main>
      <header className="hero">
        <nav className="topbar">
          <span className="brand">Maria Eduarda <SparkleIcon className="brand-spark" fill="#F2BFCB" /></span>
          <div className="links">
            {navLinks.map(([href, label]) => <a key={href} href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{label}</a>)}
          </div>
          <MobileMenu links={navLinks} />
        </nav>

        <div className="record">
          <Vinyl labelSrc={LABEL_IMAGE} />
          <Sleeve className="cover">
            <p className="oval">Prazer, que bom te ver!</p>
            <div className="lockup">
              <span className="tag t-top">branding</span>
              <h1><span>PORT</span><span>FOLIO</span></h1>
              <span className="tag fill t-side">vol. {String(year).slice(2)}</span>
              <a className="tag fill t-bottom" href="#sobre">Sobre a Maria Eduarda</a>
              <i className="tri a" /><i className="tri b" />
            </div>
            <p className="services">Branding / Design system<br />Front-end / Landing pages / Figma</p>
          </Sleeve>
        </div>
      </header>

      <div className="wrap">
        <section id="sobre">
          <p className="tag fill idx">Ato I</p>
          <h2>Oi, que bom te ver <em>por aqui</em> <SparkleIcon className="h-spark" /></h2>
          <div className="about-grid">
            <figure className="portrait">
              <SparkleIcon className="lat-star s1" fill="#F2BFCB" /><SparkleIcon className="lat-star s2" fill="#A9C4E6" /><SparkleIcon className="lat-star s3" fill="#F2BFCB" />
              <OrnateFrame photo={PHOTO} />
              <figcaption><b>Maria Eduarda</b><span>branding &amp; front-end</span></figcaption>
            </figure>
          <div className="journey-card">
            <p className="j-big j-top">Quem</p>
            <ol className="journey">
              {about.map((it, i) => (
                <li key={it.title} className={i % 2 ? "up" : "down"}>
                  <span className="j-no">{String(i + 1).padStart(2, "0")}</span>
                  <div><b>{it.title}</b><p>{it.text}</p></div>
                </li>
              ))}
            </ol>
            <p className="j-big j-bottom">eu sou</p>
          </div>
          </div>

          <div className="credits">
            <p className="credits-title">Ficha técnica <span>o que eu uso pra criar</span></p>
            <div className="credits-cols">
              {tools.map((g) => (
                <div key={g.group}>
                  <p className="side-title"><span>{g.group}</span><i /></p>
                  <ul className={`chips ${g.color}`}>
                    {g.items.map(([name, icon]) => <li key={name} title={name}><i className={`devicon-${icon}`} aria-hidden="true" /><span>{name}</span></li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projetos">
          <p className="tag fill idx">Ato II</p>
          <h2>Tracklist</h2>
          <div className="tracklist">
            {sides.map(([side, list], s) => (
              <div key={side} className="side-block">
                <p className="side-title"><span>Lado {side}</span><i /></p>
                <Carousel label={`Projetos do lado ${side}`}>
                  {list.map((p, i) => (
                    <article key={p.id} className="proj">
                      <div className={`shot c${(i + s) % 4}`}>
                        {p.image
                          ? <img src={p.image} alt={`Prévia do projeto ${p.title}`} loading="lazy" style={p.imagePos ? { objectPosition: p.imagePos } : undefined} />
                          : <span className="shot-ph" aria-hidden="true"><b>{p.name ?? p.title}</b><small>foto do projeto</small></span>}
                        <span className="no">{side}{i + 1}</span>
                      </div>
                      <div className="info">
                        <h3>{p.title}</h3>
                        <p>{p.description}</p>
                        <div className="tags">{p.tags?.map((t) => <span key={t} className={t === "Conceito" ? "concept" : ""}>{t}</span>)}</div>
                      </div>
                      {p.url
                        ? <a className="play" href={p.url} target="_blank" rel="noreferrer" aria-label={`Ver ${p.title}`}>ver projeto ↗</a>
                        : <span className="play off">{p.tags?.includes("Conceito") ? "projeto conceito" : "sem link público"}</span>}
                    </article>
                  ))}
                </Carousel>
              </div>
            ))}
          </div>
        </section>

        <section id="pacotes">
          <p className="tag fill idx">Ato III</p>
          <h2>Pacotes <em>e projetos</em></h2>
          <div className="tickets">
            {packages.map((p, i) => (
              <article key={p.id} className={`ticket-pack ${p.color}${p.featured ? " featured" : ""}`}>
                <div className="art" aria-hidden="true"><i className="blob" /><i className="disc-mini" /></div>
                <div className="t-info">
                  <p className="t-kicker">{p.featured ? "✦ mais pedido" : p.custom ? "✦ edição especial" : `pacote ${String(i + 1).padStart(2, "0")}`}</p>
                  <h3>{p.name}</h3>
                  <p className="tagline">{p.tagline}</p>
                  <Fold summary="o que inclui" className="t-fold"><ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul></Fold>
                </div>
                <div className="t-price">
                  <small>{p.price ? "a partir de" : "valor"}</small>
                  <b>{p.price ? brl(p.price) : "Sob medida"}</b>
                  <span>{p.deadline}</span>
                </div>
                <PickPackage name={p.name} className="t-stub">
                  <span>{p.custom ? "me chama" : "quero esse"}</span><small>admit one</small>
                </PickPackage>
              </article>
            ))}
          </div>

          <div className="pricelist">
            <div className="pl-body">
              <p className="pl-intro">Quer algo a mais ou prefere que eu cuide do site depois? Tá tudo aqui, sem letra miúda.</p>
              <Fold className="pl-fold" summary={<h4><span>[01]</span> Faixa bônus</h4>}>
                <ul>{extras.map((x) => <li key={x.name}><span>{x.name}<small>{x.detail}</small></span><i /><b>a partir de {brl(x.price)}</b></li>)}</ul>
              </Fold>
              <Fold className="pl-fold" summary={<h4><span>[02]</span> Plano {maintenance.name} · manutenção</h4>}>
                <ul>
                  <li><span>{maintenance.items.join(", ")}</span><i /><b>{brl(maintenance.price)}/mês</b></li>
                </ul>
                <PickPackage name={`Plano ${maintenance.name}`} className="pl-pick">quero manutenção →</PickPackage>
              </Fold>
              <Fold className="pl-fold" summary={<h4><span>[03]</span> Todo pacote inclui</h4>}>
                <ul>{included.map((x) => <li key={x}><span>{x}</span><i /><b>incluso</b></li>)}</ul>
              </Fold>
              <Fold className="pl-fold" summary={<h4><span>[04]</span> Pagamento</h4>}>
                <ul>{payment.map((x) => <li key={x.name}><span>{x.name}</span><i /><b>{x.value}</b></li>)}</ul>
              </Fold>
            </div>
            <p className="pl-big" aria-hidden="true">PREÇOS</p>
          </div>

          <h3 className="steps-title">Como funciona</h3>
          <ol className="steps">
            {steps.map((st, i) => (
              <li key={st.title}><span className="no">{String(i + 1).padStart(2, "0")}</span><b>{st.title}</b><p>{st.text}</p></li>
            ))}
          </ol>
        </section>

        <section id="contato">
          <p className="tag fill idx">Ato IV</p>
          <Sleeve className="thanks">
            <div className="thanks-copy">
              <p className="oval">Mal posso esperar sua mensagem</p>
              <div className="lockup small">
                <span className="tag t-top">contato</span>
                <h2 className="big">VAMOS<br />CONVERSAR?</h2>
                <i className="tri a" /><i className="tri b" />
              </div>
              <p className="services">Manda um oi, conta sua ideia. Eu respondo com carinho.</p>
            </div>
            <ContactForm options={[
              ...packages.map((p) => ({ name: p.name, color: p.color, price: p.price ? brl(p.price) : "sob medida" })),
              { name: `Plano ${maintenance.name}`, color: "oat", price: `${brl(maintenance.price)}/mês` },
            ]} />
          </Sleeve>
        </section>
      </div>

      <footer className="site-foot">
        <p className="xxx">✕ ✕ ✕</p>
        <p><a href={`mailto:${EMAIL}`}>{EMAIL}</a> · <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">WhatsApp</a> · <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a></p>
        <p>© {year} Maria Eduarda · branding &amp; front-end</p>
      </footer>
    </main>
  );
}
