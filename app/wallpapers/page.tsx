"use client";

import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { WallpaperGallery } from "@/components/wallpaper-gallery";
import { wallpapersData } from "@/lib/corinthians-data";

export default function WallpapersPage() {
  return (
    <SiteShell>
      <section className="page-section page-section--heroish">
        <div className="page-wrap">
          <SectionHeading
            kicker="Wallpapers"
            title="A Galeria Do Time do Povo"
            description="Clique em seu wallpaper Favorito para abrir a visualização em tela cheia e usar o botão de download."
          />

          <WallpaperGallery items={wallpapersData} />
        </div>
      </section>
    </SiteShell>
  );
}
