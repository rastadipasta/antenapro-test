"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { contact, services } from "@/lib/site-data";

const subscribeTheme = (callback: () => void) => {
  window.addEventListener("themeUpdated", callback);
  window.addEventListener("storage", callback);
  return () => { window.removeEventListener("themeUpdated", callback); window.removeEventListener("storage", callback); };
};
const getTheme = () => localStorage.getItem("antenapro-theme") !== "light";

function ThemeButton({ onSelect }: { onSelect?: () => void }) {
  const dark = useSyncExternalStore(subscribeTheme, getTheme, () => true);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  const toggle = () => {
    const next = !dark;
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("antenapro-theme", next ? "dark" : "light");
    window.dispatchEvent(new Event("themeUpdated"));
    onSelect?.();
  };

  return (
    <button className="theme-control" onClick={toggle} type="button">
      <span aria-hidden="true">{dark ? "☀" : "☾"}</span>
      {dark ? "Svijetla tema" : "Tamna tema"}
    </button>
  );
}

export default function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>("a, button");
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const active = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">Preskoči na sadržaj</a>
      <nav className="pill-nav" aria-label="Glavna navigacija">
        <div className="desktop-nav-side desktop-nav-left">
          <div ref={servicesRef} className={`services-menu${servicesOpen ? " open" : ""}`}>
            <button
              className={`nav-link${active("/usluge") ? " active" : ""}`}
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="services-dropdown"
              onClick={() => setServicesOpen((value) => !value)}
            >
              Usluge
              <svg className="nav-chevron" aria-hidden="true" viewBox="0 0 12 8" width="12" height="8">
                <path d="M1 1.25 6 6.25l5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div id="services-dropdown" className={`services-dropdown${servicesOpen ? " open" : ""}`}>
              {services.map((service) => (
                <Link href={`/usluge/${service.slug}`} key={service.slug} onClick={() => setServicesOpen(false)}>
                  <span className="menu-code">{service.icon}</span>
                  <span>{service.shortTitle}</span>
                </Link>
              ))}
            </div>
          </div>
          <Link className={`nav-link${active("/o-nama") ? " active" : ""}`} href="/o-nama">O nama</Link>
        </div>

        <a className="mobile-phone" href={contact.phoneHref} aria-label={`Nazovite ${contact.phoneLabel}`}>☎</a>

        <Link className="nav-logo" href="/" aria-label="AntenaPRO početna">
          <Image src="/images/logo-nav-transparent.png" alt="" width={180} height={164} priority sizes="(max-width: 720px) 92px, 116px" />
        </Link>

        <div className="desktop-nav-side desktop-nav-right">
          <Link className={`nav-link${active("/projekti") ? " active" : ""}`} href="/projekti">Projekti</Link>
          <Link className={`nav-link${active("/kontakt") ? " active" : ""}`} href="/kontakt">Kontakt</Link>
        </div>

        <button className="menu-toggle" type="button" aria-label="Otvori izbornik" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((value) => !value)}>
          <span /><span />
        </button>
      </nav>

      <div id="mobile-menu" ref={panelRef} className={`mobile-panel${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} onClick={() => setMenuOpen(false)}>
        <Link href="/o-nama">O nama</Link>
        <Link href="/projekti">Projekti</Link>
        <Link href="/kontakt">Kontakt</Link>
        <div className="mobile-service-list">
          <span>Usluge</span>
          {services.map((service) => <Link href={`/usluge/${service.slug}`} key={service.slug}>{service.shortTitle}</Link>)}
        </div>
        <ThemeButton onSelect={() => setMenuOpen(false)} />
      </div>
    </header>
  );
}

export { ThemeButton };
