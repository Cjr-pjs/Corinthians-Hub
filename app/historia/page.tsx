import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";

export default function HistoriaPage() {
  return (
    <SiteShell>
      <section className="page-section page-section--heroish">
        <div className="page-wrap">
          <SectionHeading
            kicker="História"
            title="Biografia detalhada do clube"
            description="Uma narrativa cronológica e contextualizada do surgimento e desenvolvimento do Sport Club Corinthians Paulista."
          />

          <div className="page-bio">
            <div className="page-bio__main">
              <section>
                <h3>Fundação (1910)</h3>
                <p>
                  O Sport Club Corinthians Paulista nasceu em 1º de setembro de 1910, fundado por um grupo de
                  operários e jovens do bairro do Bom Retiro, em São Paulo. A ideia era criar um clube que
                  representasse as camadas populares, distante das elites que dominavam o futebol na época. O
                  nome foi inspirado pelo time inglês Corinthian Football Club, conhecido por suas excursões e
                  espírito amador, mas o Corinthians logo encontraria sua própria identidade social e cultural.
                </p>
              </section>

              <section>
                <h3>Décadas iniciais e consolidação</h3>
                <p>
                  Nas primeiras décadas, o clube se consolidou no cenário paulista participando dos campeonatos
                  regionais e ganhando a simpatia de uma torcida crescente. O primeiro título estadual veio em
                  1914, fortalecendo a presença do clube na cidade e marcando o início de uma tradição de
                  competitividade. Ao longo dos anos 20 e 30, o Corinthians passou por fases de profissionalização
                  e estruturação.
                </p>
              </section>

              <section>
                <h3>Períodos de altos e baixos</h3>
                <p>
                  Nas décadas seguintes, o Corinthians viveu ciclos de altos e baixos, com momentos de glória e
                  longos jejum de títulos que forjaram a mística da Fiel Torcida. A relação entre clube e torcida
                  se aprofundou: a massa corinthiana consolidou-se como elemento definidor da identidade do
                  clube.
                </p>
                <p>
                  Um ponto de virada simbólico ocorreu em 1977, quando o clube pôs fim a um longo período sem
                  conquistas de grande expressão. Nos anos 90, o Corinthians conquistou seu primeiro Campeonato
                  Brasileiro (1990), consolidando-se nacionalmente.
                </p>
              </section>

              <section>
                <h3>Era contemporânea</h3>
                <p>
                  O início do século XXI trouxe grandes capítulos: em 2000, o Corinthians teve destaque em torneios
                  internacionais e, mais adiante, viveu um dos momentos mais épicos da sua história ao conquistar a
                  Copa Libertadores em 2012, seguida do título mundial no mesmo ano — conquistas que selaram o
                  prestígio internacional do clube.
                </p>
                <p>
                  Paralelamente às glórias em campo, o Corinthians participou intensamente de transformações
                  institucionais e urbanas: a construção e a modernização de sua casa — hoje conhecida como Neo
                  Química Arena — e projetos de profissionalização administrativa.
                </p>
              </section>

              <section>
                <h3>Hoje</h3>
                <p>
                  Hoje, o Corinthians é um clube multifacetado: além do futebol profissional, desenvolve categorias
                  de base, projetos sociais, atividades comerciais e presença digital. Sua história é uma narrativa
                  de superação, paixão e reinvenção constante, mantida viva pela devoção da Fiel Torcida.
                </p>
              </section>
            </div>

            <aside className="founders-card" aria-label="Fundadores do clube">
              <p className="founders-card__kicker">Fundadores</p>
              <div className="founders-card__image" role="img" aria-label="Foto dos fundadores">
                <img className="founders-card__photo" src="/assets/images/Fundadores.jpeg" alt="Foto dos fundadores do Corinthians" />
              </div>
              <div className="founders-card__meta">
                <strong>Grupo Fundador</strong>
                <p className="founders-card__text">Anselmo Corrêa <br /> Antônio Pereira <br /> Carlos Silva (João Carlos da Silva) <br /> Joaquim Ambrósio <br /> Raphael Perron</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
