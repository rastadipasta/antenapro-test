import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { contact, projects, services } from "@/lib/site-data";

export function generateStaticParams() { return services.map((service) => ({ slug: service.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return { title: service.title, description: service.description, alternates: { canonical: `/usluge/${slug}` }, openGraph: { title: service.title, description: service.description, images: [service.image] } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const photos = projects.slice(0, 3);
  const jsonLd = { "@context": "https://schema.org", "@type": "Service", name: service.title, description: service.description, provider: { "@type": "LocalBusiness", name: "AntenaPRO", telephone: "+385993330036" }, areaServed: "Hrvatska" };

  return <main id="main-content">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <section className="inner-hero service-hero">
      <div className="inner-hero-media"><Image src={service.image} alt={service.title} fill priority sizes="100vw" /></div>
      <div className="hero-grid" aria-hidden="true" />
      <div className="shell inner-hero-content"><p className="eyebrow"><span /> {service.eyebrow}</p><h1>{service.title}</h1><p>{service.intro}</p><div className="hero-actions"><Link className="button button-primary" href="/kontakt">Zatraži procjenu <span>↗</span></Link><a className="button button-ghost" href={contact.phoneHref}>{contact.phoneLabel}</a></div></div>
    </section>

    <section className="section"><div className="shell service-detail-grid">
      <div data-reveal="left"><p className="kicker">Što dobivate</p><h2>Rješenje prilagođeno stvarnoj lokaciji.</h2><p className="large-copy">{service.description}</p></div>
      <div className="benefit-list" data-reveal-group>{service.benefits.map((benefit, index) => <div key={benefit}><span>0{index + 1}</span><strong>{benefit}</strong></div>)}</div>
    </div></section>

    <section className="section dark-section"><div className="shell"><div className="section-heading split-heading" data-reveal="up"><div><p className="kicker">Proces izvedbe</p><h2>Tri koraka do<br />pouzdanog sustava.</h2></div><p>Svaka izvedba završava stvarnim testom rada, a ne samo vizualnom provjerom instalacije.</p></div><div className="three-grid" data-reveal-group>{service.steps.map((step, index) => <article className="number-card" key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>

    <section className="section"><div className="shell"><div className="section-heading projects-heading" data-reveal="up"><div><p className="kicker">S terena</p><h2>Uredna izvedba.<br />Mjerljiv rezultat.</h2></div><Link className="text-link" href="/projekti">Pogledajte projekte ↗</Link></div><div className="project-strip" data-reveal-group>{photos.map((photo) => <div data-reveal="clip" key={photo.src}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 720px) 100vw, 33vw" /></div>)}</div></div></section>

    <section className="section faq-section"><div className="shell faq-layout"><div data-reveal="left"><p className="kicker">Česta pitanja</p><h2>Kratki odgovori prije početka.</h2></div><div data-reveal-group>{service.faq.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div></div></section>

    <section className="compact-cta"><div className="shell" data-reveal="up"><div><p className="kicker">Dogovorite procjenu</p><h2>Imate sličan projekt?</h2></div><Link className="button button-light" href="/kontakt">Pošaljite upit ↗</Link></div></section>

    <section className="section related-services"><div className="shell"><p className="kicker" data-reveal="up">Povezane usluge</p><div className="three-grid" data-reveal-group>{related.map((item) => <Link href={`/usluge/${item.slug}`} className="related-card" key={item.slug}><span>{item.icon}</span><h3>{item.shortTitle}</h3><p>{item.description}</p><b>Detalji ↗</b></Link>)}</div></div></section>
  </main>;
}
