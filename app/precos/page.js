import { packages, included, extras, maintenance, steps, payment, brl, pix, PIX_DISCOUNT } from "../../lib/packages.mjs";
import PickPackage from "../pick-package";
import Fold from "../fold";
import { Topbar, ContactSection, Footer } from "../site";

export const metadata = {
  title: "Pacotes e preços · Maria Eduarda",
  description: "Pacotes de site, branding e extras com preço aberto, formas de pagamento e como funciona cada projeto.",
  alternates: { canonical: "/precos" },
};

const navLinks = [["/", "Início"], ["/#projetos", "Tracklist"], ["#pacotes", "Pacotes"], ["#contato", "Contato"]];

export default function Precos() {
  return (
    <main>
      <header className="hero hero-slim">
        <Topbar links={navLinks} />
      </header>

      <div className="wrap">
        <section id="pacotes" className="first">
          <p className="tag fill idx">Ato I</p>
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
                  {p.price && <em className="pix-price">no Pix {brl(pix(p.price))} · -{PIX_DISCOUNT}%</em>}
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
                <ul>{extras.map((x) => <li key={x.name}><span>{x.name}<small>{x.detail}</small></span><i /><b>a partir de {brl(x.price)}<small className="pix-note"> · Pix {brl(pix(x.price))}</small></b></li>)}</ul>
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

        <ContactSection act="II" />
      </div>

      <Footer />
    </main>
  );
}
