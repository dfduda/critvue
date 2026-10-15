import { projects as projectList } from "../lib/projects.mjs";
import { packages, brl } from "../lib/packages.mjs";
import Carousel from "./carousel";
import { SparkleIcon, Vinyl, OrnateFrame } from "./doodles";
import { Sleeve, Topbar, ContactSection, Footer } from "./site";

export const revalidate = 3600;

// arte do selo do disco: coloque a imagem em /public e troque por "/selo.png"
const LABEL_IMAGE = null;
// projetos conceito ficam guardados; troque para true quando quiser mostrar de novo
const SHOW_CONCEPTS = true;
// sua foto na moldura: coloque em /public e troque por "/foto.jpg"
// x/y/w/h posicionam a foto dentro do oval (centralizando o rosto)
const PHOTO = { src: "/foto.webp", x: -157, y: 36, w: 564, h: 469 };

const navLinks = [["#sobre", "Sobre"], ["#projetos", "Tracklist"], ["/precos", "Preços"], ["#contato", "Contato"]];

// menor preço fixo, pra chamada que leva à página de preços
const startingPrice = Math.min(...packages.filter((p) => p.price).map((p) => p.price));

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

// os projetos (com foto) vêm de lib/projects.mjs; o banco guarda só os contatos (leads)
const allProjects = projectList.map((p, i) => ({ id: i + 1, ...p }));

export default async function Home() {
  const projects = allProjects.filter((p) => SHOW_CONCEPTS || !p.tags?.includes("Conceito"));
  const year = new Date().getFullYear();
  const half = projects.length > 4 ? Math.ceil(projects.length / 2) : projects.length;
  const sides = [["A", projects.slice(0, half)], ["B", projects.slice(half)]].filter(([, list]) => list.length);

  return (
    <main>
      <header className="hero">
        <Topbar links={navLinks} />

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

        <section id="precos-cta" className="price-cta">
          <p>Quer um site, uma marca ou os dois? Tem pacote a partir de <b>{brl(startingPrice)}</b>.</p>
          <a className="play" href="/precos">ver pacotes e preços →</a>
        </section>

        <ContactSection act="III" />
      </div>

      <Footer />
    </main>
  );
}
