import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "O nama", description: "Upoznajte AntenaPRO: više od 20 godina iskustva u antenskim, mrežnim i sigurnosnim sustavima.", alternates: { canonical: "/o-nama" } };

export default function AboutPage() {
  return <main id="main-content">
    <section className="inner-hero editorial-hero about-hero"><div className="inner-hero-media"><Image src="/images/o-nama-hero.png" alt="AntenaPRO stručnjaci planiraju antenski i mrežni sustav na krovu" fill priority sizes="100vw" /></div><div className="hero-grid" /><div className="shell inner-hero-content"><p className="eyebrow"><span /> AntenaPRO od prvog mjerenja</p><h1>Tehničko znanje.<br />Ljudski pristup.</h1><p>Više od dvadeset godina rješavamo probleme signala, povezivosti i sigurnosti — jasno, uredno i odgovorno.</p></div></section>
    <section className="section"><div className="shell about-intro"><div data-reveal="left"><p className="kicker">Naša priča</p><h2>Ne prodajemo opremu.<br />Rješavamo problem.</h2></div><div className="prose" data-reveal="right"><p>AntenaPRO je specijalizirani terenski tim za montažu i servis TV i satelitskih antena, Starlink sustava, internet i Wi-Fi mreža, videonadzora, alarma i multimedije.</p><p>Svaki projekt počinje procjenom stvarnih uvjeta. Tek nakon mjerenja predlažemo opremu i način izvedbe, zato rješenja ostaju stabilna i nakon što napustimo lokaciju.</p></div></div></section>
    <section className="section dark-section"><div className="shell values-grid"><div className="about-photo" data-reveal="clip"><Image src="/projects/22.JPG" alt="AntenaPRO instalacija na krovu" fill sizes="(max-width: 900px) 100vw, 45vw" /></div><div><p className="kicker" data-reveal="right">Naš standard</p><h2 data-reveal="right">Detalji čine pouzdan sustav.</h2><div data-reveal-group>{[["01", "Izmjeri prije odluke"], ["02", "Objasni prije radova"], ["03", "Testiraj prije predaje"]].map(([num, text]) => <div className="value-row" key={num}><span>{num}</span><strong>{text}</strong></div>)}</div></div></div></section>
    <section className="section"><div className="shell stats-panel" data-reveal-group><div><strong>20+</strong><span>godina iskustva</span></div><div><strong>2000+</strong><span>zadovoljnih klijenata</span></div><div><strong>24 h</strong><span>tipičan odaziv</span></div><div><strong>2</strong><span>ovlaštena partnera</span></div></div></section>
    <section className="compact-cta"><div className="shell" data-reveal="up"><div><p className="kicker">AntenaPRO na vašoj lokaciji</p><h2>Razgovarajmo o projektu.</h2></div><Link className="button button-light" href="/kontakt">Kontaktirajte nas ↗</Link></div></section>
  </main>;
}
