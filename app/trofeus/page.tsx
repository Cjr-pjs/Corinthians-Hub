import Image from "next/image";
import { Counter } from "@/components/counter";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { trofeusData, trofeusResumoData } from "@/lib/corinthians-data";

export default function TrofeusPage() {
  return (
    <SiteShell>
      <section className="page-section page-section--heroish">
        <div className="page-wrap">
          <SectionHeading
            kicker="Troféus"
            title="Conquistas em destaque"
            description="Os números animados reforçam a leitura editorial e os blocos principais agora seguem o mesmo peso visual dos demais cards."
          />

          <div className="trophy-intro">
            <article className="trophy-intro__featured">
              <h2>Mundial de 2000</h2>
              <p>O Corinthians entrou para a história ao conquistar o primeiro Mundial de Clubes organizado pela FIFA, realizado no Brasil em 2000 </p>
              <Image
                src="/assets/images/Trofeus/Mundial2000.jpg"
                alt="Imagem representativa do Mundial de Clubes do Corinthians"
                width={600}
                height={400}
                className="trophy-intro__featured-image"
              />
            </article>

            <article className="trophy-intro__summary">
              <h2>Principais marcas</h2>
              <div className="trophy-intro__summary-list">
                {trofeusResumoData.map((item) => (
                  <article key={item.nome} className="trophy-intro__summary-card">
                    <p className="trophy-intro__summary-name">{item.nome}</p>
                    <strong>
                      <Counter value={item.quantidade} /> títulos
                    </strong>
                    <p>{item.descricao}</p>
                  </article>
                ))}
              </div>
            </article>
          </div>

          <div className="trophy-grid">
            {trofeusData.map((item) => (
              <article key={item.nome} className={`trophy-card ${item.destaque ? "trophy-card--featured" : ""}`}>
                <div className="trophy-card__media">
                  <Image
                    src={item.imagem}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="trophy-card__body">
                  <p className="trophy-card__category">{item.categoria}</p>
                  <h2>{item.nome}</h2>
                  <p className="trophy-card__count">
                    <Counter value={item.quantidade} /> títulos
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
