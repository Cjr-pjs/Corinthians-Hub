import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { Counter } from "@/components/counter";
import { SectionHeading } from "@/components/section-heading";
import { historiaData } from "@/lib/corinthians-data";

export default function HomePage() {
  return (
    <SiteShell>
      <section className="home-hero">
        <div className="page-wrap home-hero__grid">
          <div className="home-hero__copy">
            <p className="home-hero__eyebrow"> 
              FUNDADO EM 1910 · SÃO PAULO, BRASIL</p>
            <h1 className="home-hero__title">
              MAIS DO QUE
              <span>UM CLUBE.</span>
              <span>UMA PAIXÃO.</span>
            </h1>
            <p className="home-hero__lede">
              SPORT CLUB CORINTHIANS PAULISTA
              <br />
              110 anos de história, suor e glória.
              <br />
              Aqui a Fiel nunca para de acreditar.
            </p>
            <div className="home-hero__divider" aria-hidden="true" />
            <div className="home-hero__actions">
              <Link className="button button--primary" href="historia">
                Ver História
              </Link>
            </div>
          </div>

          <div className="home-hero__media" aria-hidden="true">
            
            <img
              id="hero-escudo"
              src="/assets/images/escudo.svg"
              alt="Escudo do Corinthians"
            />
          </div>
        </div>
      </section>

      <section className="page-section" id="timeline">
        <div id="historia" aria-hidden="true" />
        <div className="page-wrap">
          <SectionHeading
            kicker="História"
            title="Linha do tempo do Corinthians"
            description="Marcos e acontecimentos que moldaram o clube ao longo dos anos."
          />

          <div className="timeline">
            {historiaData.map((item) => (
              <article key={item.ano + item.titulo} className="timeline-item">
                <div className="timeline-item__year">{item.ano}</div>
                <div className="timeline-item__body">
                  <h2>{item.titulo}</h2>
                  <p>{item.descricao}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
