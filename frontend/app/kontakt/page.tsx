import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { contact } from "@/lib/site-data";

export const metadata: Metadata = { title: "Kontakt", description: "Kontaktirajte AntenaPRO za procjenu i ponudu. Odgovaramo u najkraćem mogućem roku.", alternates: { canonical: "/kontakt" } };

export default function ContactPage() {
  return <main id="main-content">
    <section className="inner-hero contact-hero"><div className="inner-hero-media"><Image src="/images/kontakt-hero.png" alt="AntenaPRO tehničar razgovara s klijentom uz satelitsku antenu" fill priority sizes="100vw" /></div><div className="hero-grid" /><div className="shell inner-hero-content"><p className="eyebrow"><span /> Odgovaramo u najkraćem roku</p><h1>Recite nam što<br />trebate riješiti.</h1><p>Pošaljite osnovne informacije o lokaciji i potrebnoj usluzi. Za hitan dogovor nazovite nas izravno.</p></div></section>
    <section className="section contact-section"><div className="shell contact-page-grid">
      <aside data-reveal="right"><p className="kicker">Izravni kontakt</p><a className="contact-big" href={contact.phoneHref}>{contact.phoneLabel}</a><a className="contact-big" href={`mailto:${contact.email}`}>{contact.email}</a><div className="contact-meta"><div><span>Adresa</span><strong>{contact.address}</strong></div><div><span>Radno vrijeme</span><strong>Pon–Pet 08–18<br />Sub 08–12</strong></div><div><span>Područje rada</span><strong>Zagreb i šira okolica<br />po dogovoru Hrvatska</strong></div></div></aside>
      <div className="form-card" data-reveal="left"><p className="kicker">Pošaljite upit</p><h2>Dogovorimo procjenu.</h2><ContactForm /></div>
    </div></section>
  </main>;
}
