import type { Metadata } from "next";

export const metadata: Metadata = { title: "Politika privatnosti", description: "Politika privatnosti i obrada osobnih podataka tvrtke AntenaPRO." };

export default function PrivacyPolicy() {
  return <main id="main-content" className="legal-page"><div className="shell"><p className="kicker" data-reveal="up">Pravni dokumenti</p><h1 data-reveal="up">Politika privatnosti</h1><div className="content-prose" data-reveal-group>
    <p>Zaštita vaše privatnosti i osobnih podataka od velike nam je važnosti. Ova politika objašnjava kako AntenaPRO prikuplja, koristi i štiti podatke prilikom korištenja stranice antenapro.hr.</p>
    <h2>1. Prikupljanje podataka</h2><p>Prikupljamo samo podatke koje dobrovoljno pružite putem kontakt forme, poput imena, prezimena, e-mail adrese, broja telefona i sadržaja poruke, kako bismo obradili vaš upit.</p>
    <h2>2. Korištenje podataka</h2><p>Podatke koristimo za odgovaranje na upite, pružanje tehničke podrške, realizaciju usluga i komunikaciju povezanu s dogovorenim radovima.</p>
    <h2>3. Zaštita i čuvanje podataka</h2><p>Podatke ne prodajemo niti ustupamo trećim stranama osim kada je to zakonski propisano ili nužno za izvršenje zatražene usluge. Čuvamo ih samo onoliko dugo koliko je potrebno za navedenu svrhu.</p>
    <h2>4. Vaša prava</h2><p>Možete zatražiti uvid, ispravak ili brisanje svojih podataka te povući privolu. Za pitanja o privatnosti javite se na info@antenapro.hr.</p>
  </div></div></main>;
}
