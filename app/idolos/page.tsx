import { IdolCard } from "@/components/idol-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { idolosData } from "@/lib/corinthians-data";

export default function IdolosPage() {
  return (
    <SiteShell>
      <section className="page-section page-section--heroish">
        <div className="page-wrap">
          <SectionHeading
            kicker="Ídolos"
            title="Jogadores que marcaram a historia do todo poderoso"
            description="Cada um desses jogadores deixou uma marca indelével no Corinthians, seja por sua habilidade, liderança ou paixão pelo clube."
          />

          <div className="idol-grid">
            {idolosData.map((item) => (
              <IdolCard
                key={item.nome}
                image={item.foto}
                name={item.nome}
                epoca={item.epoca}
                resumo={item.resumo}
              />
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
