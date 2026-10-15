// pedaços que se repetem entre a home e a página de preços
import ContactForm from "./contact-form";
import MobileMenu from "./mobile-menu";
import { packages, maintenance, brl } from "../lib/packages.mjs";
import { EMAIL, WHATSAPP_NUMBER, LINKEDIN } from "../lib/contact.mjs";
import { SparkleIcon, Waves } from "./doodles";

const external = (href) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});

export function Sleeve({ children, className = "" }) {
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

export function Topbar({ links }) {
  const all = [...links, [LINKEDIN, "LinkedIn"]];
  return (
    <nav className="topbar">
      <a className="brand" href="/">Maria Eduarda <SparkleIcon className="brand-spark" fill="#F2BFCB" /></a>
      <div className="links">
        {all.map(([href, label]) => <a key={href} href={href} {...external(href)}>{label}</a>)}
      </div>
      <MobileMenu links={all} />
    </nav>
  );
}

export function ContactSection({ act }) {
  return (
    <section id="contato">
      <p className="tag fill idx">Ato {act}</p>
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
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-foot">
      <p className="xxx">✕ ✕ ✕</p>
      <p><a href={`mailto:${EMAIL}`}>{EMAIL}</a> · <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">WhatsApp</a> · <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a></p>
      <p>© {year} Maria Eduarda · branding &amp; front-end</p>
    </footer>
  );
}
