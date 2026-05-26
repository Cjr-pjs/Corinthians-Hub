"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    L?: any;
  }
}

const LEAFLET_CSS_HREF = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS_SRC = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
const STADIUM_COORDS = [-23.5453, -46.4738] as const;
const STADIUM_ZOOM = 15;
const GOOGLE_MAPS_URL = "https://maps.google.com/?q=-23.5453,-46.4738";

const GALLERY_ITEMS = [
  {
    src: "/assets/images/estadio/1.jpg",
    alt: "Neo Química Arena - foto 1",
    caption: "Vista editorial 01",
  },
  {
    src: "/assets/images/estadio/2.jpg",
    alt: "Neo Química Arena - foto 2",
    caption: "Vista editorial 02",
  },
  {
    src: "/assets/images/estadio/3.jpg",
    alt: "Neo Química Arena - foto 3",
    caption: "Vista editorial 03",
  },
  {
    src: "/assets/images/estadio/4.jpg",
    alt: "Neo Química Arena - foto 4",
    caption: "Vista editorial 04",
  },
] as const;

function ensureLeafletAssets() {
  if (!document.querySelector(`link[href="${LEAFLET_CSS_HREF}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = LEAFLET_CSS_HREF;
    document.head.appendChild(link);
  }

  if (window.L) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${LEAFLET_JS_SRC}"]`) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Falha ao carregar Leaflet.")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = LEAFLET_JS_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Falha ao carregar Leaflet."));
    document.head.appendChild(script);
  });
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M9 4.5 7.4 6.5H4a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 4 18.5h16a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 20 6.5h-3.4L15 4.5H9Zm3 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
    </svg>
  );
}

function ZoomIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M10 4a6 6 0 1 1 4.24 10.24l4.26 4.26-1.42 1.42-4.26-4.26A6 6 0 0 1 10 4Zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-1 3h2v1.5h1.5v2H11V14H9V12.5H7.5v-2H9V9Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4 17.6 5 12 10.6 6.4 5Z" />
    </svg>
  );
}

function buildMarkerSvg() {
  return `
    <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="18" cy="18" r="17" fill="#000" stroke="#fff" stroke-width="2" />
      <path d="M10 14.5h16l-2.1 10.5H12.1L10 14.5Zm3.1-4h9.8l1.2 2.5H11.9l1.2-2.5Z" fill="#fff" />
      <text x="18" y="24" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="700" fill="#000">NQA</text>
    </svg>
  `;
}

export function StadiumMedia() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex]);

  useEffect(() => {
    let leafletMap: any = null;
    let cancelled = false;

    const initializeMap = async () => {
      try {
        await ensureLeafletAssets();

        if (cancelled || !mapRef.current || !window.L) {
          return;
        }

        const L = window.L;
        leafletMap = L.map(mapRef.current, {
          scrollWheelZoom: false,
          zoomControl: true,
        }).setView(STADIUM_COORDS, STADIUM_ZOOM);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
        }).addTo(leafletMap);

        const markerIcon = L.divIcon({
          className: "stadium-map__marker",
          html: buildMarkerSvg(),
          iconSize: [36, 36],
          iconAnchor: [18, 18],
          popupAnchor: [0, -16],
        });

        const marker = L.marker(STADIUM_COORDS, { icon: markerIcon }).addTo(leafletMap);
        marker.bindPopup(`
          <div class="stadium-map__popup">
            <strong>Neo Química Arena</strong>
            <a href="${GOOGLE_MAPS_URL}" target="_blank" rel="noreferrer">Ver no Google Maps</a>
          </div>
        `);

        leafletMap.on("click", () => {
          leafletMap.scrollWheelZoom.enable();
        });

        window.setTimeout(() => {
          if (!cancelled) {
            leafletMap.invalidateSize();
          }
        }, 0);
      } catch (error) {
        console.error(error);
        if (mapRef.current) {
          mapRef.current.dataset.mapError = "true";
        }
      }
    };

    void initializeMap();

    return () => {
      cancelled = true;
      leafletMap?.remove();
    };
  }, []);

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  return (
    <div className="stadium-media">
      <section className="stadium-panel stadium-panel--map" aria-labelledby="stadium-map-title">
        <div className="stadium-panel__eyebrow">Mapa</div>
        <h2 className="stadium-panel__title" id="stadium-map-title">
          Localização
        </h2>
        <div className="stadium-map" ref={mapRef} aria-label="Mapa da Neo Química Arena" />
        <p className="stadium-map__hint">Clique no mapa para reativar a rolagem do mouse.</p>
      </section>

      <section className="stadium-panel stadium-panel--gallery" aria-labelledby="stadium-gallery-title">
        <div className="stadium-panel__eyebrow">Galeria</div>
        <h2 className="stadium-panel__title" id="stadium-gallery-title">
          Fotos
        </h2>

        <div className="stadium-gallery">
          {GALLERY_ITEMS.map((item, index) => (
            <figure className="stadium-gallery__item" key={item.src}>
              <button
                type="button"
                className="stadium-gallery__button"
                onClick={() => setLightboxIndex(index)}
                aria-label={`Abrir foto ${index + 1}`}
              >
                <img className="stadium-gallery__image" src={item.src} alt={item.alt} loading="lazy" />
                <span className="stadium-gallery__camera" aria-hidden="true">
                  <CameraIcon />
                </span>
                <span className="stadium-gallery__overlay" aria-hidden="true">
                  <ZoomIcon />
                </span>
              </button>
              {item.caption ? <figcaption className="stadium-gallery__caption">{item.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      </section>

      {lightboxIndex !== null ? (
        <div
          className="stadium-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Galeria ampliada"
          onClick={closeLightbox}
        >
          <button type="button" className="stadium-lightbox__close" aria-label="Fechar lightbox" onClick={closeLightbox}>
            <CloseIcon />
          </button>
          <figure className="stadium-lightbox__figure" onClick={(event) => event.stopPropagation()}>
            <img
              className="stadium-lightbox__image"
              src={GALLERY_ITEMS[lightboxIndex].src}
              alt={GALLERY_ITEMS[lightboxIndex].alt}
            />
            {GALLERY_ITEMS[lightboxIndex].caption ? (
              <figcaption className="stadium-lightbox__caption">{GALLERY_ITEMS[lightboxIndex].caption}</figcaption>
            ) : null}
          </figure>
        </div>
      ) : null}
    </div>
  );
}