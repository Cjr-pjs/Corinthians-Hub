"use client";

import Image from "next/image";
import { useState } from "react";
import type { WallpaperItem } from "@/lib/corinthians-data";

export function WallpaperGallery({ items }: { items: WallpaperItem[] }) {
  const [selected, setSelected] = useState<WallpaperItem | null>(null);

  const downloadImage = (item: WallpaperItem) => {
    const link = document.createElement("a");
    link.href = item.src;
    link.download = `${item.titulo.toLowerCase().replace(/\s+/g, "-")}.svg`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <>
      <div className="wallpaper-gallery">
        {items.map((item) => (
          <button
            key={item.titulo}
            type="button"
            className="wallpaper-card"
            onClick={() => setSelected(item)}
            style={{ aspectRatio: item.aspectRatio }}
          >
            <Image src={item.src} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 33vw" />
            <span className="wallpaper-card__overlay" />
            <span className="wallpaper-card__content">
              <strong>{item.titulo}</strong>
              <span>{item.descricao}</span>
            </span>
          </button>
        ))}
      </div>

      {selected ? (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setSelected(null)}>
          <div className="lightbox__panel" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="lightbox__close" onClick={() => setSelected(null)}>
              ×
            </button>
            <div className="lightbox__image">
              <Image src={selected.src} alt={selected.alt} fill sizes="100vw" />
            </div>
            <div className="lightbox__caption">
              <div>
                <p>{selected.titulo}</p>
                <h3>{selected.descricao}</h3>
              </div>
              <button type="button" className="button button--primary" onClick={() => downloadImage(selected)}>
                Download
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
