import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { contact, projects } from "@/lib/site-data";

export const metadata: Metadata = { title: "Projekti", description: "Primjeri AntenaPRO instalacija antena, mreža, videonadzora i multimedije.", alternates: { canonical: "/projekti" } };

export default function ProjectsPage() {
  return <main id="main-content">
    <section className="inner-hero editorial-hero projects-hero"><div className="inner-hero-media"><Image src="/images/projekti-hero.png" alt="AntenaPRO tehničar planira antenski i komunikacijski sustav" fill priority sizes="100vw" /></div><div className="hero-grid" /><div className="shell inner-hero-content"><p className="eyebrow"><span /> Izvedeno na terenu</p><h1>Naši projekti.</h1><p>Stvarne lokacije, stvarni uvjeti i rješenja koja nastavljaju pouzdano raditi.</p><div className="hero-actions"><Link className="button button-primary" href="/kontakt">Zatraži procjenu <span>↗</span></Link><a className="button button-ghost" href={contact.phoneHref} aria-label={`Nazovite AntenaPRO na ${contact.phoneLabel}`}><span className="live-dot" /> {contact.phoneLabel}</a></div></div></section>
    <section className="section"><div className="shell"><div className="filter-row" aria-label="Kategorije projekata" data-reveal="up"><span className="active">Svi projekti</span><span>Antene</span><span>Internet</span><span>Sigurnost</span><span>Multimedija</span></div><div className="projects-gallery" data-reveal-group>{projects.map((project, index) => <figure className={index % 5 === 0 ? "wide" : ""} data-reveal="clip" key={project.src}><Image src={project.src} alt={project.alt} fill sizes="(max-width: 720px) 100vw, 50vw" /><figcaption><span>{project.category}</span><strong>{project.alt}</strong></figcaption></figure>)}</div></div></section>
    <section className="compact-cta"><div className="shell" data-reveal="up"><div><p className="kicker">Vaša lokacija može biti sljedeća</p><h2>Trebate pouzdanu izvedbu?</h2></div><Link className="button button-light" href="/kontakt">Zatraži procjenu ↗</Link></div></section>
  </main>;
}
