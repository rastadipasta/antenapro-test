import Image from "next/image";
import Link from "next/link";
import StatsCounters from "@/components/StatsCounters";
import { contact, projects, services, siteMetrics } from "@/lib/site-data";

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  const jsonLd = { "@context": "https://schema.org", "@type": "HomeAndConstructionBusiness", name: "AntenaPRO", url: "https://antenapro.hr", telephone: "+385993330036", email: contact.email, address: { "@type": "PostalAddress", streetAddress: "Banatska ulica 38", addressLocality: "Zagreb", addressCountry: "HR" }, areaServed: "Hrvatska" };
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="home-hero">
        <div className="hero-image" aria-hidden="true"><Image src="/images/IMG_8108.JPG" alt="" fill priority sizes="100vw" /></div>
        <div className="hero-grid" aria-hidden="true" />
        <div className="signal-rings" aria-hidden="true"><i /><i /><i /></div>
        <div className="shell hero-copy">
          <p className="eyebrow"><span /> Zagreb i šire · Odaziv unutar 24 h</p>
          <h1>Trebate<br /><em>antenu?</em></h1>
          <p className="hero-lead">Antene, Starlink, Wi-Fi, videonadzor i multimedija — od stručne procjene do uredne instalacije koja radi kako treba.</p>
          <div className="hero-actions"><Link className="button button-primary" href="/kontakt">Zatraži procjenu <Arrow /></Link><a className="button button-ghost" href={contact.phoneHref}><span className="live-dot" /> {contact.phoneLabel}</a></div>
        </div>
        <StatsCounters className="hero-proof shell" metrics={siteMetrics.slice(0, 3)} variant="compact">
          <div className="partner-proof"><span>Ovlašteni partner</span><strong>A1 · Telemach</strong></div>
        </StatsCounters>
      </section>

      <section className="section services-home"><div className="shell">
        <div className="section-heading split-heading" data-reveal="up"><div><p className="kicker">01 / Usluge</p><h2>Jedan tim.<br />Kompletno rješenje.</h2></div><p>Tehnički sustav vrijedi samo ako radi pouzdano. Zato prvo mjerimo i planiramo, zatim montiramo, povezujemo i testiramo.</p></div>
        <div className="service-grid" data-reveal-group>{services.map((service, index) => <Link className="service-card" href={`/usluge/${service.slug}`} key={service.slug}><span className="service-index">0{index + 1}</span><span className="service-code">{service.icon}</span><h3>{service.shortTitle}</h3><p>{service.description}</p><span className="card-arrow"><Arrow /></span></Link>)}</div>
      </div></section>

      <section className="section process-section"><div className="shell process-grid">
        <div className="process-photo" data-reveal="clip"><Image src="/projects/5.JPG" alt="AntenaPRO tehničar izvodi instalaciju na lokaciji" fill sizes="(max-width: 900px) 100vw, 48vw" /><div className="photo-label"><span>AntenaPRO standard</span><strong>Čisto. Sigurno. Testirano.</strong></div></div>
        <div className="process-copy"><p className="kicker" data-reveal="right">02 / Način rada</p><h2 data-reveal="right">Bez nagađanja.<br />Od prvog mjerenja.</h2><div className="process-steps" data-reveal-group>{[["01", "Procjena lokacije", "Pregledamo uvjete, postojeću instalaciju i stvarne potrebe."], ["02", "Jasna ponuda", "Prije početka znate preporučeno rješenje, opseg i cijenu."], ["03", "Montaža i test", "Uredno ugrađujemo opremu i potvrđujemo rezultat mjerenjem."]].map(([num, title, text]) => <div className="process-step" key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div><Link className="text-link" href="/o-nama" data-reveal="up">Upoznajte naš način rada <Arrow /></Link></div>
      </div></section>

      <section className="section projects-home"><div className="shell">
        <div className="section-heading projects-heading" data-reveal="up"><div><p className="kicker">03 / Projekti</p><h2>Rezultat se vidi<br />na terenu.</h2></div><Link className="button button-outline" href="/projekti">Svi projekti <Arrow /></Link></div>
        <div className="featured-projects" data-reveal-group>{projects.slice(0, 4).map((project, index) => <figure className={`project-tile tile-${index + 1}`} data-reveal="clip" key={project.src}><Image src={project.src} alt={project.alt} fill sizes="(max-width: 720px) 100vw, 50vw" /><figcaption><span>{project.category}</span><strong>Izvedeno pouzdano</strong></figcaption></figure>)}</div>
      </div></section>

      <section className="section trust-section"><div className="shell trust-layout">
        <div data-reveal="left"><p className="kicker">04 / Povjerenje</p><h2>Ljudi pamte kada<br />sve radi iz prve.</h2></div>
        <blockquote data-reveal="up"><div className="stars" aria-label="5 od 5 zvjezdica">★★★★★</div><p>“Brz dogovor, uredna montaža i napokon stabilan signal. Sve je objašnjeno jasno, bez skrivenih iznenađenja.”</p><footer><strong>Google recenzija</strong><span>Verificirani korisnik</span></footer></blockquote>
        <div className="rating-block" data-reveal="right"><strong>4.8</strong><span>Google ocjena</span><a href="https://reviewthis.biz/antenapro" target="_blank" rel="noreferrer">Ostavite recenziju ↗</a></div>
      </div></section>

      <section className="final-cta"><div className="signal-rings cta-rings" aria-hidden="true"><i /><i /><i /></div><div className="shell" data-reveal="up"><p className="kicker">Spremni za pouzdan sustav?</p><h2>Recite nam što trebate.<br /><em>Mi ćemo pronaći signal.</em></h2><div className="hero-actions"><Link className="button button-light" href="/kontakt">Zatraži procjenu <Arrow /></Link><a className="button button-dark" href={contact.phoneHref}>{contact.phoneLabel}</a></div></div></section>
    </main>
  );
}
