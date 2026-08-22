import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pravila o kolačićima", description: "Informacije o korištenju kolačića na stranici AntenaPRO." };

export default function CookiePolicy() {
  return <main id="main-content" className="legal-page"><div className="shell"><p className="kicker" data-reveal="up">Pravni dokumenti</p><h1 data-reveal="up">Pravila o kolačićima</h1><div className="content-prose" data-reveal-group>
    <p>AntenaPRO koristi kolačiće kako bi omogućio ispravan rad stranice, zapamtio vaše postavke i, uz privolu, razumio način korištenja weba.</p>
    <h2>Što su kolačići?</h2><p>Kolačići su male tekstualne datoteke koje preglednik sprema na uređaj. Pomažu stranici zapamtiti vaše radnje i postavke kroz određeno razdoblje.</p>
    <h2>Nužni kolačići</h2><p>Nužni podaci koriste se za pohranu odluke o kolačićima i sigurnosne funkcije kontakt forme, uključujući Google reCAPTCHA zaštitu od neželjenih poruka.</p>
    <h2>Analitički kolačići</h2><p>Analitičke alate koristimo samo kada za to date privolu. Pomažu nam razumjeti posjećenost i poboljšati sadržaj stranice.</p>
    <h2>Upravljanje kolačićima</h2><p>Kolačiće možete obrisati ili blokirati u postavkama preglednika. Blokiranje nužnih funkcija može onemogućiti slanje kontakt forme.</p>
  </div></div></main>;
}
