"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

const navigation = [
  { href: "/", label: "Início" },
  { href: "/historia", label: "História" },
  { href: "/jogadores", label: "Jogadores" },
  { href: "/trofeus", label: "Troféus" },
  { href: "/wallpapers", label: "Wallpapers" },
  { href: "/estadio", label: "Estádio" },
  { href: "/idolos", label: "Ídolos" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const githubProfileUrl = "https://github.com/Cjr-pjs/Corinthians-Hub";
  const linkedinProfileUrl = "https://www.linkedin.com/in/cleudson-junior-515b933a5/";

  return (
    <div className="site-shell" id="inicio">
      <header className={`site-header ${open ? "site-header--open" : ""}`}>
        <div className="site-header__inner">
          <Link className="navbar-brand" href="/" onClick={() => setOpen(false)}>
           
            <img src="/assets/images/escudo.svg" alt="Corinthians" className="navbar-escudo" />
          </Link>

          <button
            type="button"
            className="site-header__toggle"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`site-nav ${open ? "site-nav--open" : ""}`} aria-label="Navegação principal">
            {navigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="site-nav__link"
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="site-main">{children}</main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <img src="/assets/images/escudo.svg" alt="Corinthians" className="site-footer__logo" />
            <div>
              <strong>Sport Club Corinthians Paulista</strong>
              <p>Fiel. Sempre. Preto, branco e identidade.</p>
              <div className="site-footer__profile-links" aria-label="Perfis pessoais">
                <a href={githubProfileUrl} target="_blank" rel="noreferrer" className="site-footer__profile-link">
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path
                      fill="currentColor"
                      d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.09.68-.22.68-.48 0-.24-.01-.86-.02-1.69-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.12-1.52-1.12-1.52-.92-.64.07-.63.07-.63 1.02.07 1.56 1.07 1.56 1.07.91 1.58 2.39 1.13 2.97.86.09-.68.35-1.13.63-1.39-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0 1 12 7.48c.85 0 1.72.12 2.53.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.82-4.57 5.07.36.32.67.95.67 1.92 0 1.39-.01 2.51-.01 2.85 0 .26.17.58.69.48A10.26 10.26 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
                    />
                  </svg>
                  <span>GitHub</span>
                </a>
                <a href={linkedinProfileUrl} target="_blank" rel="noreferrer" className="site-footer__profile-link">
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path
                      fill="currentColor"
                      d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.67H9.32V9h3.42v1.56h.05c.48-.9 1.65-1.86 3.4-1.86 3.64 0 4.31 2.39 4.31 5.5v6.25ZM5.34 7.44a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.56 20.45h3.57V9H3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.23 0Z"
                    />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          <div className="site-footer__social" aria-label="Redes sociais do Corinthians">
            <a href="https://www.instagram.com/corinthians/" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://x.com/corinthians" target="_blank" rel="noreferrer">
              X
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
