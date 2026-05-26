import { StadiumMedia } from "@/components/stadium-media";
import { SiteShell } from "@/components/site-shell";

export default function EstadioPage() {
  return (
    <SiteShell>
      <section className="page-section page-section--heroish stadium-page" aria-labelledby="stadium-title">
        <div className="page-wrap stadium-page__wrap">
          <header className="stadium-page__header">
            <p className="stadium-page__kicker">Estádio</p>
            <h1 className="stadium-page__title" id="stadium-title">
              Neo Química Arena
            </h1>
            <p className="stadium-page__subtitle">A Arena do Povo</p>
          </header>

          <div className="stadium-grid">
            <div className="stadium-details stadium-grid__details">
              <div className="stadium-facts" aria-label="Ficha técnica da Neo Química Arena">
                <article className="stadium-fact">
                  <span className="stadium-fact__label">Capacidade</span>
                  <strong className="stadium-fact__value">49.205</strong>
                </article>
                <article className="stadium-fact">
                  <span className="stadium-fact__label">Inauguração</span>
                  <strong className="stadium-fact__value">2014</strong>
                </article>
                <article className="stadium-fact">
                  <span className="stadium-fact__label">Localização</span>
                  <strong className="stadium-fact__value">Itaquera</strong>
                </article>
                <article className="stadium-fact">
                  <span className="stadium-fact__label">Apelido</span>
                  <strong className="stadium-fact__value">
                    Itaquerão <br />
          
                  </strong>
                </article>
              </div>

              <div className="stadium-biography">
                <p>
                  Localizada em Itaquera, a Neo Química Arena é casa do time do povo
                </p>

                <div className="stadium-biography__divider" aria-hidden="true" />

                <p>
                  A Neo Química Arena foi projetada para abrigar a partida de abertura da Copa do Mundo da FIFA de 2014 em São Paulo. O estádio também foi idealizado para atender a uma demanda histórica do Corinthians por uma casa própria e moderna, além de promover o desenvolvimento da Zona Leste da cidade
                </p>
              </div>
            </div>

            <StadiumMedia />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
